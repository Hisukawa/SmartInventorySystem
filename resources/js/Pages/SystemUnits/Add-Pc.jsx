import React, { useEffect, useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { cn } from "@/lib/utils";

import { toast } from "sonner";
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
// ✅ Overall PC condition options (finalized)
const CONDITION_OPTIONS = [
    { label: "Functional", color: "bg-green-500" },
    { label: "Needs Boot / Pending Check", color: "bg-orange-500" },
    { label: "Defective", color: "bg-red-500" },
    { label: "Under Maintenance", color: "bg-yellow-500" },
    { label: "Needs Upgrade", color: "bg-blue-500" },
    { label: "For Disposal", color: "bg-gray-500" },
];

// ✅ Component condition options (finalized)
const COMPONENT_CONDITION_OPTIONS = [
    "Working",
    "Needs Boot / Check-up",
    "Needs Upgrade",
    "Defective",
    "Under Maintenance",
    "Not Present",
];

const COMPONENTS = ["Processor", "RAM", "Storage", "GPU", "Motherboard"];

export default function AddUnitPage() {
    const { rooms, faculties } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        unit_code: "",
        serial_number: "",
        room_id: "",
        mr_id: "",
        condition: "",
        condition_details: "",
        condition_locked: false, // admin override

        // Component details
        processor: "",
        ram: "",
        storage: "",
        gpu: "",
        motherboard: "",
        os: "",
    });

    const getConditionColor = (value) => {
        if (!value) return "bg-muted";
        const match = CONDITION_OPTIONS.find(
            (opt) => opt.label.toLowerCase() === value.toLowerCase()
        );
        return match ? match.color : "bg-muted";
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/admin/system-units", {
            onSuccess: () => {
                reset();
                toast.success("The system unit has been added successfully!", {
                    description: "PC Added",
                    duration: 2000,
                });
            },
            onError: () => {
                toast.error("Something went wrong. Please check your inputs.", {
                    description: "Error",
                });
            },
        });
    };

    const [typedRoom, setTypedRoom] = useState("");

    useEffect(() => {
        const selectedRoom = rooms.find(
            (room) =>
                `ROOM ${room.room_number}`.toLowerCase() ===
                typedRoom.toLowerCase()
        );
        if (selectedRoom) setData("room_id", selectedRoom.id);
        else setData("room_id", "");
    }, [typedRoom]);

    // prepare dependency array for useEffect
    const compDeps = COMPONENTS.map(
        (comp) => data[`${comp.toLowerCase()}_condition`]
    );

    return (
        <SidebarProvider>
            <Head title="Add System Unit" />
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Assets</BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink href="/admin/system-units">
                                    System Units
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="/admin/system-units/create"
                                    className="font-semibold text-foreground"
                                >
                                    Add Unit
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="p-6">
                    <h1 className="text-2xl font-bold mb-5 text-center">
                        Add System Unit
                    </h1>

                    <Card className="max-w-4xl mx-auto">
                        <CardContent>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6 mt-4"
                            >
                                {/* Room + PC Code (2 columns) */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="room_number">
                                            Room
                                        </Label>
                                        <Input
                                            id="room_number"
                                            list="room-options"
                                            value={typedRoom}
                                            onChange={(e) =>
                                                setTypedRoom(e.target.value)
                                            }
                                            placeholder="Search or select room"
                                        />
                                        <datalist id="room-options">
                                            {rooms.map((room) => (
                                                <option
                                                    key={room.id}
                                                    value={`ROOM ${room.room_number}`}
                                                />
                                            ))}
                                        </datalist>
                                        {errors.room_id && (
                                            <p className="text-sm text-red-500">
                                                {errors.room_id}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="unit_code">
                                            PC Code
                                        </Label>
                                        <Input
                                            id="unit_code"
                                            value={data.unit_code}
                                            onChange={(e) =>
                                                setData(
                                                    "unit_code",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g. PC-01"
                                            required
                                        />
                                        {errors.unit_code && (
                                            <p className="text-sm text-red-500">
                                                {errors.unit_code}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Specifications (3-column grid) */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="processor">
                                            Processor
                                        </Label>
                                        <Input
                                            id="processor"
                                            value={data.processor}
                                            onChange={(e) =>
                                                setData(
                                                    "processor",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="ram">RAM</Label>
                                        <Input
                                            id="ram"
                                            value={data.ram}
                                            onChange={(e) =>
                                                setData("ram", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="storage">Storage</Label>
                                        <Input
                                            id="storage"
                                            value={data.storage}
                                            onChange={(e) =>
                                                setData(
                                                    "storage",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="gpu">GPU</Label>
                                        <Input
                                            id="gpu"
                                            value={data.gpu}
                                            onChange={(e) =>
                                                setData("gpu", e.target.value)
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="motherboard">
                                            Motherboard
                                        </Label>
                                        <Input
                                            id="motherboard"
                                            value={data.motherboard}
                                            onChange={(e) =>
                                                setData(
                                                    "motherboard",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="os">OS</Label>
                                        <Input
                                            id="os"
                                            value={data.os}
                                            onChange={(e) =>
                                                setData("os", e.target.value)
                                            }
                                        />
                                    </div>
                                </div>

                                {/* Serial Number + Condition + Condition Details (3 columns) */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="serial_number">
                                            Serial Number
                                        </Label>
                                        <Input
                                            id="serial_number"
                                            value={data.serial_number}
                                            onChange={(e) =>
                                                setData(
                                                    "serial_number",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="condition">
                                            Overall Condition
                                        </Label>
                                        <Select
                                            value={data.condition}
                                            onValueChange={(val) =>
                                                setData("condition", val)
                                            }
                                        >
                                            <SelectTrigger className="w-full mt-1">
                                                <SelectValue placeholder="-- Select Condition --" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CONDITION_OPTIONS.map(
                                                    (opt) => (
                                                        <SelectItem
                                                            key={opt.label}
                                                            value={opt.label}
                                                        >
                                                            {opt.label}
                                                        </SelectItem>
                                                    )
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="condition_details">
                                            Condition Details
                                        </Label>
                                        <Input
                                            id="condition_details"
                                            value={data.condition_details}
                                            onChange={(e) =>
                                                setData(
                                                    "condition_details",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="e.g. defective RAM, GPU overheating"
                                        />
                                    </div>
                                </div>

                                {/* M.R (Assigned Faculty) */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="mr_id">
                                            Material Responsible
                                        </Label>
                                        <Select
                                            value={data.mr_id}
                                            onValueChange={(val) =>
                                                setData("mr_id", val)
                                            }
                                        >
                                            <SelectTrigger className="w-full mt-1">
                                                <SelectValue placeholder="-- Select Faculty --" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {faculties.map((faculty) => (
                                                    <SelectItem
                                                        key={faculty.id}
                                                        value={faculty.id.toString()}
                                                    >
                                                        {faculty.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Submit */}
                                <div className="flex justify-center">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
