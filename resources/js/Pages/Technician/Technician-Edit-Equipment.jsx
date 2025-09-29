import React, { useState, useEffect } from "react";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TechnicianRoomSidebar from "@/Components/TechnicianComponent/techician-scanned-sidebar";
import { Menu } from "lucide-react";
import Swal from "sweetalert2";

export default function TechnicianEditEquipment({ room, user, equipment }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { flash } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        equipment_name: equipment.equipment_name,
        type: equipment.type,
        brand: equipment.brand ?? "",
        condition: equipment.condition,
        room_id: room?.id || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("technician.equipments.update", equipment.id), {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Equipment updated successfully!",
                    confirmButtonColor: "hsl(142,34%,51%)",
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
            });
        }
    }, [flash]);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar Desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <TechnicianRoomSidebar
                    room={room}
                    user={user}
                    active="edit-equipment"
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
                            active="edit-equipment"
                            onSelect={() => setSidebarOpen(false)}
                        />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
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
                    <Head title="Edit Equipment" />
                    <Card className="w-full max-w-2xl rounded-2xl shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg md:text-xl font-semibold">
                                Edit Equipment
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                {/* Equipment Name */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Equipment Name
                                    </label>
                                    <Input
                                        placeholder="e.g. Projector"
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

                                {/* Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Type
                                    </label>
                                    <Input
                                        placeholder="e.g. Peripheral"
                                        value={data.type}
                                        onChange={(e) =>
                                            setData("type", e.target.value)
                                        }
                                    />
                                    {errors.type && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.type}
                                        </p>
                                    )}
                                </div>

                                {/* Brand */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Brand
                                    </label>
                                    <Input
                                        placeholder="e.g. Logitech"
                                        value={data.brand}
                                        onChange={(e) =>
                                            setData("brand", e.target.value)
                                        }
                                    />
                                </div>

                                {/* Condition */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Condition
                                    </label>
                                    <Input
                                        placeholder="Working / Defective"
                                        value={data.condition}
                                        onChange={(e) =>
                                            setData("condition", e.target.value)
                                        }
                                    />
                                    {errors.condition && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.condition}
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
                                            ? "Updating..."
                                            : "Update Equipment"}
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
