import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { cn } from "@/lib/utils";

const CONDITION_OPTIONS = [
    { label: "Functional", color: "bg-green-500" },
    { label: "Defective", color: "bg-red-500" },
    { label: "Under Maintenance", color: "bg-yellow-500" },
    { label: "Needs Upgrade", color: "bg-blue-500" },
    { label: "For Disposal", color: "bg-gray-500" },
];

export default function EditUnitModal({ unit, rooms, onClose, onSuccess }) {
    const { data, setData, put, processing, errors } = useForm({
        unit_code: unit.unit_code,
        processor: unit.processor,
        ram: unit.ram,
        storage: unit.storage,
        gpu: unit.gpu,
        motherboard: unit.motherboard,
        condition: unit.condition,
        condition_details: unit.condition_details || "", // ✅ NEW FIELD
        room_id: unit.room_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/system-units/${unit.id}`, {
            onSuccess: () => {
                onClose();
                if (onSuccess) onSuccess(); // <-- triggers SweetAlert in parent
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit ROOM -{" "}
                        {rooms.find((r) => r.id === unit.room_id)
                            ?.room_number || "N/A"}{" "}
                        - {unit.unit_code}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    {/* Unit Code */}
                    <div>
                        <Input
                            value={data.unit_code}
                            onChange={(e) =>
                                setData("unit_code", e.target.value)
                            }
                            placeholder="Unit Code"
                        />
                        {errors.unit_code && (
                            <p className="text-sm text-red-500">
                                {errors.unit_code}
                            </p>
                        )}
                    </div>

                    {/* Processor */}
                    <div>
                        <Input
                            value={data.processor}
                            onChange={(e) =>
                                setData("processor", e.target.value)
                            }
                            placeholder="Processor"
                        />
                        {errors.processor && (
                            <p className="text-sm text-red-500">
                                {errors.processor}
                            </p>
                        )}
                    </div>

                    {/* RAM */}
                    <div>
                        <Input
                            value={data.ram}
                            onChange={(e) => setData("ram", e.target.value)}
                            placeholder="RAM"
                        />
                        {errors.ram && (
                            <p className="text-sm text-red-500">{errors.ram}</p>
                        )}
                    </div>

                    {/* Storage */}
                    <div>
                        <Input
                            value={data.storage}
                            onChange={(e) => setData("storage", e.target.value)}
                            placeholder="Storage"
                        />
                        {errors.storage && (
                            <p className="text-sm text-red-500">
                                {errors.storage}
                            </p>
                        )}
                    </div>

                    {/* GPU */}
                    <div>
                        <Input
                            value={data.gpu}
                            onChange={(e) => setData("gpu", e.target.value)}
                            placeholder="GPU"
                        />
                        {errors.gpu && (
                            <p className="text-sm text-red-500">{errors.gpu}</p>
                        )}
                    </div>

                    {/* Motherboard */}
                    <div>
                        <Input
                            value={data.motherboard}
                            onChange={(e) =>
                                setData("motherboard", e.target.value)
                            }
                            placeholder="Motherboard"
                        />
                        {errors.motherboard && (
                            <p className="text-sm text-red-500">
                                {errors.motherboard}
                            </p>
                        )}
                    </div>

                    {/* Condition */}
                    <div>
                        <Label htmlFor="condition">Condition</Label>
                        <select
                            id="condition"
                            value={data.condition}
                            onChange={(e) =>
                                setData("condition", e.target.value)
                            }
                            className="w-full border rounded px-2 py-1"
                        >
                            <option value="" disabled>
                                Select Condition
                            </option>
                            {CONDITION_OPTIONS.map((opt) => (
                                <option key={opt.label} value={opt.label}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>

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
                    {/* ✅ Condition Details */}
                    <div>
                        <Label htmlFor="condition_details">
                            Condition Details
                        </Label>
                        <textarea
                            id="condition_details"
                            className="w-full border rounded-md p-2 text-sm"
                            rows={3}
                            placeholder="Describe condition details (e.g. slow performance, faulty port, etc.)"
                            value={data.condition_details}
                            onChange={(e) =>
                                setData("condition_details", e.target.value)
                            }
                        />
                        {errors.condition_details && (
                            <p className="text-sm text-red-500">
                                {errors.condition_details}
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
