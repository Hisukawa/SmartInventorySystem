// EditUnitModal.jsx
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label"; // ✅ ADD THIS
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

export default function EditUnitModal({ unit, rooms, onClose }) {
    const { data, setData, put, processing, errors } = useForm({
        unit_code: unit.unit_code,
        processor: unit.processor,
        ram: unit.ram,
        storage: unit.storage,
        gpu: unit.gpu,
        motherboard: unit.motherboard,
        condition: unit.condition,
        room_id: unit.room_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/system-units/${unit.id}`, {
            onSuccess: () => {
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
                    <Input
                        value={data.unit_code}
                        onChange={(e) => setData("unit_code", e.target.value)}
                        placeholder="Unit Code"
                    />
                    <Input
                        value={data.processor}
                        onChange={(e) => setData("processor", e.target.value)}
                        placeholder="Processor"
                    />
                    <Input
                        value={data.ram}
                        onChange={(e) => setData("ram", e.target.value)}
                        placeholder="RAM"
                    />
                    <Input
                        value={data.storage}
                        onChange={(e) => setData("storage", e.target.value)}
                        placeholder="Storage"
                    />
                    <Input
                        value={data.gpu}
                        onChange={(e) => setData("gpu", e.target.value)}
                        placeholder="GPU"
                    />
                    <Input
                        value={data.motherboard}
                        onChange={(e) => setData("motherboard", e.target.value)}
                        placeholder="Motherboard"
                    />
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

                    <Button type="submit" disabled={processing}>
                        Update
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
