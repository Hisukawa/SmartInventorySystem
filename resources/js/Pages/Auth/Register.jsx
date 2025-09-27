import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import FaceCapture from "@/Components/Face-Capture-Component/FaceCapture";

// ✅ Human.js import (replace face-api.js)
import Human from "@vladmandic/human";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "guest",
    photo: null,
    face_descriptor: null,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [faceStep, setFaceStep] = useState(1); // 1=prep, 2=scanning, 3=verified, 4=failed
  const [loading, setLoading] = useState(false);

  // 🔹 Setup Human.js
  const [human, setHuman] = useState(null);

  useEffect(() => {
    const loadHuman = async () => {
      const h = new Human({
        modelBasePath: "https://vladmandic.github.io/human/models",
        face: { enabled: true, mesh: true, detector: { rotation: true } },
      });
      await h.load();
      console.log("✅ Human.js models loaded");
      setHuman(h);
    };
    loadHuman();
  }, []);

  const handleFaceCapture = async (videoEl) => {
    if (!human) return;

    setLoading(true);

    // 🔍 Run detection on captured video frame
    const result = await human.detect(videoEl);

    if (result.face && result.face.length > 0) {
      const descriptor = result.face[0].embedding; // ✅ 512-d vector
      const plainArray = Array.from(descriptor).map((v) =>
        parseFloat(v.toFixed(6))
      );

      setData("face_descriptor", plainArray);
      setFaceStep(3); // success
    } else {
      setFaceStep(4); // failed
    }

    setLoading(false);
  };

  const submit = (e) => {
    if (e) e.preventDefault();

    if (!data.face_descriptor) {
      alert("Please complete face registration before proceeding!");
      return;
    }

    post(route("admin.users.store"), {
      forceFormData: true,
      onSuccess: () => {
        setSuccessMessage(
          "User successfully registered with face recognition!"
        );
        reset(
          "name",
          "email",
          "password",
          "password_confirmation",
          "photo",
          "role"
        );
        setData("face_descriptor", null);
        setFaceStep(1);
      },
      onError: (err) => console.log("Registration error:", err),
      onFinish: () => console.log("Submitting:", data),
    });
  };

  return (
    <SidebarProvider>
      <Head>
        <title>Dashboard</title>
      </Head>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6 mx-3" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/users" aria-current="page">
                  User Lists
                </BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbLink
                  href={`/admin/register`}
                  aria-current="page"
                  className="font-semibold text-foreground"
                >
                  Register User
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main>
          <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
              {/* LEFT PANEL */}
              <div className="hidden md:flex flex-col items-center justify-center bg-green-500 text-white p-8">
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
                      src="ict.png"
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
                    Create Account
                  </CardTitle>
                  <CardDescription>
                    Fill in your details to sign up
                  </CardDescription>
                </CardHeader>

                {successMessage && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
                    {successMessage}
                  </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                      required
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                      required
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={data.password}
                      onChange={(e) => setData("password", e.target.value)}
                      required
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">{errors.password}</p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1">
                    <Label htmlFor="password_confirmation">
                      Confirm Password
                    </Label>
                    <Input
                      id="password_confirmation"
                      type="password"
                      value={data.password_confirmation}
                      onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                      }
                      required
                    />
                    {errors.password_confirmation && (
                      <p className="text-sm text-red-500">
                        {errors.password_confirmation}
                      </p>
                    )}
                  </div>

                  {/* Role */}
                  <div className="space-y-1">
                    <Label htmlFor="role">Select Role</Label>
                    <select
                      id="role"
                      value={data.role}
                      onChange={(e) => setData("role", e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      required
                    >
                      <option value="admin">Admin</option>
                      <option value="faculty">Faculty</option>
                      <option value="technician">Technician</option>
                      <option value="guest">Guest</option>
                    </select>
                    {errors.role && (
                      <p className="text-sm text-red-500">{errors.role}</p>
                    )}
                  </div>

                  {/* Photo */}
                  <div className="space-y-1">
                    <Label htmlFor="photo">Profile Photo</Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setData("photo", e.target.files[0])}
                    />
                    {errors.photo && (
                      <p className="text-sm text-red-500">{errors.photo}</p>
                    )}
                  </div>

                  {/* Face Capture Flow */}
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Face Verification</h3>

                    {faceStep === 1 && (
                      <div className="text-center">
                        <p className="text-gray-500">
                          Make sure your face is uncovered & in good lighting.
                        </p>
                        <Button
                          type="button"
                          className="mt-3 bg-green-500 text-white"
                          onClick={() => {
                            setFaceStep(2);
                            setLoading(true);
                          }}
                        >
                          Start Face Scan
                        </Button>
                      </div>
                    )}

                    {faceStep === 2 && (
                      <div className="flex flex-col items-center justify-center">
                        <p className="text-gray-500 mb-4">
                          Align your face within the frame
                        </p>
                        {/* ✅ Pass video element into handler */}
                        <FaceCapture
                          autoCapture
                          onCapture={(videoEl) => handleFaceCapture(videoEl)}
                        />
                      </div>
                    )}

                    {faceStep === 3 && (
                      <div className="text-green-600 font-semibold text-center">
                        ✅ Face captured successfully!
                      </div>
                    )}

                    {faceStep === 4 && (
                      <div className="text-red-600 font-semibold text-center">
                        ❌ Face not recognized. Please try again.
                        <Button
                          type="button"
                          className="mt-2 bg-yellow-500 text-white"
                          onClick={() => setFaceStep(1)}
                        >
                          Retry
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className={`w-full mt-2 text-white ${
                      faceStep === 3
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={faceStep !== 3 || processing}
                  >
                    Register
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
