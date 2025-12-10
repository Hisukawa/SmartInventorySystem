import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { router } from "@inertiajs/react";
import toast, { Toaster } from "react-hot-toast";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export default function FaceRegister({ user }) {
    const videoRef = useRef();
    const overlayRef = useRef();
    const [status, setStatus] = useState("Loading models...");
    const [isCapturing, setIsCapturing] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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
                toast.success("Face registered successfully!", {
                    duration: 2000,
                    position: "top-right",
                    style: {
                        background: "hsl(142,34%,51%)",
                        color: "#fff",
                        fontWeight: "bold",
                    },
                });
                setTimeout(() => router.visit("/profile"), 1800);
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
        <div className="min-h-screen bg-gray-50 relative">
            <Toaster
                position="top-right"
                toastOptions={{
                    style: {
                        marginTop: "4rem", // adjust this according to your header height
                    },
                }}
            />

            {/* Navbar */}
            <header className="bg-green-600 text-white flex justify-between items-center px-4 sm:px-8 py-3 shadow-md fixed top-0 left-0 w-full z-50">
                <div className="flex items-center gap-2">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-10 h-10 rounded-full"
                    />
                    <span className="font-bold text-lg">Smart Inventory</span>
                </div>

                <div className="hidden sm:flex items-center gap-4">
                    {user?.role === "admin" && (
                        <a
                            href="/admin/dashboard"
                            className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-all font-medium"
                        >
                            Dashboard
                        </a>
                    )}
                    <button
                        onClick={() => router.post(route("logout"))}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white transition-all font-medium"
                    >
                        Logout
                    </button>
                </div>

                <div className="sm:hidden">
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="p-2 rounded-md bg-green-700"
                    >
                        {menuOpen ? (
                            <XMarkIcon className="w-6 h-6" />
                        ) : (
                            <Bars3Icon className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </header>

            {menuOpen && (
                <div className="sm:hidden bg-white shadow-lg absolute top-16 right-4 rounded-lg w-48 z-50">
                    <button
                        onClick={() => router.post(route("logout"))}
                        className="w-full text-left px-4 py-2 hover:bg-green-100 text-green-700 font-medium"
                    >
                        Logout
                    </button>
                    {user?.role === "admin" && (
                        <a
                            href="/admin/dashboard"
                            className="block px-4 py-2 hover:bg-green-100 text-green-700 font-medium"
                        >
                            Dashboard
                        </a>
                    )}
                </div>
            )}

            {/* Main Content */}
            <div className="pt-20 flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-white via-green-50 to-white p-4">
                <Card className="max-w-md w-full shadow-2xl rounded-3xl bg-white/90 border-2 border-green-600 overflow-hidden">
                    <CardHeader className="bg-green-600 text-white text-center py-4">
                        <CardTitle className="text-2xl font-bold">
                            Register Your Face
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-6 p-6 relative">
                        {/* Camera wrapper */}
                        <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-green-500 shadow-lg ring-2 ring-green-400 animate-pulse">
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                            <div
                                ref={overlayRef}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            >
                                <div className="w-44 h-44 border-2 border-dashed border-green-400 rounded-full" />
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-4">
                            <Button
                                type="button"
                                onClick={captureFace}
                                disabled={isCapturing}
                                className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white shadow-md"
                            >
                                {isCapturing
                                    ? "Processing..."
                                    : "Capture & Save Face"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.visit("/profile")}
                                className="flex-1 sm:flex-none border-green-600 text-green-600 hover:bg-green-50"
                            >
                                Back
                            </Button>
                        </div>

                        {/* Status */}
                        <p className="text-green-800 text-sm text-center mt-2 font-medium">
                            {status}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
