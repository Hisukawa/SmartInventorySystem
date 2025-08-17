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

const TYPE_OPTIONS = ["System Unit", "Hardware", "Furniture"];
const CONDITION_OPTIONS = [
    "Functional",
    "Defective",
    "Under Maintenance",
    "Needs Upgrade",
    "For Disposal",
];

export default function AddEquipment({ rooms }) {
    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");
    const [condition, setCondition] = useState("");
    const [room, setRoom] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        router.post("/equipments", {
            type,
            brand,
            condition,
            room_number: room,
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
                                    Equipment List
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
                    {/* Card Container */}
                    <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-6 sm:p-8 md:p-10">
                        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                            Add New Equipment
                        </h1>

                        <form onSubmit={handleSubmit} className="grid gap-4">
                            {/* Type (editable) */}
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">
                                    Equipment Type
                                </label>
                                <Input
                                    list="type-options"
                                    placeholder="Select or type equipment type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="w-full"
                                />
                                <datalist id="type-options">
                                    {TYPE_OPTIONS.map((t) => (
                                        <option key={t} value={t} />
                                    ))}
                                </datalist>
                            </div>

                            {/* Brand */}
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">
                                    Brand (optional)
                                </label>
                                <Input
                                    placeholder="Brand"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                    className="w-full"
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
                                    className="border rounded px-3 py-2 w-full"
                                >
                                    <option value="">Select condition</option>
                                    {CONDITION_OPTIONS.map((c) => (
                                        <option key={c} value={c}>
                                            {c}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Room (editable) */}
                            <div className="flex flex-col">
                                <label className="mb-1 font-medium">Room</label>
                                <Input
                                    list="room-options"
                                    placeholder="Select room or type new"
                                    value={room}
                                    onChange={(e) => setRoom(e.target.value)}
                                    className="w-full"
                                />
                                <datalist id="room-options">
                                    {rooms.map((r) => (
                                        <option
                                            key={r.room_number}
                                            value={r.room_number}
                                        />
                                    ))}
                                </datalist>
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
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
