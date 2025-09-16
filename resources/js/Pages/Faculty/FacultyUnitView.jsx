// FacultyUnitView.jsx
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Menu,
    Cpu,
    HardDrive,
    Database,
    MemoryStick,
    Monitor,
    SquareCheckBig,
    ArrowLeft,
} from "lucide-react";

import FacultyRoomSidebar from "@/Components/FacultyComponents/faculty-room-view-sidebar";

export default function FacultyUnitView({ room, unit, user }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar - Desktop */}
            <div className="hidden md:flex">
                <FacultyRoomSidebar
                    room={room}
                    user={user}
                    onSelect={(section) => {
                        window.location.href = route("room.show", {
                            roomPath: room.room_path,
                            section: section,
                        });
                    }}
                    active="system-units"
                />
            </div>

            {/* Sidebar - Mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex md:hidden">
                    {/* Overlay */}
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setSidebarOpen(false)}
                    />
                    {/* Drawer */}
                    <div className="relative z-50 w-64 bg-white shadow-lg">
                        <FacultyRoomSidebar
                            room={room}
                            user={user}
                            onSelect={(section) => {
                                setSidebarOpen(false);
                                window.location.href = route("room.show", {
                                    roomPath: room.room_path,
                                    section: section,
                                });
                            }}
                            active="system-units"
                        />
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-6">
                {/* Top Bar for mobile */}
                <div className="flex items-center gap-2 mb-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h1 className="text-lg md:text-xl font-semibold text-gray-800">
                        Unit Details
                    </h1>
                </div>

                <div className="flex justify-center">
                    <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl shadow-lg rounded-2xl border border-gray-200 overflow-hidden">
                        {/* Styled Header like Sidebar */}
                        <CardHeader className="bg-gradient-to-r from-green-600 to-green-500 text-white">
                            <CardTitle className="text-lg md:text-2xl font-semibold">
                                {unit.unit_code}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <DetailItem
                                    icon={Monitor}
                                    label="Unit Code"
                                    value={unit.unit_code}
                                />
                                <DetailItem
                                    icon={Cpu}
                                    label="Processor"
                                    value={unit.processor}
                                />
                                <DetailItem
                                    icon={MemoryStick}
                                    label="RAM"
                                    value={unit.ram}
                                />
                                <DetailItem
                                    icon={Database}
                                    label="Storage"
                                    value={unit.storage}
                                />
                                <DetailItem
                                    icon={HardDrive}
                                    label="GPU"
                                    value={unit.gpu ?? "N/A"}
                                />
                                <DetailItem
                                    icon={HardDrive}
                                    label="Motherboard"
                                    value={unit.motherboard}
                                />
                                <DetailItem
                                    icon={SquareCheckBig}
                                    label="Condition"
                                    value={unit.condition}
                                />
                            </div>

                            {/* Back button */}
                            <div className="mt-6">
                                <Button
                                    variant="outline"
                                    className="flex items-center gap-2 hover:bg-green-100"
                                    onClick={() => window.history.back()}
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Back
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
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
