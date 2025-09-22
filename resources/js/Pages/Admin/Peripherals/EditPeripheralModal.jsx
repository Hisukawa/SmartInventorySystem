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
import { cn } from "@/lib/utils";
import Swal from "sweetalert2";

/* ✅ Peripheral Condition Options with Color */
const CONDITION_OPTIONS = [
    { label: "Functional", color: "bg-green-500" }, // fully functional
    { label: "Defective", color: "bg-red-500" }, // broken / not usable
    { label: "Intermittent Issue", color: "bg-yellow-500" }, // works sometimes / unstable
    { label: "Needs Cleaning", color: "bg-blue-500" }, // dirty / minor issue
    { label: "For Replacement", color: "bg-orange-500" }, // usable but needs replacing soon
    { label: "For Disposal", color: "bg-gray-500" }, // completely unusable
];

export default function EditPeripheralModal({
    peripheral,
    rooms = [],
    units = [],
    onClose,
}) {
    console.log("Units from Laravel:", units);

    const { data, setData, put, processing, errors } = useForm({
        type: peripheral?.type || "",
        brand: peripheral?.brand || "",
        model: peripheral?.model || "",
        serial_number: peripheral?.serial_number || "",
        condition: peripheral?.condition || "",
        room_id: peripheral?.room_id || "",
        unit_id: peripheral?.unit_id || "",
    });

    /* ✅ Filter Units by Room */
    const [filteredUnits, setFilteredUnits] = useState([]);

    useEffect(() => {
        if (data.room_id) {
            // filter only units in selected room
            const unitsForRoom = units.filter(
                (unit) => String(unit.room_id) === String(data.room_id)
            );
            setFilteredUnits(unitsForRoom);

            // reset unit_id if it doesn't belong in selected room
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

    const getConditionColor = (condition) => {
        const found = CONDITION_OPTIONS.find(
            (opt) => opt.label.toLowerCase() === condition.toLowerCase()
        );
        return found ? found.color : "bg-gray-300";
    };

    return (
        <Dialog open onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        Edit Peripheral – {peripheral?.peripheral_code}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-4">
                    {/* Type */}
                    <div>
                        <Label htmlFor="type">Type</Label>
                        <Input
                            id="type"
                            value={data.type}
                            onChange={(e) => setData("type", e.target.value)}
                            placeholder="e.g. Keyboard, Mouse, Monitor"
                        />
                        {errors.type && (
                            <p className="text-sm text-red-500">
                                {errors.type}
                            </p>
                        )}
                    </div>

                    {/* Serial Number */}
                    <div>
                        <Label htmlFor="serial_number">Serial Number</Label>
                        <Input
                            id="serial_number"
                            value={data.serial_number}
                            onChange={(e) =>
                                setData("serial_number", e.target.value)
                            }
                            placeholder="Serial Number"
                        />
                        {errors.serial_number && (
                            <p className="text-sm text-red-500">
                                {errors.serial_number}
                            </p>
                        )}
                    </div>

                    {/* Condition */}
                    <div>
                        <Label htmlFor="condition">Condition</Label>
                        <select
                            id="condition"
                            className="w-full border rounded-md p-2"
                            value={data.condition}
                            onChange={(e) =>
                                setData("condition", e.target.value)
                            }
                        >
                            <option value="">Select Condition</option>
                            {CONDITION_OPTIONS.map((opt) => (
                                <option key={opt.label} value={opt.label}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>

                        {/* Preview selected condition */}
                        {data.condition && (
                            <div className="mt-1 text-sm flex items-center gap-2">
                                <span
                                    className={cn(
                                        "inline-block w-3 h-3 rounded-full",
                                        getConditionColor(data.condition)
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

                    {/* Room */}
                    <div>
                        <Label htmlFor="room_id">Room</Label>
                        <select
                            id="room_id"
                            className="w-full border rounded-md p-2"
                            value={data.room_id}
                            onChange={(e) => setData("room_id", e.target.value)}
                        >
                            <option value="">Select Room</option>
                            {rooms.length > 0 ? (
                                rooms.map((room) => (
                                    <option key={room.id} value={room.id}>
                                        {room.room_number}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No rooms available</option>
                            )}
                        </select>
                        {errors.room_id && (
                            <p className="text-sm text-red-500">
                                {errors.room_id}
                            </p>
                        )}
                    </div>

                    {/* Unit */}
                    <div>
                        <Label htmlFor="unit_id">Unit</Label>
                        <select
                            id="unit_id"
                            className="w-full border rounded-md p-2"
                            value={data.unit_id}
                            onChange={(e) => setData("unit_id", e.target.value)}
                            disabled={!data.room_id} // disable until room is chosen
                        >
                            <option value="">Select Unit</option>
                            {filteredUnits.length > 0 ? (
                                filteredUnits.map((unit) => (
                                    <option key={unit.id} value={unit.id}>
                                        {unit.unit_code}
                                    </option>
                                ))
                            ) : (
                                <option disabled>No units available</option>
                            )}
                        </select>
                        {errors.unit_id && (
                            <p className="text-sm text-red-500">
                                {errors.unit_id}
                            </p>
                        )}
                    </div>

                    {/* Brand */}
                    <div>
                        <Label htmlFor="brand">Brand</Label>
                        <Input
                            id="brand"
                            value={data.brand}
                            onChange={(e) => setData("brand", e.target.value)}
                            placeholder="Enter brand"
                        />
                        {errors.brand && (
                            <p className="text-sm text-red-500">
                                {errors.brand}
                            </p>
                        )}
                    </div>

                    {/* Model */}
                    <div>
                        <Label htmlFor="model">Model</Label>
                        <Input
                            id="model"
                            value={data.model}
                            onChange={(e) => setData("model", e.target.value)}
                            placeholder="Enter model"
                        />
                        {errors.model && (
                            <p className="text-sm text-red-500">
                                {errors.model}
                            </p>
                        )}
                    </div>

                    <Button type="submit" disabled={processing}>
                        Update
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
