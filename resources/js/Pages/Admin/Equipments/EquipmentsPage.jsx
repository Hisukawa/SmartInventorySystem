import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import Notification from "@/Components/AdminComponents/Notification";
import { Filter as FilterIcon, X, Printer } from "lucide-react";
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
                    <FilterIcon className="h-4 w-4" /> {/* <-- add this */}
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
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [activeFilters, setActiveFilters] = useState({});
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

    // Filter + Search
    const filteredData = equipments.filter((eq) => {
        const matchesSearch =
            eq.equipment_code
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            eq.equipment_name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesType =
            !activeFilters.type || eq.type === activeFilters.type;
        const matchesCondition =
            !activeFilters.condition ||
            eq.condition === activeFilters.condition;
        const matchesRoom =
            !activeFilters.room || eq.room?.id === parseInt(activeFilters.room);

        return matchesSearch && matchesType && matchesCondition && matchesRoom;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle Print
    const handlePrint = () => {
        if (!filteredData || filteredData.length === 0) {
            alert("No data available to print.");
            return;
        }

        const printWindow = window.open("", "", "width=900,height=700");

        const tableRows = filteredData
            .map(
                (eq, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${eq.equipment_code}</td>
                <td>${eq.equipment_name}</td>
                <td>${eq.room?.room_number ?? "N/A"}</td>
                <td>${eq.type}</td>
                <td>${eq.condition ?? "N/A"}</td>
            </tr>
        `
            )
            .join("");

        printWindow.document.write(`
            <html>
                <head>
                    <title>Equipment Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        h2 { text-align: center; margin-bottom: 20px; color: #2e7d32; }
                        p { text-align: right; font-size: 12px; color: #666; }
                        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 13px; }
                        th { background-color: #2e7d32; color: white; }
                        tr:nth-child(even) { background-color: #f9f9f9; }
                        @media print { body { -webkit-print-color-adjust: exact; } }
                    </style>
                </head>
                <body>
                    <h2>Equipment Report</h2>
                    <p>Generated on: ${new Date().toLocaleString()}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Equipment Code</th>
                                <th>Equipment Name</th>
                                <th>Room</th>
                                <th>Type</th>
                                <th>Condition</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </body>
            </html>
        `);

        printWindow.document.close();
        printWindow.print();
    };

    // Handle Filters
    const onApplyFilters = (filters) => {
        setActiveFilters(filters);
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setActiveFilters({});
        setCurrentPage(1);
    };

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
                    {/* Search + Filter + Print */}
                    <h1 className="text-2xl font-bold mb-5">Equipments</h1>
                    <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4">
                        <div className="flex gap-2 items-center flex-1">
                            <Input
                                placeholder="Search Equipment..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 min-w-0 sm:max-w-xs w-full border-[hsl(142,34%,51%)]"
                            />

                            <EquipmentsFilter
                                filters={activeFilters}
                                filterOptions={filterOptions}
                                onApplyFilters={onApplyFilters}
                                onReset={resetFilters}
                            />
                            {/* Print Button with Printer Icon */}
                            <Button
                                onClick={handlePrint}
                                className="flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]"
                            >
                                <Printer className="h-4 w-4" />
                                Print
                            </Button>
                            {/* Filter Button with Filter Icon */}
                        </div>

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
