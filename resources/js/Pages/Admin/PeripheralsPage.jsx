import React, { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Head } from "@inertiajs/react";
import { AppSidebar } from "@/components/app-sidebar";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";

import QRCode from "react-qr-code";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

export default function PeripheralsIndex({ peripherals }) {
    const [data, setData] = useState(peripherals || []);

    function handleDelete(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/peripherals/${id}`);
            }
        });
    }

    return (
        <SidebarProvider>
            <Head>
                <title>Dashboard</title>
            </Head>
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
                                <BreadcrumbLink
                                    href="/admin/peripherals"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    Peripherals
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <main>
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">Peripherals</h1>
                            <Link href="/admin/peripherals/create">
                                <Button>Add Peripheral</Button>
                            </Link>
                        </div>

                        <Card>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID</TableHead>
                                            <TableHead>
                                                Peripheral Code
                                            </TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Serial Number</TableHead>
                                            <TableHead>Condition</TableHead>
                                            <TableHead>Room Number</TableHead>
                                            <TableHead>Unit Code</TableHead>
                                            <TableHead>QR Code</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data.length > 0 ? (
                                            data.map((peripheral) => (
                                                <TableRow key={peripheral.id}>
                                                    <TableCell>
                                                        {peripheral.id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            peripheral.peripheral_code
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {peripheral.type}
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            peripheral.serial_number
                                                        }
                                                    </TableCell>
                                                    <TableCell>
                                                        {peripheral.condition}
                                                    </TableCell>
                                                    <TableCell>
                                                        ROOM{" "}
                                                        {peripheral.room
                                                            ? peripheral.room
                                                                  .room_number
                                                            : "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {peripheral.unit_code}
                                                    </TableCell>
                                                    <TableCell>
                                                        {peripheral.qr_code_path && (
                                                            <QRCode
                                                                value={
                                                                    peripheral.qr_code_path
                                                                } // this is your code like "PRF-001"
                                                                size={48} // 48px = 12 * 4, adjust as needed
                                                            />
                                                        )}
                                                        {/* CHANGE THE VALUE OF THIS QR CODE */}
                                                    </TableCell>
                                                    <TableCell className="space-x-2">
                                                        <Link
                                                            href={`/admin/peripherals/${peripheral.id}/edit`}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                Edit
                                                                {/* ITS STILL NOT WORKING */}
                                                            </Button>
                                                        </Link>

                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    peripheral.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                            {/* WORKING BUT DONT HAVE SWEET ALERT WHEN THE DATA IS DELETED */}
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan="9"
                                                    className="text-center"
                                                >
                                                    No peripherals found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
