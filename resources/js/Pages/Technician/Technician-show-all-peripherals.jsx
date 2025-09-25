import React, { useMemo, useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Swal from "sweetalert2";
import { Eye, Edit2, Trash2 } from "lucide-react"

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
import { TechnicianAppSidebar } from "@/Components/TechnicianComponent/technician-app-sidebar";
import { Input } from "@/components/ui/input";
import EditPeripheralModal from "@/Components/TechnicianComponent/EditPeripheralModal";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Filter as FilterIcon, X } from "lucide-react";

/* ✅ Reusable Filter Component */
function PeripheralsFilter({ filters, filterOptions, onApplyFilters }) {
    const [selectedField, setSelectedField] = useState("");

    const handleReset = () => {
        const resetFilters = {
            type: undefined,
            condition: undefined,
            room_id: undefined,
            unit_code: undefined,
        };
        setSelectedField("");
        onApplyFilters(resetFilters);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
                <div className="flex flex-col gap-3">
                    <Select
                        value={selectedField}
                        onValueChange={setSelectedField}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select filter field" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="type">Type</SelectItem>
                            <SelectItem value="condition">Condition</SelectItem>
                            <SelectItem value="room">Room</SelectItem>
                            <SelectItem value="unit">Unit</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* Type Filter */}
                    {selectedField === "type" && (
                        <Select
                            value={filters.type || "all"}
                            onValueChange={(value) =>
                                onApplyFilters({
                                    ...filters,
                                    type: value === "all" ? undefined : value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.types.map((type) => (
                                    <SelectItem key={type} value={type}>
                                        {type}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {/* Condition Filter */}
                    {selectedField === "condition" && (
                        <Select
                            value={filters.condition || "all"}
                            onValueChange={(value) =>
                                onApplyFilters({
                                    ...filters,
                                    condition:
                                        value === "all" ? undefined : value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Condition" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.conditions.map((cond) => (
                                    <SelectItem key={cond} value={cond}>
                                        {cond}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {/* Room Filter */}
                    {selectedField === "room" && (
                        <Select
                            value={filters.room_id || "all"}
                            onValueChange={(value) =>
                                onApplyFilters({
                                    ...filters,
                                    room_id:
                                        value === "all" ? undefined : value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Room" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {Object.entries(filterOptions.rooms).map(
                                    ([id, num]) => (
                                        <SelectItem key={id} value={id}>
                                            Room {num}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    )}

                    {/* Unit Filter */}
                    {selectedField === "unit" && (
                        <Select
                            value={filters.unit_code || "all"}
                            onValueChange={(value) =>
                                onApplyFilters({
                                    ...filters,
                                    unit_code:
                                        value === "all" ? undefined : value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.units.map((u) => (
                                    <SelectItem key={u} value={u}>
                                        {u}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    <div className="flex justify-end">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleReset}
                            className="flex items-center gap-1"
                        >
                            <X className="h-4 w-4" />
                            Reset All
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default function TechnicianShowAllPeripherals({
    peripherals,
    existingRooms,
    existingUnits,
    filters = {},
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [editPeripheral, setEditPeripheral] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filterOptions = useMemo(() => {
        const uniq = (arr) => [...new Set(arr.filter((v) => v))].sort();
        return {
            types: uniq(peripherals.map((p) => p.type)),
            conditions: uniq(peripherals.map((p) => p.condition)),
            rooms: Object.fromEntries(
                existingRooms.map((r) => [String(r.id), r.room_number])
            ),
            units: uniq(existingUnits.map((u) => u.unit_code)),
        };
    }, [peripherals, existingRooms, existingUnits]);

    function onApplyFilters(newFilters) {
        const cleaned = Object.fromEntries(
            Object.entries({
                ...newFilters,
                search: searchTerm || undefined,
            }).filter(([, v]) => v !== "" && v !== undefined)
        );
        router.get("/technician/peripherals", cleaned, {
            preserveState: true,
            replace: true,
        });
    }

    const filteredData = useMemo(() => {
        if (!searchTerm) return peripherals;
        const q = searchTerm.toLowerCase();
        return peripherals.filter((p) =>
            [
                p.peripheral_code,
                p.type,
                p.serial_number,
                p.condition,
                p.room?.room_number,
                p.unit?.unit_code,
            ]
                .filter(Boolean)
                .some((val) => val.toLowerCase().includes(q))
        );
    }, [peripherals, searchTerm]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

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
                router.delete(`/technician/peripherals/${id}`, {
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "Peripheral deleted successfully.",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                    },
                });
            }
        });
    }

    return (
        <SidebarProvider>
            <TechnicianAppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/technician/dashboard">
                                    Dashboard
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="/technician/peripherals"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    Peripherals
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex-1" />
             
                </header>

                <main>
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-5">
                            Technician Peripherals
                        </h1>

                        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4">
                            <div className="flex gap-2 items-center">
                                <PeripheralsFilter
                                    filters={filters}
                                    filterOptions={filterOptions}
                                    onApplyFilters={onApplyFilters}
                                />

                                <Input
                                    placeholder="Search peripherals..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    className="w-64"
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link href="/technician/peripherals/create">
                                    <Button  className="bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium">Add Peripheral</Button>
                                </Link>
                            </div>
                        </div>

                        <Card>
                         <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10">
                                            <TableHead>#</TableHead>
                                            <TableHead>Peripheral Code</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Brand</TableHead>
                                            <TableHead>Model</TableHead>
                                            <TableHead>Serial Number</TableHead>
                                            <TableHead>Condition</TableHead>
                                            <TableHead>Room</TableHead>
                                            <TableHead>Unit</TableHead>
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
                                                        {p.brand}
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.model}
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.serial_number}
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.condition}
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.room
                                                            ? `ROOM ${p.room.room_number}`
                                                            : "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {p.unit
                                                            ? p.unit.unit_code
                                                            : "N/A"}
                                                    </TableCell>
                                                   <TableCell className="space-x-2 flex items-center">
  {/* View Button */}
  <Link href={`/technician/peripherals/${p.id}`}>
    <Button
      size="sm"
      className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
    >
      <Eye className="h-4 w-4" />
      View
    </Button>
  </Link>

  {/* Edit Button */}
  <Button
    size="sm"
    className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
    onClick={() => setEditPeripheral(p)}
  >
    <Edit2 className="h-4 w-4" />
    Edit
  </Button>

  {/* Delete Button */}
  <Button
    size="sm"
    variant="destructive"
    className="flex items-center gap-2"
    onClick={() => handleDelete(p.id)}
  >
    <Trash2 className="h-4 w-4" />
    Delete
  </Button>
</TableCell>

                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan="10"
                                                    className="text-center"
                                                >
                                                    No peripherals found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>

                                {/* Pagination */}
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
                                                setCurrentPage(currentPage - 1)
                                            }
                                        >
                                            Previous
                                        </Button>
                                        {Array.from(
                                            { length: totalPages },
                                            (_, idx) => idx + 1
                                        )
                                            .filter((page) => {
                                                if (
                                                    page === 1 ||
                                                    page === totalPages
                                                )
                                                    return true;
                                                return (
                                                    page >= currentPage - 2 &&
                                                    page <= currentPage + 2
                                                );
                                            })
                                            .map((page, idx, arr) => (
                                                <React.Fragment key={page}>
                                                    {idx > 0 &&
                                                        arr[idx] -
                                                            arr[idx - 1] >
                                                            1 && (
                                                            <span className="px-2">
                                                                ...
                                                            </span>
                                                        )}
                                                    <Button
                                                        size="sm"
                                                        variant={
                                                            currentPage ===
                                                            page
                                                                ? "default"
                                                                : "outline"
                                                        }
                                                        onClick={() =>
                                                            setCurrentPage(page)
                                                        }
                                                    >
                                                        {page}
                                                    </Button>
                                                </React.Fragment>
                                            ))}
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={
                                                currentPage === totalPages
                                            }
                                            onClick={() =>
                                                setCurrentPage(currentPage + 1)
                                            }
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>

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
