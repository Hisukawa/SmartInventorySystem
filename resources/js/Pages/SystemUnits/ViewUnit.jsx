import React from "react";
import { Head } from "@inertiajs/react";
import { AppSidebar } from "@/components/app-sidebar";
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

export default function ViewUnit({ unit }) {
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
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/units">
                                    System Unit Lists
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
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
                            <QRCode
                                value={`${window.location.origin}/equipment/${unit.unit_code}`}
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
