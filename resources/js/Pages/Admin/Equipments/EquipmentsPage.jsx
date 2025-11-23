import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import Notification from "@/Components/AdminComponents/Notification";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
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
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

// ✅ Condition Colors
const CONDITION_COLORS = {
    Functional: "bg-green-200 text-green-800",
    Defective: "bg-red-200 text-red-800",
    "Intermittent Issue": "bg-yellow-200 text-yellow-800",
    "Needs Cleaning": "bg-blue-200 text-blue-800",
    "For Replacement": "bg-orange-200 text-orange-800",
    "For Disposal": "bg-gray-200 text-gray-800",
    Condemned: "bg-black text-white",
    "Minor Damage": "bg-yellow-200 text-yellow-800",
    "Needs Repair": "bg-red-200 text-red-800",
    "Intermittent Connectivity": "bg-yellow-200 text-yellow-800",
    "No Signal": "bg-red-200 text-red-800",
    "Needs Configuration": "bg-blue-200 text-blue-800",
    Expired: "bg-red-300 text-red-900",
    "Needs Refill": "bg-blue-200 text-blue-900",
    Rusting: "bg-orange-200 text-orange-900",
};

function EquipmentsFilter({ filters, filterOptions, onApplyFilters }) {
    const [selectedField, setSelectedField] = useState("");
    const [selectedValue, setSelectedValue] = useState("");

    const handleValueChange = (value) => {
        const newValue = value === "all" ? "" : value;
        setSelectedValue(newValue);

        if (selectedField === "type")
            onApplyFilters({ ...filters, type: newValue });
        else if (selectedField === "condition")
            onApplyFilters({ ...filters, condition: newValue });
        else if (selectedField === "room")
            onApplyFilters({ ...filters, room_id: newValue });
    };

    const handleReset = () => {
        setSelectedField("");
        setSelectedValue("");
        onApplyFilters({ type: "", condition: "", room_id: "" });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]">
                    Filters
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
                <div className="flex flex-col gap-3">
                    <Select
                        value={selectedField}
                        onValueChange={(val) => {
                            setSelectedField(val);
                            setSelectedValue("");
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select filter field" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="type">Type</SelectItem>
                            <SelectItem value="condition">Condition</SelectItem>
                            <SelectItem value="room">Room</SelectItem>
                        </SelectContent>
                    </Select>

                    {selectedField === "type" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.types.map((t) => (
                                    <SelectItem key={t} value={t}>
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {selectedField === "condition" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Condition" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.conditions.map((c) => (
                                    <SelectItem key={c} value={c}>
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {selectedField === "room" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
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

                    {(selectedField || selectedValue) && (
                        <div className="flex justify-end">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleReset}
                                className="flex items-center gap-1 text-red-600 hover:bg-red-50"
                            >
                                Reset
                            </Button>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default function EquipmentsPage({
    equipments,
    existingRooms,
    filters = {},
}) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filterOptions = useMemo(() => {
        const uniq = (arr) => [...new Set(arr.filter(Boolean))].sort();
        return {
            types: uniq(equipments.map((e) => e.type)),
            conditions: uniq(equipments.map((e) => e.condition)),
            rooms: Object.fromEntries(
                existingRooms.map((r) => [String(r.id), r.room_number])
            ),
        };
    }, [equipments, existingRooms]);

    // Filter & search
    const filteredData = equipments.filter((eq) =>
        eq.equipment_code.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="sticky top-0 z-20 bg-white border-b px-6 py-3 flex items-center gap-2">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Assets</BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="/equipments"
                                    className="font-semibold text-foreground"
                                >
                                    Equipments
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex-1" />
                    <Notification />
                </header>

                <main className="w-full px-6 py-4">
                    <div className="flex justify-between items-center mb-4 gap-2">
                        <Input
                            placeholder="Search Equipment Code..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && setCurrentPage(1)
                            }
                            className="text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 flex-1 max-w-xs border-[hsl(142,34%,51%)]"
                        />
                        <Button
                            className="bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white"
                            onClick={() =>
                                router.visit("/equipments/addequipment")
                            }
                        >
                            Add Equipment
                        </Button>
                    </div>

                    <div className="overflow-x-auto rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]">
                                    <TableHead>#</TableHead>
                                    <TableHead>Equipment Code</TableHead>
                                    <TableHead>Equipment Name</TableHead>
                                    <TableHead>Room</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Condition</TableHead>
                                    <TableHead className="text-center">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedData.length > 0 ? (
                                    paginatedData.map((eq, index) => (
                                        <TableRow key={eq.id}>
                                            <TableCell>
                                                {(currentPage - 1) *
                                                    itemsPerPage +
                                                    index +
                                                    1}
                                            </TableCell>
                                            <TableCell>
                                                {eq.equipment_code}
                                            </TableCell>
                                            <TableCell>
                                                {eq.equipment_name}
                                            </TableCell>
                                            <TableCell>
                                                {eq.room?.room_number ?? "N/A"}
                                            </TableCell>
                                            <TableCell>{eq.type}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                        CONDITION_COLORS[
                                                            eq.condition
                                                        ] ||
                                                        "bg-gray-200 text-gray-800"
                                                    }`}
                                                >
                                                    {eq.condition}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-center flex gap-2 justify-center">
                                                <Button
                                                    size="sm"
                                                    className="bg-[hsl(142,34%,51%)] text-white"
                                                    onClick={() =>
                                                        router.visit(
                                                            `/admin/equipments/${eq.equipment_code}`
                                                        )
                                                    }
                                                >
                                                    View
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-[hsl(142,34%,51%)] text-white"
                                                    onClick={() =>
                                                        router.visit(
                                                            `/equipments/edit/${eq.equipment_code}`
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-red-500 text-white"
                                                    onClick={() => {
                                                        if (
                                                            confirm(
                                                                `Are you sure you want to delete ${eq.equipment_name}?`
                                                            )
                                                        ) {
                                                            router.delete(
                                                                `/equipments/${eq.equipment_code}`,
                                                                {
                                                                    preserveScroll: true,
                                                                }
                                                            );
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={7}
                                            className="text-center py-4"
                                        >
                                            No equipments found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center p-4">
                            <span className="text-sm text-muted-foreground">
                                Showing{" "}
                                {filteredData.length === 0
                                    ? 0
                                    : (currentPage - 1) * itemsPerPage + 1}{" "}
                                –{" "}
                                {Math.min(
                                    currentPage * itemsPerPage,
                                    filteredData.length
                                )}{" "}
                                of {filteredData.length} equipments
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
                                        if (page === 1 || page === totalPages)
                                            return true;
                                        return (
                                            page >= currentPage - 2 &&
                                            page <= currentPage + 2
                                        );
                                    })
                                    .map((page, idx, arr) => (
                                        <React.Fragment key={page}>
                                            {idx > 0 &&
                                                arr[idx] - arr[idx - 1] > 1 && (
                                                    <span className="px-2">
                                                        ...
                                                    </span>
                                                )}
                                            <Button
                                                size="sm"
                                                variant={
                                                    currentPage === page
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
                                    disabled={currentPage === totalPages}
                                    onClick={() =>
                                        setCurrentPage(currentPage + 1)
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
