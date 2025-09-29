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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function ViewPeripheral({ peripheral }) {
    const [selectedQR, setSelectedQR] = useState("");
    const [selectedRoomNumber, setSelectedRoomNumber] = useState("");
    const [copied, setCopied] = useState(false);

    const handleQRCodeClick = (peripheral) => {
        const qrValue = route(
            "peripherals.public.show",
            peripheral.peripheral_code
        );
        setSelectedQR(qrValue);
        setSelectedRoomNumber(peripheral.room?.room_number || "N/A");
        setCopied(false);
    };

    const handleCopy = async () => {
        if (selectedQR) {
            await navigator.clipboard.writeText(selectedQR);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownload = () => {
        const svg = document.getElementById("qr-download");
        if (!svg) return;

        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const DOMURL = window.URL || window.webkitURL || window;

        const img = new Image();
        const svgBlob = new Blob([svgData], {
            type: "image/svg+xml;charset=utf-8",
        });
        const url = DOMURL.createObjectURL(svgBlob);

        img.onload = () => {
            const padding = 20; // padding around QR
            const textHeight = 60; // space for 3 lines of text
            canvas.width = img.width + padding * 2;
            canvas.height = img.height + padding * 2 + textHeight;

            // background
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // draw QR in center horizontally
            const qrX = (canvas.width - img.width) / 2;
            ctx.drawImage(img, qrX, padding);

            // text values
            const roomNumber = selectedRoomNumber || "N/A";
            const unitCode = peripheral.unit?.unit_code || "N/A";
            const peripheralCode = peripheral.peripheral_code || "N/A";

            ctx.fillStyle = "#000";
            ctx.textAlign = "center";
            ctx.font = "bold 18px Arial";

            // line 1: Room
            ctx.fillText(
                `Room ${roomNumber}`,
                canvas.width / 2,
                img.height + padding + 20
            );
            // line 2: Unit
            ctx.fillText(
                `${unitCode}`,
                canvas.width / 2,
                img.height + padding + 40
            );
            // line 3: Peripheral
            ctx.fillText(
                `${peripheralCode}`,
                canvas.width / 2,
                img.height + padding + 60
            );

            DOMURL.revokeObjectURL(url);

            // filename
            const fileName = `ROOM-${roomNumber}_${unitCode}_${peripheralCode}-QR.png`;

            const link = document.createElement("a");
            link.download = fileName;
            link.href = canvas.toDataURL("image/png");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
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
                                <BreadcrumbLink href="#">Assets</BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink href="/admin/peripherals">
                                    Peripherals
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href={`/admin/peripherals/${peripheral.peripheral_code}`}
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    View Peripheral
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <Head title={`View ${peripheral.peripheral_code}`} />
                <main className="p-6">
                    <h1 className="text-2xl font-bold mb-4">
                        Peripheral Information
                    </h1>

                    <div className="bg-white shadow rounded p-6 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <strong>Peripheral Code:</strong>{" "}
                            {peripheral.peripheral_code}
                        </div>
                        <div>
                            <strong>Type:</strong> {peripheral.type}
                        </div>
                        <div>
                            <strong>Serial Number:</strong>{" "}
                            {peripheral.serial_number || "N/A"}
                        </div>
                        <div>
                            <strong>Condition:</strong> {peripheral.condition}
                        </div>
                        <div>
                            <strong>Room:</strong>{" "}
                            {peripheral.room
                                ? `ROOM ${peripheral.room.room_number}`
                                : "N/A"}
                        </div>
                        <div>
                            <strong>Unit Code:</strong>{" "}
                            {peripheral.unit
                                ? peripheral.unit.unit_code
                                : "N/A"}
                        </div>

                        {/* Clickable QR Code */}
                        <div className="col-span-2 flex flex-col items-center mt-4">
                            <div
                                className="w-32 h-32 bg-white p-2 rounded cursor-pointer"
                                onClick={() => handleQRCodeClick(peripheral)}
                            >
                                <QRCode
                                    id="qr-download"
                                    value={`${window.location.origin}/peripherals/${peripheral.peripheral_code}`}
                                    size={128}
                                />
                            </div>
                            <span className="mt-2 text-sm text-muted-foreground">
                                Click QR to enlarge
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

                    {/* QR Code Modal */}
                    <Dialog
                        open={!!selectedQR}
                        onOpenChange={() => {
                            setSelectedQR("");
                            setSelectedRoomNumber("");
                            setCopied(false);
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
                                    <p className="text-green-600 text-sm text-center mt-1">
                                        Copied to clipboard!
                                    </p>
                                )}
                                <Button
                                    className="mt-4"
                                    onClick={handleDownload}
                                >
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
