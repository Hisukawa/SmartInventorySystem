// FaceCapture.jsx
import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import Human from "@vladmandic/human";

export default function FaceCapture({ onCapture, autoCapture = false }) {
  const webcamRef = useRef(null);
  const [human, setHuman] = useState(null);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const init = async () => {
      const h = new Human({
        modelBasePath: "https://cdn.jsdelivr.net/npm/@vladmandic/human/models",
        face: { enabled: true, detector: { rotation: true }, mesh: false, iris: false, description: true },
      });
      await h.load();
      await h.warmup();
      setHuman(h);
      console.log("✅ Human.js models loaded");
    };
    init();
  }, []);

  useEffect(() => {
    if (autoCapture && human) startScanning();
  }, [autoCapture, human]);

  const startScanning = () => {
    setScanning(true);

    const interval = setInterval(async () => {
      if (!webcamRef.current || !webcamRef.current.video) return;
      const video = webcamRef.current.video;

      if (video.readyState < 2) return; // video not ready

      try {
        const result = await human.detect(video);

        if (result.face?.length > 0 && result.face[0].embedding) {
          clearInterval(interval);
          setScanning(false);
          onCapture(video); // pass video to parent for embedding
        }
      } catch (err) {
        console.warn("⚠️ Detection error, skipping frame", err);
      }
    }, 1500);
  };

  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-green-500 shadow-lg">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full h-full object-cover"
          videoConstraints={{ facingMode: "user" }}
        />
      </div>
      {scanning && <p className="mt-3 text-blue-600">Scanning face...</p>}
    </div>
  );
}
