import React, { useEffect } from "react";
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

export default function EditEquipmentPage({ equipment, rooms }) {
    const domain = window.location.origin;
    const qrValue = `${domain}/system-units/view/${equipment.equipment_code}`;

    const { data, setData, put, processing, errors } = useForm({
        equipment_code: equipment.equipment_code || "",
        equipment_name: equipment.equipment_name || "",
        brand: equipment.brand || "",
        type: equipment.type || "",
        condition: equipment.condition || "",
        room_id: equipment.room_id || "",
    });

    const { props } = usePage();

    // ✅ Equipment Types
    const TYPE_OPTIONS = ["Furniture", "Appliances", "Networking", "Safety"];

    // ✅ Condition Lists per Type
    const CONDITION_OPTIONS = {
        Furniture: [
            "Functional",
            "Minor Damage",
            "Needs Repair",
            "Needs Cleaning",
            "For Replacement",
            "For Disposal",
            "Condemned",
        ],
        Appliances: [
            "Functional",
            "Defective",
            "Intermittent Issue",
            "Overheating",
            "Loose Wiring",
            "For Replacement",
            "For Disposal",
            "Condemned",
        ],
        Networking: [
            "Functional",
            "Intermittent Connectivity",
            "No Signal",
            "Needs Configuration",
            "Defective Port",
            "For Replacement",
            "For Disposal",
            "Condemned",
        ],
        Safety: [
            "Functional",
            "Expired",
            "Needs Refill",
            "Defective",
            "Rusting",
            "For Replacement",
            "For Disposal",
            "Condemned",
        ],
    };

    // ✅ Condition Colors
    const CONDITION_COLORS = {
        Functional: "bg-green-200 text-green-800",
        Defective: "bg-red-200 text-red-800",
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

    useEffect(() => {
        if (props.flash?.success) toast.success(props.flash.success);
        if (props.flash?.error) toast.error(props.flash.error);
    }, [props.flash]);

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("admin.equipments.update", equipment.equipment_code), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success("Equipment updated successfully!");
                router.get(
                    route("admin.equipments.show", equipment.equipment_code)
                );
            },
            onError: (errors) => {
                toast.error(Object.values(errors)[0] || "Update failed");
            },
        });
    };

    return (
        <SidebarProvider>
            <Toaster position="top-right" />
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-20 bg-white border-b px-6 py-3 flex items-center gap-2 shadow-sm">
                    <SidebarTrigger />
                    <div className="w-px h-6 bg-gray-300 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Assets</BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink href="/equipments">
                                    Equipments
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="#"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    Edit Equipment
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex-1" />
                    <Notification />
                </header>

                <main className="px-6 py-6 flex justify-center">
                    <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6 space-y-6">
                        <h2 className="text-xl font-semibold border-b pb-2 mb-4">
                            Equipment Details
                        </h2>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block mb-1 font-medium">
                                    Equipment Code
                                </label>
                                <Input value={data.equipment_code} disabled />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">
                                    Equipment Name
                                </label>
                                <Input
                                    value={data.equipment_name}
                                    onChange={(e) =>
                                        setData(
                                            "equipment_name",
                                            e.target.value
                                        )
                                    }
                                />
                                {errors.equipment_name && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.equipment_name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">
                                    Brand
                                </label>
                                <Input
                                    value={data.brand}
                                    onChange={(e) =>
                                        setData("brand", e.target.value)
                                    }
                                />
                                {errors.brand && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.brand}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">
                                    Type
                                </label>
                                <select
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={data.type}
                                    onChange={(e) => {
                                        setData("type", e.target.value);
                                        setData("condition", ""); // Reset condition
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
                                        CONDITION_OPTIONS[data.type].map(
                                            (c) => (
                                                <option key={c} value={c}>
                                                    {c}
                                                </option>
                                            )
                                        )}
                                </select>
                                {errors.condition && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.condition}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">
                                    Room
                                </label>
                                <select
                                    className="w-full border rounded-lg px-3 py-2"
                                    value={data.room_id}
                                    onChange={(e) =>
                                        setData("room_id", e.target.value)
                                    }
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

                            <div className="flex justify-end gap-3 mt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => router.visit("/equipments")}
                                >
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    Save
                                </Button>
                            </div>
                        </form>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
