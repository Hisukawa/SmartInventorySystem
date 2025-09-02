import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import QRCode from "react-qr-code";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export default function ViewUnit({ unit }) {
    const [selectedQR, setSelectedQR] = useState(null);
    const [selectedRoomNumber, setSelectedRoomNumber] = useState(null);
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleQRCodeClick = (qrValue, roomNumber) => {
        if (qrValue) {
            setSelectedQR(qrValue);
            setSelectedRoomNumber(roomNumber);
            setOpen(true);
            setCopied(false); // reset copied state when reopening modal
        }
    };

    const handleModalQRClick = async () => {
        if (selectedQR) {
            try {
                await navigator.clipboard.writeText(selectedQR);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // hide message after 2s
            } catch (err) {
                console.error("Failed to copy: ", err);
            }
        }
    };

    const handleDownload = () => {
        if (!selectedQR) return;

        const canvas = document.createElement("canvas");
        const svg = document.querySelector("#modal-qr svg");
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svg);
        const img = new Image();
        const blob = new Blob([svgStr], {
            type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            // 🔑 Format filename as Sentence Case
            const formattedRoom = `Room-${unit.room_number}`;
            const formattedUnit = `Unit-${unit.unit_code
                .replace(/^unit[-_]?/i, "")
                .replace(/^0+/, "0")}`;

            const fileName = `ROOM-${unit.room?.room_number}_${unit.unit_code}.png`;

            const link = document.createElement("a");
            link.download = fileName;
            link.href = canvas.toDataURL("image/png");
            link.click();
        };
        img.src = url;
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Header */}
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" aria-current="page">
                                    Assets
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink href="/units">
                                    System Unit Lists
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href={`/system-units/view/${unit.unit_code}`}
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    View Unit
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Main Content */}
                <Head title={`View ${unit.unit_code}`} />
                <main className="p-6">
                    <h1 className="text-2xl font-bold mb-4">
                        System Unit Information
                    </h1>

                    <div className="bg-white shadow rounded p-6 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <strong>Unit Code:</strong> {unit.unit_code}
                        </div>
                        <div>
                            <strong>Processor:</strong> {unit.processor}
                        </div>
                        <div>
                            <strong>RAM:</strong> {unit.ram}
                        </div>
                        <div>
                            <strong>Storage:</strong> {unit.storage}
                        </div>
                        <div>
                            <strong>GPU:</strong> {unit.gpu}
                        </div>
                        <div>
                            <strong>Motherboard:</strong> {unit.motherboard}
                        </div>
                        <div>
                            <strong>Condition:</strong> {unit.condition}
                        </div>
                        <div className="col-span-2 flex flex-col items-center mt-4">
               <div
                        className="bg-white p-2 rounded cursor-pointer hover:shadow-md transition"
                        onClick={() => {
                            handleQRCodeClick(
                            route("units.public.show", { unit_path: unit.unit_path }),
                            unit.room?.room_number || "room"
                            );
                        }}
                        >
                        <QRCode
                            value={route("units.public.show", { unit_path: unit.unit_path })}
                            size={128}
                        />
                        </div>

             

                            <span className="mt-2 text-sm text-muted-foreground">
                                Scan to view public info
                            </span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Button
                            variant="secondary"
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </Button>
                    </div>
                </main>

                {/* QR Code Modal */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="flex flex-col items-center">
                        <DialogHeader>
                            <DialogTitle>
                                QR Code for {selectedRoomNumber} -{" "}
                                {unit.unit_code}
                            </DialogTitle>
                        </DialogHeader>
                        {selectedQR && (
                            <div
                                id="modal-qr"
                                className="cursor-pointer"
                                onClick={handleModalQRClick}
                            >
                                <QRCode value={selectedQR} size={256} />
                            </div>
                        )}
                        <span className="text-xs text-muted-foreground">
                            Click QR to copy link
                        </span>
                        {/* Copy message */}
                        {copied && (
                            <span className="text-green-600 text-sm">
                                QR code path copied!
                            </span>
                        )}
                        <div className="mt-1 flex gap-2">
                            <Button onClick={handleDownload}>Download</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </SidebarInset>
        </SidebarProvider>
    );
}