import { useForm, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Swal from "sweetalert2";

export default function AddRoomPage() {
    const { data, setData, post, processing, errors } = useForm({
        room_number: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post("/admin/rooms", {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    icon: "success",
                    title: "Room added successfully!",
                    timer: 1500,
                    showConfirmButton: false,
                });
                router.visit("/admin/rooms"); // Go back to list after success
            },
        });
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h1 className="text-xl font-bold mb-4">Add New Room</h1>
            <form onSubmit={submit} className="space-y-4">
                <Input
                    placeholder="e.g. 101"
                    value={data.room_number}
                    onChange={(e) => setData("room_number", e.target.value)}
                />
                {errors.room_number && (
                    <p className="text-sm text-red-500">{errors.room_number}</p>
                )}
                <Button type="submit" disabled={processing}>
                    Add Room
                </Button>
            </form>
        </div>
    );
}
