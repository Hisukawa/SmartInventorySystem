import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import AddUnitModal from "@/Pages/SystemUnits/Modal/AddUnitModal";
import EditUnitModal from "@/Pages/SystemUnits/Modal/EditUnitModal";
import { useForm as useInertiaForm } from "@inertiajs/react";
import Swal from "sweetalert2";

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

const CONDITION_OPTIONS = [
    { label: "Functional", color: "bg-green-500" },
    { label: "Defective", color: "bg-red-500" },
    { label: "Under Maintenance", color: "bg-yellow-500" },
    { label: "Needs Upgrade", color: "bg-blue-500" },
    { label: "For Disposal", color: "bg-gray-500" },
];

export default function UnitsPage({ units, rooms }) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUnit, setSelectedUnit] = useState(null); // 👈 for modal
    const itemsPerPage = 10;

    const { delete: destroy } = useInertiaForm(); // ✅ correct usage

    // Filtered and paginated data
    const filteredUnits = useMemo(() => {
        return units.filter((unit) =>
            unit.unit_code.toLowerCase().includes(search.toLowerCase())
        );
    }, [units, search]);

    const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);
    const paginatedUnits = filteredUnits.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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

                    {/* Search and Add Button */}
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search Unit Code..."
                            className="border rounded px-3 py-2 w-64"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <AddUnitModal rooms={rooms} />
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>#</TableHead>
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
                                {paginatedUnits.length > 0 ? (
                                    paginatedUnits.map((unit, index) => (
                                        <TableRow key={unit.id}>
                                            <TableCell>
                                                {(currentPage - 1) *
                                                    itemsPerPage +
                                                    index +
                                                    1}
                                            </TableCell>
                                            <TableCell>
                                                {unit.unit_code}
                                            </TableCell>
                                            <TableCell>
                                                {unit.processor}
                                            </TableCell>
                                            <TableCell>{unit.ram}</TableCell>
                                            <TableCell>
                                                {unit.storage}
                                            </TableCell>
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
                                                        onClick={() =>
                                                            setSelectedUnit(
                                                                unit
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        onClick={() => {
                                                            Swal.fire({
                                                                title: `Delete ${unit.unit_code}?`,
                                                                text: "This action cannot be undone!",
                                                                icon: "warning",
                                                                showCancelButton: true,
                                                                confirmButtonColor:
                                                                    "#d33",
                                                                cancelButtonColor:
                                                                    "#3085d6",
                                                                confirmButtonText:
                                                                    "Yes, delete it!",
                                                            }).then(
                                                                (result) => {
                                                                    if (
                                                                        result.isConfirmed
                                                                    ) {
                                                                        destroy(
                                                                            `/system-units/${unit.id}`
                                                                        );
                                                                        Swal.fire(
                                                                            "Deleted!",
                                                                            `Unit ${unit.unit_code} has been deleted.`,
                                                                            "success"
                                                                        );
                                                                    }
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={10}
                                            className="text-center py-4"
                                        >
                                            No matching units found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-4">
                        <span className="text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={currentPage === 1}
                                onClick={() =>
                                    setCurrentPage((prev) => prev - 1)
                                }
                            >
                                Previous
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={currentPage === totalPages}
                                onClick={() =>
                                    setCurrentPage((prev) => prev + 1)
                                }
                            >
                                Next
                            </Button>
                        </div>
                    </div>

                    {/* Edit Modal Rendered Outside Table */}
                    {selectedUnit && (
                        <EditUnitModal
                            unit={selectedUnit}
                            rooms={rooms}
                            onClose={() => setSelectedUnit(null)}
                        />
                    )}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
