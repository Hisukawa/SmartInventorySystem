import React, { useEffect, useState } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { cn } from "@/lib/utils";

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
    const { rooms } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        unit_code: "",
        condition: "",
        room_id: "",
        condition_locked: false, // tracks admin manual override
        ...COMPONENTS.reduce((acc, comp) => {
            acc[`${comp.toLowerCase()}_condition`] = "";
            acc[`${comp.toLowerCase()}_remark`] = "";
            return acc;
        }, {}),
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
            onSuccess: () => reset(),
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

    // helper to compute suggested overall condition from components
    const computeSuggestedCondition = () => {
        const componentConditions = COMPONENTS.map(
            (comp) => data[`${comp.toLowerCase()}_condition`]
        );

        // if none of the components have been set yet -> needs boot / pending check
        const allEmpty = componentConditions.every(
            (c) => c === "" || c === null || c === undefined
        );
        if (allEmpty) return "Needs Boot / Pending Check";

        if (componentConditions.includes("Defective")) return "Defective";
        if (componentConditions.includes("Needs Upgrade"))
            return "Needs Upgrade";
        if (componentConditions.includes("Under Maintenance"))
            return "Under Maintenance";
        if (componentConditions.includes("Not Present")) return "Needs Upgrade"; // missing part implies upgrade or replacement
        // default: all present and none defective/upgrade/maintenance -> Functional
        return "Functional";
    };

    // prepare dependency array for useEffect
    const compDeps = COMPONENTS.map(
        (comp) => data[`${comp.toLowerCase()}_condition`]
    );

    // Auto-suggest overall condition from component conditions unless admin locked/overrode it
    useEffect(() => {
        if (data.condition_locked) return; // admin manually set overall condition
        const suggested = computeSuggestedCondition();
        if (data.condition !== suggested) {
            setData("condition", suggested);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data.condition_locked, ...compDeps]);

    // Allow resetting to suggested (unlocks condition)
    const handleResetToSuggested = () => {
        const suggested = computeSuggestedCondition();
        setData("condition", suggested);
        setData("condition_locked", false);
    };

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

                    <Card className="max-w-3xl mx-auto">
                        <CardContent>
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6 mt-4"
                            >
                                {/* Room */}
                                <div>
                                    <Label htmlFor="room_number">Room</Label>
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

                                {/* Unit Code */}
                                <div>
                                    <Label htmlFor="unit_code">Unit Code</Label>
                                    <Input
                                        id="unit_code"
                                        value={data.unit_code}
                                        onChange={(e) =>
                                            setData("unit_code", e.target.value)
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

                                {/* Components */}
                                <div>
                                    <Label className="mb-2 block text-sm font-medium">
                                        Components & Conditions
                                    </Label>

                                    <div className="grid grid-cols-1 gap-4">
                                        {COMPONENTS.map((comp) => {
                                            const field = comp.toLowerCase();
                                            return (
                                                <div
                                                    key={comp}
                                                    className="border rounded-lg p-3 bg-white shadow-sm"
                                                >
                                                    <div className="flex items-center justify-between gap-3">
                                                        <Label className="font-medium">
                                                            {comp}
                                                        </Label>
                                                    </div>

                                                    <div className="mt-2 grid grid-cols-1 gap-2">
                                                        <select
                                                            id={`${field}_condition`}
                                                            className="w-full border rounded p-2"
                                                            value={
                                                                data[
                                                                    `${field}_condition`
                                                                ] || ""
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    `${field}_condition`,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                        >
                                                            <option value="">
                                                                -- Select
                                                                Condition --
                                                            </option>
                                                            {COMPONENT_CONDITION_OPTIONS.map(
                                                                (opt) => (
                                                                    <option
                                                                        key={
                                                                            opt
                                                                        }
                                                                        value={
                                                                            opt
                                                                        }
                                                                    >
                                                                        {opt}
                                                                    </option>
                                                                )
                                                            )}
                                                        </select>

                                                        <Input
                                                            id={`${field}_remark`}
                                                            value={
                                                                data[
                                                                    `${field}_remark`
                                                                ] || ""
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    `${field}_remark`,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            placeholder={`Remarks (optional) — e.g. ${comp} overheating / slot not detected`}
                                                        />
                                                        {errors[
                                                            `${field}_condition`
                                                        ] && (
                                                            <p className="text-sm text-red-500">
                                                                {
                                                                    errors[
                                                                        `${field}_condition`
                                                                    ]
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Overall Condition */}
                                <div>
                                    <Label htmlFor="condition" className="mb-1">
                                        Overall PC Condition
                                    </Label>

                                    <div className="flex items-center gap-3">
                                        <select
                                            id="condition"
                                            className="flex-1 border rounded p-2"
                                            value={data.condition || ""}
                                            onChange={(e) => {
                                                setData(
                                                    "condition",
                                                    e.target.value
                                                );
                                                setData(
                                                    "condition_locked",
                                                    true
                                                );
                                            }}
                                        >
                                            <option value="">
                                                -- Select Overall Condition --
                                            </option>
                                            {CONDITION_OPTIONS.map((opt) => (
                                                <option
                                                    key={opt.label}
                                                    value={opt.label}
                                                >
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>

                                        {data.condition_locked ? (
                                            <button
                                                type="button"
                                                onClick={handleResetToSuggested}
                                                className="text-sm px-3 py-1 border rounded bg-white hover:bg-gray-50"
                                                title="Reset to suggested based on components"
                                            >
                                                Reset to Suggested
                                            </button>
                                        ) : (
                                            <span className="text-sm italic text-muted-foreground">
                                                Auto-suggested
                                            </span>
                                        )}
                                    </div>

                                    {data.condition && (
                                        <div className="mt-2 text-sm flex items-center gap-2">
                                            <span
                                                className={cn(
                                                    "inline-block w-3 h-3 rounded-full",
                                                    getConditionColor(
                                                        data.condition
                                                    )
                                                )}
                                            />
                                            <span className="capitalize">
                                                {data.condition}
                                            </span>
                                        </div>
                                    )}
                                    {errors.condition && (
                                        <p className="text-sm text-red-500">
                                            {errors.condition}
                                        </p>
                                    )}
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
