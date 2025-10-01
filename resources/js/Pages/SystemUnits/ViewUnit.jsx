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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    HardDrive,
    Database,
    Monitor,
    CircuitBoard,
    CheckCircle2,
    AlertTriangle,
    Info,
    Building2,
    User,
    QrCode,
} from "lucide-react";
export default function ViewUnit({ unit }) {
    const [selectedQR, setSelectedQR] = useState(null);
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    // ✅ Always generate static Room 103 path
    const qrValue = `http://localhost:8000/unit/isu-ilagan/ict-department/room-103/${unit.unit_code}`;
    //const qrValue = `https://smartsystem.eskey22.com/unit/isu-ilagan/ict-department/room-103/${unit.unit_code}`;

    const handleQRCodeClick = () => {
        setSelectedQR(qrValue);
        setOpen(true);
        setCopied(false); // reset copied state when reopening modal
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
            const padding = 20;
            const textHeight = 40;
            canvas.width = img.width + padding * 2;
            canvas.height = img.height + padding * 2 + textHeight;

            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw QR
            ctx.drawImage(img, padding, padding);

            // Add static label
            ctx.fillStyle = "#000";
            ctx.font = "bold 20px Arial";
            ctx.textAlign = "center";
            ctx.fillText(
                `Room 103 - ${unit.unit_code}`,
                canvas.width / 2,
                img.height + padding + 30
            );

            URL.revokeObjectURL(url);

            // Static filename: ROOM-103_PC-01.png
            const fileName = `ROOM-103_${unit.unit_code}.png`;

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
                                <BreadcrumbLink href="/admin/system-units">
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
                    <h1 className="text-2xl font-bold mb-6 text-center">
                        System Unit Information
                    </h1>

                    <Card className="max-w-4xl mx-auto shadow-lg rounded-2xl">
                        {/* Light header */}
                        <CardHeader className="bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)] text-center">
                            <CardTitle className="text-lg">
                                Unit Details
                            </CardTitle>
                        </CardHeader>

                        {/* White background for details */}
                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5 bg-white">
                            {/* Unit Code */}
                            <div className="flex items-center gap-2">
                                <QrCode className="w-5 h-5 text-green-600" />
                                <span className="font-medium">Unit Code:</span>
                                <span>{unit.unit_code}</span>
                            </div>
                            {/* Room */}
                            <div className="flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-green-600" />
                                <span className="font-medium">Room:</span>
                                <span>{unit.room?.room_number || "N/A"}</span>
                            </div>
                            {/* Processor */}
                            <div className="flex items-center gap-2">
                                <Cpu className="w-5 h-5 text-green-600" />
                                <span className="font-medium">Processor:</span>
                                <span>{unit.processor}</span>
                            </div>

                            {/* RAM */}
                            <div className="flex items-center gap-2">
                                <Database className="w-5 h-5 text-green-600" />
                                <span className="font-medium">RAM:</span>
                                <span>{unit.ram}</span>
                            </div>

                            {/* Storage */}
                            <div className="flex items-center gap-2">
                                <HardDrive className="w-5 h-5 text-green-600" />
                                <span className="font-medium">Storage:</span>
                                <span>{unit.storage}</span>
                            </div>

                            {/* GPU */}
                            <div className="flex items-center gap-2">
                                <Monitor className="w-5 h-5 text-green-600" />
                                <span className="font-medium">GPU:</span>
                                <span>{unit.gpu}</span>
                            </div>

                            {/* Motherboard */}
                            <div className="flex items-center gap-2">
                                <CircuitBoard className="w-5 h-5 text-green-600" />
                                <span className="font-medium">
                                    Motherboard:
                                </span>
                                <span>{unit.motherboard}</span>
                            </div>

                            {/* Condition */}
                            <div className="flex items-center gap-2">
                                {unit.condition === "Working" ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                ) : unit.condition === "Needs Repair" ? (
                                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                ) : (
                                    <Info className="w-5 h-5 text-gray-600" />
                                )}
                                <span className="font-medium">Condition:</span>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                                        unit.condition === "Working"
                                            ? "bg-green-500"
                                            : unit.condition === "Needs Repair"
                                            ? "bg-yellow-500"
                                            : "bg-gray-500"
                                    }`}
                                >
                                    {unit.condition}
                                </span>
                            </div>

                            {/* Condition Details */}
                            <div className="flex items-center gap-2">
                                <Info className="w-5 h-5 text-green-600" />
                                <span className="font-medium">
                                    Condition Details:
                                </span>
                                <span>
                                    {unit.condition_details ||
                                        "No additional details"}
                                </span>
                            </div>

                            {/* Assigned Faculty */}
                            <div className="flex items-center gap-2">
                                <User className="w-5 h-5 text-green-600" />
                                <span className="font-medium">
                                    Assigned Faculty (MR):
                                </span>
                                <span>{unit.mr_to?.name || "N/A"}</span>
                            </div>
                        </CardContent>

                        {/* QR Code section */}
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

                {/* QR Code Modal */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="flex flex-col items-center">
                        <DialogHeader>
                            <DialogTitle>
                                QR Code for Room 103 - {unit.unit_code}
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
