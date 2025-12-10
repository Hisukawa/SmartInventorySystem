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
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// ✅ Equipment Types
const TYPE_OPTIONS = ["Furniture", "Appliances", "Networking", "Safety"];

// ✅ Condition Lists per Type
const CONDITION_OPTIONS = {
    Furniture: [
        "Working",
        "Minor Damage",
        "Needs Repair",
        "Needs Cleaning",
        "For Replacement",
        "For Disposal",
        "Condemned",
        "To Be Diagnosed",
    ],
    Appliances: [
        "Working",
        "Not Working",
        "Intermittent Issue",
        "Overheating",
        "Loose Wiring",
        "For Replacement",
        "For Disposal",
        "Condemned",
        "To Be Diagnosed",
    ],
    Networking: [
        "Working",
        "Intermittent Connectivity",
        "No Signal",
        "Needs Configuration",
        "Port Not Working",
        "For Replacement",
        "For Disposal",
        "Condemned",
        "To Be Diagnosed",
    ],
    Safety: [
        "Working",
        "Expired",
        "Needs Refill",
        "Not Working",
        "Rusting",
        "For Replacement",
        "For Disposal",
        "Condemned",
        "To Be Diagnosed",
    ],
};

// ✅ Condition Colors
const CONDITION_COLORS = {
    Working: "bg-green-200 text-green-800",
    "Not Working": "bg-red-200 text-red-800",
    "Intermittent Issue": "bg-yellow-200 text-yellow-800",
    "Needs Cleaning": "bg-blue-200 text-blue-800",
    "For Replacement": "bg-orange-200 text-orange-800",
    "For Disposal": "bg-gray-200 text-gray-800",
    Condemned: "bg-black text-white",
    "Minor Damage": "bg-yellow-200 text-yellow-800",
    "Needs Repair": "bg-red-200 text-red-800",
    "Intermittent Connectivity": "bg-yellow-200 text-yellow-800",
    "No Signal": "bg-red-200 text-red-800",
    "Needs Configuration": "bg-blue-200 text-blue-800",
    Expired: "bg-red-300 text-red-900",
    "Needs Refill": "bg-blue-200 text-blue-900",
    Rusting: "bg-orange-200 text-orange-900",
    "To Be Diagnosed": "bg-blue-100 text-blue-700",
};

export default function AddEquipment({ rooms }) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");
    const [condition, setCondition] = useState("");
    const [conditionDetails, setConditionDetails] = useState("");
    const [room, setRoom] = useState("");
    const [quantity, setQuantity] = useState(1);

    const clearForm = () => {
        setName("");
        setType("");
        setBrand("");
        setCondition("");
        setConditionDetails("");
        setRoom("");
        setQuantity(1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Prepare multiple equipments
        const equipments = [];
        for (let i = 1; i <= quantity; i++) {
            equipments.push({
                equipment_name: name + (quantity > 1 ? ` #${i}` : ""),
                type,
                brand,
                condition,
                condition_details: conditionDetails,
                room_id: room,
            });
        }

        router.post(
            "/equipments/bulk",
            { equipments },
            {
                onSuccess: () => {
                    clearForm();
                    toast.success("Equipments Added", {
                        description: `${quantity} equipment(s) added successfully!`,
                        duration: 2000,
                    });
                },
                onError: () => {
                    toast.error("Error", {
                        description:
                            "Something went wrong. Please check your inputs.",
                    });
                },
            }
        );
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
                    <Card className="max-w-4xl w-full">
                        <CardContent>
                            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
                                Add New Equipment
                            </h1>

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6 mt-4"
                            >
                                {/* Row 1 */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Room</Label>
                                        <Select
                                            value={room}
                                            onValueChange={setRoom}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="-- Select Room --" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {rooms.map((r) => (
                                                    <SelectItem
                                                        key={r.id}
                                                        value={String(r.id)}
                                                    >
                                                        ROOM {r.room_number}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Equipment Type</Label>
                                        <Select
                                            value={type}
                                            onValueChange={(val) => {
                                                setType(val);
                                                setCondition("");
                                            }}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="-- Select Type --" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {TYPE_OPTIONS.map((t) => (
                                                    <SelectItem
                                                        key={t}
                                                        value={t}
                                                    >
                                                        {t}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div>
                                        <Label>Equipment Name</Label>
                                        <Input
                                            placeholder="Enter equipment name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label>Brand</Label>
                                        <Input
                                            placeholder="Brand"
                                            value={brand}
                                            onChange={(e) =>
                                                setBrand(e.target.value)
                                            }
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label>Quantity</Label>
                                        <Input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            onChange={(e) =>
                                                setQuantity(
                                                    Number(e.target.value)
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Row 3 */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <Label>Condition</Label>
                                        <Select
                                            value={condition}
                                            onValueChange={setCondition}
                                            disabled={!type}
                                            required
                                        >
                                            <SelectTrigger
                                                className={
                                                    CONDITION_COLORS[
                                                        condition
                                                    ] || ""
                                                }
                                            >
                                                <SelectValue
                                                    placeholder={
                                                        type
                                                            ? "-- Select Condition --"
                                                            : "Select a type first"
                                                    }
                                                />
                                            </SelectTrigger>

                                            <SelectContent>
                                                {type &&
                                                    CONDITION_OPTIONS[type].map(
                                                        (c) => (
                                                            <SelectItem
                                                                key={c}
                                                                value={c}
                                                            >
                                                                {c}
                                                            </SelectItem>
                                                        )
                                                    )}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Condition Details</Label>
                                        <Input
                                            placeholder="Enter detailed condition..."
                                            value={conditionDetails}
                                            onChange={(e) =>
                                                setConditionDetails(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <Button
                                        type="submit"
                                        className="bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium"
                                    >
                                        Add Equipment
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
