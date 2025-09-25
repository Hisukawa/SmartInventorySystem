import React, { useMemo, useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Swal from "sweetalert2";
import { Eye, Edit2, Trash2 } from "lucide-react";
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

/* ✅ Equipment Filter Component */
function EquipmentFilter({ filters, filterOptions, onApplyFilters }) {
    const [selectedField, setSelectedField] = useState("");

    const handleReset = () => {
        const resetFilters = {
            type: undefined,
            condition: undefined,
            room_id: undefined,
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
                    {/* Field Selector */}
                    <Select value={selectedField} onValueChange={setSelectedField}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select filter field" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="type">Type</SelectItem>
                            <SelectItem value="condition">Condition</SelectItem>
                            <SelectItem value="room">Room</SelectItem>
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
                                    room_id: value === "all" ? undefined : value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Room" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {Object.entries(filterOptions.rooms).map(
                                    ([id, name]) => (
                                        <SelectItem key={id} value={id}>
                                            {name}
                                        </SelectItem>
                                    )
                                )}
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

/* ✅ Main Equipment Component */
export default function EquipmentIndex({
    equipments,
    search,
    existingRooms,
       conditions,
    filters = {},
}) {
    const [searchTerm, setSearchTerm] = useState(search || "");
    const [editEquipment, setEditEquipment] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filterOptions = useMemo(() => {
        const uniq = (arr) => [...new Set(arr.filter((v) => v))].sort();
        return {
            types: uniq(equipments.map((e) => e.type)),
            conditions: uniq(equipments.map((e) => e.condition)),
            rooms: Object.fromEntries(
                existingRooms.map((r) => [String(r.id), r.room_number])
            ),
        };
    }, [equipments, existingRooms]);

    function onApplyFilters(newFilters) {
        const cleaned = Object.fromEntries(
            Object.entries({
                ...newFilters,
                search: searchTerm || undefined,
            }).filter(([, v]) => v !== "" && v !== undefined)
        );
        router.get("/technician/equipments", cleaned, {
            preserveState: true,
            replace: true,
        });
    }

    const handleSearch = (e) => {
        if (e.key === "Enter") onApplyFilters(filters);
    };

    const filteredData = useMemo(() => {
        if (!searchTerm) return equipments;
        const q = searchTerm.toLowerCase();
        return equipments.filter((e) =>
            [
                e.equipment_code,
                e.type,
                e.brand,
                e.model,
                e.serial_number,
                e.condition,
                e.room?.room_number,
            ]
                .filter(Boolean)
                .some((val) => val.toLowerCase().includes(q))
        );
    }, [equipments, searchTerm]);

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
                router.delete(`/technician/equipments/${id}`, {
                    onSuccess: () => {
                        Swal.fire({
                            icon: "success",
                            title: "Deleted!",
                            text: "Equipment deleted successfully.",
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
                                <BreadcrumbLink href="#">Assets</BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="/technician/equipments"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    Equipments
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex-1" />
                </header>

                <main>
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-5">Equipments</h1>

                        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4">
                            <div className="flex gap-2 items-center">
                                <EquipmentFilter
                                    filters={filters}
                                    filterOptions={filterOptions}
                                    onApplyFilters={onApplyFilters}
                                />
                                <Input
                                    placeholder="Search equipments..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleSearch}
                                    className="w-64"
                                />
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link href="/technician/equipments/create">
                                    <Button  className="text-sm sm:text-base px-3 py-1 sm:py-2 bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium">Add Equipment</Button>
                                </Link>
                            </div>
                        </div>

                        <Card>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                       <TableRow className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]">
                                            <TableHead>#</TableHead>
                                            <TableHead>Equipment Code</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Brand</TableHead>
                                         
                                            <TableHead>Condition</TableHead>
                                            <TableHead>Room</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedData.length > 0 ? (
                                            paginatedData.map((e, index) => (
                                                <TableRow key={e.id}>
                                                    <TableCell>
                                                        {(currentPage - 1) * itemsPerPage +
                                                            index +
                                                            1}
                                                    </TableCell>
                                                    <TableCell>{e.equipment_code}</TableCell>
                                                    <TableCell>{e.type}</TableCell>
                                                    <TableCell>{e.brand}</TableCell>
                                                 
                                                    <TableCell>{e.condition}</TableCell>
                                                    <TableCell>
                                                        {e.room ? `ROOM ${e.room.room_number}` : "N/A"}
                                                    </TableCell>
                                                    <TableCell className="text-center">
  <div className="hidden sm:flex gap-2 justify-center">
    {/* View Button */}
    <Link href={`/technician/equipments/${e.id}`}>
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
      onClick={() => setEditEquipment(e)}
    >
      <Edit2 className="h-4 w-4" />
      Edit
    </Button>

    {/* Delete Button */}
    <Button
      size="sm"
      variant="destructive"
      className="flex items-center gap-2"
      onClick={() => handleDelete(e.id)}
    >
      <Trash2 className="h-4 w-4" />
      Delete
    </Button>
  </div>
</TableCell>

                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan="9" className="text-center">
                                                    No equipments found.
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
                                            onClick={() => setCurrentPage(currentPage - 1)}
                                        >
                                            Previous
                                        </Button>
                                        {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                                            .filter(page => page === 1 || page === totalPages || (page >= currentPage - 2 && page <= currentPage + 2))
                                            .map((page, idx, arr) => (
                                                <React.Fragment key={page}>
                                                    {idx > 0 && arr[idx] - arr[idx - 1] > 1 && (
                                                        <span className="px-2">...</span>
                                                    )}
                                                    <Button
                                                        size="sm"
                                                        variant={currentPage === page ? "default" : "outline"}
                                                        onClick={() => setCurrentPage(page)}
                                                    >
                                                        {page}
                                                    </Button>
                                                </React.Fragment>
                                            ))}
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            disabled={currentPage === totalPages}
                                            onClick={() => setCurrentPage(currentPage + 1)}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>

                {/* ✅ Inline Edit Modal */}
                {editEquipment && (
                    <EditEquipmentModal
                        equipment={editEquipment}
                        rooms={existingRooms}
                         conditions={conditions}
                        onClose={() => setEditEquipment(null)}
                    />
                )}
            </SidebarInset>
        </SidebarProvider>
    );
}

/* ✅ Edit Equipment Modal Component */
/* ✅ Edit Equipment Modal Component */
function EditEquipmentModal({ equipment, rooms, conditions, onClose }) {
    const { data, setData, put, processing } = useForm({
        equipment_code: equipment.equipment_code || "",
        type: equipment.type || "",
        brand: equipment.brand || "",
        condition: equipment.condition || "",
        room_id: equipment.room_id || "",
        isCustomCondition: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("technician.equipments.update", equipment.id), {
            onSuccess: () => {
                Swal.fire("Updated!", "Equipment updated successfully.", "success");
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Edit Equipment</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        placeholder="Equipment Code"
                        value={data.equipment_code}
                        onChange={(e) => setData("equipment_code", e.target.value)}
                    />
                    <Input
                        placeholder="Type"
                        value={data.type}
                        onChange={(e) => setData("type", e.target.value)}
                    />
                    <Input
                        placeholder="Brand"
                        value={data.brand}
                        onChange={(e) => setData("brand", e.target.value)}
                    />

                        <input
                            type="text"
                            list="conditionOptions"
                            className="w-full border rounded p-2"
                            placeholder="Enter or select condition"
                            value={data.condition}
                            onChange={(e) => setData("condition", e.target.value)}
                        />
                        <datalist id="conditionOptions">
                            <option value="Good" />
                            <option value="Fair" />
                            <option value="Needs Repair" />
                            <option value="Broken" />
                        </datalist>
                    {/* ✅ Room dropdown */}
                    <Select
                        value={String(data.room_id)}
                        onValueChange={(value) => setData("room_id", value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Room" />
                        </SelectTrigger>
                        <SelectContent>
                            {rooms.map((room) => (
                                <SelectItem key={room.id} value={String(room.id)}>
                                    Room {room.room_number}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={processing}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Save
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
