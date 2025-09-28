import React, { useState, useRef, useEffect } from "react";
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

    // const videoRef = useRef(null);
    const canvasRef = useRef(null);
    // const scanIntervalRef = useRef(null);

    // const [scanning, setScanning] = useState(false);
    // const [faceLoginProcessing, setFaceLoginProcessing] = useState(false);

    // // Start webcam on mount
    // useEffect(() => {
    //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //         navigator.mediaDevices
    //             .getUserMedia({ video: { facingMode: "user" } })
    //             .then((stream) => {
    //                 if (videoRef.current) {
    //                     videoRef.current.srcObject = stream;
    //                     videoRef.current.play();
    //                 }
    //             })
    //             .catch((err) => console.warn("Camera not available:", err));
    //     }
    // }, []);

    // // Function to start face login
    // const startFaceLogin = () => {
    //     if (!videoRef.current) return;
    //     setScanning(true);
    //     setFaceLoginProcessing(true);

    //     let attempts = 0;
    //     scanIntervalRef.current = setInterval(async () => {
    //         if (attempts >= 10) {
    //             // stop after 10 attempts
    //             clearInterval(scanIntervalRef.current);
    //             setScanning(false);
    //             setFaceLoginProcessing(false);
    //             return;
    //         }
    //         attempts++;

    //         const video = videoRef.current;
    //         const canvas = canvasRef.current;
    //         canvas.width = video.videoWidth;
    //         canvas.height = video.videoHeight;
    //         const ctx = canvas.getContext("2d");
    //         ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    //         const imageBase64 = canvas.toDataURL("image/jpeg").split(",")[1];

    //         try {
    //             const response = await fetch(route("login.face"), {
    //                 method: "POST",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify({ face_descriptor: imageBase64 }),
    //             });
    //             const result = await response.json();

    //             if (result.success && result.role) {
    //                 // Face matched: redirect based on role
    //                 if (result.role === "admin")
    //                     window.location.href = "/admin/dashboard";
    //                 else if (result.role === "faculty")
    //                     window.location.href = "/faculty/dashboard";
    //                 else if (result.role === "technician")
    //                     window.location.href = "/technician/dashboard";
    //                 else window.location.href = "/dashboard";

    //                 clearInterval(scanIntervalRef.current);
    //                 setScanning(false);
    //                 setFaceLoginProcessing(false);
    //             }
    //         } catch (err) {
    //             console.error("Face login error:", err);
    //         }
    //     }, 1500);
    // };

    // Normal login submit
    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
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
                                Please enter your details or scan your face
                            </CardDescription>
                        </CardHeader>

                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        {/* Normal login */}
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

                        {/* Face login */}
                        {/* <div className="space-y-4">
                            <Label>Login with Face</Label>
                            <div className="relative w-64 h-64 mx-auto">
                                <video
                                    ref={videoRef}
                                    className="w-full h-full rounded-full border-4 border-green-500 object-cover"
                                />
                                <div className="absolute inset-0 border-4 border-dashed border-green-300 rounded-full pointer-events-none"></div>
                                {scanning && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white font-semibold rounded-full">
                                        Scanning...
                                    </div>
                                )}
                            </div>

                            <Button
                                type="button"
                                className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white"
                                onClick={startFaceLogin}
                                disabled={scanning || faceLoginProcessing}
                            >
                                {scanning || faceLoginProcessing
                                    ? "Scanning..."
                                    : "Login with Face"}
                            </Button>
                        </div> */}

                        <div className="text-center text-sm mt-6">
                            Don’t have an account?{" "}
                            <span className="text-gray-600">
                                Please contact the ICT Department Chairperson to
                                request one.
                            </span>
                        </div>

                        <canvas ref={canvasRef} style={{ display: "none" }} />
                    </div>
                </div>
            </div>
        </>
    );
}
