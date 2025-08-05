import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";

import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import AddUnitModal from "@/Pages/SystemUnits/Modal/AddUnitModal";

import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import QRCode from "react-qr-code";

import {
    SidebarProvider,
    SidebarInset,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const CONDITION_OPTIONS = [
    { label: "Functional", color: "bg-green-500" },
    { label: "Defective", color: "bg-red-500" },
    { label: "Under Maintenance", color: "bg-yellow-500" },
    { label: "Needs Upgrade", color: "bg-blue-500" },
    { label: "For Disposal", color: "bg-gray-500" },
];

export default function UnitsPage({ units, rooms }) {
    const [open, setOpen] = useState(false);

    console.log(rooms);

    const { data, setData, reset, post, processing, errors } = useForm({
        unit_number: "",
        processor: "",
        ram: "",
        storage: "",
        gpu: "",
        motherboard: "",
        condition: "",
        room: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/units", {
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    const getConditionColor = (value) => {
        const match = CONDITION_OPTIONS.find(
            (opt) => opt.label.toLowerCase() === value.toLowerCase()
        );
        return match ? match.color : "bg-muted";
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/admin/rooms">
                                    Room Lists
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="w-full px-6 py-4">
                    <h1 className="text-2xl font-semibold mb-4">
                        System Units
                    </h1>
                    {/* ✅ Modal Trigger Button */}
                    <div className="flex justify-end mb-4">
                        <AddUnitModal rooms={rooms} />
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Unit Code</TableHead>
                                    <TableHead>Processor</TableHead>
                                    <TableHead>RAM</TableHead>
                                    <TableHead>Storage</TableHead>
                                    <TableHead>GPU</TableHead>
                                    <TableHead>Motherboard</TableHead>
                                    <TableHead>Condition</TableHead>
                                    <TableHead>QR Code</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {units.map((unit, index) => (
                                    <TableRow key={unit.id}>
                                        <TableCell>
                                            {/* DYNAMIC */}
                                            {/* {unit.id} */}

                                            {/* STATIC */}
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>{unit.unit_code}</TableCell>
                                        <TableCell>{unit.processor}</TableCell>
                                        <TableCell>{unit.ram}</TableCell>
                                        <TableCell>{unit.storage}</TableCell>
                                        <TableCell>{unit.gpu}</TableCell>
                                        <TableCell>
                                            {unit.motherboard}
                                        </TableCell>
                                        <TableCell>
                                            {unit.condition && (
                                                <div className="mt-1 text-sm flex items-center gap-2">
                                                    <span
                                                        className={cn(
                                                            "inline-block w-3 h-3 rounded-full",
                                                            getConditionColor(
                                                                unit.condition
                                                            )
                                                        )}
                                                    />
                                                    <span className="capitalize">
                                                        {unit.condition}
                                                    </span>
                                                </div>
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            <div className="w-20 h-20">
                                                <QRCode
                                                    value={`${window.location.origin}/equipment/${unit.unit_code}`}
                                                    size={64}
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="secondary"
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="destructive"
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
