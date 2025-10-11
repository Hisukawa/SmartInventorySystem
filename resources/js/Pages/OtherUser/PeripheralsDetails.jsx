"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Keyboard,
    Mouse,
    Monitor,
    HardDrive,
    Barcode,
    Building,
} from "lucide-react";

export default function PeripheralDetails({ peripheral }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-2xl">
                <Card className="w-full shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
                    {/* Header */}
                    <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white text-center">
                        <CardTitle className="text-2xl font-bold">
                            {peripheral.peripheral_code}
                        </CardTitle>
                    </CardHeader>

                    {/* Content */}
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <DetailItem
                                icon={Building}
                                label="Room"
                                value={peripheral.room?.room_number ?? "N/A"}
                            />
                            <DetailItem
                                icon={Monitor}
                                label="Unit"
                                value={peripheral.unit?.unit_code ?? "N/A"}
                            />
                            <DetailItem
                                icon={Barcode}
                                label="Type"
                                value={peripheral.type ?? "N/A"}
                            />
                            <DetailItem
                                icon={Monitor}
                                label="Brand"
                                value={peripheral.brand ?? "N/A"}
                            />
                            <DetailItem
                                icon={HardDrive}
                                label="Model"
                                value={peripheral.model ?? "N/A"}
                            />
                            <DetailItem
                                icon={Keyboard}
                                label="Serial Number"
                                value={peripheral.serial_number ?? "N/A"}
                            />
                            <DetailItem
                                icon={Mouse}
                                label="Condition"
                                value={peripheral.condition ?? "N/A"}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

// Reusable detail item with icon
function DetailItem({ icon: Icon, label, value }) {
    return (
        <div className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 bg-white hover:bg-green-50 transition">
            <Icon className="h-5 w-5 text-green-600 mt-0.5" />
            <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-medium text-gray-500">
                    {label}
                </span>
                <span className="text-sm sm:text-base font-semibold text-gray-800">
                    {value}
                </span>
            </div>
        </div>
    );
}
