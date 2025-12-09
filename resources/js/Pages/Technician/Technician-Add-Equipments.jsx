import React, { useState, useEffect } from "react";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TechnicianRoomSidebar from "@/Components/TechnicianComponent/techician-scanned-sidebar";
import { Menu } from "lucide-react";
import Swal from "sweetalert2";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

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
        "To Be Diagnosed",
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
        "To Be Diagnosed",
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
        "To Be Diagnosed",
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
        "To Be Diagnosed",
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
    "To Be Diagnosed": "bg-blue-100 text-blue-700",
};

export default function TechnicianAddEquipment({ room, user }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        equipment_name: "",
        type: "",
        brand: "",
        quantity: 1,
        condition: "",
        condition_details: "",
        room_id: room?.id || "",
    });

    // Dynamically get condition options based on selected type
    const availableConditions = data.type ? CONDITION_OPTIONS[data.type] : [];

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("technician.equipments.store"), {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Equipment added successfully!",
                    confirmButtonColor: "hsl(142,34%,51%)",
                });
                setData({
                    equipment_name: "",
                    type: "",
                    brand: "",
                    quantity: 1,
                    condition: "",
                    condition_details: "",
                    room_id: room?.id || "",
                });
            },
        });
    };

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: flash.success,
                confirmButtonColor: "hsl(142,34%,51%)",
            }).then(() => router.reload({ only: [] }));
        }
    }, [flash]);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar Desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <TechnicianRoomSidebar
                    room={room}
                    user={user}
                    active="add-equipment"
                />
            </div>

            {/* Sidebar Mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex md:hidden">
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="relative z-50 w-64 shadow-lg bg-[hsl(142,34%,51%)]">
                        <TechnicianRoomSidebar
                            room={room}
                            user={user}
                            active="add-equipment"
                            onSelect={() => setSidebarOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Top Bar Mobile */}
                <div className="p-4 border-b md:hidden flex items-center justify-between shadow-sm bg-[hsl(142,34%,51%)]">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSidebarOpen(true)}
                        className="bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h2 className="text-xl font-semibold text-white">
                        {room?.room_name || "Add Equipment"}
                    </h2>
                </div>

                <div className="p-4 md:p-8 w-full flex justify-center">
                    <Head title="Add Equipment" />
                    <Card className="w-full max-w-2xl rounded-2xl shadow-md">
                        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <CardTitle className="text-lg md:text-xl font-semibold">
                                Add New Equipment
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                {/* Type */}
                                <div>
                                    <Label>Type</Label>
                                    <Select
                                        value={data.type}
                                        onValueChange={(val) => {
                                            setData("type", val);
                                            setData("condition", "");
                                        }}
                                        required
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="-- Select Type --" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {TYPE_OPTIONS.map((t) => (
                                                <SelectItem key={t} value={t}>
                                                    {t}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.type && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.type}
                                        </p>
                                    )}
                                </div>
                                {/* Equipment Name */}
                                <div className="sm:col-span-2">
                                    <Label>Equipment Name</Label>
                                    <Input
                                        placeholder=""
                                        value={data.equipment_name}
                                        onChange={(e) =>
                                            setData(
                                                "equipment_name",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                    {errors.equipment_name && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.equipment_name}
                                        </p>
                                    )}
                                </div>

                                {/* Brand */}
                                <div>
                                    <Label>Brand</Label>
                                    <Input
                                        placeholder=""
                                        value={data.brand}
                                        onChange={(e) =>
                                            setData("brand", e.target.value)
                                        }
                                        required
                                    />
                                    {errors.brand && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.brand}
                                        </p>
                                    )}
                                </div>

                                {/* Quantity */}
                                <div>
                                    <Label>Quantity</Label>
                                    <Input
                                        type="number"
                                        min="1"
                                        placeholder="e.g. 5"
                                        value={data.quantity}
                                        onChange={(e) =>
                                            setData(
                                                "quantity",
                                                Number(e.target.value)
                                            )
                                        }
                                        required
                                    />
                                    {errors.quantity && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.quantity}
                                        </p>
                                    )}
                                </div>

                                {/* Condition */}
                                <div>
                                    <Label>Condition</Label>
                                    <Select
                                        value={data.condition}
                                        onValueChange={(val) =>
                                            setData("condition", val)
                                        }
                                        disabled={!data.type}
                                        required
                                    >
                                        <SelectTrigger
                                            className={
                                                CONDITION_COLORS[
                                                    data.condition
                                                ] || ""
                                            }
                                        >
                                            <SelectValue
                                                placeholder={
                                                    data.type
                                                        ? "-- Select Condition --"
                                                        : "Select a type first"
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {availableConditions.map((c) => (
                                                <SelectItem key={c} value={c}>
                                                    {c}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.condition && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.condition}
                                        </p>
                                    )}
                                </div>

                                {/* Condition Details */}
                                <div className="sm:col-span-2">
                                    <Label>Condition Details</Label>
                                    <Input
                                        placeholder="e.g. Minor scratches, needs cable replacement"
                                        value={data.condition_details}
                                        onChange={(e) =>
                                            setData(
                                                "condition_details",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.condition_details && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.condition_details}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <div className="sm:col-span-2 flex justify-end mt-2 gap-2">
                                    <Button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 bg-[hsl(142,34%,51%)] text-white hover:bg-[hsl(142,34%,45%)] rounded-lg"
                                    >
                                        {processing
                                            ? "Saving..."
                                            : "Add Equipment"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
