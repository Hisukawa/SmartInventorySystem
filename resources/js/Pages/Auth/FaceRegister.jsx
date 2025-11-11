import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { router } from "@inertiajs/react";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default function FaceRegister({ user }) {
    const videoRef = useRef();
    const overlayRef = useRef();
    const [status, setStatus] = useState("Loading models...");
    const [isCapturing, setIsCapturing] = useState(false);

    useEffect(() => {
        loadModels();
    }, []);

    async function loadModels() {
        try {
            await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
            await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
            await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models");
            setStatus("Models loaded! Starting camera...");
            startVideo();
        } catch (err) {
            console.error("Model loading error:", err);
            setStatus("⚠️ Error loading models. Check console.");
        }
    }

    async function startVideo() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoRef.current.srcObject = stream;
            setStatus("Camera ready! Look directly at the camera.");
        } catch (err) {
            console.error("Camera access error:", err);
            setStatus("Please allow camera access to continue.");
        }
    }

    async function captureFace() {
        setIsCapturing(true);
        setStatus("Detecting face...");

        try {
            const detection = await faceapi
                .detectSingleFace(
                    videoRef.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks(true)
                .withFaceDescriptor();

            if (!detection) {
                setStatus("❌ No face detected. Please try again.");
                setIsCapturing(false);
                return;
            }

            const faceDescriptor = Array.from(detection.descriptor);
            setStatus("✅ Face detected! Saving...");

            const response = await fetch("/register-face", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                },
                body: JSON.stringify({ descriptor: faceDescriptor }),
                credentials: "include",
            });

            const data = await response.json();

            if (data.success) {
                setStatus("🎉 Face registered successfully!");
                const roleRoutes = {
                    admin: "/admin/dashboard",
                    faculty: "/faculty/dashboard",
                    technician: "/technician/dashboard",
                };
                const redirectUrl = roleRoutes[data.role] || "/dashboard";
                setTimeout(() => router.visit(redirectUrl), 1500);
            } else {
                setStatus("❌ Failed to save face data. Try again.");
            }
        } catch (err) {
            console.error("Detection error:", err);
            setStatus("⚠️ Error detecting face. Check console.");
        }

        setIsCapturing(false);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-semibold leading-tight text-gray-800 text-center">
                    {user?.role
                        ? `${capitalize(user.role)} Profile`
                        : "Admin Profile"}
                </h2>
            }
        >
            <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 p-4">
                <Card className="max-w-md w-full shadow-2xl rounded-3xl backdrop-blur-md bg-white/60 overflow-hidden">
                    <CardHeader className="bg-gray-100 text-center py-4">
                        <CardTitle className="text-2xl font-bold">
                            Register Your Face
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-6 p-6 relative">
                        {/* Camera wrapper with circular modern design */}
                        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-gray-300 shadow-lg ring-2 ring-indigo-500 ring-offset-2 ring-offset-white animate-pulse">
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                            {/* Optional overlay guide circle */}
                            <div
                                ref={overlayRef}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                <div className="w-44 h-44 border-2 border-dashed border-indigo-400 rounded-full" />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
                            <Button
                                type="button"
                                onClick={captureFace}
                                disabled={isCapturing}
                                className="flex-1 sm:flex-none shadow-md"
                            >
                                {isCapturing
                                    ? "Processing..."
                                    : "Capture & Save Face"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.visit("/profile")}
                                className="flex-1 sm:flex-none"
                            >
                                Back
                            </Button>
                        </div>

                        <p className="text-gray-700 text-sm text-center mt-2 font-medium">
                            {status}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
