import { useEffect, useState } from "react";
import Swal from "sweetalert2";
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

const CONDITION_OPTIONS = [
    { label: "Functional", color: "bg-green-500" },
    { label: "Defective", color: "bg-red-500" },
    { label: "Under Maintenance", color: "bg-yellow-500" },
    { label: "Needs Upgrade", color: "bg-blue-500" },
    { label: "For Disposal", color: "bg-gray-500" },
];

export default function AddUnitModal() {
    const { rooms } = usePage().props;
    const [open, setOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        unit_code: "",
        processor: "",
        ram: "",
        storage: "",
        gpu: "",
        motherboard: "",
        condition: "",
        room_id: "",
    });

    const getConditionColor = (value) => {
        const match = CONDITION_OPTIONS.find(
            (opt) => opt.label.toLowerCase() === value.toLowerCase()
        );
        return match ? match.color : "bg-muted";
    };

const handleSubmit = (e) => {
    e.preventDefault();

    post("/technician/units/create", {
        onSuccess: () => {
            reset();
            setOpen(false);

            Swal.fire({
                title: "System Unit added successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: "technician-success-message",
                },
            });
        },
        onError: (errors) => {
            Swal.fire({
                title: errors.unit_code || "Error adding unit",
                icon: "error",
                showConfirmButton: true,
                customClass: {
                    popup: "technician-error-message",
                },
            });
        },
    });
};
    const [typedRoom, setTypedRoom] = useState(""); // what user types

    useEffect(() => {
        // Match user input to room number and save its ID
        const selectedRoom = rooms.find(
            (room) =>
                `ROOM ${room.room_number}`.toLowerCase() ===
                typedRoom.toLowerCase()
        );

        if (selectedRoom) {
            setData("room_id", selectedRoom.id); // save id to DB
        } else {
            setData("room_id", ""); // clear if unmatched
        }
    }, [typedRoom]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add Unit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add System Unit</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
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

                    <div>
                        <Label htmlFor="unit_code">Pc Code</Label>
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

                    <div>
                        <Label htmlFor="processor">Processor</Label>
                        <Input
                            id="processor"
                            name="processor"
                            value={data.processor}
                            onChange={(e) =>
                                setData("processor", e.target.value)
                            }
                            placeholder="Intel Core i5-10400"
                        />
                        {errors.processor && (
                            <p className="text-sm text-red-500">
                                {errors.processor}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="ram">RAM</Label>
                        <Input
                            id="ram"
                            name="ram"
                            value={data.ram}
                            onChange={(e) => setData("ram", e.target.value)}
                            placeholder="16GB DDR5"
                        />
                        {errors.ram && (
                            <p className="text-sm text-red-500">{errors.ram}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="storage">Storage</Label>
                        <Input
                            id="storage"
                            name="storage"
                            value={data.storage}
                            onChange={(e) => setData("storage", e.target.value)}
                            placeholder="512GB NVME SATA SSD"
                        />
                        {errors.storage && (
                            <p className="text-sm text-red-500">
                                {errors.storage}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="gpu">GPU</Label>
                        <Input
                            id="gpu"
                            name="gpu"
                            value={data.gpu}
                            onChange={(e) => setData("gpu", e.target.value)}
                            placeholder="NVIDIA GeForce RTX 5090"
                        />
                        {errors.gpu && (
                            <p className="text-sm text-red-500">{errors.gpu}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="motherboard">Motherboard</Label>
                        <Input
                            id="motherboard"
                            name="motherboard"
                            value={data.motherboard}
                            onChange={(e) =>
                                setData("motherboard", e.target.value)
                            }
                            placeholder="ASUS ROG Maximus Z790 Dark Hero (Intel)"
                        />
                        {errors.motherboard && (
                            <p className="text-sm text-red-500">
                                {errors.motherboard}
                            </p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="condition">Condition</Label>
                        <Input
                            id="condition"
                            list="condition-options"
                            value={data.condition}
                            onChange={(e) =>
                                setData("condition", e.target.value)
                            }
                            placeholder="Type or select Condition"
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
                        <Button type="submit" disabled={processing}>
                            Submit
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
