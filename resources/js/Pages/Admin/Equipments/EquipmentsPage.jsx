import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useForm as useInertiaForm, router } from "@inertiajs/react";
import Swal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { Menu } from "@headlessui/react";
import { X } from "lucide-react";
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
import { Filter as FilterIcon, Printer } from "lucide-react";
const CONDITION_OPTIONS = [
    { label: "Functional", color: "bg-green-500" },
    { label: "Defective", color: "bg-red-500" },
    { label: "Under Maintenance", color: "bg-yellow-500" },
    { label: "Needs Upgrade", color: "bg-blue-500" },
    { label: "For Disposal", color: "bg-gray-500" },
];

function EquipmentsFilter({ filters, filterOptions, onApplyFilters }) {
    const [selectedField, setSelectedField] = useState("");
    const [selectedValue, setSelectedValue] = useState("");

    const handleValueChange = (value) => {
        const newValue = value === "all" ? "" : value;
        setSelectedValue(newValue);

        if (selectedField === "type") {
            onApplyFilters({ ...filters, type: newValue });
        } else if (selectedField === "condition") {
            onApplyFilters({ ...filters, condition: newValue });
        } else if (selectedField === "room") {
            onApplyFilters({ ...filters, room_id: newValue });
        }
    };

    const handleReset = () => {
        setSelectedField("");
        setSelectedValue("");
        onApplyFilters({ type: "", condition: "", room_id: "" });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                >
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
                                <X className="w-4 h-4" />
                                Reset
                            </Button>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

/* ✅ Equipment Condition Options with Color */
const EQUIPMENT_CONDITION_OPTIONS = [
    { label: "Functional", color: "bg-green-500" },
    { label: "Defective", color: "bg-red-500" },
    { label: "Intermittent Issue", color: "bg-yellow-500" },
    { label: "Needs Cleaning", color: "bg-blue-500" },
    { label: "For Replacement", color: "bg-orange-500" },
    { label: "For Disposal", color: "bg-gray-500" },
    { label: "Condemn", color: "bg-black" },
];

export default function EquipmentsPage({
    equipments,
    existingRooms,
    filters = {},
}) {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const itemsPerPage = 10;

    const { delete: destroy } = useInertiaForm();

    /* ✅ Utility to get condition object */
    const getCondition = (condition) => {
        return (
            EQUIPMENT_CONDITION_OPTIONS.find(
                (c) => c.label.toLowerCase() === condition.toLowerCase()
            ) || { label: condition, color: "bg-gray-400" }
        );
    };

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

    function onApplyFilters(newFilters) {
        const cleaned = Object.fromEntries(
            Object.entries({
                ...newFilters,
                search: search || undefined,
            }).filter(([, v]) => v !== "" && v !== undefined)
        );
        router.get("/equipments", cleaned, {
            preserveState: true,
            replace: true,
        });
    }

    const totalPages = Math.ceil(equipments.length / itemsPerPage) || 1;
    const paginatedEquipments = equipments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getConditionColor = (value) => {
        const match = CONDITION_OPTIONS.find(
            (opt) => opt.label.toLowerCase() === value.toLowerCase()
        );
        return match ? match.color : "bg-muted";
    };

    const handlePrint = () => {
        if (!equipments || equipments.length === 0) {
            alert("No equipment data available to print.");
            return;
        }

        const printWindow = window.open("", "", "width=900,height=700");

        const tableRows = equipments
            .map(
                (eq, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${eq.equipment_code}</td>
                    <td>${eq.equipment_name ?? "N/A"}</td>
                    <td>${eq.type ?? "N/A"}</td>
                    <td>${eq.brand ?? "N/A"}</td>
                    <td>${eq.condition ?? "N/A"}</td>
                    <td>${
                        eq.room?.room_number
                            ? "Room " + eq.room.room_number
                            : "N/A"
                    }</td>
                </tr>`
            )
            .join("");

        printWindow.document.write(`
            <html>
                <head>
                    <title>Equipment Report</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            padding: 20px;
                        }
                        h2 {
                            text-align: center;
                            color: #2e7d32;
                            margin-bottom: 15px;
                        }
                        p {
                            text-align: right;
                            font-size: 12px;
                            color: #555;
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
                    <h2>Equipment Report</h2>
                    <p>Generated on: ${new Date().toLocaleString()}</p>
                    <table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Equipment Code</th>
                                <th>Equipment Name</th>
                                <th>Type</th>
                                <th>Brand</th>
                                <th>Condition</th>
                                <th>Room</th>
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
                                        href="/equipments"
                                        aria-current="page"
                                        className="font-semibold text-foreground"
                                    >
                                        Equipments
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex-1" />
                        <Notification />
                    </div>
                </header>
                {/* Header, Search, Table code same as before */}
                <main className="w-full px-6 py-4">
                    <h1 className="text-2xl font-semibold mb-4">Equipments</h1>
                    {/* Search + Filter + Add */}
                    <div className="flex justify-between items-center mb-4 gap-2">
                        <div className="flex gap-2 items-center">
                            <EquipmentsFilter
                                filters={filters}
                                filterOptions={filterOptions}
                                onApplyFilters={onApplyFilters}
                            />

                            <Button
                                className="flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]"
                                onClick={handlePrint}
                            >
                                <Printer className="h-4 w-4" />
                                Print
                            </Button>
                            <Input
                                placeholder="Search Equipment Code..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) =>
                                    e.key === "Enter" && onApplyFilters(filters)
                                }
                                className="text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 flex-1 max-w-xs
               border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
               focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
               placeholder:text-[hsl(142,34%,40%)]"
                            />
                        </div>
                        <Button
                            className="text-sm sm:text-base px-3 py-1 sm:py-2 bg-[hsl(142,31%,51%)] hover:bg-[hsl(142,31%,45%)] text-white font-medium"
                            onClick={() =>
                                router.visit("/equipments/addequipment")
                            }
                        >
                            Add Equipment
                        </Button>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto rounded-lg border">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]">
                                    <TableHead>#</TableHead>
                                    <TableHead>Equipment Code</TableHead>
                                    <TableHead>Equipment Name</TableHead>{" "}
                                    {/* ✅ New column */}
                                    <TableHead>Room</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Condition</TableHead>
                                    <TableHead className="text-center">
                                        Actions
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedEquipments.length > 0 ? (
                                    paginatedEquipments.map((eq, index) => (
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
                                            </TableCell>{" "}
                                            {/* ✅ Display name */}
                                            <TableCell>
                                                ROOM{" "}
                                                {eq.room?.room_number || "N/A"}
                                            </TableCell>
                                            <TableCell>{eq.type}</TableCell>
                                            <TableCell>
                                                {eq.condition ? (
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
                                                            getCondition(
                                                                eq.condition
                                                            ).color
                                                        }`}
                                                    >
                                                        {
                                                            getCondition(
                                                                eq.condition
                                                            ).label
                                                        }
                                                    </span>
                                                ) : (
                                                    "N/A"
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="hidden sm:flex gap-2 justify-center">
                                                    <Button
                                                        size="sm"
                                                        className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                                                        onClick={() =>
                                                            router.visit(
                                                                `/equipments/view/${eq.equipment_code}`
                                                            )
                                                        }
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                        View
                                                    </Button>

                                                    <Button
                                                        size="sm"
                                                        className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                                                        onClick={() =>
                                                            setSelectedEquipment(
                                                                eq
                                                            )
                                                        }
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                        Edit
                                                    </Button>
                                                </div>
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
                    </div>

                    {/* Pagination */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
                        {/* Page Info */}
                        <span className="text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </span>

                        {/* Controls */}
                        <div className="flex gap-2 items-center">
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

                            {/* Page Numbers (show up to 5 around current page) */}
                            {Array.from(
                                { length: totalPages },
                                (_, idx) => idx + 1
                            )
                                .filter((page) => {
                                    // Always show first & last
                                    if (page === 1 || page === totalPages)
                                        return true;
                                    // Show pages near current (±2 around)
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
                    {selectedEquipment && (
                        <EditEquipmentModal
                            equipment={selectedEquipment}
                            rooms={existingRooms}
                            onClose={() => setSelectedEquipment(null)}
                        />
                    )}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}

// ✅ Edit Modal
function EditEquipmentModal({ equipment, rooms, onClose }) {
    /* ✅ Equipment Type Options */
    const TYPE_OPTIONS = ["Furniture", "Appliances", "Networking", "Safety"];

    /* ✅ Equipment Condition Options with Color */
    const EQUIPMENT_CONDITION_OPTIONS = [
        { label: "Functional", color: "bg-green-500" },
        { label: "Defective", color: "bg-red-500" },
        { label: "Intermittent Issue", color: "bg-yellow-500" },
        { label: "Needs Cleaning", color: "bg-blue-500" },
        { label: "For Replacement", color: "bg-orange-500" },
        { label: "For Disposal", color: "bg-gray-500" },
        { label: "Condemn", color: "bg-black" },
    ];

    const { data, setData, put, processing, errors } = useInertiaForm({
        equipment_code: equipment.equipment_code || "",
        equipment_name: equipment.equipment_name || "",
        brand: equipment.brand || "",
        type: equipment.type || "",
        condition: equipment.condition || "",
        room_id: equipment.room_id || "",
    });

    // ✅ Condition options are the same for all types (unified)
    const availableConditions = EQUIPMENT_CONDITION_OPTIONS.map((c) => c.label);

    const handleSubmit = (e) => {
        e.preventDefault();
        // ✅ Use equipment_code instead of id
        put(route("equipments.update", equipment.equipment_code), {
            onSuccess: () => {
                Swal.fire(
                    "Updated!",
                    "Equipment updated successfully.",
                    "success"
                );
                onClose();
            },
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Edit Equipment</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Equipment Code */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Equipment Code
                        </label>
                        <Input
                            value={data.equipment_code}
                            onChange={(e) =>
                                setData("equipment_code", e.target.value)
                            }
                            disabled // usually code should not be editable
                        />
                        {errors.equipment_code && (
                            <p className="text-red-500 text-sm">
                                {errors.equipment_code}
                            </p>
                        )}
                    </div>

                    {/* Equipment Name */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Equipment Name
                        </label>
                        <Input
                            value={data.equipment_name}
                            onChange={(e) =>
                                setData("equipment_name", e.target.value)
                            }
                        />
                        {errors.equipment_name && (
                            <p className="text-red-500 text-sm">
                                {errors.equipment_name}
                            </p>
                        )}
                    </div>

                    {/* Brand */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Brand
                        </label>
                        <Input
                            value={data.brand}
                            onChange={(e) => setData("brand", e.target.value)}
                        />
                        {errors.brand && (
                            <p className="text-red-500 text-sm">
                                {errors.brand}
                            </p>
                        )}
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Type
                        </label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={data.type}
                            onChange={(e) => {
                                setData("type", e.target.value);
                                setData("condition", ""); // reset condition
                            }}
                        >
                            <option value="">Select Type</option>
                            {TYPE_OPTIONS.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                        {errors.type && (
                            <p className="text-red-500 text-sm">
                                {errors.type}
                            </p>
                        )}
                    </div>

                    {/* Condition */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Condition
                        </label>
                        <select
                            className={`w-full border rounded px-2 py-1 ${
                                EQUIPMENT_CONDITION_OPTIONS.find(
                                    (c) => c.label === data.condition
                                )?.color || ""
                            }`}
                            value={data.condition}
                            onChange={(e) =>
                                setData("condition", e.target.value)
                            }
                            disabled={!data.type}
                        >
                            <option value="">
                                {data.type
                                    ? "Select Condition"
                                    : "Select a type first"}
                            </option>
                            {availableConditions.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                        {errors.condition && (
                            <p className="text-red-500 text-sm">
                                {errors.condition}
                            </p>
                        )}
                    </div>

                    {/* Room */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Room
                        </label>
                        <select
                            className="w-full border rounded px-2 py-1"
                            value={data.room_id}
                            onChange={(e) => setData("room_id", e.target.value)}
                        >
                            <option value="">Select Room</option>
                            {rooms.map((r) => (
                                <option key={r.id} value={r.id}>
                                    Room {r.room_number}
                                </option>
                            ))}
                        </select>
                        {errors.room_id && (
                            <p className="text-red-500 text-sm">
                                {errors.room_id}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
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
