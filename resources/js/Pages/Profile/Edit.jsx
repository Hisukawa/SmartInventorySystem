import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function Edit({ user, mustVerifyEmail, status }) {
    const [preview, setPreview] = useState(
        user?.photo ? `/storage/${user.photo}` : "/default-avatar.png"
    );
    const [open, setOpen] = useState(false);
    const fileInputRef = useRef(null);

    const form = useForm({
        photo: null,
    });

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
            forceFormData: true, // important for file uploads
            onSuccess: () => {
                form.reset("photo");
                setOpen(false);
            },
            onError: (errors) => console.log(errors),
        });
    };

    // Helper function to capitalize the role
    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {user?.role
                        ? `${capitalize(user.role)} Profile`
                        : "Admin Profile"}
                </h2>
            }
        >
            <Head title="Admin Profile" />

            <div className="py-12 space-y-6">
                {/* Profile Card */}
                <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col items-center space-y-4">
                    <img
                        src={preview}
                        alt={user?.name}
                        className="w-32 h-32 rounded-full object-cover border"
                    />
                    <h1 className="text-xl font-bold">{user?.name}</h1>
                    {/* <p className="text-gray-600">{user?.role || "Admin"}</p> */}
                    <p className="text-sm text-gray-500">{user?.email}</p>

                    <div className="flex gap-3 mt-4">
                        <Button
                            onClick={() =>
                                router.visit(route("face.register.page"))
                            }
                            variant="secondary"
                        >
                            Activate Face Recognition
                        </Button>
                        {/* <Button
                            onClick={() => setOpen(true)}
                            variant="secondary"
                        >
                            Change Profile Photo
                        </Button> */}
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

                {/* Delete Account */}
                {/* <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 max-w-xl mx-auto">
                    <DeleteUserForm />
                </div> */}

                {/* Modal for updating photo */}
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
