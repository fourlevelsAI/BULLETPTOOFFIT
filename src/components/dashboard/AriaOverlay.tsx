import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ULogo from "@/components/ULogo";

interface Props {
  open: boolean;
  onClose: () => void;
  context: string;
  onFoodLogged: () => void;
  onWorkoutLogged: () => void;
}

function speak(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  utterance.lang = "en-US";
  const voices = speechSynthesis.getVoices();
  const preferred = voices.find(
    (v) => v.name.includes("Samantha") || v.name.includes("Karen") || v.name.includes("Google US English Female")
  );
  if (preferred) utterance.voice = preferred;
  speechSynthesis.speak(utterance);
}

const AriaOverlay = ({ open, onClose, context, onFoodLogged, onWorkoutLogged }: Props) => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"listening" | "processing" | "responding">("listening");
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [barHeights, setBarHeights] = useState([8, 8, 8, 8, 8]);

  const recognitionRef = useRef<any>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number>(0);
  const streamRef = useRef<MediaStream | null>(null);

  // Audio visualizer
  const startVisualizer = useCallback((stream: MediaStream) => {
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 32;
    source.connect(analyser);
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      const heights = [0, 2, 4, 6, 8].map((i) => {
        const val = dataArray[i] || 0;
        return Math.max(8, (val / 255) * 64);
      });
      setBarHeights(heights);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animate();
  }, []);

  useEffect(() => {
    if (!open) return;
    setPhase("listening");
    setTranscript("");
    setInterim("");
    setResponse("");
    setError(null);
    setBarHeights([8, 8, 8, 8, 8]);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition not supported");
      return;
    }

    let cancelled = false;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
      streamRef.current = stream;
      startVisualizer(stream);

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = true;
      recognitionRef.current = recognition;

      recognition.onresult = (event: any) => {
        let final = "";
        let inter = "";
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) final += event.results[i][0].transcript;
          else inter += event.results[i][0].transcript;
        }
        if (final) setTranscript((prev) => (prev + " " + final).trim());
        setInterim(inter);
      };

      recognition.onerror = (event: any) => {
        if (event.error === "not-allowed") {
          setError("Microphone access required");
        } else if (event.error === "no-speech") {
          setError("No speech detected — try again");
        }
      };

      recognition.onend = () => {
        // auto-process when speech ends
      };

      recognition.start();
    }).catch(() => {
      setError("Microphone access required");
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(animFrameRef.current);
      recognitionRef.current?.stop();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      speechSynthesis.cancel();
    };
  }, [open, startVisualizer]);

  const handleDone = useCallback(async () => {
    recognitionRef.current?.stop();
    cancelAnimationFrame(animFrameRef.current);
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setBarHeights([8, 8, 8, 8, 8]);

    const text = (transcript + " " + interim).trim();
    if (!text) { onClose(); return; }

    setPhase("processing");
    setTranscript(text);
    setInterim("");

    try {
      const { data, error: fnError } = await supabase.functions.invoke("voice-assistant", {
        body: { transcript: text, context },
      });

      if (fnError) throw fnError;

      setPhase("responding");
      setResponse(data.spoken_response || "Done.");

      if (data.spoken_response) speak(data.spoken_response);

      // Handle actions
      if (data.type === "log_food" && data.action?.foods) {
        const { user } = (await supabase.auth.getUser()).data;
        if (user) {
          const mealType = data.action.meal_type || "Snack";
          const today = new Date().toISOString().split("T")[0];
          for (const food of data.action.foods) {
            await supabase.from("food_logs").insert({
              user_id: user.id,
              food_name: food.name,
              calories: food.calories || 0,
              protein: food.protein_g || 0,
              carbs: food.carbs_g || 0,
              fat: food.fat_g || 0,
              serving_size: food.serving_size || "1 serving",
              meal_type: mealType,
              logged_at: today,
            });
          }
          toast.success(`Logged ${data.action.foods.length} item(s) to ${mealType}`);
          onFoodLogged();
        }
      } else if (data.type === "log_workout" && data.action) {
        const { user } = (await supabase.auth.getUser()).data;
        if (user) {
          const today = new Date().toISOString().split("T")[0];
          await supabase.from("workout_sessions").insert({
            user_id: user.id,
            name: data.action.workout_name || "Voice Logged Workout",
            workout_type: data.action.workout_type || "Strength",
            duration_minutes: data.action.estimated_duration_minutes || null,
            calories_burned: data.action.estimated_calories || 0,
            logged_at: today,
          });
          toast.success("Workout logged!");
          onWorkoutLogged();
        }
      } else if (data.type === "navigate" && data.action?.route) {
        setTimeout(() => {
          navigate(data.action.route);
          onClose();
        }, 2000);
        return;
      }

      // Auto-close after response
      setTimeout(onClose, 3000);
    } catch (e) {
      console.error("ARIA error:", e);
      setPhase("responding");
      setResponse("Something went wrong. Please try again.");
      setTimeout(onClose, 2000);
    }
  }, [transcript, interim, context, onClose, onFoodLogged, onWorkoutLogged, navigate]);

  // Handle ESC key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{
            background: "rgba(0,0,0,0.95)",
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center"
            style={{ marginTop: "env(safe-area-inset-top)" }}
          >
            <X className="w-5 h-5 text-white/60" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-[10px] text-white/40 font-mono tracking-[0.3em] uppercase">BULLETPROOFFIT AI</p>
            <p className="text-lg font-display text-white tracking-widest mt-1">ARIA</p>
          </div>

          {error ? (
            <div className="text-center px-6">
              <p className="text-sm text-white/60 font-body mb-4">{error}</p>
              <button onClick={onClose} className="border border-white/20 px-6 py-2 rounded-lg text-sm font-body text-white">
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Logo with pulse */}
              <motion.div
                animate={phase === "listening" ? { scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] } : {}}
                transition={{ repeat: Infinity, duration: 2 }}
                className="mb-6"
                style={{ filter: "drop-shadow(0 0 20px rgba(192,192,192,0.3))" }}
              >
                <ULogo size={56} />
              </motion.div>

              {/* Audio bars */}
              <div className="flex items-center gap-1.5 mb-6 h-16">
                {barHeights.map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-1.5 rounded-full bg-white"
                    animate={{ height: h }}
                    transition={{ duration: 0.05 }}
                  />
                ))}
              </div>

              {/* Status */}
              <p className="text-[10px] text-white/50 font-mono tracking-[0.3em] uppercase mb-4">
                {phase === "listening" ? "Listening..." : phase === "processing" ? "Processing..." : ""}
              </p>

              {/* Transcript / Response */}
              <div className="text-center max-h-[30vh] overflow-y-auto w-full px-8">
                {phase === "responding" ? (
                  <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="text-white text-base font-body leading-relaxed">
                    {response}
                  </motion.p>
                ) : (
                  <p className="text-white text-base font-body">
                    {transcript} <span className="text-white/40">{interim}</span>
                  </p>
                )}
              </div>

              {/* Done button (only while listening) */}
              {phase === "listening" && (
                <div className="mt-auto pt-8">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleDone}
                    className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm"
                  >
                    <div className="w-6 h-6 rounded-sm bg-white" />
                  </motion.button>
                </div>
              )}

              {phase === "processing" && (
                <div className="mt-auto pt-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
                  />
                </div>
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AriaOverlay;
