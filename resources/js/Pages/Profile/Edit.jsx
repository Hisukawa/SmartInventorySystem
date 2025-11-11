import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast, Toaster } from "sonner";
import { router } from "@inertiajs/react";
import axios from "axios";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

import { TrashIcon } from "@heroicons/react/24/outline";

export default function Edit({ user, mustVerifyEmail, status }) {
    const [preview, setPreview] = useState(
        user?.photo ? `/storage/${user.photo}` : "/default-avatar.png"
    );
    const [open, setOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const fileInputRef = useRef(null);

    const form = useForm({
        photo: null,
    });

    const [faceActive, setFaceActive] = useState(
        user?.face_recognition_enabled || false
    );

    // Cooldown timer state
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        let timer;
        if (cooldown > 0) {
            timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [cooldown]);

    // Photo handlers
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        form.setData("photo", file);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const submitPhoto = (e) => {
        e.preventDefault();
        form.patch(route("profile.update"), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                form.reset("photo");
                setOpen(false);
                toast.success("Profile photo updated!");
            },
            onError: () => toast.error("Failed to update photo."),
        });
    };

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    // Toggle face recognition with 30 sec cooldown
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
            setCooldown(20); // start 30 seconds cooldown
        } catch (err) {
            toast.error(err.response?.data?.message || "Action failed.");
        }
    };

    const handleDeleteFace = async () => {
        try {
            const { data } = await axios.post(route("face.delete"));
            toast.success(data.message || "Face recognition data deleted!");
            setDeleteDialogOpen(false);
            setFaceActive(false);
        } catch (err) {
            toast.error(
                err.response?.data?.message ||
                    "Failed to delete face recognition data."
            );
            setDeleteDialogOpen(false);
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {user?.role
                        ? `${capitalize(user.role)} Profile`
                        : "Profile"}
                </h2>
            }
        >
            <Toaster position="top-right" />
            <Head title="Profile" />

            <div className="py-12 space-y-6">
                {/* Profile Card */}
                <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col items-center space-y-4">
                    <img
                        src={preview}
                        alt={user?.name}
                        className="w-32 h-32 rounded-full object-cover border"
                    />
                    <h1 className="text-xl font-bold">{user?.name}</h1>
                    <p className="text-sm text-gray-500">{user?.email}</p>

                    {/* Face Recognition Actions */}
                    <div className="w-full mt-4">
                        <div className="flex flex-col sm:flex-row sm:justify-center sm:items-start gap-3">
                            {/* Register / Activate */}
                            <button
                                onClick={() =>
                                    router.visit(route("face.register.page"))
                                }
                                title="Register / Activate Face Recognition"
                                aria-label="Register face recognition"
                                className="flex items-center gap-3 w-full sm:w-auto justify-center px-4 py-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                            >
                                <img
                                    src="/icons/register-face.png"
                                    alt="Register Face"
                                    className="w-10 h-10 sm:w-8 sm:h-8"
                                />
                                <span className="block sm:hidden text-sm text-blue-700 font-medium">
                                    Register Face
                                </span>
                                <span className="hidden sm:block text-xs text-blue-800 mt-0.5">
                                    Register
                                </span>
                            </button>

                            {/* Toggle active/inactive */}
                            <button
                                onClick={toggleFaceRecognition}
                                title={
                                    faceActive
                                        ? "Face recognition is active — click to disable"
                                        : "Face recognition is inactive — click to enable"
                                }
                                aria-pressed={faceActive}
                                aria-label={
                                    faceActive
                                        ? "Disable face recognition"
                                        : "Enable face recognition"
                                }
                                disabled={cooldown > 0}
                                className={`flex items-center gap-3 w-full sm:w-auto justify-center px-4 py-3 rounded-lg transition-colors ${
                                    faceActive
                                        ? "bg-green-50 hover:bg-green-100"
                                        : "bg-red-50 hover:bg-red-100"
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
                                    className="w-10 h-10 sm:w-8 sm:h-8"
                                />
                                <span className="block sm:hidden text-sm font-medium">
                                    {faceActive ? "Active" : "Inactive"}
                                </span>
                                <span className="hidden sm:block text-xs mt-0.5">
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
                        </div>
                    </div>
                </div>

                {/* Update Profile Info */}
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 max-w-xl mx-auto">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </div>

                {/* Update Password */}
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 max-w-xl mx-auto">
                    <UpdatePasswordForm />
                </div>

                {/* Profile Photo Modal */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>Update Profile Photo</DialogTitle>
                            <DialogDescription>
                                Choose a new profile photo for {user?.name}.
                            </DialogDescription>
                        </DialogHeader>

                        <form
                            onSubmit={submitPhoto}
                            className="flex flex-col items-center gap-4 mt-2"
                            encType="multipart/form-data"
                        >
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-32 h-32 rounded-full object-cover border"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => fileInputRef.current.click()}
                            >
                                Choose Photo
                            </Button>
                            {form.data.photo && (
                                <span className="text-sm text-gray-600">
                                    {form.data.photo.name}
                                </span>
                            )}
                            <DialogFooter className="mt-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={form.processing}
                                >
                                    {form.processing ? "Saving..." : "Save"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </AuthenticatedLayout>
    );
}
