import React, { useState, useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
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

// ✅ Updated Condition Names
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
];

export default function AddPeripheral({
    existingRooms = [],
    existingUnits = [],
    existingBrands = [],
    existingModels = [],
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        type: "",
        brand: "",
        model: "",
        serial_number: "",
        condition: "",
        condition_details: "", // ✅ NEW FIELD
        room_id: "",
        unit_id: "",
    });

    const [filteredUnits, setFilteredUnits] = useState([]);

    useEffect(() => {
        if (data.room_id) {
            const unitsForRoom = existingUnits.filter(
                (unit) => String(unit.room_id) === String(data.room_id)
            );
            setFilteredUnits(unitsForRoom);
            if (!unitsForRoom.find((u) => u.id === data.unit_id)) {
                setData("unit_id", "");
            }
        } else {
            setFilteredUnits([]);
            setData("unit_id", "");
        }
    }, [data.room_id, existingUnits]);

    const handleSubmit = (e) => {
        e.preventDefault();

        post("/admin/peripherals", {
            onSuccess: () => {
                // ✅ Clear the form fields
                reset();

                // ✅ Show success message
                toast.success("Peripheral Added", {
                    description: "The peripheral has been added successfully!",
                    duration: 2000,
                });
            },
            onError: () => {
                toast.error("Error", {
                    description:
                        "Something went wrong. Please check your inputs.",
                });
            },
        });
    };
    return (
        <SidebarProvider>
            <Head title="Add Peripheral" />
            <AppSidebar />
            <SidebarInset>
                {/* Header */}
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

                {/* Main */}
                <main className="p-6">
                    <h1 className="text-2xl font-bold mb-5 text-center">
                        Add Peripheral
                    </h1>

                    <Card className="max-w-4xl mx-auto">
                        <CardContent>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6 mt-4"
                            >
                                {/* Room + Unit (2 columns) */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="room">Room</Label>
                                        <Select
                                            value={data.room_id}
                                            onValueChange={(val) =>
                                                setData("room_id", val)
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="-- Select Room --" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {existingRooms.map((room) => (
                                                    <SelectItem
                                                        key={room.id}
                                                        value={room.id.toString()}
                                                    >
                                                        ROOM {room.room_number}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.room_id && (
                                            <p className="text-sm text-red-500">
                                                {errors.room_id}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <Label htmlFor="unit">Unit Code</Label>
                                        <Select
                                            value={data.unit_id}
                                            onValueChange={(val) =>
                                                setData("unit_id", val)
                                            }
                                            disabled={!data.room_id}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="-- Select Unit --" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {filteredUnits.map((unit) => (
                                                    <SelectItem
                                                        key={unit.id}
                                                        value={unit.id.toString()}
                                                    >
                                                        {unit.unit_code}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.unit_id && (
                                            <p className="text-sm text-red-500">
                                                {errors.unit_id}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <Label>Type</Label>
                                        <Input
                                            list="typeOptions"
                                            value={data.type}
                                            onChange={(e) =>
                                                setData("type", e.target.value)
                                            }
                                            placeholder="e.g. Mouse, Keyboard"
                                        />
                                        <datalist id="typeOptions">
                                            <option value="Mouse" />
                                            <option value="Keyboard" />
                                            <option value="Monitor" />
                                            <option value="Printer" />
                                        </datalist>
                                    </div>
                                </div>

                                {/* Type + Brand + Model (3 columns) */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label>Brand</Label>
                                        <Input
                                            list="brandOptions"
                                            value={data.brand}
                                            onChange={(e) =>
                                                setData("brand", e.target.value)
                                            }
                                            placeholder="Select or type brand"
                                        />
                                        <datalist id="brandOptions">
                                            {existingBrands.map((brand) => (
                                                <option
                                                    key={brand}
                                                    value={brand}
                                                />
                                            ))}
                                        </datalist>
                                    </div>
                                    <div>
                                        <Label>Model</Label>
                                        <Input
                                            list="modelOptions"
                                            value={data.model}
                                            onChange={(e) =>
                                                setData("model", e.target.value)
                                            }
                                            placeholder="Select or type model"
                                        />
                                        <datalist id="modelOptions">
                                            {existingModels.map((model) => (
                                                <option
                                                    key={model}
                                                    value={model}
                                                />
                                            ))}
                                        </datalist>
                                    </div>
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
                                        />
                                    </div>
                                </div>

                                {/* Serial Number + Condition (2 columns) */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label>Condition</Label>
                                        <Select
                                            value={data.condition}
                                            onValueChange={(val) =>
                                                setData("condition", val)
                                            }
                                        >
                                            <SelectTrigger>
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

                                    <div className="col-span-1 gap-2">
                                        <Label>Condition Details</Label>
                                        <Input
                                            value={data.condition_details}
                                            onChange={(e) =>
                                                setData(
                                                    "condition_details",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter details about the condition (e.g., minor scratches, not detecting input, etc.)"
                                        />
                                        {errors.condition_details && (
                                            <p className="text-sm text-red-500">
                                                {errors.condition_details}
                                            </p>
                                        )}
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
