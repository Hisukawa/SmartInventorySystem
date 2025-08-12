import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";

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

export default function AddPeripheral({
    existingRooms = [],
    existingUnits = [],
    existingBrands = [],
    existingModels = [],
}) {
    const { data, setData, post, processing, errors } = useForm({
        type: "",
        brand: "",
        model: "",
        serial_number: "",
        condition: "Working",
        room_number: "", // keep consistent naming
        unit_code: "",
    });

    // Units filtered by selected room
    const [filteredUnits, setFilteredUnits] = useState([]);

    // Update filtered units when room_number changes
    useEffect(() => {
        if (data.room_number) {
            // Find room object by room_number string
            const matchedRoom = existingRooms.find(
                (room) => room.room_number === data.room_number
            );

            if (matchedRoom) {
                // Filter units by matched room's id
                const unitsForRoom = existingUnits
                    .filter((unit) => unit.room_id === matchedRoom.id)
                    .map((unit) => unit.unit_code);

                setFilteredUnits(unitsForRoom);

                // Reset unit_code if not in filtered units
                if (!unitsForRoom.includes(data.unit_code)) {
                    setData("unit_code", "");
                }
            } else {
                setFilteredUnits([]);
                setData("unit_code", "");
            }
        } else {
            setFilteredUnits([]);
            setData("unit_code", "");
        }
    }, [data.room_number]);

    function handleSubmit(e) {
        e.preventDefault();
        // Debug: Log form data before posting
        console.log("Submitting:", data);
        post("/admin/peripherals");
    }

    return (
        <SidebarProvider>
            <Head title="Add Peripheral" />
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" aria-current="page">
                                    Assets
                                </BreadcrumbLink>

                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="/admin/peripherals"
                                    aria-current="page"
                                >
                                    Peripherals
                                </BreadcrumbLink>

                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="/admin/peripherals/create"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    Add Peripheral
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main className="p-6">
                    <h1 className="text-2xl font-bold mb-5 text-center">
                        Add Peripherals
                    </h1>
                    <Card className="max-w-xl mx-auto">
                        <CardContent>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4 mt-4"
                            >
                                {/* Type */}
                                <div>
                                    <Label>Type</Label>
                                    <input
                                        list="typeOptions"
                                        value={data.type}
                                        onChange={(e) =>
                                            setData("type", e.target.value)
                                        }
                                        placeholder="Select or type peripheral type"
                                        className="w-full border rounded px-2 py-1"
                                    />
                                    <datalist id="typeOptions">
                                        <option value="Mouse" />
                                        <option value="Keyboard" />
                                    </datalist>
                                    {errors.type && (
                                        <div className="text-red-500 text-sm">
                                            {errors.type}
                                        </div>
                                    )}
                                </div>
                                {/* Room */}
                                <div>
                                    <Label htmlFor="room_number">Room</Label>
                                    <input
                                        id="room_number"
                                        list="roomOptions"
                                        value={
                                            data.room_number
                                                ? `ROOM ${data.room_number}`
                                                : ""
                                        }
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            const roomNum = val.startsWith(
                                                "ROOM "
                                            )
                                                ? val.slice(5)
                                                : val;
                                            setData("room_number", roomNum);
                                        }}
                                        placeholder="Select or type room"
                                        className="w-full border rounded px-2 py-1"
                                    />
                                    <datalist id="roomOptions">
                                        {existingRooms.map((room) => (
                                            <option
                                                key={room.id}
                                                value={`ROOM ${room.room_number}`}
                                            />
                                        ))}
                                    </datalist>
                                    {errors.room_number && (
                                        <div className="text-red-500 text-sm">
                                            {errors.room_number}
                                        </div>
                                    )}
                                </div>

                                {/* Unit Code */}
                                <div>
                                    <Label>Unit Code</Label>
                                    <input
                                        list="unitOptions"
                                        value={data.unit_code}
                                        onChange={(e) =>
                                            setData("unit_code", e.target.value)
                                        }
                                        placeholder="Select or type unit code"
                                        className="w-full border rounded px-2 py-1"
                                    />
                                    <datalist id="unitOptions">
                                        {filteredUnits.map((unit) => (
                                            <option key={unit} value={unit} />
                                        ))}
                                    </datalist>
                                    {errors.unit_code && (
                                        <div className="text-red-500 text-sm">
                                            {errors.unit_code}
                                        </div>
                                    )}
                                </div>

                                {/* Brand */}
                                <div>
                                    <Label>Brand</Label>
                                    <input
                                        list="brandOptions"
                                        value={data.brand}
                                        onChange={(e) =>
                                            setData("brand", e.target.value)
                                        }
                                        placeholder="Select or type brand"
                                        className="w-full border rounded px-2 py-1"
                                    />
                                    <datalist id="brandOptions">
                                        {existingBrands.map((brand) => (
                                            <option key={brand} value={brand} />
                                        ))}
                                    </datalist>
                                    {errors.brand && (
                                        <div className="text-red-500 text-sm">
                                            {errors.brand}
                                        </div>
                                    )}
                                </div>

                                {/* Model */}
                                <div>
                                    <Label>Model</Label>
                                    <input
                                        list="modelOptions"
                                        value={data.model}
                                        onChange={(e) =>
                                            setData("model", e.target.value)
                                        }
                                        placeholder="Select or type model"
                                        className="w-full border rounded px-2 py-1"
                                    />
                                    <datalist id="modelOptions">
                                        {existingModels.map((model) => (
                                            <option key={model} value={model} />
                                        ))}
                                    </datalist>
                                    {errors.model && (
                                        <div className="text-red-500 text-sm">
                                            {errors.model}
                                        </div>
                                    )}
                                </div>

                                {/* Serial Number */}
                                <div>
                                    <Label>Serial Number</Label>
                                    <Input
                                        value={data.serial_number}
                                        onChange={(e) =>
                                            setData(
                                                "serial_number",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Enter serial number"
                                        className="w-full border rounded px-2 py-1"
                                    />
                                </div>

                                {/* Condition */}
                                <div>
                                    <Label>Condition</Label>
                                    <select
                                        value={data.condition}
                                        onChange={(e) =>
                                            setData("condition", e.target.value)
                                        }
                                        className="w-full border rounded px-2 py-1"
                                    >
                                        <option value="Working">
                                            🟢 Working
                                        </option>
                                        <option value="Defective">
                                            🔴 Defective
                                        </option>
                                        <option value="Maintenance">
                                            🟡 Maintenance
                                        </option>
                                    </select>
                                    {errors.condition && (
                                        <div className="text-red-500 text-sm">
                                            {errors.condition}
                                        </div>
                                    )}
                                </div>

                                {/* Submit button */}
                                <div className="flex justify-center">
                                    <Button type="submit" disabled={processing}>
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
