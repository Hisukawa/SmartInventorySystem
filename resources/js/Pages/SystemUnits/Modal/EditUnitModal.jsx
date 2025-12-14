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
    "To Be Diagnosed": "bg-blue-100 text-blue-700",
};

export default function EditUnitModal({ unit, rooms, onClose, onSuccess }) {
    const { data, setData, put, processing, errors } = useForm({
        unit_code: unit.unit_code,
        processor: unit.processor,
        ram: unit.ram,
        storage: unit.storage,
        gpu: unit.gpu,
        motherboard: unit.motherboard,
        serial_number: unit.serial_number || "",
        operating_system: unit.operating_system || "",
        condition: unit.condition,
        condition_details: unit.condition_details || "",
        room_id: unit.room_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/system-units/${unit.id}`, {
            onSuccess: () => {
                onClose();
                if (onSuccess) onSuccess();
            },
        });
    };

    const getConditionColor = (condition) => {
        if (!condition) return "bg-gray-300";
        return CONDITION_COLORS[condition] || "bg-gray-300 text-white";
    };

    return (
        <Dialog open onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-xl rounded-2xl shadow-xl border border-gray-200">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-gray-800">
                        Edit System Unit –{" "}
                        <span className="text-[color:var(--app-green,#16A34A)]">
                            {rooms.find((r) => r.id === unit.room_id)
                                ?.room_number || "N/A"}
                        </span>{" "}
                        – {unit.unit_code}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="grid gap-5 py-2">
                    {/* ROW 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* <div>
                            <Label className="mb-1 block">Unit Code</Label>
                            <Input
                                value={data.unit_code}
                                onChange={(e) =>
                                    setData("unit_code", e.target.value)
                                }
                                className="rounded-lg"
                            />
                            {errors.unit_code && (
                                <p className="text-sm text-red-500">
                                    {errors.unit_code}
                                </p>
                            )}
                        </div> */}
                        <div>
                            <Label className="mb-1 block">Unit Code</Label>
                            <Input
                                value={data.unit_code}
                                readOnly
                                className="rounded-lg bg-gray-100 cursor-not-allowed"
                            />
                            {errors.unit_code && (
                                <p className="text-sm text-red-500">
                                    {errors.unit_code}
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
                                placeholder="PC Serial Number"
                                className="rounded-lg"
                            />
                            {errors.serial_number && (
                                <p className="text-sm text-red-500">
                                    {errors.serial_number}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ROW 2 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-1 block">Processor</Label>
                            <Input
                                value={data.processor}
                                onChange={(e) =>
                                    setData("processor", e.target.value)
                                }
                                className="rounded-lg"
                            />
                            {errors.processor && (
                                <p className="text-sm text-red-500">
                                    {errors.processor}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className="mb-1 block">Motherboard</Label>
                            <Input
                                value={data.motherboard}
                                onChange={(e) =>
                                    setData("motherboard", e.target.value)
                                }
                                className="rounded-lg"
                            />
                            {errors.motherboard && (
                                <p className="text-sm text-red-500">
                                    {errors.motherboard}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ROW 3 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-1 block">RAM</Label>
                            <Input
                                value={data.ram}
                                onChange={(e) => setData("ram", e.target.value)}
                                className="rounded-lg"
                            />
                            {errors.ram && (
                                <p className="text-sm text-red-500">
                                    {errors.ram}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className="mb-1 block">Storage</Label>
                            <Input
                                value={data.storage}
                                onChange={(e) =>
                                    setData("storage", e.target.value)
                                }
                                className="rounded-lg"
                            />
                            {errors.storage && (
                                <p className="text-sm text-red-500">
                                    {errors.storage}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* ROW 4 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label className="mb-1 block">GPU</Label>
                            <Input
                                value={data.gpu}
                                onChange={(e) => setData("gpu", e.target.value)}
                                className="rounded-lg"
                            />
                            {errors.gpu && (
                                <p className="text-sm text-red-500">
                                    {errors.gpu}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label className="mb-1 block">
                                Operating System
                            </Label>
                            <Input
                                value={data.operating_system}
                                onChange={(e) =>
                                    setData("operating_system", e.target.value)
                                }
                                placeholder="Windows 10 / Linux / etc."
                                className="rounded-lg"
                            />
                            {errors.operating_system && (
                                <p className="text-sm text-red-500">
                                    {errors.operating_system}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* CONDITION */}
                    <div>
                        <Label className="mb-1 block">Condition</Label>
                        <select
                            value={data.condition}
                            onChange={(e) =>
                                setData("condition", e.target.value)
                            }
                            className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
                        >
                            <option value="" disabled>
                                Select Condition
                            </option>
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
                                        getConditionColor(data.condition)
                                    )}
                                />
                                <span>{data.condition}</span>
                            </div>
                        )}

                        {errors.condition && (
                            <p className="text-sm text-red-500">
                                {errors.condition}
                            </p>
                        )}
                    </div>

                    {/* CONDITION DETAILS */}
                    <div>
                        <Label className="mb-1 block">Condition Details</Label>
                        <textarea
                            className="w-full border rounded-lg p-2 text-sm"
                            rows={3}
                            placeholder="Describe issues, slow performance, faulty ports, etc."
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

                    {/* SUBMIT */}
                    <Button
                        type="submit"
                        disabled={processing}
                        className="rounded-lg bg-[color:var(--app-green,#16A34A)] hover:opacity-90 text-white"
                    >
                        Update System Unit
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
