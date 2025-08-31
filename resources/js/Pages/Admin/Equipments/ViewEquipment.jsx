import React, { useState, useRef } from "react";
import { Head, usePage } from "@inertiajs/react";
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

export default function ViewEquipment() {
    const { props } = usePage();
    const equipment = props.equipment;

    const [modalOpen, setModalOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [selectedQR, setSelectedQR] = useState("");
    const [selectedEquipmentCode, setSelectedEquipmentCode] = useState("");
    const [selectedRoomNumber, setSelectedRoomNumber] = useState("");
    const qrRef = useRef(null);

    if (!equipment) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg text-gray-500">Loading equipment...</p>
            </div>
        );
    }

    // QR URL
    const qrValue = `${window.location.origin}/isu-ilagan/ict-department/room-${equipment.room_number}/${equipment.equipment_code}`;

    const handleQRCodeClick = (qrValue, roomNumber, equipmentCode) => {
        setSelectedQR(qrValue);
        setSelectedRoomNumber(roomNumber);
        setSelectedEquipmentCode(equipmentCode);
        setModalOpen(true);
    };

    const handleCopy = async () => {
        if (!selectedQR) return;
        await navigator.clipboard.writeText(selectedQR);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        if (!qrRef.current) return;
        const svg = qrRef.current.querySelector("svg");
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
                `ROOM ${selectedRoomNumber} - ${selectedEquipmentCode}`,
                canvas.width / 2,
                qrSize + padding * 2 + 15
            );

            const finalImage = canvas.toDataURL("image/png");
            const link = document.createElement("a");
            link.href = finalImage;
            link.download = `ROOM-${selectedRoomNumber}_${selectedEquipmentCode}-QR.png`;
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
                                <BreadcrumbLink href="/equipments">
                                    Equipment List
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href={`${qrValue}`}
                                    aria-current="page"
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
                    <h1 className="text-2xl font-bold mb-4">
                        Equipment Information
                    </h1>

                    <div className="bg-white shadow rounded p-6 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <strong>Equipment Code:</strong>{" "}
                            {equipment.equipment_code}
                        </div>
                        <div>
                            <strong>Equipment Name:</strong>{" "}
                            {equipment.equipment_name}
                        </div>
                        <div>
                            <strong>Type:</strong> {equipment.type}
                        </div>
                        <div>
                            <strong>Brand:</strong> {equipment.brand || "N/A"}
                        </div>
                        <div>
                            <strong>Condition:</strong> {equipment.condition}
                        </div>
                        <div>
                            <strong>Room Number:</strong>{" "}
                            {equipment.room_number}
                        </div>

                        {/* QR Code (clickable) */}
                        <div
                            className="col-span-2 flex flex-col items-center mt-4 cursor-pointer"
                            onClick={() =>
                                handleQRCodeClick(
                                    qrValue,
                                    equipment.room_number,
                                    equipment.equipment_code
                                )
                            }
                        >
                            <QRCode value={qrValue} size={128} />
                            <span className="mt-2 text-sm text-muted-foreground">
                                Click QR code to expand
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

                    {/* Modal */}
                    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                        <DialogContent className="max-w-sm mx-auto">
                            <DialogHeader>
                                <DialogTitle>
                                    QR Code - ROOM {selectedRoomNumber} -{" "}
                                    {selectedEquipmentCode}
                                </DialogTitle>
                            </DialogHeader>

                            <div
                                className="flex flex-col items-center"
                                ref={qrRef}
                            >
                                <QRCode
                                    value={selectedQR}
                                    size={200}
                                    className="cursor-pointer"
                                    onClick={handleCopy}
                                />
                                <p className="text-xs mt-2 text-muted-foreground">
                                    Click QR to copy link
                                </p>
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
