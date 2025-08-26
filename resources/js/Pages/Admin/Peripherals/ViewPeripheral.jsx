import React from "react";
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

export default function ViewPeripheral({ peripheral }) {
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
                                    href={`/admin/peripherals/${peripheral.id}`}
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    View Peripheral
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Main Content */}
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
                            {peripheral.serial_number}
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
                            <strong>Unit Code:</strong> {peripheral.unit_code}
                        </div>

                        <div className="col-span-2 flex flex-col items-center mt-4">
                            <QRCode
                                value={`${window.location.origin}/peripheral/${peripheral.peripheral_code}`}
                                size={128}
                            />
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
            </SidebarInset>
        </SidebarProvider>
    );
}
