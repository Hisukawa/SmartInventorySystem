// FaceCapture.jsx
import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";


export default function FaceCapture({ onCapture }) {
  const webcamRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  const captureFace = async () => {
    const screenshot = webcamRef.current.getScreenshot();
    const img = await faceapi.fetchImage(screenshot);

    const detection = await faceapi
      .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (detection) {
      onCapture(detection.descriptor); // send descriptor to parent
    } else {
      alert("No face detected. Try again.");
    }
  };

  return (
    <div className="mt-4">
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      {modelsLoaded ? (
        <button
          type="button"
          onClick={captureFace}
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
        >
          Capture Face
        </button>
      ) : (
        <p>Loading face models...</p>
      )}
    </div>
  );
}
