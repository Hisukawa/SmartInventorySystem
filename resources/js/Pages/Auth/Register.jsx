import React, { useState, useRef } from "react";
import axios from "axios";
import { Head, useForm } from "@inertiajs/react";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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

// 🔹 Helper function
function base64urlToUint8Array(base64url) {
    const base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, "=");
    const rawData = atob(padded);
    return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "guest", // default role
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("register"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };

    // 🔹 WebAuthn Registration
    const registerWithDevice = async () => {
        try {
            // Step 1: get challenge/options from backend
            const { data: options } = await axios.post("/webauthn/register/options");

            // Convert challenge + user.id
            options.challenge = base64urlToUint8Array(options.challenge);
            options.user.id = base64urlToUint8Array(options.user.id);

            // Step 2: request credential from authenticator
            const credential = await navigator.credentials.create({
                publicKey: options,
            });

            // Step 3: send credential back to backend
            await axios.post("/webauthn/register", {
                credential: JSON.stringify(credential),
            });

            alert("Device registered successfully!");
        } catch (err) {
            console.error(err);
            alert("WebAuthn registration failed.");
        }
    };
    return (
        <>
            <SidebarProvider>
                <Head>
                    <title>Dashboard</title>
                </Head>
                <AppSidebar />
                <SidebarInset>
                    {/* Header */}
                    <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                        <SidebarTrigger />
                        <Separator
                            orientation="vertical"
                            className="h-6 mx-3"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href="/admin/users"
                                        aria-current="page"
                                    >
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
                    <Head title="Register" />
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

                                    <form
                                        onSubmit={submit}
                                        className="space-y-4"
                                    >
                                        {/* Name */}
                                        <div className="space-y-1">
                                            <Label htmlFor="name">
                                                Full Name
                                            </Label>
                                            <Input
                                                id="name"
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                autoComplete="name"
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            {errors.name && (
                                                <p className="text-sm text-red-500">
                                                    {errors.name}
                                                </p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-1">
                                            <Label htmlFor="email">
                                                Email Address
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={data.email}
                                                autoComplete="username"
                                                onChange={(e) =>
                                                    setData(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            {errors.email && (
                                                <p className="text-sm text-red-500">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Password */}
                                        <div className="space-y-1">
                                            <Label htmlFor="password">
                                                Password
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setData(
                                                        "password",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            {errors.password && (
                                                <p className="text-sm text-red-500">
                                                    {errors.password}
                                                </p>
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
                                                name="password_confirmation"
                                                value={
                                                    data.password_confirmation
                                                }
                                                autoComplete="new-password"
                                                onChange={(e) =>
                                                    setData(
                                                        "password_confirmation",
                                                        e.target.value
                                                    )
                                                }
                                                required
                                            />
                                            {errors.password_confirmation && (
                                                <p className="text-sm text-red-500">
                                                    {
                                                        errors.password_confirmation
                                                    }
                                                </p>
                                            )}
                                        </div>

                                        {/* Role */}
                                        <div className="space-y-1">
                                            <Label htmlFor="role">
                                                Select Role
                                            </Label>
                                            <select
                                                id="role"
                                                name="role"
                                                value={data.role}
                                                onChange={(e) =>
                                                    setData(
                                                        "role",
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                                                required
                                            >
                                                <option value="admin">
                                                    Admin
                                                </option>
                                                <option value="faculty">
                                                    Faculty
                                                </option>
                                                <option value="technician">
                                                    Technician
                                                </option>
                                                <option value="guest">
                                                    Guest
                                                </option>
                                            </select>
                                            {errors.role && (
                                                <p className="text-sm text-red-500">
                                                    {errors.role}
                                                </p>
                                            )}
                                        </div>

                                        {/* Submit */}
                                        <Button
                                            type="submit"
                                            className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white"
                                            disabled={processing}
                                        >
                                            Register
                                        </Button>


                                              <Button
                                        type="button"
                                        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
                                        onClick={registerWithDevice}
                                    >
                                        Register with Device
                                    </Button>
                                        {/* Link to Login */}
                                        {/* <div className="text-center text-sm mt-6">
                                Already have an account?{" "}
                                <Link
                                    href={route("login")}
                                    className="font-medium text-green-600 hover:underline"
                                >
                                    Login
                                </Link>
                            </div> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}