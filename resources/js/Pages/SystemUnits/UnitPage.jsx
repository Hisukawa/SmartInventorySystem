import React, { useState, useMemo, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
//import AddUnitModal from "@/Pages/SystemUnits/Modal/AddUnitModal";
import EditUnitModal from "@/Pages/SystemUnits/Modal/EditUnitModal";
import { useForm as useInertiaForm } from "@inertiajs/react";
import Swal from "sweetalert2";
import { router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import Notification from "@/Components/AdminComponents/Notification";
import { Eye, Edit2, Trash2 } from "lucide-react";
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
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/* 🔽 Added for Faculty-style filter UI */
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

//filter icon
import {
    Filter as FilterIcon,
    X,
    Printer,
    Upload,
    Download,
} from "lucide-react";

const CONDITION_OPTIONS = [
    { label: "Functional", color: "bg-green-500" },
    { label: "Defective", color: "bg-red-500" },
    { label: "Under Maintenance", color: "bg-yellow-500" },
    { label: "Needs Upgrade", color: "bg-blue-500" },
    { label: "For Disposal", color: "bg-gray-500" },
];

/* ✅ Reusable Filter (Faculty-style) */
/* ✅ Reusable Filter (Faculty-style) */
function UnitsFilter({ filters = {}, filterOptions, onApplyFilters, onReset }) {
    const [selectedField, setSelectedField] = useState("");
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        const fieldsOrder = [
            "unit_code",
            "room_id",
            "processor",
            "ram",
            "storage",
            "gpu",
            "motherboard",
            "condition",
        ];
        const found = fieldsOrder.find((f) => !!filters[f]);
        if (found) {
            setSelectedField(found);
            setSelectedValue(String(filters[found]));
        } else {
            setSelectedField("");
            setSelectedValue("");
        }
    }, [filters]);

    const fields = [
        { value: "unit_code", label: "Unit Code" },
        { value: "room_id", label: "Room" },
        { value: "processor", label: "Processor" },
        { value: "ram", label: "RAM" },
        { value: "storage", label: "Storage" },
        { value: "gpu", label: "GPU" },
        { value: "motherboard", label: "Motherboard" },
        { value: "condition", label: "Condition" },
    ];

    function handleValueChange(value) {
        const newValue = value === "all" ? "" : value;
        setSelectedValue(newValue);

        const newFilters = { ...filters };
        if (selectedField) newFilters[selectedField] = newValue;
        onApplyFilters(newFilters);
    }

    const hasAnyFilter =
        !!filters.unit_code ||
        !!filters.room_id ||
        !!filters.processor ||
        !!filters.ram ||
        !!filters.storage ||
        !!filters.gpu ||
        !!filters.motherboard ||
        !!filters.condition;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]">
                    <FilterIcon className="h-4 w-4" />
                    Filter
                    {hasAnyFilter && (
                        <X
                            className="h-4 w-4 ml-1 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedField("");
                                setSelectedValue("");
                                onReset();
                            }}
                        />
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[380px] p-4">
                <h4 className="font-medium mb-3 text-lg">Filter Options</h4>
                <div className="flex flex-col gap-4">
                    {/* Field selector */}
                    <Select
                        value={selectedField}
                        onValueChange={(val) => {
                            setSelectedField(val);
                            setSelectedValue("");
                        }}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Field" />
                        </SelectTrigger>
                        <SelectContent>
                            {fields.map((f) => (
                                <SelectItem key={f.value} value={f.value}>
                                    {f.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Value selector (depends on field) */}
                    {selectedField === "unit_code" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Unit Code" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.unit_codes.map((c) => (
                                    <SelectItem key={c} value={c}>
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {selectedField === "room_id" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
                        >
                            <SelectTrigger className="w-full">
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

                    {selectedField === "processor" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Processor" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.processors.map((v) => (
                                    <SelectItem key={v} value={v}>
                                        {v}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {selectedField === "ram" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select RAM" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.rams.map((v) => (
                                    <SelectItem key={v} value={v}>
                                        {v}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {selectedField === "storage" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Storage" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.storages.map((v) => (
                                    <SelectItem key={v} value={v}>
                                        {v}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {selectedField === "gpu" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select GPU" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.gpus.map((v) => (
                                    <SelectItem key={v} value={v}>
                                        {v}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {selectedField === "motherboard" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Motherboard" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.motherboards.map((v) => (
                                    <SelectItem key={v} value={v}>
                                        {v}
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
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Condition" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.conditions.map((v) => (
                                    <SelectItem key={v} value={v}>
                                        {v}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {/* ✅ Reset button inside filter */}
                    <div className="flex justify-end">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                                setSelectedField("");
                                setSelectedValue("");
                                onReset();
                            }}
                        >
                            <X className="mr-1 h-4 w-4" /> Reset
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default function UnitsPage({ units, rooms, filters = {} }) {
    const [search, setSearch] = useState(filters.search || "");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const itemsPerPage = 10;

    const { delete: destroy } = useInertiaForm();

    const handleUpdateSuccess = () => {
        Swal.fire({
            icon: "success",
            title: "Updated!",
            text: "The system unit has been updated successfully.",
        });
    };

    // Build filterOptions from current data
    const filterOptions = useMemo(() => {
        const uniq = (arr) =>
            [...new Set(arr.filter((v) => v !== null && v !== ""))].sort();
        return {
            rooms: Object.fromEntries(
                rooms.map((r) => [String(r.id), r.room_number])
            ),
            unit_codes: uniq(units.map((u) => u.unit_code)),
            processors: uniq(units.map((u) => u.processor)),
            rams: uniq(units.map((u) => u.ram)),
            storages: uniq(units.map((u) => u.storage)),
            gpus: uniq(units.map((u) => u.gpu)),
            motherboards: uniq(units.map((u) => u.motherboard)),
            conditions: uniq(units.map((u) => u.condition)),
        };
    }, [units, rooms]);

    // Backend filtering (same style as Faculty-reporting.jsx)
    function onApplyFilters(newFilters) {
        const cleaned = Object.fromEntries(
            Object.entries({
                ...newFilters,
                search: search || undefined,
            }).filter(([, v]) => v !== "" && v !== undefined)
        );

        router.get(route("system-units.index"), cleaned, {
            preserveState: true,
            replace: true,
        });
    }
    function resetFilters() {
        setSearch("");
        router.get(
            route("system-units.index"),
            {},
            { preserveState: true, replace: true }
        );
    }

    function handleSearchKey(e) {
        if (e.key === "Enter") {
            onApplyFilters(filters); // use current server filters + search
        }
    }

    // Client-side search (kept, so typing still narrows immediately)
    const filteredUnits = useMemo(() => {
        if (!search) return units;
        const q = search.toLowerCase();
        return units.filter((u) => {
            const code = u.unit_code?.toLowerCase() || "";
            const room = u.room?.room_number?.toLowerCase() || "";
            return code.includes(q) || room.includes(q);
        });
    }, [units, search]);

    const totalPages = Math.ceil(filteredUnits.length / itemsPerPage) || 1;
    const paginatedUnits = filteredUnits.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getCondition = (value) => {
        const match = CONDITION_OPTIONS.find(
            (opt) => opt.label.toLowerCase() === (value || "").toLowerCase()
        );
        return match || { label: value || "Unknown", color: "bg-slate-400" };
    };

    const tableRef = useRef(null);

    //handle for printing
    const handlePrint = () => {
        if (!units || units.length === 0) {
            alert("No data available to print.");
            return;
        }

        const printWindow = window.open("", "", "width=900,height=700");

        // Generate table rows from existing data
        const tableRows = units
            .map(
                (unit) => `
        <tr>
            <td>${unit.id}</td>
            <td>${unit.unit_code}</td>
            <td>${unit.room?.room_number ?? "N/A"}</td>
            <td>${unit.serial_number}</td>
            <td>${unit.processor}</td>
            <td>${unit.ram}</td>
            <td>${unit.storage}</td>
            <td>${unit.gpu ?? "N/A"}</td>
            <td>${unit.motherboard}</td>
            <td>${unit.condition}</td>
            <td>${unit.condition_details ?? "N/A"}</td>
          <td>${unit.mr_to?.name ?? "N/A"}</td>
        </tr>
    `
            )
            .join("");

        // Write the print layout
        printWindow.document.write(`
        <html>
            <head>
                <title>Complete System Units Report</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    h2 {
                        text-align: center;
                        margin-bottom: 20px;
                        color: #2e7d32;
                    }
                    p {
                        text-align: right;
                        font-size: 12px;
                        color: #666;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 10px;
                    }
                    th, td {
                        border: 1px solid #ccc;
                        padding: 8px;
                        text-align: left;
                        font-size: 13px;
                    }
                    th {
                        background-color: #2e7d32;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background-color: #f9f9f9;
                    }
                    @media print {
                        body { -webkit-print-color-adjust: exact; }
                    }
                </style>
            </head>
            <body>
                <h2>Complete System Units Report</h2>
                <p>Generated on: ${new Date().toLocaleString()}</p>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Unit Code</th>
                            <th>Room</th>
                            <th>Serial Number</th>
                            <th>Processor</th>
                            <th>RAM</th>
                            <th>Storage</th>
                            <th>GPU</th>
                            <th>Motherboard</th>
                            <th>Condition</th>
                            <th>Condition Details</th>
                            <th>Material Responsible</th>
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

    // 🔽 Handle Import
    const handleImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(route("system-units.import"), {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector(
                        'meta[name="csrf-token"]'
                    ).content,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Import Successful!",
                    text: data.message,
                }).then(() => {
                    router.reload({ only: ["units"] });
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Import Failed",
                    text:
                        data.error ||
                        "There was a problem with the import file.",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Import Error",
                text: error.message,
            });
        } finally {
            e.target.value = "";
        }
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Fixed content header inside the main area */}
                <header className="sticky top-0 z-20 bg-white border-b px-6 py-3">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger />
                        <Separator
                            orientation="vertical"
                            className="h-6 mx-3"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href="#"
                                        aria-current="page"
                                    >
                                        Assets
                                    </BreadcrumbLink>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbLink
                                        href="/admin/system-units"
                                        aria-current="page"
                                        className="font-semibold text-foreground"
                                    >
                                        System Unit Lists
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex-1" />
                        <Notification />
                    </div>
                </header>

                <main className="w-full px-6 py-4">
                    <h1 className="text-2xl font-semibold mb-4">
                        System Units
                    </h1>

                    {/* Search + Filter + Add */}
                    <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4">
                        <div className="flex gap-2 items-center flex-1">
                            <Input
                                placeholder="Search Unit Code or Room"
                                value={search}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                                onKeyDown={handleSearchKey}
                                className="flex-1 min-w-0 sm:max-w-xs w-full border-[hsl(142,34%,51%)]"
                            />

                            <UnitsFilter
                                filters={filters}
                                filterOptions={filterOptions}
                                onApplyFilters={onApplyFilters}
                                onReset={resetFilters}
                            />

                            <Button
                                className="flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]"
                                onClick={handlePrint}
                            >
                                <Printer className="h-4 w-4" />
                                Print
                            </Button>
                        </div>

                        {/* Import Button */}
                        {/* <label className="flex items-center gap-2 cursor-pointer bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)] px-4 py-2 rounded-md">
                                <input
                                    type="file"
                                    accept=".csv"
                                    onChange={handleImport}
                                    className="hidden"
                                />
                                <Upload className="h-4 w-4" />
                                Import
                            </label> */}

                        {/* Export Data */}
                        {/* <Button
                                className="flex items-center gap-2 bg-[hsl(142,34%,45%)] text-white border-none hover:bg-[hsl(142,34%,38%)]"
                                onClick={() =>
                                    (window.location.href = route(
                                        "system-units.export"
                                    ))
                                }
                            >
                                <Download className="h-4 w-4" />
                                Export
                            </Button> */}

                        <Button
                            className="bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                            onClick={() =>
                                router.visit(route("admin.system-units.create"))
                            }
                        >
                            Add New Unit
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-lg shadow-lg">
                        <Table
                            ref={tableRef}
                            className="w-full bg-white table-fixed"
                        >
                            <TableHeader>
                                <TableRow className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10">
                                    <TableHead className="px-5 py-1">
                                        #
                                    </TableHead>
                                    <TableHead className="px-5 py-1">
                                        PC Code
                                    </TableHead>
                                    <TableHead className="px-5 py-1">
                                        Room
                                    </TableHead>
                                    <TableHead className="px-5 py-1">
                                        Condition
                                    </TableHead>
                                    <TableHead className="px-5 py-1">
                                        Action
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {paginatedUnits.length > 0 ? (
                                    paginatedUnits.map((unit, index) => (
                                        <TableRow
                                            key={unit.id}
                                            className="hover:shadow-sm"
                                        >
                                            {/* # */}
                                            <TableCell className="px-5 py-1">
                                                {(currentPage - 1) *
                                                    itemsPerPage +
                                                    index +
                                                    1}
                                            </TableCell>

                                            {/* PC Code */}
                                            <TableCell className="px-5 py-1">
                                                {unit.unit_code}
                                            </TableCell>

                                            {/* Room */}
                                            <TableCell className="px-5 py-1">
                                                ROOM{" "}
                                                {unit.room?.room_number ||
                                                    "N/A"}
                                            </TableCell>

                                            {/* Condition */}
                                            <TableCell className="px-5 py-1">
                                                {unit.condition ? (
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                                                            getCondition(
                                                                unit.condition
                                                            ).color
                                                        }`}
                                                    >
                                                        {
                                                            getCondition(
                                                                unit.condition
                                                            ).label
                                                        }
                                                    </span>
                                                ) : (
                                                    "N/A"
                                                )}
                                            </TableCell>

                                            {/* Actions */}
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                                                        onClick={() =>
                                                            router.visit(
                                                                `/system-units/view/${unit.unit_path}`
                                                            )
                                                        }
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                                                        onClick={() => {
                                                            setSelectedUnit(
                                                                unit
                                                            );
                                                            setShowModal(true);
                                                        }}
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                        Edit
                                                    </Button>

                                                    {/* Delete Button */}
                                                    <Button
                                                        size="sm"
                                                        className="flex items-center gap-2 bg-red-600 text-white border-none hover:bg-red-700"
                                                        onClick={() => {
                                                            if (
                                                                confirm(
                                                                    `Are you sure you want to delete ${unit.unit_name}?`
                                                                )
                                                            ) {
                                                                router.delete(
                                                                    `/system-units/${unit.id}`
                                                                );
                                                            }
                                                        }}
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
                                        <TableCell
                                            colSpan={5}
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
                        {/* Page Info */}
                        <span className="text-sm text-muted-foreground">
                            Showing{" "}
                            {filteredUnits.length === 0
                                ? 0
                                : (currentPage - 1) * itemsPerPage + 1}{" "}
                            –
                            {Math.min(
                                currentPage * itemsPerPage,
                                filteredUnits.length
                            )}{" "}
                            of {filteredUnits.length} System Units
                        </span>

                        {/* Buttons */}
                        <div className="flex gap-2 items-center">
                            {/* Previous */}
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

                            {/* Page Numbers (at least 5 visible) */}
                            {Array.from(
                                { length: totalPages },
                                (_, idx) => idx + 1
                            )
                                .filter((page) => {
                                    // Always show first & last
                                    if (page === 1 || page === totalPages)
                                        return true;
                                    // Show sliding window around current page (±2 = 5 total)
                                    return (
                                        page >= currentPage - 2 &&
                                        page <= currentPage + 2
                                    );
                                })
                                .map((page, idx, arr) => (
                                    <React.Fragment key={page}>
                                        {/* Ellipsis if gap */}
                                        {idx > 0 &&
                                            arr[idx] - arr[idx - 1] > 1 && (
                                                <span className="px-1">
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
                                            onClick={() => setCurrentPage(page)}
                                        >
                                            {page}
                                        </Button>
                                    </React.Fragment>
                                ))}

                            {/* Next */}
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

                    {/* Edit Modal */}
                    {selectedUnit && (
                        <EditUnitModal
                            unit={selectedUnit}
                            rooms={rooms}
                            onClose={() => setSelectedUnit(null)}
                            onSuccess={handleUpdateSuccess}
                        />
                    )}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
