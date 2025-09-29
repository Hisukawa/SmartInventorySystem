import React, { useState, useEffect } from "react";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TechnicianRoomSidebar from "@/Components/TechnicianComponent/techician-scanned-sidebar";
import { Menu } from "lucide-react";
import Swal from "sweetalert2";

export default function TechnicianEditPc({ room, user, unit }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { flash } = usePage().props;

    const { data, setData, put, processing, errors } = useForm({
        unit_code: unit.unit_code,
        processor: unit.processor ?? "",
        ram: unit.ram ?? "",
        storage: unit.storage ?? "",
        gpu: unit.gpu ?? "",
        motherboard: unit.motherboard ?? "",
        condition: unit.condition,
        room_id: unit.room_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("technician.units.update", unit.id), {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "System Unit updated successfully!",
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
                    active="edit-pc"
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
                            active="edit-pc"
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
                    <Head title="Edit System Unit" />
                    <Card className="w-full max-w-2xl rounded-2xl shadow-md">
                        <CardHeader>
                            <CardTitle className="text-lg md:text-xl font-semibold">
                                Edit System Unit
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                                {/* Unit Code */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Unit Code
                                    </label>
                                    <Input
                                        placeholder="e.g. PC-101"
                                        value={data.unit_code}
                                        onChange={(e) =>
                                            setData("unit_code", e.target.value)
                                        }
                                    />
                                    {errors.unit_code && (
                                        <p className="text-red-500 text-sm mt-1">
                                            {errors.unit_code}
                                        </p>
                                    )}
                                </div>

                                {/* Processor */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Processor
                                    </label>
                                    <Input
                                        placeholder="e.g. Intel i5"
                                        value={data.processor}
                                        onChange={(e) =>
                                            setData("processor", e.target.value)
                                        }
                                    />
                                </div>

                                {/* RAM */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        RAM
                                    </label>
                                    <Input
                                        placeholder="e.g. 8GB"
                                        value={data.ram}
                                        onChange={(e) =>
                                            setData("ram", e.target.value)
                                        }
                                    />
                                </div>

                                {/* Storage */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Storage
                                    </label>
                                    <Input
                                        placeholder="e.g. 512GB SSD"
                                        value={data.storage}
                                        onChange={(e) =>
                                            setData("storage", e.target.value)
                                        }
                                    />
                                </div>

                                {/* GPU */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        GPU
                                    </label>
                                    <Input
                                        placeholder="e.g. NVIDIA GTX 1650"
                                        value={data.gpu}
                                        onChange={(e) =>
                                            setData("gpu", e.target.value)
                                        }
                                    />
                                </div>

                                {/* Motherboard */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Motherboard
                                    </label>
                                    <Input
                                        placeholder="e.g. ASUS Prime"
                                        value={data.motherboard}
                                        onChange={(e) =>
                                            setData(
                                                "motherboard",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                {/* Condition */}
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Condition
                                    </label>
                                    <Input
                                        placeholder="Good, Fair, Needs Repair"
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
                                <div className="sm:col-span-2 flex justify-end mt-2">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 bg-[hsl(142,34%,51%)] text-white hover:bg-[hsl(142,34%,45%)] rounded-lg"
                                    >
                                        {processing
                                            ? "Updating..."
                                            : "Update System Unit"}
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
