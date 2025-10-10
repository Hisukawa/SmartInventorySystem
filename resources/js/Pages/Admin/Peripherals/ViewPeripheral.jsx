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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import {
    Cpu,
    Monitor,
    Barcode,
    Info,
    AlertTriangle,
    CheckCircle2,
    QrCode,
    Building2,
    HardDrive,
} from "lucide-react";

export default function ViewPeripheral({ peripheral }) {
    const [selectedQR, setSelectedQR] = useState(null);
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const peripheralCode = peripheral?.peripheral_code || "N/A";
    const unitCode = peripheral?.unit?.unit_code || "N/A";
    const roomNumber = peripheral?.room?.room_number || "N/A";

    const qrValue = `${window.location.origin}/peripherals/${peripheralCode}`;

    const handleQRCodeClick = () => {
        setSelectedQR(qrValue);
        setOpen(true);
        setCopied(false);
    };

    const handleModalQRClick = async () => {
        if (selectedQR) {
            try {
                await navigator.clipboard.writeText(selectedQR);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                console.error("Failed to copy: ", err);
            }
        }
    };

    const handleDownload = () => {
        if (!selectedQR) return;
        const canvas = document.createElement("canvas");
        const svg = document.querySelector("#modal-qr svg");
        if (!svg) return;

        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svg);
        const img = new Image();
        const blob = new Blob([svgStr], {
            type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);

        img.onload = () => {
            const padding = 20;
            const textHeight = 50;
            canvas.width = img.width + padding * 2;
            canvas.height = img.height + padding * 2 + textHeight;
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, padding, padding);
            ctx.fillStyle = "#000";
            ctx.font = "bold 18px Arial";
            ctx.textAlign = "center";
            ctx.fillText(
                `Room ${roomNumber} - ${peripheralCode}`,
                canvas.width / 2,
                img.height + padding + 30
            );

            URL.revokeObjectURL(url);
            const link = document.createElement("a");
            link.download = `ROOM-${roomNumber}_${peripheralCode}.png`;
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
                                <BreadcrumbLink href="#">Assets</BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink href="/admin/peripherals">
                                    Peripherals
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href={`/admin/peripherals/${peripheralCode}`}
                                    className="font-semibold text-foreground"
                                >
                                    View Peripheral
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <Head title={`View ${peripheralCode}`} />

                <main className="p-6">
                    <h1 className="text-2xl font-bold mb-6 text-center">
                        Peripheral Information
                    </h1>

                    <Card className="max-w-4xl mx-auto shadow-lg rounded-2xl">
                        <CardHeader className="bg-[hsl(142,34%,51%)] text-white border-none text-center">
                            <CardTitle className="text-lg">
                                Peripheral Details
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5 bg-white">
                            <div className="flex items-center gap-2">
                                <QrCode className="w-5 h-5 text-green-600" />
                                <span className="font-medium">
                                    Peripheral Code:
                                </span>
                                <span>{peripheralCode}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Cpu className="w-5 h-5 text-green-600" />
                                <span className="font-medium">Unit Code:</span>
                                <span>{unitCode}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-green-600" />
                                <span className="font-medium">Room:</span>
                                <span>{roomNumber}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Monitor className="w-5 h-5 text-green-600" />
                                <span className="font-medium">Type:</span>
                                <span>{peripheral?.type || "N/A"}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Barcode className="w-5 h-5 text-green-600" />
                                <span className="font-medium">
                                    Serial Number:
                                </span>
                                <span>
                                    {peripheral?.serial_number || "N/A"}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                {peripheral?.condition === "Functional" ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                ) : peripheral?.condition === "Needs Repair" ? (
                                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                ) : (
                                    <Info className="w-5 h-5 text-gray-600" />
                                )}
                                <span className="font-medium">Condition:</span>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                                        peripheral?.condition === "Functional"
                                            ? "bg-green-500"
                                            : peripheral?.condition ===
                                              "Needs Repair"
                                            ? "bg-yellow-500"
                                            : "bg-gray-500"
                                    }`}
                                >
                                    {peripheral?.condition || "N/A"}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 sm:col-span-2">
                                <Info className="w-5 h-5 text-green-600" />
                                <span className="font-medium">
                                    Condition Details:
                                </span>
                                <span>
                                    {peripheral?.condition_details ||
                                        "No details"}
                                </span>
                            </div>
                        </CardContent>

                        {/* QR Section */}
                        <div className="flex flex-col items-center py-6 bg-white rounded-b-2xl">
                            <div
                                className="bg-white p-3 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
                                onClick={handleQRCodeClick}
                            >
                                <QRCode value={qrValue} size={128} />
                            </div>
                            <span className="mt-2 text-sm text-muted-foreground">
                                Scan to view public info
                            </span>
                        </div>
                    </Card>

                    <div className="mt-6 flex justify-center">
                        <Button
                            variant="secondary"
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </Button>
                    </div>
                </main>

                {/* Modal */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="flex flex-col items-center">
                        <DialogHeader>
                            <DialogTitle>
                                QR Code for Room {roomNumber} - {peripheralCode}
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
