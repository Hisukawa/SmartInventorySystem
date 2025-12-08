import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { router } from "@inertiajs/react";

export default function ReportFormModal({
    open,
    onOpenChange,
    room,
    item,
    section,
    onSuccess,
}) {
    const [form, setForm] = useState({
        condition: "",
        remarks: "",
        photo: null,
    });

    // Disable background scroll
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => (document.body.style.overflow = "");
    }, [open]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const typeMap = {
            "system-units": "system_unit",
            peripherals: "peripheral",
            equipments: "equipment",
        };

        const data = new FormData();
        data.append("reportable_type", typeMap[section] || section);
        data.append("reportable_id", item.id);
        data.append("room_id", room.id);
        data.append("condition", form.condition);
        data.append("remarks", form.remarks);

        if (form.photo) {
            // Optional: compress image for faster upload
            const compressedPhoto = await compressImage(form.photo, 2048, 0.8); // max ~2MB

            data.append("photo", compressedPhoto);
        }

        // ✅ Show toast immediately and close modal
        onOpenChange(false);
        if (onSuccess) onSuccess();

        // ✅ Upload in background
        axios
            .post(route("reports.store"), data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(() => {
                console.log("Report uploaded successfully");
            })
            .catch((error) => {
                console.error(error.response?.data || error);
                toast.error("Report upload failed. Please try again.");
            });
    };

    // Helper function to compress images
    // Helper function to compress images
    const compressImage = (file, maxSize = 2048, quality = 0.8) => {
        return new Promise((resolve) => {
            const img = new Image();
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = (e) => {
                img.src = e.target.result;
            };

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                let width = img.width;
                let height = img.height;

                // Resize proportionally
                if (width > height) {
                    if (width > maxSize) {
                        height *= maxSize / width;
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width *= maxSize / height;
                        height = maxSize;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(
                    (blob) =>
                        resolve(
                            new File([blob], file.name, { type: file.type })
                        ),
                    file.type,
                    quality
                );
            };
        });
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                    />

                    {/* Centered Modal Wrapper */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Modal Content */}
                        <motion.div
                            className="w-full max-w-md bg-white rounded-2xl p-6 shadow-xl relative"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-lg font-semibold">
                                    Report Item
                                </h2>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onOpenChange(false)}
                                >
                                    ✕
                                </Button>
                            </div>

                            <p className="text-sm text-gray-500 mb-4">
                                Fill out the details below to report an issue
                                with this item.
                            </p>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Condition */}
                                <div>
                                    <label className="text-sm font-medium">
                                        Condition
                                    </label>
                                    <Input
                                        placeholder="Enter or select condition..."
                                        className="mt-1"
                                        value={form.condition}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                condition: e.target.value,
                                            })
                                        }
                                    />
                                    <div className="flex gap-2 mt-2 flex-wrap">
                                        {[
                                            "Working",
                                            "Needs Maintenance",
                                            "Defective",
                                        ].map((option) => (
                                            <Button
                                                key={option}
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() =>
                                                    setForm({
                                                        ...form,
                                                        condition: option,
                                                    })
                                                }
                                                className={`${
                                                    form.condition === option
                                                        ? "bg-[hsl(142,34%,51%)] text-white"
                                                        : ""
                                                }`}
                                            >
                                                {option}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Remarks */}
                                <div>
                                    <label className="text-sm font-medium">
                                        Remarks
                                    </label>
                                    <Textarea
                                        placeholder="Enter remarks..."
                                        className="mt-1"
                                        value={form.remarks}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                remarks: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                {/* Photo upload */}
                                <div>
                                    <label className="text-sm font-medium">
                                        Upload Photo
                                    </label>
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        capture="environment"
                                        className="mt-1"
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                photo: e.target.files[0],
                                            })
                                        }
                                    />
                                </div>

                                {/* Submit */}
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        className="bg-[hsl(142,34%,51%)] text-white hover:bg-[hsl(142,34%,45%)]"
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
