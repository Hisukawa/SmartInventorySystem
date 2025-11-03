import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { router } from "@inertiajs/react";

// Helper to capitalize role names
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default function FaceRegister({ user }) {
    const videoRef = useRef();
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
            <div className="flex flex-col items-center justify-center  bg-gray-50 p-4">
                <Card className="max-w-lg w-full shadow-lg rounded-xl overflow-hidden">
                    <CardHeader className="bg-gray-100 text-center">
                        <CardTitle className="text-2xl font-bold">
                            Register Your Face
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-6 p-6">
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            className="w-full max-w-md h-64 rounded-lg border border-gray-300 shadow-sm object-cover"
                        />
                        <Button
                            type="button"
                            onClick={captureFace}
                            disabled={isCapturing}
                            className="w-full sm:w-auto"
                        >
                            {isCapturing
                                ? "Processing..."
                                : "Capture & Save Face"}
                        </Button>
                        <p className="text-gray-600 text-sm text-center">
                            {status}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
