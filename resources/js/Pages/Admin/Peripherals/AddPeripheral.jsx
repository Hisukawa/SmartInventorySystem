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
        room_id: "", // <-- send room_id to backend
        unit_id: "", // <-- send unit_id to backend
    });

    const [filteredUnits, setFilteredUnits] = useState([]);

    // Update filtered units whenever room_id changes
    useEffect(() => {
        if (data.room_id) {
            // filter units that belong to the selected room
            const unitsForRoom = existingUnits.filter(
                (unit) => String(unit.room_id) === String(data.room_id)
            );
            setFilteredUnits(unitsForRoom);

            // if currently selected unit is not in the new filtered list, reset it
            if (!unitsForRoom.find((u) => u.id === data.unit_id)) {
                setData("unit_id", "");
            }
        } else {
            setFilteredUnits([]);
            setData("unit_id", "");
        }
    }, [data.room_id, existingUnits]);

    function handleSubmit(e) {
        e.preventDefault();
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
                                <BreadcrumbLink href="#">Assets</BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink href="/admin/peripherals">
                                    Peripherals
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="/admin/peripherals/create"
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
                        Add Peripheral
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
                                            data.room_id
                                                ? `ROOM ${
                                                      existingRooms.find(
                                                          (r) =>
                                                              r.id ===
                                                              data.room_id
                                                      )?.room_number
                                                  }`
                                                : ""
                                        }
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            // extract number if it starts with "ROOM "
                                            const roomNum = val.startsWith(
                                                "ROOM "
                                            )
                                                ? val.slice(5)
                                                : val;
                                            // find room_id by room_number
                                            const room = existingRooms.find(
                                                (r) =>
                                                    String(r.room_number) ===
                                                    roomNum
                                            );
                                            setData(
                                                "room_id",
                                                room ? room.id : ""
                                            );
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
                                    {errors.room_id && (
                                        <div className="text-red-500 text-sm">
                                            {errors.room_id}
                                        </div>
                                    )}
                                </div>

                                {/* Unit Code */}
                                <div>
                                    <Label>Unit Code</Label>
                                    <input
                                        list="unitOptions"
                                        value={
                                            data.unit_id
                                                ? filteredUnits.find(
                                                      (u) =>
                                                          u.id === data.unit_id
                                                  )?.unit_code || ""
                                                : ""
                                        }
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            const unit = filteredUnits.find(
                                                (u) => u.unit_code === val
                                            );
                                            setData(
                                                "unit_id",
                                                unit ? unit.id : ""
                                            ); // store the id, not the code
                                        }}
                                        placeholder="Select or type unit code"
                                        className="w-full border rounded px-2 py-1"
                                        disabled={!data.room_id}
                                    />
                                    <datalist id="unitOptions">
                                        {filteredUnits.map((unit) => (
                                            <option
                                                key={unit.id}
                                                value={unit.unit_code}
                                            />
                                        ))}
                                    </datalist>
                                    {errors.unit_id && (
                                        <div className="text-red-500 text-sm">
                                            {errors.unit_id}
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

                                {/* Submit */}
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
