import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import Swal from "sweetalert2";

const CONDITION_COLORS = {
    Working: "bg-green-200 text-green-800",
    "Not Working": "bg-red-200 text-red-800",
    "Intermittent Issue": "bg-yellow-200 text-yellow-800",
    "Needs Cleaning": "bg-blue-200 text-blue-800",
    "For Replacement": "bg-orange-200 text-orange-800",
    "For Disposal": "bg-gray-200 text-gray-800",
    Condemned: "bg-black text-white",
    "Needs Repair": "bg-red-200 text-red-800",
    "No Signal": "bg-red-200 text-red-800",
    "Needs Configuration": "bg-blue-200 text-blue-800",
    "Under Maintenance": "bg-blue-200 text-blue-900",
    "To Be Diagnosed": "bg-blue-100 text-blue-800",
};

export default function EditPeripheralModal({
    peripheral,
    rooms = [],
    units = [],
    onClose,
}) {
    const { data, setData, put, processing, errors } = useForm({
        type: peripheral?.type || "",
        brand: peripheral?.brand || "",
        model: peripheral?.model || "",
        serial_number: peripheral?.serial_number || "",
        condition: peripheral?.condition || "",
        condition_details: peripheral?.condition_details || "",
        room_id: peripheral?.room_id || "",
        unit_id: peripheral?.unit_id || "",
    });

    const [filteredUnits, setFilteredUnits] = useState([]);

    useEffect(() => {
        if (data.room_id) {
            const unitsForRoom = units.filter(
                (unit) => String(unit.room_id) === String(data.room_id)
            );
            setFilteredUnits(unitsForRoom);
            if (
                !unitsForRoom.find((u) => String(u.id) === String(data.unit_id))
            ) {
                setData("unit_id", "");
            }
        } else {
            setFilteredUnits([]);
            setData("unit_id", "");
        }
    }, [data.room_id, units]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("peripherals.update", peripheral.id), {
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Updated!",
                    text: "Peripheral updated successfully.",
                    timer: 2000,
                    showConfirmButton: false,
                });
                onClose();
            },
        });
    };

    const getConditionColor = (condition) =>
        CONDITION_COLORS[condition] || "bg-gray-200 text-gray-800";

    return (
        <Dialog open onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-xl rounded-2xl shadow-xl border border-gray-200 p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-800">
                        Edit Peripheral –{" "}
                        <span className="text-[color:var(--app-green,#16A34A)]">
                            {peripheral?.peripheral_code || "N/A"}
                        </span>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-5 py-2">
                    {/* ROW 1: Type & Serial */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-1 block">Type</Label>
                            <Input
                                value={data.type}
                                onChange={(e) =>
                                    setData("type", e.target.value)
                                }
                                placeholder="Keyboard, Mouse, Monitor"
                                className="rounded-lg"
                            />
                            {errors.type && (
                                <p className="text-sm text-red-500">
                                    {errors.type}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label className="mb-1 block">Serial Number</Label>
                            <Input
                                value={data.serial_number}
                                onChange={(e) =>
                                    setData("serial_number", e.target.value)
                                }
                                placeholder="Serial Number"
                                className="rounded-lg"
                            />
                            {errors.serial_number && (
                                <p className="text-sm text-red-500">
                                    {errors.serial_number}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ROW 2: Brand & Model */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-1 block">Brand</Label>
                            <Input
                                value={data.brand}
                                onChange={(e) =>
                                    setData("brand", e.target.value)
                                }
                                placeholder="Enter brand"
                                className="rounded-lg"
                            />
                            {errors.brand && (
                                <p className="text-sm text-red-500">
                                    {errors.brand}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label className="mb-1 block">Model</Label>
                            <Input
                                value={data.model}
                                onChange={(e) =>
                                    setData("model", e.target.value)
                                }
                                placeholder="Enter model"
                                className="rounded-lg"
                            />
                            {errors.model && (
                                <p className="text-sm text-red-500">
                                    {errors.model}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ROW 3: Room & Unit */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-1 block">Room</Label>
                            <select
                                value={data.room_id}
                                onChange={(e) =>
                                    setData("room_id", e.target.value)
                                }
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="">Select Room</option>
                                {rooms.map((room) => (
                                    <option key={room.id} value={room.id}>
                                        {room.room_number}
                                    </option>
                                ))}
                            </select>
                            {errors.room_id && (
                                <p className="text-sm text-red-500">
                                    {errors.room_id}
                                </p>
                            )}
                        </div>
                        <div>
                            <Label className="mb-1 block">Unit</Label>
                            <select
                                value={data.unit_id}
                                onChange={(e) =>
                                    setData("unit_id", e.target.value)
                                }
                                disabled={!data.room_id}
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="">Select Unit</option>
                                {filteredUnits.map((unit) => (
                                    <option key={unit.id} value={unit.id}>
                                        {unit.unit_code}
                                    </option>
                                ))}
                            </select>
                            {errors.unit_id && (
                                <p className="text-sm text-red-500">
                                    {errors.unit_id}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ROW 4: Condition & Condition Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-1 block">Condition</Label>
                            <select
                                value={data.condition}
                                onChange={(e) =>
                                    setData("condition", e.target.value)
                                }
                                className="w-full border rounded-lg px-3 py-2 text-sm"
                            >
                                <option value="">Select Condition</option>
                                {Object.keys(CONDITION_COLORS).map((cond) => (
                                    <option key={cond} value={cond}>
                                        {cond}
                                    </option>
                                ))}
                            </select>
                            {data.condition && (
                                <div className="mt-1 text-sm flex items-center gap-2">
                                    <span
                                        className={cn(
                                            "inline-block w-3 h-3 rounded-full",
                                            getConditionColor(
                                                data.condition
                                            ).split(" ")[0]
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
                        <div>
                            <Label className="mb-1 block">
                                Condition Details
                            </Label>
                            <Textarea
                                value={data.condition_details}
                                onChange={(e) =>
                                    setData("condition_details", e.target.value)
                                }
                                placeholder="Describe issues, missing keys, loose cable, etc."
                                rows={3}
                            />
                            {errors.condition_details && (
                                <p className="text-sm text-red-500">
                                    {errors.condition_details}
                                </p>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-[color:var(--app-green,#16A34A)] hover:opacity-90 text-white"
                    >
                        Update Peripheral
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
