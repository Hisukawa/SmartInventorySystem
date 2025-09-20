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
const CONDITION_OPTIONS = [
    { label: "Functional", color: "bg-green-500" },
    { label: "Defective", color: "bg-red-500" },
    { label: "Under Maintenance", color: "bg-yellow-500" },
    { label: "Needs Upgrade", color: "bg-blue-500" },
    { label: "For Disposal", color: "bg-gray-500" },
];

export default function EditPeripheralModal({
    peripheral,
    rooms = [],
    units = [],
    onClose,
}) {
    const { data, setData, put, processing, errors } = useForm({
        type: peripheral?.type || "",
        serial_number: peripheral?.serial_number || "",
        condition: peripheral?.condition || "",
        room_id: peripheral?.room_id || "",
        unit_id: peripheral?.unit_id || "", // <-- use unit_id
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    put(route("technician.update", peripheral.id), {
        onSuccess: () => {
            // Show success Swal
            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Peripheral updated successfully.",
                timer: 2000,
                showConfirmButton: false,
            });

            // Close the modal
            onClose();
        },
        onError: (errors) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: errors?.type || "Failed to update peripheral. Please check your input.",
            });
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
            <DialogContent className="max-w-lg">
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
                        <Input
                            id="condition"
                            list="condition-options"
                            value={data.condition}
                            onChange={(e) =>
                                setData("condition", e.target.value)
                            }
                            placeholder="Type or select"
                        />
                        <datalist id="condition-options">
                            {CONDITION_OPTIONS.map((opt) => (
                                <option key={opt.label} value={opt.label} />
                            ))}
                        </datalist>

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
                        >
                            <option value="">Select Unit</option>
                            {units.length > 0 ? (
                                units.map((unit) => (
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

                    <Button type="submit" disabled={processing}>
                        Update
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
