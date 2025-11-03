import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Head, useForm } from "@inertiajs/react";

export default function Login({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const videoRef = useRef(null);
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [faceStatus, setFaceStatus] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    // Load face-api models
    useEffect(() => {
        const loadModels = async () => {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
                await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
                await faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models");
                setModelsLoaded(true);
                setFaceStatus("✅ Face models loaded successfully.");
            } catch (err) {
                console.error(err);
                setFaceStatus("❌ Failed to load face models.");
            }
        };
        loadModels();
    }, []);

    // Start camera
    const startCamera = async () => {
        if (!modelsLoaded) {
            setFaceStatus("⏳ Models are still loading...");
            return;
        }
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoRef.current.srcObject = stream;
            setIsCameraOn(true);
            setFaceStatus(
                "🎥 Camera started. Please look straight at the camera."
            );
        } catch (err) {
            console.error(err);
            setFaceStatus("⚠️ Please allow camera access to continue.");
        }
    };

    // Stop camera
    const stopCamera = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) stream.getTracks().forEach((t) => t.stop());
        setIsCameraOn(false);
    };

    // Capture and verify face
    const handleFaceVerify = async () => {
        if (!isCameraOn) {
            setFaceStatus("⚠️ Please start the camera first.");
            return;
        }

        setIsVerifying(true);
        setFaceStatus("🔍 Detecting face...");

        try {
            const detection = await faceapi
                .detectSingleFace(
                    videoRef.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks(true)
                .withFaceDescriptor();

            if (!detection) {
                setFaceStatus("❌ No face detected. Please try again.");
                setIsVerifying(false);
                return;
            }

            const descriptor = Array.from(detection.descriptor);
            const currentUrl = window.location.href; // redirect to current page

            await verifyFace(descriptor, currentUrl);
        } catch (error) {
            console.error("Face detection error:", error);
            setFaceStatus("❌ Error detecting face.");
        } finally {
            setIsVerifying(false);
        }
    };

    // Verify face via backend and redirect
    const verifyFace = async (descriptor, targetUrl) => {
        try {
            const response = await fetch("/verify-face", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN":
                        document
                            .querySelector('meta[name="csrf-token"]')
                            ?.getAttribute("content") || "",
                },
                body: JSON.stringify({ descriptor }), // no need for redirect_url
            });

            const text = await response.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch {
                console.error("Invalid JSON from server:", text);
                throw new Error("Server returned invalid response (not JSON)");
            }

            if (!response.ok)
                throw new Error(data.message || "Face verification failed");

            if (data.success) {
                setFaceStatus("✅ Face verified successfully!");
                // Use server-provided redirect URL
                window.location.href = data.redirect_url;
            } else {
                setFaceStatus("❌ Face not recognized. Please try again.");
            }
        } catch (error) {
            console.error("Face verification error:", error);
            setFaceStatus(`⚠️ ${error.message}`);
        }
    };

    // Normal login
    const submit = (e) => {
        e.preventDefault();
        post(route("login"), { onFinish: () => reset("password") });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* LEFT PANEL */}
                    <div className="hidden md:flex flex-col items-center justify-center bg-green-500 text-white p-8 relative">
                        <div className="flex space-x-4 mb-6">
                            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                                <img
                                    src="logo.png"
                                    alt="Logo 1"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white bg-white shadow-md">
                                <img
                                    src="/ict.png"
                                    alt="Logo 2"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-center">
                            ICT INVENTORY SYSTEM MANAGEMENT
                        </h2>
                        <p className="mt-3 text-sm opacity-90 text-center">
                            Secure • Fast • Organized
                        </p>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="p-8 flex flex-col justify-center">
                        <CardHeader className="p-0 mb-6">
                            <CardTitle className="text-2xl font-bold">
                                Login Account
                            </CardTitle>
                            <CardDescription>
                                Please enter your details or login with your
                                face
                            </CardDescription>
                        </CardHeader>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        {/* Email/Password Login */}
                        <form onSubmit={submit} className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    autoComplete="username"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    autoComplete="current-password"
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    checked={data.remember}
                                    onCheckedChange={(checked) =>
                                        setData("remember", Boolean(checked))
                                    }
                                />
                                <label
                                    htmlFor="remember"
                                    className="text-sm text-muted-foreground"
                                >
                                    Remember me
                                </label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white"
                                disabled={processing}
                            >
                                Login
                            </Button>
                        </form>

                        <hr className="my-6" />

                        {/* Face Login */}
                        <div className="space-y-4">
                            <Label>Login with Face</Label>

                            {/* Video container */}
                            <div
                                className={`relative mx-auto transition-all duration-300 ${
                                    isCameraOn
                                        ? "w-64 h-64 opacity-100 scale-100"
                                        : "w-0 h-0 opacity-0 scale-0"
                                }`}
                            >
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    muted
                                    className="w-full h-full rounded-full border-4 border-green-500 object-cover"
                                />
                                <div className="absolute inset-0 border-4 border-dashed border-green-300 rounded-full pointer-events-none"></div>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    onClick={startCamera}
                                    disabled={isCameraOn || !modelsLoaded}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                >
                                    {isCameraOn ? "Camera On" : "Start Camera"}
                                </Button>

                                <Button
                                    type="button"
                                    onClick={handleFaceVerify}
                                    disabled={!isCameraOn || isVerifying}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    {isVerifying
                                        ? "Verifying..."
                                        : "Verify Face"}
                                </Button>
                            </div>

                            <p className="text-sm text-gray-600 text-center mt-2">
                                {faceStatus}
                            </p>
                        </div>

                        <div className="text-center text-sm mt-6">
                            Don’t have an account?{" "}
                            <span className="text-gray-600">
                                Please contact the ICT Department Chairperson to
                                request one.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
