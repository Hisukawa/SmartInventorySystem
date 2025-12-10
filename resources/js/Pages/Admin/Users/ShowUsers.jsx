import { Head, useForm } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import React, { useRef, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

// ✅ Import left arrow icon
import { ArrowLeft } from "lucide-react";

export default function ShowUser({ user }) {
    const [preview, setPreview] = useState(
        user.photo ? `/storage/${user.photo}` : "/logo.png"
    );
    const [open, setOpen] = useState(false);
    const fileInputRef = useRef(null);

    const form = useForm({
        photo: null,
    });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            form.setData("photo", file);

            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const submitPhoto = (e) => {
        e.preventDefault();
        form.post(route("admin.users.updatePhoto", user.id), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                form.reset("photo");
                setOpen(false);
            },
        });
    };

    return (
        <SidebarProvider>
            <Head title={`${user.name} - Profile`} />
            <AppSidebar />

            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/admin/users">
                                    User Lists
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href="#"
                                    className="font-semibold text-foreground"
                                >
                                    User Profile
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="mt-10">
                    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg relative">
                        {/* ✅ Back button */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute top-4 left-4"
                            asChild
                        >
                            <a href={route("admin.users.index")}>
                                <ArrowLeft className="w-5 h-5" />
                            </a>
                        </Button>

                        <div className="flex flex-col items-center space-y-4">
                            <img
                                src={preview}
                                alt={user.name}
                                className="w-32 h-32 rounded-full object-cover border"
                            />
                            <h1 className="text-xl font-bold">{user.name}</h1>
                            <p className="text-gray-600">
                                {user.role || "N/A"}
                            </p>

                            {/* Action Buttons */}
                            <div className="flex gap-3 mt-4">
                                <Button
                                    onClick={() => setOpen(true)}
                                    variant="secondary"
                                >
                                    Change Photo
                                </Button>

                                <Button asChild>
                                    <a
                                        href={route(
                                            "admin.users.edit",
                                            user.id
                                        )}
                                    >
                                        Edit Profile
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </SidebarInset>

            {/* Modal for editing photo */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Update Profile Photo</DialogTitle>
                        <DialogDescription>
                            Choose a new profile photo for {user.name}.
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
                            onChange={handlePhotoChange}
                            ref={fileInputRef}
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
                            <Button type="submit" disabled={form.processing}>
                                {form.processing ? "Saving..." : "Save"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </SidebarProvider>
    );
}
