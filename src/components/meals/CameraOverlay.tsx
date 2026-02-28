import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { X, Camera } from "lucide-react";

interface Props {
  onCapture: (base64: string) => void;
  onClose: () => void;
}

const CameraOverlay = ({ onCapture, onClose }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((s) => {
        if (!mounted) { s.getTracks().forEach((t) => t.stop()); return; }
        setStream(s);
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play();
        }
      })
      .catch(() => {
        if (mounted) setError("Camera access required — please allow in browser settings");
      });
    return () => {
      mounted = false;
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const capture = useCallback(() => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0);
    const base64 = canvas.toDataURL("image/jpeg", 0.8).split(",")[1];
    stream?.getTracks().forEach((t) => t.stop());
    onCapture(base64);
  }, [stream, onCapture]);

  const handleClose = () => {
    stream?.getTracks().forEach((t) => t.stop());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
      {error ? (
        <div className="text-center p-6">
          <p className="text-white text-sm font-body mb-4">{error}</p>
          <button onClick={handleClose} className="text-white border border-white/30 px-6 py-2 rounded-lg text-sm font-body">
            Close
          </button>
        </div>
      ) : (
        <>
          <video ref={videoRef} className="w-full h-full object-cover" playsInline muted autoPlay />
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
            style={{ marginTop: "env(safe-area-inset-top)" }}
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2" style={{ marginBottom: "env(safe-area-inset-bottom)" }}>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={capture}
              className="w-[70px] h-[70px] rounded-full border-4 border-white flex items-center justify-center bg-white/20 backdrop-blur-sm"
            >
              <Camera className="w-7 h-7 text-white" />
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
};

export default CameraOverlay;
