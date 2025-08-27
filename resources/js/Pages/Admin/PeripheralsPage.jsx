import React, { useMemo, useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Swal from "sweetalert2";

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
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";

import { Input } from "@/components/ui/input";

// Import the new modal
import EditPeripheralModal from "./Peripherals/EditPeripheralModal";

export default function PeripheralsIndex({
    peripherals,
    search,
    existingRooms,
    existingUnits,
}) {
    const [searchTerm, setSearchTerm] = useState(search || "");
    const [editPeripheral, setEditPeripheral] = useState(null);

    // Filters
    const [typeFilter, setTypeFilter] = useState("All Types");
    const [serialFilter, setSerialFilter] = useState("All Serials");
    const [conditionFilter, setConditionFilter] = useState("All Conditions");
    const [roomFilter, setRoomFilter] = useState("All Rooms");
    const [unitCodeFilter, setUnitCodeFilter] = useState("All Unit Codes");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Unique dropdown values
    const uniqueTypes = [
        "All Types",
        ...new Set(peripherals.map((p) => p.type || "N/A")),
    ];
    const uniqueSerials = [
        "All Serials",
        ...new Set(peripherals.map((p) => p.serial_number || "N/A")),
    ];
    const uniqueConditions = [
        "All Conditions",
        ...new Set(peripherals.map((p) => p.condition || "N/A")),
    ];
    const uniqueRooms = [
        "All Rooms",
        ...new Set(peripherals.map((p) => p.room?.room_number || "N/A")),
    ];
    const uniqueUnitCodes = [
        "All Unit Codes",
        ...new Set(peripherals.map((p) => p.unit_code || "N/A")),
    ];

    // Delete handler
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

    // Search handler
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            router.get("/admin/peripherals", { search: searchTerm });
        }
    };

    // Filtering logic
    const filteredData = useMemo(() => {
        return peripherals.filter((p) => {
            const matchesSearch =
                searchTerm === "" ||
                p.peripheral_code
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                p.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.serial_number
                    ?.toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                p.condition?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (p.room?.room_number || "N/A")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                p.unit_code?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesFilters =
                (typeFilter === "All Types" || p.type === typeFilter) &&
                (serialFilter === "All Serials" ||
                    p.serial_number === serialFilter) &&
                (conditionFilter === "All Conditions" ||
                    p.condition === conditionFilter) &&
                (roomFilter === "All Rooms" ||
                    (p.room?.room_number || "N/A") === roomFilter) &&
                (unitCodeFilter === "All Unit Codes" ||
                    p.unit_code === unitCodeFilter);

            return matchesSearch && matchesFilters;
        });
    }, [
        peripherals,
        searchTerm,
        typeFilter,
        serialFilter,
        conditionFilter,
        roomFilter,
        unitCodeFilter,
    ]);

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                                <BreadcrumbLink href="#">Assets</BreadcrumbLink>
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
                        <h1 className="text-2xl font-bold mb-5">Peripherals</h1>
                        {/* Search bar + title/actions */}
                        <div className="flex justify-between items-center mb-4">
                            <Input
                                placeholder="Search peripherals..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                                className="w-full sm:w-1/3"
                            />
                            <div className="flex items-center space-x-4">
                                <Link href="/admin/peripherals/create">
                                    <Button>Add Peripheral</Button>
                                </Link>
                            </div>
                        </div>

                        <Card>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>
                                                Peripheral Code
                                            </TableHead>
                                            <TableHead>
                                                <select
                                                    className="border rounded px-1 pr-7 py-0.5 text-xs"
                                                    value={typeFilter}
                                                    onChange={(e) =>
                                                        setTypeFilter(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {uniqueTypes.map((type) => (
                                                        <option
                                                            key={type}
                                                            value={type}
                                                        >
                                                            {type}
                                                        </option>
                                                    ))}
                                                </select>
                                            </TableHead>
                                            <TableHead>
                                                <select
                                                    className="border rounded px-1 pr-7 py-0.5 text-xs"
                                                    value={serialFilter}
                                                    onChange={(e) =>
                                                        setSerialFilter(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {uniqueSerials.map(
                                                        (serial) => (
                                                            <option
                                                                key={serial}
                                                                value={serial}
                                                            >
                                                                {serial}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </TableHead>
                                            <TableHead>
                                                <select
                                                    className="border rounded px-1 pr-7 py-0.5 text-xs"
                                                    value={conditionFilter}
                                                    onChange={(e) =>
                                                        setConditionFilter(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {uniqueConditions.map(
                                                        (cond) => (
                                                            <option
                                                                key={cond}
                                                                value={cond}
                                                            >
                                                                {cond}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </TableHead>
                                            <TableHead>
                                                <select
                                                    className="border rounded px-1 pr-7 py-0.5 text-xs"
                                                    value={roomFilter}
                                                    onChange={(e) =>
                                                        setRoomFilter(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {uniqueRooms.map((room) => (
                                                        <option
                                                            key={room}
                                                            value={room}
                                                        >
                                                            {room}
                                                        </option>
                                                    ))}
                                                </select>
                                            </TableHead>
                                            <TableHead>
                                                <select
                                                    className="border rounded px-1 pr-7 py-0.5 text-xs"
                                                    value={unitCodeFilter}
                                                    onChange={(e) =>
                                                        setUnitCodeFilter(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {uniqueUnitCodes.map(
                                                        (unit) => (
                                                            <option
                                                                key={unit}
                                                                value={unit}
                                                            >
                                                                {unit}
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedData.length > 0 ? (
                                            paginatedData.map((p, index) => (
                                                <TableRow key={p.id}>
                                                    <TableCell>
                                                        {(currentPage - 1) *
                                                            itemsPerPage +
                                                            index +
                                                            1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.peripheral_code}
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.type}
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.serial_number}
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.condition}
                                                    </TableCell>
                                                    <TableCell>
                                                        ROOM{" "}
                                                        {p.room
                                                            ? p.room.room_number
                                                            : "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.unit_code}
                                                    </TableCell>
                                                    <TableCell className="space-x-2">
                                                        <Link
                                                            href={`/admin/peripherals/${p.id}`}
                                                        >
                                                            <Button
                                                                variant="secondary"
                                                                size="sm"
                                                            >
                                                                View
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                setEditPeripheral(
                                                                    p
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    p.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan="8"
                                                    className="text-center"
                                                >
                                                    No peripherals found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>

                                {/* Pagination */}
                                <div className="flex justify-center mt-4 space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            setCurrentPage(currentPage - 1)
                                        }
                                    >
                                        Previous
                                    </Button>
                                    {[...Array(totalPages)].map((_, idx) => (
                                        <Button
                                            key={idx}
                                            variant={
                                                currentPage === idx + 1
                                                    ? "default"
                                                    : "outline"
                                            }
                                            size="sm"
                                            onClick={() =>
                                                setCurrentPage(idx + 1)
                                            }
                                        >
                                            {idx + 1}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={currentPage === totalPages}
                                        onClick={() =>
                                            setCurrentPage(currentPage + 1)
                                        }
                                    >
                                        Next
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>

                {/* Edit Modal */}
                {editPeripheral && (
                    <EditPeripheralModal
                        peripheral={editPeripheral}
                        rooms={existingRooms}
                        units={existingUnits}
                        onClose={() => setEditPeripheral(null)}
                    />
                )}
            </SidebarInset>
        </SidebarProvider>
    );
}
