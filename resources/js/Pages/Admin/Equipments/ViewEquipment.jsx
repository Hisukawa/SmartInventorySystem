import React, { useState } from "react";
import { Head, usePage, router } from "@inertiajs/react";
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
    Info,
    Building2,
    CheckCircle2,
    AlertTriangle,
    QrCode,
} from "lucide-react";

// ✅ Condition Colors
const CONDITION_COLORS = {
    Working: "bg-green-200 text-green-800",
    "Not Working": "bg-red-200 text-red-800",
    "Intermittent Issue": "bg-yellow-200 text-yellow-800",
    "Needs Cleaning": "bg-blue-200 text-blue-800",
    "For Replacement": "bg-orange-200 text-orange-800",
    "For Disposal": "bg-gray-200 text-gray-800",
    Condemned: "bg-black text-white",
    "Needs Repair": "bg-red-200 text-red-800",
    "Needs Configuration": "bg-blue-200 text-blue-800",
    "Under Maintenance": "bg-blue-200 text-blue-900",
    "To Be Diagnosed": "bg-blue-100 text-blue-700",
};

export default function ViewEquipment() {
    const { props } = usePage();
    const equipment = props.equipment;

    const [modalOpen, setModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [selectedQR, setSelectedQR] = useState("");
    const [selectedEquipmentCode, setSelectedEquipmentCode] = useState("");
    const [selectedRoomNumber, setSelectedRoomNumber] = useState("");

    if (!equipment) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg text-gray-500">Loading equipment...</p>
            </div>
        );
    }

    const qrValue = `${window.location.origin}/equipment/${equipment.equipment_code}`;

    const handleQRCodeClick = () => {
        setSelectedQR(qrValue);
        setSelectedRoomNumber(equipment.room?.room_number || "N/A");
        setSelectedEquipmentCode(equipment.equipment_code);
        setCopied(false);
        setModalOpen(true);
    };

    const handleCopy = async () => {
        if (!selectedQR) return;
        await navigator.clipboard.writeText(selectedQR);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const svg = document.querySelector("#modal-qr svg");
        if (!svg) return;

        const serializer = new XMLSerializer();
        const svgData = serializer.serializeToString(svg);
        const blob = new Blob([svgData], {
            type: "image/svg+xml;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);

        const img = new Image();
        img.onload = () => {
            const padding = 20;
            const textHeight = 50;
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = img.width + padding * 2;
            canvas.height = img.height + padding * 2 + textHeight;

            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, padding, padding);

            ctx.fillStyle = "#000";
            ctx.font = "bold 18px Arial";
            ctx.textAlign = "center";
            ctx.fillText(
                `ROOM ${selectedRoomNumber} - ${selectedEquipmentCode}`,
                canvas.width / 2,
                img.height + padding + 30
            );

            // ================================================================================
            // DONT HAVE USE BUT DONT DELETE IT
            // ctx.font = "14px Arial";
            // ctx.fillText(
            //     equipment.condition_details || "No additional details",
            //     canvas.width / 2,
            //     img.height + padding + 50
            // );
            // ================================================================================

            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = `ROOM-${selectedRoomNumber}_${selectedEquipmentCode}.png`;
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
                                <BreadcrumbLink href="/equipments">
                                    Equipments
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="#"
                                    className="font-semibold text-foreground"
                                >
                                    View Equipment
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <Head title={`View ${equipment.equipment_code}`} />

                <main className="p-6">
                    <h1 className="text-2xl font-bold mb-6 text-center">
                        Equipment Information
                    </h1>

                    <Card className="max-w-4xl mx-auto shadow-lg rounded-2xl">
                        <CardHeader className="bg-[hsl(142,34%,51%)] text-white border-none text-center hover:bg-[hsl(142,34%,45%)]">
                            <CardTitle className="text-lg">
                                Equipment Details
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 bg-white">
                            <div className="flex items-center gap-2">
                                <QrCode className="w-5 h-5 text-green-600" />
                                <span className="font-medium">
                                    Equipment Code:
                                </span>
                                <span>{equipment.equipment_code}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Info className="w-5 h-5 text-green-600" />
                                <span className="font-medium">
                                    Equipment Name:
                                </span>
                                <span>{equipment.equipment_name}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Info className="w-5 h-5 text-green-600" />
                                <span className="font-medium">Type:</span>
                                <span>{equipment.type}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Info className="w-5 h-5 text-green-600" />
                                <span className="font-medium">Brand:</span>
                                <span>{equipment.brand || "N/A"}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                {equipment.condition === "Working" ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                ) : (
                                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                                )}
                                <span className="font-medium">Condition:</span>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        CONDITION_COLORS[equipment.condition] ||
                                        "bg-gray-200 text-gray-800"
                                    }`}
                                >
                                    {equipment.condition || "N/A"}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Info className="w-5 h-5 text-green-600" />
                                <span className="font-medium">
                                    Condition Details:
                                </span>
                                <span>
                                    {equipment.condition_details ||
                                        "No details"}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-green-600" />
                                <span className="font-medium">
                                    Room Number:
                                </span>
                                <span>
                                    {equipment.room?.room_number || "N/A"}
                                </span>
                            </div>
                        </CardContent>

                        {/* QR Section */}
                        <div
                            className="flex flex-col items-center py-6 bg-white rounded-b-2xl cursor-pointer"
                            onClick={handleQRCodeClick}
                        >
                            <QRCode value={qrValue} size={128} />
                            <span className="mt-2 text-sm text-muted-foreground">
                                Click QR to view / copy
                            </span>
                        </div>
                    </Card>

                    <div className="mt-6 flex justify-center">
                        <Button
                            variant="secondary"
                            onClick={() => router.visit("/equipments")}
                        >
                            Go Back
                        </Button>
                    </div>

                    {/* QR Modal */}
                    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                        <DialogContent className="flex flex-col items-center">
                            <DialogHeader>
                                <DialogTitle>
                                    QR Code - ROOM {selectedRoomNumber} -{" "}
                                    {selectedEquipmentCode}
                                </DialogTitle>
                            </DialogHeader>

                            {selectedQR && (
                                <div
                                    id="modal-qr"
                                    className="cursor-pointer"
                                    onClick={handleCopy}
                                >
                                    <QRCode value={selectedQR} size={256} />
                                </div>
                            )}

                            <span className="text-xs text-muted-foreground mt-1">
                                Click QR to copy link
                            </span>
                            {copied && (
                                <span className="text-green-600 text-sm">
                                    QR code path copied!
                                </span>
                            )}

                            <div className="mt-2">
                                <Button onClick={handleDownload}>
                                    Download
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
