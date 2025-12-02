import React, { useEffect, useState } from "react";
import { useForm, usePage, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import Notification from "@/Components/AdminComponents/Notification";
import { toast, Toaster } from "sonner";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// ✅ Condition Colors
const CONDITION_COLORS = {
    Working: "bg-green-200 text-green-800",
    "Not Working": "bg-red-200 text-red-800",
    "Intermittent Issue": "bg-yellow-200 text-yellow-800",
    "Needs Cleaning": "bg-blue-200 text-blue-800",
    "For Replacement": "bg-orange-200 text-orange-800",
    "For Disposal": "bg-gray-200 text-gray-800",
    Condemned: "bg-black text-white",
    "Minor Damage": "bg-yellow-200 text-yellow-800",
    "Needs Repair": "bg-red-200 text-red-800",
    "Intermittent Connectivity": "bg-yellow-200 text-yellow-800",
    "No Signal": "bg-red-200 text-red-800",
    "Needs Configuration": "bg-blue-200 text-blue-800",
    Expired: "bg-red-300 text-red-900",
    "Needs Refill": "bg-blue-200 text-blue-900",
    Rusting: "bg-orange-200 text-orange-900",
};

export default function EditEquipmentModalPage({ equipment, rooms }) {
    const domain = window.location.origin;
    const qrValue = `${domain}/equipment/${equipment.equipment_code}`;

    const { data, setData, put, processing, errors } = useForm({
        equipment_code: equipment.equipment_code || "",
        equipment_name: equipment.equipment_name || "",
        brand: equipment.brand || "",
        type: equipment.type || "",
        condition: equipment.condition || "",
        room_id: equipment.room_id || "",
    });

    const { props } = usePage();
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (props.flash?.success) toast.success(props.flash.success);
        if (props.flash?.error) toast.error(props.flash.error);
    }, [props.flash]);

    const TYPE_OPTIONS = ["Furniture", "Appliances", "Networking", "Safety"];
    const CONDITION_OPTIONS = {
        Furniture: [
            "Working",
            "Minor Damage",
            "Needs Repair",
            "Needs Cleaning",
            "For Replacement",
            "For Disposal",
            "Condemned",
            "To Be Diagnosed",
        ],
        Appliances: [
            "Working",
            "Not Working",
            "Intermittent Issue",
            "For Replacement",
            "For Disposal",
            "Condemned",
            "To Be Diagnosed",
        ],
        Networking: [
            "Working",
            "Intermittent Issue",
            "No Signal",
            "Needs Configuration",
            "Not Working",
            "For Replacement",
            "For Disposal",
            "Condemned",
            "To Be Diagnosed",
        ],
        Safety: [
            "Working",
            "Expired",
            "Needs Refill",
            "Not Working",
            "Rusting",
            "For Replacement",
            "For Disposal",
            "Condemned",
            "To Be Diagnosed",
        ],
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.equipments.update", equipment.equipment_code), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Equipment updated successfully!");
                setOpen(false);
                router.get(
                    route("admin.equipments.show", equipment.equipment_code)
                );
            },
            onError: (errors) => {
                toast.error(Object.values(errors)[0] || "Update failed");
            },
        });
    };

    const getConditionColor = (condition) => {
        return CONDITION_COLORS[condition] || "bg-gray-200 text-gray-800";
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-xl rounded-2xl shadow-xl border border-gray-200 mx-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-800">
                        Edit Equipment –{" "}
                        <span className="text-[color:var(--app-green,#16A34A)]">
                            {rooms.find((r) => r.id === data.room_id)
                                ?.room_number || "N/A"}
                        </span>{" "}
                        – {data.equipment_code}
                    </DialogTitle>
                </DialogHeader>

                <form className="grid gap-4 py-2" onSubmit={handleSubmit}>
                    {/* Equipment Code */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Equipment Code
                        </label>
                        <Input
                            value={data.equipment_code}
                            disabled
                            className="rounded-lg"
                        />
                    </div>

                    {/* Equipment Name */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Equipment Name
                        </label>
                        <Input
                            value={data.equipment_name}
                            onChange={(e) =>
                                setData("equipment_name", e.target.value)
                            }
                            className="rounded-lg"
                        />
                        {errors.equipment_name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.equipment_name}
                            </p>
                        )}
                    </div>

                    {/* Brand */}
                    <div>
                        <label className="block mb-1 font-medium">Brand</label>
                        <Input
                            value={data.brand}
                            onChange={(e) => setData("brand", e.target.value)}
                            className="rounded-lg"
                        />
                        {errors.brand && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.brand}
                            </p>
                        )}
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block mb-1 font-medium">Type</label>
                        <select
                            className="w-full border rounded-lg px-3 py-2"
                            value={data.type}
                            onChange={(e) => {
                                setData("type", e.target.value);
                                setData("condition", "");
                            }}
                        >
                            <option value="">Select Type</option>
                            {TYPE_OPTIONS.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                        {errors.type && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.type}
                            </p>
                        )}
                    </div>

                    {/* Condition */}
                    <div>
                        <label className="block mb-1 font-medium">
                            Condition
                        </label>
                        <select
                            className="w-full border rounded-lg px-3 py-2"
                            value={data.condition}
                            onChange={(e) =>
                                setData("condition", e.target.value)
                            }
                            disabled={!data.type}
                        >
                            <option value="">
                                {data.type
                                    ? "Select Condition"
                                    : "Select Type first"}
                            </option>
                            {data.type &&
                                CONDITION_OPTIONS[data.type].map((c) => (
                                    <option key={c} value={c}>
                                        {c}
                                    </option>
                                ))}
                        </select>
                        {data.condition && (
                            <span
                                className={`inline-block px-2 py-1 mt-1 rounded-full text-xs font-medium ${getConditionColor(
                                    data.condition
                                )}`}
                            >
                                {data.condition}
                            </span>
                        )}
                        {errors.condition && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.condition}
                            </p>
                        )}
                    </div>

                    {/* Room */}
                    <div>
                        <label className="block mb-1 font-medium">Room</label>
                        <select
                            className="w-full border rounded-lg px-3 py-2"
                            value={data.room_id}
                            onChange={(e) => setData("room_id", e.target.value)}
                        >
                            <option value="">Select Room</option>
                            {rooms.map((r) => (
                                <option key={r.id} value={r.id}>
                                    Room {r.room_number}
                                </option>
                            ))}
                        </select>
                        {errors.room_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.room_id}
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end gap-3 mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-[color:var(--app-green,#16A34A)] hover:opacity-90 text-white"
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
