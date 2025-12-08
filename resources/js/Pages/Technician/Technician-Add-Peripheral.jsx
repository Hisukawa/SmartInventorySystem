import React, { useState, useEffect } from "react";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Replace with proper Select component if using one
import TechnicianRoomSidebar from "@/Components/TechnicianComponent/techician-scanned-sidebar";
import { Menu } from "lucide-react";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
export default function TechnicianAddPeripherals({
    room,
    user,
    existingRooms,
    existingUnits,
    existingBrands,
    existingModels,
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { flash } = usePage().props;
    const CONDITION_NAMES = [
        "Working",
        "Not Working",
        "Intermittent Issue",
        "Needs Cleaning",
        "For Replacement",
        "For Disposal",
        "Condemned",
        "Needs Repair",
        "Needs Configuration",
        "Under Maintenance",
        "To Be Diagnosed",
    ];
    const { data, setData, post, processing, errors } = useForm({
        type: "",
        brand: "",
        model: "",
        serial_number: "",
        condition: "",
        condition_details: "", // ✅ added here
        room_id: room.id,
        unit_id: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("technician.peripherals.store"), {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Peripheral added successfully!",
                    confirmButtonColor: "hsl(142,34%,51%)",
                });
                setData({
                    type: "",
                    brand: "",
                    model: "",
                    serial_number: "",
                    condition: "",
                    condition_details: "", // ✅ reset here
                    room_id: room.id,
                    unit_id: "",
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
                    active="add-peripheral"
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
                            active="add-peripheral"
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
                        {room.room_name}
                    </h2>
                </div>

                <div className="p-4 md:p-8 w-full flex justify-center">
                    <Head title="Add Peripheral" />
                    <Card className="w-full max-w-2xl rounded-2xl shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg md:text-xl font-semibold">
                                Add New Peripheral
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                {/* Unit Selection (Unit Code first) */}
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Unit Code
                                    </label>
                                    <select
                                        value={data.unit_id}
                                        onChange={(e) =>
                                            setData("unit_id", e.target.value)
                                        }
                                        className="w-full border rounded-lg p-2"
                                    >
                                        <option value="">Select Unit</option>
                                        {existingUnits.map((unit) => (
                                            <option
                                                key={unit.id}
                                                value={unit.id}
                                            >
                                                {unit.unit_code}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.unit_id && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.unit_id}
                                        </p>
                                    )}
                                </div>

                                {/* Type */}
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Type
                                    </label>
                                    <Input
                                        placeholder="e.g. Keyboard"
                                        value={data.type}
                                        onChange={(e) =>
                                            setData("type", e.target.value)
                                        }
                                        className="w-full"
                                    />
                                    {errors.type && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.type}
                                        </p>
                                    )}
                                </div>

                                {/* Brand */}
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Brand
                                    </label>
                                    <Input
                                        placeholder="e.g. Logitech"
                                        value={data.brand}
                                        onChange={(e) =>
                                            setData("brand", e.target.value)
                                        }
                                        className="w-full"
                                    />
                                    {errors.brand && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.brand}
                                        </p>
                                    )}
                                </div>

                                {/* Model */}
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Model
                                    </label>
                                    <Input
                                        placeholder="e.g. K120"
                                        value={data.model}
                                        onChange={(e) =>
                                            setData("model", e.target.value)
                                        }
                                        className="w-full"
                                    />
                                    {errors.model && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.model}
                                        </p>
                                    )}
                                </div>

                                {/* Serial Number */}
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Serial Number
                                    </label>
                                    <Input
                                        placeholder=""
                                        value={data.serial_number}
                                        onChange={(e) =>
                                            setData(
                                                "serial_number",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                    />
                                    {errors.serial_number && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.serial_number}
                                        </p>
                                    )}
                                </div>

                                {/* Condition */}
                                <div className="w-full">
                                    <Label>Condition</Label>
                                    <Select
                                        value={data.condition}
                                        onValueChange={(val) =>
                                            setData("condition", val)
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="-- Select Condition --" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {CONDITION_NAMES.map((cond) => (
                                                <SelectItem
                                                    key={cond}
                                                    value={cond}
                                                >
                                                    {cond}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.condition && (
                                        <p className="text-sm text-red-500">
                                            {errors.condition}
                                        </p>
                                    )}
                                </div>

                                {/* Condition Details (last) */}
                                <div className="sm:col-span-2 w-full">
                                    <Label>Condition Details</Label>
                                    <Input
                                        placeholder="Enter details about the condition (e.g., minor scratches, not detecting input, etc.)"
                                        value={data.condition_details || ""}
                                        onChange={(e) =>
                                            setData(
                                                "condition_details",
                                                e.target.value
                                            )
                                        }
                                        className="w-full"
                                    />
                                    {errors.condition_details && (
                                        <p className="text-sm text-red-500">
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
                                            : "Add Peripheral"}
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
