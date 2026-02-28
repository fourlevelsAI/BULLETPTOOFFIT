import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { BrowserMultiFormatReader } from "@zxing/library";

interface Props {
  onResult: (barcode: string) => void;
  onClose: () => void;
}

const BarcodeOverlay = ({ onResult, onClose }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);

  useEffect(() => {
    const reader = new BrowserMultiFormatReader();
    readerRef.current = reader;

    reader
      .decodeFromVideoDevice(null, videoRef.current!, (result, err) => {
        if (result) {
          reader.reset();
          onResult(result.getText());
        }
      })
      .catch(() => {
        setError("Camera access required — please allow in browser settings");
      });

    return () => {
      reader.reset();
    };
  }, [onResult]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center">
      {error ? (
        <div className="text-center p-6">
          <p className="text-white text-sm font-body mb-4">{error}</p>
          <button onClick={onClose} className="text-white border border-white/30 px-6 py-2 rounded-lg text-sm font-body">
            Close
          </button>
        </div>
      ) : (
        <>
          <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-sm"
            style={{ marginTop: "env(safe-area-inset-top)" }}
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Scan target box */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 relative">
              {/* Corner brackets */}
              {[
                "top-0 left-0 border-t-2 border-l-2",
                "top-0 right-0 border-t-2 border-r-2",
                "bottom-0 left-0 border-b-2 border-l-2",
                "bottom-0 right-0 border-b-2 border-r-2",
              ].map((cls, i) => (
                <div key={i} className={`absolute w-8 h-8 border-white ${cls}`} />
              ))}

              {/* Scanning line */}
              <motion.div
                className="absolute left-2 right-2 h-0.5 bg-white/80"
                animate={{ top: ["10%", "90%", "10%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>

          <p className="absolute bottom-16 text-white/70 text-sm font-body" style={{ marginBottom: "env(safe-area-inset-bottom)" }}>
            Point at barcode
          </p>
        </>
      )}
    </div>
  );
};

export default BarcodeOverlay;
