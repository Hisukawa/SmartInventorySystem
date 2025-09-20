import { useState } from "react";
import { useForm, router, Link } from "@inertiajs/react";
import QRCode from "react-qr-code";
import Swal from "sweetalert2";
import { TechnicianAppSidebar } from "@/components/TechnicianComponent/technician-app-sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, } from "@/components/ui/breadcrumb";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";


import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function TechnicianRoomPage({ rooms, search }) {
    const [searchTerm, setSearchTerm] = useState(search || "");
    const [addRoomModalOpen, setAddRoomModalOpen] = useState(false);
    const [editRoomModalOpen, setEditRoomModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedQR, setSelectedQR] = useState("");
    const [selectedRoomNumber, setSelectedRoomNumber] = useState("");
    const [copied, setCopied] = useState(false);


    // normalize rooms so it's always an array
    const roomList = Array.isArray(rooms) ? rooms : rooms?.data || [];


    // CREATE FORM
    const { data, setData, post, reset, processing, errors } = useForm({
        room_number: "",
    });

    // EDIT FORM
    const {
        data: editData,
        setData: setEditData,
        put,
        processing: editProcessing,
        errors: editErrors,
        reset: resetEdit,
    } = useForm({ room_number: "" });

const submit = (e) => {
    e.preventDefault();

    post("/technician/rooms/create", {
        preserveScroll: true, // stays on the current scroll position
        onSuccess: () => {
            reset();
            setAddRoomModalOpen(false);

            Swal.fire({
                title: "Room added successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: "technician-success-message"
                }
            }).then(() => {
                // Reload the page to fetch updated room list
                router.reload();
            });
        },
        onError: (errors) => {
            Swal.fire({
                title: errors.room_number || "Error adding room",
                icon: "error",
                showConfirmButton: true,
                customClass: {
                    popup: "technician-success-message"
                }
            });
        }
    });
};


const submitEdit = (e) => {
    e.preventDefault();

    put(`/technician/rooms/${selectedRoom.id}`, {
        preserveScroll: true,
        onSuccess: () => {
            setEditRoomModalOpen(false);
            resetEdit();

            Swal.fire({
                title: "Room updated successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
                customClass: {
                    popup: "technician-success-message"
                }
            }).then(() => {
                // Reload the page to fetch updated room list
                router.reload();
            });
        },
        onError: (errors) => {
            Swal.fire({
                title: errors.room_number || "Error updating room",
                icon: "error",
                showConfirmButton: true,
                customClass: {
                    popup: "technician-success-message"
                }
            });
        }
    });
};

    const openEditModal = (room) => {
        setSelectedRoom(room);
        setEditData("room_number", room.room_number);
        setEditRoomModalOpen(true);
    };

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            router.get("/technician/rooms", { search: searchTerm });
        }
    };

    const handleQRCodeClick = (qrValue, roomNumber) => {
        if (qrValue) {
            setSelectedQR(qrValue);
            setSelectedRoomNumber(roomNumber);
        }
    };

    const handleDownload = () => {
        const svg = document.getElementById("qr-download");
        const serializer = new XMLSerializer();
        const svgData = serializer.serializeToString(svg);
        const svgBlob = new Blob([svgData], {
            type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
            const qrSize = 200;
            const padding = 10;
            const textHeight = 30;
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = qrSize + padding * 2;
            canvas.height = qrSize + textHeight + padding * 3;

            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.drawImage(img, padding, padding, qrSize, qrSize);

            ctx.fillStyle = "#000";
            ctx.font = "bold 16px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(
                `ROOM ${selectedRoomNumber}`,
                canvas.width / 2,
                qrSize + padding * 2 + 15
            );

            const finalImage = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = finalImage;
            link.download = `room-${selectedRoomNumber}-qr.png`;
            link.click();
        };

        img.src = url;
    };

    const handleCopy = async () => {
        await navigator.clipboard.writeText(selectedQR);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

const handleDelete = (id) => {
    Swal.fire({
        title: "Are you sure?",
        text: "This room will be permanently deleted.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(`/technician/rooms/${id}`, {
                preserveScroll: true,
                onSuccess: () => {
                    Swal.fire({
                        title: "Room deleted successfully!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500,
                        customClass: {
                            popup: "technician-success-message"
                        }
                    }).then(() => {
                        // Reload the page to fetch updated room list
                        router.reload();
                    });
                },
            });
        }
    });
};


    return (
        <SidebarProvider>
            <TechnicianAppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href="/technician/rooms"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    Room Lists
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex-1" />
                 
                </header>

                <main className="w-full px-6 py-4 overflow-y-auto">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold">Room Management</h1>
                    </div>
                   

                    {/* Edit Room Modal */}
                    <Dialog
                        open={editRoomModalOpen}
                        onOpenChange={setEditRoomModalOpen}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Room</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={submitEdit} className="space-y-4">
                                <Input
                                    placeholder="e.g. 101"
                                    value={editData.room_number}
                                    onChange={(e) =>
                                        setEditData("room_number", e.target.value)
                                    }
                                />
                                {editErrors.room_number && (
                                    <p className="text-sm text-red-500">
                                        {editErrors.room_number}
                                    </p>
                                )}
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setEditRoomModalOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={editProcessing}>
                                        Update
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <div className="flex transition-all duration-700 ease-in-out relative">
                        {/* Left Side */}
                        <div
                            className={`flex-1 transition-all duration-700 ease-in-out ${
                                addRoomModalOpen ? "mr-[400px] sm:mr-[500px]" : "mr-0"
                            }`}
                        >
                            {/* Search + Add */}
                            <div className="flex items-center justify-between mb-4 gap-2">
                                <Input
                                    placeholder="Search rooms..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleSearch}
                                    className="w-full sm:w-1/3"
                                />

                                <Button onClick={() => setAddRoomModalOpen(true)}>
                                    Add Room
                                </Button>
                            </div>

                            {/* Table */}
                            <div className="rounded-md border">
                                <div className="max-h-[500px] overflow-y-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>#</TableHead>
                                                <TableHead>Room Name</TableHead>
                                                <TableHead>Room Code</TableHead>
                                                <TableHead>QR Code</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                         {roomList.map((room, index) => {
                                                const qrValue =
                                                    typeof room.room_path === "string"
                                                        ? `${window.location.origin}/room/${room.room_path}`
                                                        : null;

                                                return (
                                                    <TableRow key={room.id}>
                                                        <TableCell>
                                                          {rooms?.current_page
                                                            ? (rooms.current_page - 1) * rooms.per_page + index + 1
                                                            : index + 1}

                                                        </TableCell>
                                                        <TableCell>
                                                            ROOM {room.room_number}
                                                        </TableCell>
                                                        <TableCell>
                                                            {room.room_path}
                                                        </TableCell>
                                                        <TableCell>
                                                            {qrValue ? (
                                                                <div
                                                                    className="w-16 h-16 bg-white p-1 rounded cursor-pointer m-1"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleQRCodeClick(
                                                                            qrValue,
                                                                            room.room_number
                                                                        );
                                                                    }}
                                                                >
                                                                    <QRCode
                                                                        value={qrValue}
                                                                        size={64}
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <span className="text-sm text-gray-500">
                                                                    No QR
                                                                </span>
                                                            )}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                                onClick={() =>
                                                                    openEditModal(room)
                                                                }
                                                                className="mr-2"
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() =>
                                                                    handleDelete(room.id)
                                                                }
                                                            >
                                                                Delete
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </div>

                                {/* Pagination */}
                                <div className="mt-2 flex flex-col sm:flex-row justify-between items-center gap-2">
                                    <span className="text-sm text-muted-foreground m-2">
                                        Page {rooms.current_page} of {rooms.last_page}
                                    </span>
                                   {rooms?.links && (
                            <div className="flex flex-wrap justify-center items-center gap-2">
                                {rooms.links.map((link, index) => {
                                const label = link.label
                                    .replace("&laquo;", "«")
                                    .replace("&raquo;", "»");

                                return (
                                    <Button
                                    key={index}
                                    variant={link.active ? "default" : "ghost"}
                                    size="sm"
                                    className="min-w-[36px] px-3 py-1"
                                    onClick={() =>
                                        link.url &&
                                        router.visit(link.url, {
                                        preserveState: true,
                                        preserveScroll: true,
                                        })
                                    }
                                    disabled={!link.url}
                                    dangerouslySetInnerHTML={{ __html: label }}
                                    />
                                );
                                })}
                            </div>
                            )}

                                </div>
                            </div>
                        </div>

                        {/* Right Drawer Add Room */}
                        <div
                            className={`fixed top-[56px] right-0 h-[calc(100vh-4rem)] w-[400px] sm:w-[500px] bg-white border-l shadow-lg z-40 p-4 overflow-y-auto transform transition-transform duration-700 ease-in-out ${
                                addRoomModalOpen ? "translate-x-0" : "translate-x-full"
                            }`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold">Add Room</h2>
                            </div>

                            <form onSubmit={submit} className="space-y-4">
                                <Input
                                    placeholder="e.g. 101"
                                    value={data.room_number}
                                    onChange={(e) =>
                                        setData("room_number", e.target.value)
                                    }
                                />
                                {errors.room_number && (
                                    <p className="text-sm text-red-500">
                                        {errors.room_number}
                                    </p>
                                )}
                                <div className="flex justify-end gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setAddRoomModalOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* QR Modal */}
                    <Dialog
                        open={!!selectedQR}
                        onOpenChange={() => {
                            setSelectedQR("");
                            setSelectedRoomNumber("");
                        }}
                    >
                        <DialogContent className="max-w-sm text-center">
                            <DialogTitle>ROOM {selectedRoomNumber}</DialogTitle>
                            <div className="flex flex-col items-center justify-center">
                                <div
                                    className="inline-block p-4 bg-white rounded cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleCopy();
                                    }}
                                >
                                    <QRCode
                                        id="qr-download"
                                        value={selectedQR}
                                        size={200}
                                    />
                                    <p className="text-xs mt-2 text-muted-foreground">
                                        Click QR to copy link
                                    </p>
                                </div>
                                {copied && (
                                    <p className="text-green-600 text-sm mt-1">
                                        Copied to clipboard!
                                    </p>
                                )}
                                <Button className="mt-4" onClick={handleDownload}>
                                    Download QR
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
