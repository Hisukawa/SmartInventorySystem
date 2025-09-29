import React, { useState, useEffect } from "react";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TechnicianRoomSidebar from "@/Components/TechnicianComponent/techician-scanned-sidebar";
import { Menu, ArrowLeft } from "lucide-react";
import Swal from "sweetalert2";

export default function TechnicianAddPc({ room, user }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        unit_code: "",
        processor: "",
        ram: "",
        storage: "",
        gpu: "",
        motherboard: "",
        condition: "",
        room_id: room.id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("technician.units.store"), {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "System Unit added successfully!",
                    confirmButtonColor: "hsl(142,34%,51%)",
                });
                setData({
                    unit_code: "",
                    processor: "",
                    ram: "",
                    storage: "",
                    gpu: "",
                    motherboard: "",
                    condition: "",
                    room_id: room.id,
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
            }).then(() => {
                router.reload({ only: [] });
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
                    active="add-pc"
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
                            active="add-pc"
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
                    <Head title="Add System Unit" />
                    <Card className="w-full max-w-2xl rounded-2xl shadow-md">
                        <CardHeader className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <CardTitle className="text-lg md:text-xl font-semibold">
                                Add New System Unit
                            </CardTitle>
                            {/* Back Button */}
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
                                            : "Add System Unit"}
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
