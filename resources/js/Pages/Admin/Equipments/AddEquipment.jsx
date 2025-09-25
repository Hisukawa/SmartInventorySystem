import React, { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

// Equipment Types
const TYPE_OPTIONS = ["Hardware", "Furniture"];

// Hardware condition options
const HARDWARE_CONDITION_OPTIONS = [
    "Functional",
    "Defective",
    "Under Maintenance",
    "Needs Upgrade",
    "For Disposal",
    "Spare / Backup",
    "Not Installed",
];

// Furniture condition options
const FURNITURE_CONDITION_OPTIONS = [
    "Good",
    "Slightly Damaged",
    "Damaged",
    "Under Repair",
    "For Disposal",
    "New",
    "Missing Parts",
];

// Condition colors
const CONDITION_COLORS = {
    Functional: "bg-green-200 text-green-800",
    Defective: "bg-red-200 text-red-800",
    "Under Maintenance": "bg-yellow-200 text-yellow-800",
    "Needs Upgrade": "bg-orange-200 text-orange-800",
    "For Disposal": "bg-gray-200 text-gray-800",
    "Spare / Backup": "bg-blue-200 text-blue-800",
    "Not Installed": "bg-purple-200 text-purple-800",
    Good: "bg-green-200 text-green-800",
    "Slightly Damaged": "bg-yellow-200 text-yellow-800",
    Damaged: "bg-red-200 text-red-800",
    "Under Repair": "bg-orange-200 text-orange-800",
    New: "bg-blue-200 text-blue-800",
    "Missing Parts": "bg-gray-200 text-gray-800",
};

export default function AddEquipment({ rooms }) {
    const [name, setName] = useState(""); // Equipment Name
    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");
    const [condition, setCondition] = useState("");
    const [room, setRoom] = useState("");

    // Dynamically change condition options depending on type
    const availableConditions =
        type === "Hardware"
            ? HARDWARE_CONDITION_OPTIONS
            : type === "Furniture"
            ? FURNITURE_CONDITION_OPTIONS
            : [];

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post("/equipments", {
            equipment_name: name, // send equipment name
            type,
            brand,
            condition,
            room_id: room,
        });
    };

    return (
        <SidebarProvider>
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
                                <BreadcrumbLink href="/equipments">
                                    Equipments
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="#"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    Add Equipment
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <Head title="Add Equipment" />

                <main className="p-6 flex justify-center">
                    <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6 sm:p-8 md:p-10">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                            Add New Equipment
                        </h1>

                        <form onSubmit={handleSubmit} className="grid gap-4">
                            {/* Type */}
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">
                                    Equipment Type
                                </label>
                                <select
                                    value={type}
                                    onChange={(e) => {
                                        setType(e.target.value);
                                        setCondition(""); // reset condition
                                    }}
                                    className="border rounded px-3 py-2 w-full"
                                    required
                                >
                                    <option value="">Select type</option>
                                    {TYPE_OPTIONS.map((t) => (
                                        <option key={t} value={t}>
                                            {t}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Equipment Name */}
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">
                                    Equipment Name
                                </label>
                                <Input
                                    placeholder="Enter equipment name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full"
                                    required
                                />
                            </div>

                            {/* Brand */}
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">
                                    Brand
                                </label>
                                <Input
                                    placeholder="Brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="w-full"
                                    required
                                />
                            </div>

                            {/* Condition */}
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">
                                    Condition
                                </label>
                                <select
                                    value={condition}
                                    onChange={(e) =>
                                        setCondition(e.target.value)
                                    }
                                    className={`border rounded px-3 py-2 w-full ${
                                        CONDITION_COLORS[condition] || ""
                                    }`}
                                    disabled={!type}
                                    required
                                >
                                    <option value="">
                                        {type
                                            ? "Select condition"
                                            : "Select a type first"}
                                    </option>
                                    {availableConditions.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Room */}

                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">Room</label>
                                <select
                                    value={room}
                                    onChange={(e) => setRoom(e.target.value)}
                                    className="border rounded px-3 py-2 w-full"
                                    required
                                >
                                    <option value="">Select room</option>
                                    {rooms.map((r) => (
                                        <option key={r.id} value={r.id}>
                                            {r.room_number}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <Button
                                type="submit"
                                 className="bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium"
                            >
                                Add Equipment
                            </Button>
                        </form>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
