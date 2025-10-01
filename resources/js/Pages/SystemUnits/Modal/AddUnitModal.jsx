import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useForm, usePage } from "@inertiajs/react";

// ✅ Finalized overall PC condition options
const CONDITION_OPTIONS = [
    { label: "Functional", color: "bg-green-500" },
    { label: "Needs Boot / Pending Check", color: "bg-orange-500" },
    { label: "Defective", color: "bg-red-500" },
    { label: "Under Maintenance", color: "bg-yellow-500" },
    { label: "Needs Upgrade", color: "bg-blue-500" },
    { label: "For Disposal", color: "bg-gray-500" },
];

// ✅ Finalized component condition options
const COMPONENT_CONDITION_OPTIONS = [
    "Working",
    "Defective",
    "Needs Upgrade",
    "Under Maintenance",
    "Not Present",
];

const COMPONENTS = ["Processor", "RAM", "Storage", "GPU", "Motherboard"];

export default function AddUnitModal() {
    const { rooms } = usePage().props;
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        unit_code: "",
        condition: "",
        room_id: "",
        ...COMPONENTS.reduce((acc, comp) => {
            acc[`${comp.toLowerCase()}_condition`] = "";
            acc[`${comp.toLowerCase()}_remark`] = "";
            return acc;
        }, {}),
    });

    const getConditionColor = (value) => {
        const match = CONDITION_OPTIONS.find(
            (opt) => opt.label.toLowerCase() === value.toLowerCase()
        );
        return match ? match.color : "bg-muted";
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/system-units", {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
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

    // ✅ Auto-calculate overall PC condition from components
    useEffect(
        () => {
            const componentConditions = COMPONENTS.map(
                (comp) => data[`${comp.toLowerCase()}_condition`]
            );

            if (componentConditions.includes("Defective")) {
                setData("condition", "Defective");
            } else if (componentConditions.includes("Needs Upgrade")) {
                setData("condition", "Needs Upgrade");
            } else if (componentConditions.includes("Under Maintenance")) {
                setData("condition", "Under Maintenance");
            } else if (componentConditions.includes("Not Present")) {
                setData("condition", "Needs Upgrade"); // Missing part may mean upgrade needed
            } else {
                setData("condition", "Functional");
            }
        },
        COMPONENTS.map((comp) => data[`${comp.toLowerCase()}_condition`])
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium">
                    Add Unit
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add System Unit</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Room */}
                    <div>
                        <Label htmlFor="room_number">Room</Label>
                        <Input
                            id="room_number"
                            list="room-options"
                            value={typedRoom}
                            onChange={(e) => setTypedRoom(e.target.value)}
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
                            name="unit_code"
                            value={data.unit_code}
                            onChange={(e) =>
                                setData("unit_code", e.target.value)
                            }
                            placeholder="01"
                            required
                        />
                        {errors.unit_code && (
                            <p className="text-sm text-red-500">
                                {errors.unit_code}
                            </p>
                        )}
                    </div>

                    {/* Component Conditions & Remarks */}
                    <div>
                        <Label>Components & Conditions</Label>
                        <div className="grid grid-cols-1 gap-4">
                            {COMPONENTS.map((comp) => {
                                const field = comp.toLowerCase();
                                return (
                                    <div key={comp}>
                                        <Label htmlFor={`${field}_condition`}>
                                            {comp}
                                        </Label>
                                        <Input
                                            id={`${field}_condition`}
                                            list={`${field}-condition-options`}
                                            value={
                                                data[`${field}_condition`] || ""
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    `${field}_condition`,
                                                    e.target.value
                                                )
                                            }
                                            placeholder={`Select ${comp} condition`}
                                        />
                                        <datalist
                                            id={`${field}-condition-options`}
                                        >
                                            {COMPONENT_CONDITION_OPTIONS.map(
                                                (opt) => (
                                                    <option
                                                        key={opt}
                                                        value={opt}
                                                    />
                                                )
                                            )}
                                        </datalist>

                                        {data[`${field}_condition`] ===
                                            "Defective" && (
                                            <div className="mt-1">
                                                <Label
                                                    htmlFor={`${field}_remark`}
                                                >
                                                    Describe the problem
                                                </Label>
                                                <Input
                                                    id={`${field}_remark`}
                                                    value={
                                                        data[`${field}_remark`]
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            `${field}_remark`,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={`e.g. ${comp} overheating`}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Overall Condition */}
                    <div>
                        <Label htmlFor="condition">Overall Condition</Label>
                        <Input
                            id="condition"
                            list="condition-options"
                            value={data.condition}
                            onChange={(e) =>
                                setData("condition", e.target.value)
                            }
                            placeholder="Overall PC condition"
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

                    <div className="flex justify-end">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
