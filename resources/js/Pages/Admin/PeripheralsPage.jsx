import React, { useMemo, useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Swal from "sweetalert2";
import Notification from "@/Components/AdminComponents/Notification";
import { Eye, Edit2, Trash2, MoreVertical } from "lucide-react";
import { Menu } from "@headlessui/react";
import QRCode from "react-qr-code";

import ReactDOMServer from "react-dom/server.browser";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";

import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

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
import EditPeripheralModal from "./Peripherals/EditPeripheralModal";
import { Upload, Download } from "lucide-react";

/* 🔽 Faculty-style filter imports */
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
import { Filter as FilterIcon, X, Printer } from "lucide-react";

/* ✅ Reusable Filter Component */
function PeripheralsFilter({ filters, filterOptions, onApplyFilters }) {
    const [selectedField, setSelectedField] = useState("");

    const handleReset = () => {
        // reset everything at once
        const resetFilters = {
            type: undefined,
            condition: undefined,
            room_id: undefined,
            unit_code: undefined,
        };
        setSelectedField(""); // also clear the active field selection
        onApplyFilters(resetFilters);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                >
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Filters
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72">
                <div className="flex flex-col gap-3">
                    {/* Field Selector */}
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
                                    unit_id: undefined, // <-- STEP 2: reset unit filter
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
                            value={filters.unit_id || "all"}
                            onValueChange={(value) =>
                                onApplyFilters({
                                    ...filters,
                                    unit_id:
                                        value === "all" ? undefined : value,
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Unit" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>

                                {filterOptions.units.length === 0 && (
                                    <div className="px-3 py-2 text-sm text-gray-400">
                                        No units found for this room
                                    </div>
                                )}

                                {filterOptions.units.map((u) => (
                                    <SelectItem key={u.id} value={u.id}>
                                        {u.code}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {/* Reset All button */}
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

/* ✅ Peripheral Condition Options with Color */
// const PERIPHERAL_CONDITION_OPTIONS = [
//     { label: "Functional", color: "bg-green-500" }, // fully functional
//     { label: "Defective", color: "bg-red-500" }, // broken / not usable
//     { label: "Intermittent Issue", color: "bg-yellow-500" }, // works sometimes / unstable
//     { label: "Needs Cleaning", color: "bg-blue-500" }, // dirty / minor issue
//     { label: "For Replacement", color: "bg-orange-500" }, // usable but needs replacing soon
//     { label: "For Disposal", color: "bg-gray-500" }, // completely unusable
// ];

/* ✅ Main Component */
export default function PeripheralsIndex({
    peripherals,
    search,
    existingRooms,
    existingUnits,
    filters = {},
}) {
    const [downloadPanelOpen, setDownloadPanelOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedPeripherals, setSelectedPeripherals] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleRoomChange = (roomId) => {
        setSelectedRoom(roomId);
        const roomPeripherals = peripherals
            .filter((p) => p.room_id === roomId)
            .map((p) => p.id);
        setSelectedPeripherals([]);
        setSelectAll(false);
    };
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedPeripherals([]);
        } else if (selectedRoom) {
            const roomPeripherals = peripherals
                .filter((p) => p.room_id === selectedRoom)
                .map((p) => p.id);
            setSelectedPeripherals(roomPeripherals);
        }
        setSelectAll(!selectAll);
    };

    const togglePeripheral = (id) => {
        setSelectedPeripherals((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };

    const downloadSelectedQR = async () => {
        if (selectedPeripherals.length === 0) {
            alert("Select at least one peripheral.");
            return;
        }

        const selected = peripherals.filter((p) =>
            selectedPeripherals.includes(p.id)
        );

        // Canvas setup
        const qrSize = 128;
        const padding = 20;
        const textHeight = 10;
        const columns = 6; // how many QR codes per row
        const rows = Math.ceil(selected.length / columns);

        const canvasWidth = columns * (qrSize + padding) + padding;
        const canvasHeight = rows * (qrSize + textHeight + padding) + padding;

        const canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        const ctx = canvas.getContext("2d");

        // Background
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = "center";
        ctx.fillStyle = "#000";
        ctx.font = `bold ${textHeight}px Arial`;

        for (let i = 0; i < selected.length; i++) {
            const p = selected[i];
            const qrValue = `${window.location.origin}/peripherals/${p.peripheral_code}`;
            const qrSVGString = ReactDOMServer.renderToStaticMarkup(
                <QRCode value={qrValue} size={qrSize} />
            );

            const blob = new Blob([qrSVGString], { type: "image/svg+xml" });
            const url = URL.createObjectURL(blob);

            await new Promise((resolve) => {
                const img = new Image();
                img.onload = () => {
                    const row = Math.floor(i / columns);
                    const col = i % columns;
                    const x = padding + col * (qrSize + padding);
                    const y = padding + row * (qrSize + textHeight + padding);

                    ctx.drawImage(img, x, y, qrSize, qrSize);
                    ctx.fillText(
                        `${p.type} - ${p.peripheral_code}`,
                        x + qrSize / 2,
                        y + qrSize + 18
                    );

                    URL.revokeObjectURL(url);
                    resolve();
                };
                img.src = url;
            });
        }

        // Download final image
        const link = document.createElement("a");
        link.download = `Peripherals_Room_${selectedRoom}.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
    };

    const [searchTerm, setSearchTerm] = useState(search || "");
    const [editPeripheral, setEditPeripheral] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filterOptions = useMemo(() => {
        const uniq = (arr) => [...new Set(arr.filter((v) => v))].sort();

        // Filter units based on selected room
        const filteredUnits = filters.room_id
            ? existingUnits.filter(
                  (u) => String(u.room_id) === String(filters.room_id)
              )
            : existingUnits; // if no room selected, show all units

        return {
            types: uniq(peripherals.map((p) => p.type)),
            conditions: uniq(peripherals.map((p) => p.condition)),
            rooms: Object.fromEntries(
                existingRooms.map((r) => [String(r.id), r.room_number])
            ),
            units: filteredUnits.map((u) => ({
                id: String(u.id),
                code: u.unit_code,
            })),
        };
    }, [peripherals, existingRooms, existingUnits, filters.room_id]);

    function onApplyFilters(newFilters) {
        const cleaned = Object.fromEntries(
            Object.entries({
                ...newFilters,
                search: searchTerm || undefined,
            }).filter(([, v]) => v !== "" && v !== undefined)
        );
        router.get("/admin/peripherals", cleaned, {
            preserveState: true,
            replace: true,
        });
    }

    function resetFilters() {
        setSearchTerm("");
        router.get(
            "/admin/peripherals",
            {},
            { preserveState: true, replace: true }
        );
    }

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            onApplyFilters(filters);
        }
    };

    // Client-side narrowing by search
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
                p.unit_code,
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

    /* Helper to get condition object */
    // function getCondition(condition) {
    //     return (
    //         PERIPHERAL_CONDITION_OPTIONS.find(
    //             (opt) => opt.label.toLowerCase() === condition?.toLowerCase()
    //         ) || { label: condition, color: "bg-slate-400" }
    //     );
    // }

    //handle for printing
    const handlePrint = () => {
        if (!peripherals || peripherals.length === 0) {
            alert("No data available to print.");
            return;
        }

        const printWindow = window.open("", "", "width=900,height=700");

        const tableRows = peripherals
            .map(
                (p) => `
        <tr>
            <td>${p.id}</td>
            <td>${p.peripheral_code}</td>
            <td>${p.type}</td>
            <td>${p.brand ?? "N/A"}</td>
            <td>${p.model ?? "N/A"}</td>
            <td>${p.serial_number ?? "N/A"}</td>
            <td>${p.condition ?? "N/A"}</td>
            <td>${p.room?.room_number ?? "N/A"}</td>
            <td>${p.unit?.unit_code ?? "N/A"}</td>
            <td>${p.unit?.mr_to?.name ?? "N/A"}</td>
        </tr>
    `
            )
            .join("");

        printWindow.document.write(`
        <html>
            <head>
                <title>Complete Peripherals Report</title>
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
                <h2>Complete Peripherals Report</h2>
                <p>Generated on: ${new Date().toLocaleString()}</p>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Peripheral Code</th>
                            <th>Type</th>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Serial Number</th>
                            <th>Condition</th>
                            <th>Room</th>
                            <th>Unit Code</th>
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

    // Import Handler
    // const handlePeripheralImport = async (e) => {
    //     const file = e.target.files[0];
    //     if (!file) return;

    //     const formData = new FormData();
    //     formData.append("file", file);

    //     try {
    //         const response = await fetch(route("peripherals.import"), {
    //             method: "POST",
    //             headers: {
    //                 "X-CSRF-TOKEN": document.querySelector(
    //                     'meta[name="csrf-token"]'
    //                 ).content,
    //             },
    //             body: formData,
    //         });

    //         // Debug: log raw text
    //         const text = await response.text();
    //         console.log(text);

    //         // Then parse JSON only if ok
    //         if (response.ok) {
    //             const data = JSON.parse(text);
    //             Swal.fire({
    //                 icon: "success",
    //                 title: "Import Successful!",
    //                 text: data.message,
    //             });
    //         } else {
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Import Failed",
    //                 text: text,
    //             });
    //         }
    //     } catch (error) {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Import Error",
    //             text: error.message,
    //         });
    //     } finally {
    //         e.target.value = "";
    //     }
    // };

    const handlePeripheralImport = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(route("peripherals.import"), {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector(
                        'meta[name="csrf-token"]'
                    ).content,
                },
                body: formData,
            });

            const data = await response.json(); // parse JSON regardless of status

            if (response.ok) {
                // Successful import
                Swal.fire({
                    icon: "success",
                    title: "Import Successful!",
                    text: data.message || "Peripherals imported successfully.",
                });
            } else {
                // Failed import
                Swal.fire({
                    icon: "error",
                    title: "Import Failed",
                    text: data.error || "An unknown error occurred.",
                });
            }
        } catch (error) {
            // Network or unexpected error
            Swal.fire({
                icon: "error",
                title: "Import Error",
                text: error.message,
            });
        } finally {
            e.target.value = "";
        }
    };

    // const handlePeripheralImport = async (e) => {
    //     const file = e.target.files[0];
    //     if (!file) return;

    //     const formData = new FormData();
    //     formData.append("file", file);

    //     try {
    //         const response = await fetch(route("peripherals.import"), {
    //             method: "POST",
    //             headers: {
    //                 "X-CSRF-TOKEN": document.querySelector(
    //                     'meta[name="csrf-token"]'
    //                 ).content,
    //             },
    //             body: formData,
    //         });

    //         const text = await response.text(); // parse as text first

    //         if (response.ok) {
    //             // Try parsing JSON only if OK
    //             const data = JSON.parse(text);
    //             console.log("Import successful:", data.message);
    //         } else {
    //             // Server returned error HTML or JSON
    //             console.error("Import failed:", text); // <-- log HTML
    //         }
    //     } catch (error) {
    //         console.error("Import error:", error.message);
    //     } finally {
    //         e.target.value = "";
    //     }
    // };

    /* ✅ Peripheral Condition Colors */
    const CONDITION_COLORS = {
        Working: "bg-green-200 text-green-800",
        "Not Working": "bg-red-200 text-red-800",
        "Intermittent Issue": "bg-yellow-200 text-yellow-800",
        "Needs Cleaning": "bg-blue-200 text-blue-800",
        "For Replacement": "bg-orange-200 text-orange-800",
        "For Disposal": "bg-gray-200 text-gray-800",
        Condemned: "bg-black text-white",
        "Needs Repair": "bg-red-200 text-red-800",
        "No Signal": "bg-red-200 text-red-800",
        "Needs Configuration": "bg-blue-200 text-blue-800",
        "Under Maintenance": "bg-blue-200 text-blue-900",
        "To Be Diagnosed": "bg-blue-100 text-blue-700",
    };

    /* Helper to get condition label & color */
    function getCondition(condition) {
        if (!condition)
            return { label: "N/A", color: "bg-slate-400 text-white" };
        const colorClass =
            CONDITION_COLORS[condition] || "bg-slate-400 text-white";
        return { label: condition, color: colorClass };
    }

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
                                        href="/admin/peripherals"
                                        aria-current="page"
                                        className="font-semibold text-foreground"
                                    >
                                        Peripherals
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex-1" />
                        <Notification />
                    </div>
                </header>

                <main>
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-5">Peripherals</h1>

                        {/* Search + Filter + Add */}
                        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4">
                            <div className="flex gap-2 items-center flex-1">
                                <Input
                                    placeholder="Search peripherals..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    onKeyDown={handleSearch}
                                    className="flex-1 min-w-0 sm:max-w-xs w-full border-[hsl(142,34%,51%)]"
                                />

                                <PeripheralsFilter
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
                                <Button
                                    className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white"
                                    onClick={() => setDownloadPanelOpen(true)}
                                >
                                    <Download className="h-4 w-4" />
                                    Download QR Codes
                                </Button>

                                {/* Import Button */}
                                {/* <label className="flex items-center gap-2 cursor-pointer bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)] px-4 py-2 rounded-md">
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={handlePeripheralImport}
                                        className="hidden"
                                    />
                                    <Upload className="h-4 w-4" />
                                    Import
                                </label>

                                <Button
                                    className="flex items-center gap-2 bg-[hsl(142,34%,45%)] text-white border-none hover:bg-[hsl(142,34%,38%)]"
                                    onClick={() =>
                                        (window.location.href =
                                            "/admin/peripherals/export")
                                    }
                                >
                                    <Download className="h-4 w-4" />
                                    Export
                                </Button> */}
                            </div>
                            <div className="flex items-center space-x-4">
                                <Link href="/admin/peripherals/create">
                                    <Button className="bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium">
                                        Add Peripheral
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Table Header Full Width */}
                        <div className="overflow-x-auto rounded-lg shadow-lg">
                            <Table className="w-full table-auto">
                                <TableHeader>
                                    <TableRow className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10 text-center">
                                        <TableHead className="px-5 py-1 text-center">
                                            #
                                        </TableHead>
                                        <TableHead className="px-5 py-1 text-center">
                                            Peripheral Code
                                        </TableHead>
                                        <TableHead className="px-5 py-1 text-center">
                                            Type
                                        </TableHead>
                                        <TableHead className="px-5 py-1 text-center">
                                            Room
                                        </TableHead>
                                        <TableHead className="px-5 py-1 text-center">
                                            Units
                                        </TableHead>
                                        <TableHead className="px-5 py-1 text-center">
                                            Condition
                                        </TableHead>
                                        <TableHead className="px-5 py-1 text-center">
                                            Actions
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {paginatedData.length > 0 ? (
                                        paginatedData.map((p, index) => (
                                            <TableRow
                                                key={p.id}
                                                className="hover:shadow-sm text-center"
                                            >
                                                {/* # */}
                                                <TableCell className="px-5 py-2 align-middle">
                                                    {(currentPage - 1) *
                                                        itemsPerPage +
                                                        index +
                                                        1}
                                                </TableCell>

                                                {/* Peripheral Code */}
                                                <TableCell className="px-5 py-2 align-middle">
                                                    {p.peripheral_code}
                                                </TableCell>

                                                {/* Type */}
                                                <TableCell className="px-5 py-2 align-middle">
                                                    {p.type}
                                                </TableCell>

                                                {/* Room */}
                                                <TableCell className="px-5 py-2 align-middle">
                                                    {p.room
                                                        ? `ROOM ${p.room.room_number}`
                                                        : "N/A"}
                                                </TableCell>

                                                {/* Unit */}
                                                <TableCell className="px-5 py-2 align-middle">
                                                    {p.unit
                                                        ? p.unit.unit_code
                                                        : "N/A"}
                                                </TableCell>

                                                {/* Condition */}
                                                <TableCell className="px-5 py-2 align-middle">
                                                    {p.condition ? (
                                                        <span
                                                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                getCondition(
                                                                    p.condition
                                                                ).color
                                                            }`}
                                                        >
                                                            {
                                                                getCondition(
                                                                    p.condition
                                                                ).label
                                                            }
                                                        </span>
                                                    ) : (
                                                        "N/A"
                                                    )}
                                                </TableCell>

                                                {/* Actions */}
                                                <TableCell className="px-5 py-2 align-middle">
                                                    {/* Desktop Buttons */}
                                                    <div className="hidden sm:flex justify-center items-center gap-2">
                                                        <Link
                                                            href={`/admin/peripherals/${p.id}`}
                                                        >
                                                            <Button
                                                                size="sm"
                                                                className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                                                            >
                                                                <Eye className="h-4 w-4" />{" "}
                                                                View
                                                            </Button>
                                                        </Link>

                                                        <Button
                                                            size="sm"
                                                            className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                                                            onClick={() =>
                                                                setEditPeripheral(
                                                                    p
                                                                )
                                                            }
                                                        >
                                                            <Edit2 className="h-4 w-4" />{" "}
                                                            Edit
                                                        </Button>

                                                        {/* Optional Delete */}
                                                        {/* <Button
                                                            size="sm"
                                                            className="flex items-center gap-2 bg-red-600 text-white border-none hover:bg-red-700"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    p.id
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-4 w-4" />{" "}
                                                            Delete
                                                        </Button> */}
                                                    </div>

                                                    {/* Mobile Dropdown */}
                                                    <div className="sm:hidden flex justify-center">
                                                        <Menu
                                                            as="div"
                                                            className="relative inline-block text-left"
                                                        >
                                                            <Menu.Button className="p-2 rounded bg-[hsl(142,34%,51%)] text-white">
                                                                <MoreVertical className="h-5 w-5" />
                                                            </Menu.Button>
                                                            <Menu.Items className="absolute right-0 mt-2 w-28 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none z-50">
                                                                <div className="px-1 py-1">
                                                                    <Menu.Item>
                                                                        {({
                                                                            active,
                                                                        }) => (
                                                                            <Link
                                                                                href={`/admin/peripherals/${p.id}`}
                                                                                className={`${
                                                                                    active
                                                                                        ? "bg-[hsl(142,34%,90%)]"
                                                                                        : ""
                                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                                                                            >
                                                                                <Eye className="h-4 w-4 mr-2" />{" "}
                                                                                View
                                                                            </Link>
                                                                        )}
                                                                    </Menu.Item>
                                                                    <Menu.Item>
                                                                        {({
                                                                            active,
                                                                        }) => (
                                                                            <button
                                                                                className={`${
                                                                                    active
                                                                                        ? "bg-[hsl(142,34%,90%)]"
                                                                                        : ""
                                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm text-gray-700`}
                                                                                onClick={() =>
                                                                                    setEditPeripheral(
                                                                                        p
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Edit2 className="h-4 w-4 mr-2" />{" "}
                                                                                Edit
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>
                                                                    {/* Optional Delete */}
                                                                    {/* <Menu.Item>
                                                                        {({
                                                                            active,
                                                                        }) => (
                                                                            <button
                                                                                className={`${
                                                                                    active
                                                                                        ? "bg-red-100"
                                                                                        : ""
                                                                                } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600`}
                                                                                onClick={() =>
                                                                                    handleDelete(
                                                                                        p.id
                                                                                    )
                                                                                }
                                                                            >
                                                                                <Trash2 className="h-4 w-4 mr-2" />{" "}
                                                                                Delete
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item> */}
                                                                </div>
                                                            </Menu.Items>
                                                        </Menu>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={8}
                                                className="text-center py-4"
                                            >
                                                No peripherals found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex justify-between items-center p-4">
                            <span className="text-sm text-muted-foreground">
                                Showing{" "}
                                {filteredData.length === 0
                                    ? 0
                                    : (currentPage - 1) * itemsPerPage + 1}{" "}
                                –
                                {Math.min(
                                    currentPage * itemsPerPage,
                                    filteredData.length
                                )}{" "}
                                of {filteredData.length} peripherals{" "}
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

                    {/* Slide-over */}
                    <div
                        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-xl transform transition-transform duration-300 z-50 flex flex-col
  ${downloadPanelOpen ? "translate-x-0" : "translate-x-full"}`}
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-lg font-semibold">
                                Download QR Codes by Room
                            </h2>
                            <Button
                                variant="ghost"
                                onClick={() => setDownloadPanelOpen(false)}
                            >
                                ✕
                            </Button>
                        </div>

                        {/* Room Select */}
                        <div className="p-4 border-b">
                            <label className="block mb-2 font-medium text-sm text-gray-700">
                                Select Room
                            </label>
                            <Select
                                value={selectedRoom || ""}
                                onValueChange={(value) =>
                                    handleRoomChange(Number(value))
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="-- Select Room --" />
                                </SelectTrigger>
                                <SelectContent>
                                    {existingRooms.map((room) => (
                                        <SelectItem
                                            key={room.id}
                                            value={room.id.toString()}
                                        >
                                            {room.room_number}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Select All */}
                        {selectedRoom && (
                            <div className="flex items-center gap-2 p-4 border-b">
                                <Checkbox
                                    checked={selectAll}
                                    onCheckedChange={toggleSelectAll}
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    Select All Peripherals in Room
                                </span>
                            </div>
                        )}

                        {/* Peripherals List */}
                        {selectedRoom && (
                            <ScrollArea className="flex-1 overflow-y-auto p-4 space-y-2">
                                {peripherals
                                    .filter((p) => p.room_id === selectedRoom)
                                    .map((p) => (
                                        <div
                                            key={p.id}
                                            className="flex items-center gap-2 p-2 border rounded-md hover:bg-gray-50 transition"
                                        >
                                            <Checkbox
                                                checked={selectedPeripherals.includes(
                                                    p.id
                                                )}
                                                onCheckedChange={() =>
                                                    togglePeripheral(p.id)
                                                }
                                            />
                                            <span className="text-sm text-gray-800">
                                                {p.type} - {p.peripheral_code}
                                            </span>
                                        </div>
                                    ))}
                            </ScrollArea>
                        )}

                        {/* Footer Buttons */}
                        <div className="p-4 border-t flex justify-end gap-2">
                            <Button
                                variant="secondary"
                                onClick={() => setDownloadPanelOpen(false)}
                            >
                                Close
                            </Button>
                            <Button
                                className="bg-[hsl(142,34%,51%)] text-white hover:bg-[hsl(142,34%,45%)]"
                                onClick={downloadSelectedQR}
                            >
                                Download Selected
                            </Button>
                        </div>
                    </div>

                    {/* Overlay */}
                    {downloadPanelOpen && (
                        <div
                            className="fixed inset-0 bg-black/40 z-40"
                            onClick={() => setDownloadPanelOpen(false)}
                        />
                    )}
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
