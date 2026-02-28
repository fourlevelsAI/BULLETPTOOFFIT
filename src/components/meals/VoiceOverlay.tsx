import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Mic, MicOff } from "lucide-react";

interface Props {
  onTranscript: (text: string) => void;
  onClose: () => void;
}

const VoiceOverlay = ({ onTranscript, onClose }: Props) => {
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech recognition not supported in this browser");
      return;
    }

    let cancelled = false;

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      stream.getTracks().forEach((t) => t.stop()); // just checking permission
      if (cancelled) return;

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = true;
      recognitionRef.current = recognition;

      recognition.onstart = () => setListening(true);

      recognition.onresult = (event: any) => {
        let final = "";
        let inter = "";
        for (let i = 0; i < event.results.length; i++) {
          if (event.results[i].isFinal) final += event.results[i][0].transcript;
          else inter += event.results[i][0].transcript;
        }
        if (final) setTranscript((prev) => prev + " " + final);
        setInterim(inter);
      };

      recognition.onerror = (event: any) => {
        if (event.error === "not-allowed") {
          setError("Microphone access required — please allow in browser settings");
        } else if (event.error === "no-speech") {
          setError("We didn't catch that — try again");
        }
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognition.start();
    }).catch(() => {
      setError("Microphone access required — please allow in browser settings");
    });

    return () => {
      cancelled = true;
      recognitionRef.current?.stop();
    };
  }, []);

  const handleDone = useCallback(() => {
    recognitionRef.current?.stop();
    const text = (transcript + " " + interim).trim();
    if (text) onTranscript(text);
    else onClose();
  }, [transcript, interim, onTranscript, onClose]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center p-6"
      style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center"
        style={{ marginTop: "env(safe-area-inset-top)" }}
      >
        <X className="w-5 h-5 text-muted-foreground" />
      </button>

      {error ? (
        <div className="text-center">
          <MicOff className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground font-body mb-4">{error}</p>
          <button onClick={onClose} className="border border-border px-6 py-2 rounded-lg text-sm font-body text-foreground">
            Close
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs text-muted-foreground font-body mb-6 tracking-widest uppercase">
            {listening ? "Listening..." : "Processing..."}
          </p>

          {/* Waveform animation */}
          <div className="flex items-center gap-2 mb-8 h-16">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 bg-foreground rounded-full"
                animate={listening ? {
                  height: [16, 48, 24, 56, 16],
                } : { height: 8 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          <div className="text-center max-h-[40vh] overflow-y-auto w-full px-4">
            <p className="text-foreground text-base font-body">
              {transcript} <span className="text-muted-foreground">{interim}</span>
            </p>
          </div>

          <div className="mt-auto pt-8">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleDone}
              className="bg-foreground text-background px-8 py-3 rounded-lg text-sm font-semibold font-body"
            >
              Done
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default VoiceOverlay;
