import { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdateProfilePhoto from "./Partials/UpdateProfilePhoto";
import { toast, Toaster } from "sonner";
import axios from "axios";

import { Bars3Icon, XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Edit({ user, mustVerifyEmail, status }) {
    const { props: pageProps } = usePage();
    const [menuOpen, setMenuOpen] = useState(false);
    const [faceActive, setFaceActive] = useState(
        user?.face_recognition_enabled || false
    );
    const [cooldown, setCooldown] = useState(0);

    // Cooldown timer
    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [cooldown]);

    // Flash messages for Sonner
    useEffect(() => {
        if (pageProps.flash?.success) {
            toast.success(pageProps.flash.success);
        }
    }, [pageProps.flash]);

    const toggleFaceRecognition = async () => {
        if (cooldown > 0) {
            toast.error(
                `Please wait ${cooldown} seconds before toggling again.`
            );
            return;
        }
        const url = faceActive
            ? route("face.deactivate")
            : route("face.reactivate");
        try {
            const { data } = await axios.post(url);
            toast.success(
                data.message ||
                    (faceActive
                        ? "Face recognition disabled!"
                        : "Face recognition enabled!")
            );
            setFaceActive(!faceActive);
            setCooldown(20);
        } catch (err) {
            toast.error(err.response?.data?.message || "Action failed.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 relative">
            <Toaster position="top-right" />

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
            <div className="pt-20 py-12 flex justify-center px-4">
                <div className="max-w-3xl w-full space-y-6">
                    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
                        {/* Profile Photo */}
                        <div className="flex flex-col items-center gap-4 w-full md:w-auto">
                            <UpdateProfilePhoto user={user} />
                        </div>

                        {/* Profile Info */}
                        <div className="flex-1 w-full space-y-4">
                            <h1 className="text-2xl font-bold text-green-700">
                                {user?.name}
                            </h1>
                            <p className="text-gray-600">{user?.email}</p>

                            {/* Face Recognition Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 mt-2">
                                <button
                                    onClick={() =>
                                        router.visit(
                                            route("face.register.page")
                                        )
                                    }
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                                >
                                    <img
                                        src="/icons/register-face.png"
                                        alt="Register Face"
                                        className="w-6 h-6"
                                    />
                                    <span className="text-sm sm:text-xs">
                                        Register
                                    </span>
                                </button>

                                <button
                                    onClick={toggleFaceRecognition}
                                    disabled={cooldown > 0}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                        faceActive
                                            ? "bg-green-600 text-white hover:bg-green-700"
                                            : "bg-red-600 text-white hover:bg-red-700"
                                    } ${
                                        cooldown > 0
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    <img
                                        src={
                                            faceActive
                                                ? "/icons/active-face.png"
                                                : "/icons/inactive-face.png"
                                        }
                                        alt={
                                            faceActive
                                                ? "Active Face"
                                                : "Inactive Face"
                                        }
                                        className="w-6 h-6"
                                    />
                                    <span className="text-sm sm:text-xs">
                                        {faceActive
                                            ? `Active${
                                                  cooldown > 0
                                                      ? ` (${cooldown}s)`
                                                      : ""
                                              }`
                                            : `Inactive${
                                                  cooldown > 0
                                                      ? ` (${cooldown}s)`
                                                      : ""
                                              }`}
                                    </span>
                                </button>
                                <button
                                    onClick={() => setDeleteDialogOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                    <span className="text-sm sm:text-xs">
                                        Delete Face
                                    </span>
                                </button>
                            </div>

                            {/* Forms */}
                            <div className="space-y-4">
                                <div className="bg-green-50 p-4 rounded-lg shadow">
                                    <UpdateProfileInformationForm
                                        mustVerifyEmail={mustVerifyEmail}
                                        status={status}
                                    />
                                </div>
                                <div className="bg-green-50 p-4 rounded-lg shadow">
                                    <UpdatePasswordForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

{
    /* <button
                                    onClick={() => setDeleteDialogOpen(true)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                                >
                                    <TrashIcon className="w-5 h-5" />
                                    <span className="text-sm sm:text-xs">
                                        Delete Face
                                    </span>
                                </button> */
}
