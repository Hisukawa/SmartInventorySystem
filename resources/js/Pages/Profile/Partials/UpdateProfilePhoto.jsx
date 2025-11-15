import { useState, useRef } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function UpdateProfilePhoto({ user }) {
    const [preview, setPreview] = useState(
        user?.photo ? `/storage/${user.photo}` : "/default-avatar.png"
    );

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
        if (!form.data.photo) return;

        form.post(route("profile.photo.update"), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: (page) => {
                toast.success("Profile photo updated successfully!");
                form.reset("photo");
                setPreview(
                    page.props.user.photo
                        ? `/storage/${page.props.user.photo}`
                        : "/default-avatar.png"
                );
            },
            onError: () => toast.error("Failed to update photo."),
        });
    };

    return (
        <section>
            <h2 className="text-lg font-medium text-gray-900">Profile Photo</h2>
            <p className="mt-1 text-sm text-gray-600">
                Update your profile photo.
            </p>

            <form
                onSubmit={submitPhoto}
                className="mt-4 flex flex-col items-center gap-4"
                encType="multipart/form-data"
            >
                <img
                    src={preview}
                    alt="Preview"
                    className="w-32 h-32 rounded-full object-cover border-2 border-green-600"
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

                <Button
                    type="submit"
                    disabled={form.processing || !form.data.photo}
                >
                    {form.processing ? "Saving..." : "Save"}
                </Button>
            </form>
        </section>
    );
}
