import React, { useState, useEffect } from "react";
import { usePage, Link, Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { router } from "@inertiajs/react";
import {
    Menu,
    Eye,
    FileText,
    Filter as FilterIcon,
    X,
    Pencil,
    Trash2,
    Plus,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
import Swal from "sweetalert2";

import TechnicianRoomSidebar from "@/Components/TechnicianComponent/techician-scanned-sidebar";
import SuccessModal from "@/Components/TechnicianComponent/technician-success-modal";
// Pagination Component
function Pagination({ page, pageCount, onPageChange }) {
    return (
        <div className="flex justify-end items-center gap-2">
            {/* Previous button */}
            <Button
                size="sm"
                disabled={page === 1}
                onClick={() => onPageChange(page - 1)}
                className={`flex items-center gap-1
          bg-[hsl(142,34%,51%)] text-white
          hover:bg-[hsl(142,34%,45%)]
          disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
            >
                Previous
            </Button>

            {/* Page counter */}
            <span className="text-sm text-muted-foreground">
                Page {page} of {pageCount}
            </span>

            {/* Next button */}
            <Button
                size="sm"
                disabled={page === pageCount}
                onClick={() => onPageChange(page + 1)}
                className={`flex items-center gap-1
          bg-[hsl(142,34%,51%)] text-white
          hover:bg-[hsl(142,34%,45%)]
          disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
            >
                Next
            </Button>
        </div>
    );
}

// ✅ Adjusted Filter Component for responsiveness and "All" option
function Filter({ filters, filterOptions, activeSection, onApplyFilters }) {
    const [selectedField, setSelectedField] = useState("");
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        // load default filters from backend
        if (filters.condition) {
            setSelectedField("condition");
            setSelectedValue(filters.condition);
        } else if (
            filters.unit_code &&
            (activeSection === "system-units" ||
                activeSection === "peripherals")
        ) {
            setSelectedField("unit_code");
            setSelectedValue(filters.unit_code);
        } else if (
            filters.type &&
            (activeSection === "peripherals" || activeSection === "equipments")
        ) {
            setSelectedField("type");
            setSelectedValue(filters.type);
        }
    }, [filters, activeSection]);

    // Trigger filter immediately on change
    const handleValueChange = (value) => {
        const newValue = value === "all" ? "" : value;
        setSelectedValue(newValue);

        if (selectedField === "condition") {
            onApplyFilters(newValue, filters.unit_code, filters.search);
        } else if (selectedField === "unit_code") {
            onApplyFilters(filters.condition, newValue, filters.search);
        } else if (selectedField === "type") {
            onApplyFilters(
                filters.condition,
                filters.unit_code,
                newValue,
                filters.search
            );
        }
    };

    const handleReset = () => {
        setSelectedField("");
        setSelectedValue("");
        onApplyFilters(
            "", // condition
            "", // unit_code
            filters.search || "", // search
            "" // type
        );
    };

    const getAvailableFields = () => {
        const fields = [{ value: "condition", label: "Condition" }];

        if (
            activeSection === "system-units" ||
            activeSection === "peripherals"
        ) {
            fields.push({ value: "unit_code", label: "Unit Code" });
        }

        if (activeSection === "peripherals" || activeSection === "equipments") {
            fields.push({ value: "type", label: "Type" });
        }

        return fields;
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]">
                    <FilterIcon className="h-4 w-4" />
                    Filter
                    {(filters.condition ||
                        ((activeSection === "system-units" ||
                            activeSection === "peripherals") &&
                            filters.unit_code)) && (
                        <X
                            className="h-4 w-4 ml-1 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleReset();
                            }}
                        />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="w-[calc(100vw-2rem)] sm:w-[400px] p-4"
                align="start"
                sideOffset={10}
            >
                <h4 className="font-medium mb-3 text-lg">Filter Options</h4>
                <div className="flex flex-col gap-4">
                    {/* Field Dropdown */}
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
                            {getAvailableFields().map((field) => (
                                <SelectItem
                                    key={field.value}
                                    value={field.value}
                                >
                                    {field.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Value Dropdown */}
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
                                {filterOptions.conditions.map((c) => (
                                    <SelectItem key={c} value={c}>
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {selectedField === "unit_code" &&
                        (activeSection === "system-units" ||
                            activeSection === "peripherals") && (
                            <Select
                                value={selectedValue || "all"}
                                onValueChange={handleValueChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    {filterOptions.unit_codes.map((u) => (
                                        <SelectItem key={u} value={u}>
                                            {u}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    {selectedField === "type" &&
                        (activeSection === "equipments" ||
                            activeSection === "peripherals") && (
                            <Select
                                value={selectedValue || "all"}
                                onValueChange={(val) => {
                                    const newValue = val === "all" ? "" : val;
                                    setSelectedValue(newValue);
                                    onApplyFilters(
                                        filters.condition,
                                        filters.unit_code,
                                        filters.search,
                                        newValue // type
                                    );
                                }}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    {filterOptions.types?.map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                    {/* ✅ Reset Button now works for system-units & peripherals */}
                    {(filters.condition ||
                        ((activeSection === "system-units" ||
                            activeSection === "peripherals") &&
                            filters.unit_code) ||
                        ((activeSection === "equipments" ||
                            activeSection === "peripherals") &&
                            filters.type)) && (
                        <div className="flex justify-end">
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={handleReset}
                                className="flex items-center gap-1 text-red-600 hover:bg-red-50 w-auto"
                            >
                                <X className="h-4 w-4" />
                                Reset
                            </Button>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default function TechnicianRoomView({
    room,
    equipments,
    systemUnits,
    peripherals,
    section,
    filters = {}, // ✅ default to empty object
    filterOptions = { conditions: [], unit_codes: [], types: [] },
}) {
    const { auth } = usePage().props;

    const [activeSection, setActiveSection] = useState(section || "dashboard");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const [condition, setCondition] = useState(filters?.condition || "");
    const [unitCode, setUnitCode] = useState(filters?.unit_code || "");
    const [search, setSearch] = useState(filters?.search || "");

    const [page, setPage] = useState(1);
    const pageSize = 10;
    const [type, setType] = useState(filters?.type || "");

    const data =
        activeSection === "system-units"
            ? systemUnits
            : activeSection === "peripherals"
            ? peripherals
            : activeSection === "equipments"
            ? equipments
            : []; // ← dashboard shows no table
    useEffect(() => {
        if (activeSection === "dashboard") {
            window.location.href = route("technician.ScannedRoom.dashboard", {
                roomPath: room.room_path,
            });
        }
    }, [activeSection]);

    const pageCount = Math.ceil(data.length / pageSize);
    const paginated = data.slice((page - 1) * pageSize, page * pageSize);

    useEffect(() => {
        setPage(1);
        setCondition(filters.condition || "");
        setUnitCode(filters.unit_code || "");
        setSearch(filters.search || "");
    }, [activeSection, filters]);

    const applyFilters = (
        newCondition = condition,
        newUnitCode = unitCode,
        newSearch = search,
        newType = filters?.type || ""
    ) => {
        window.location.href = route("technician.room.show", {
            roomPath: room.room_path,
            section: activeSection,
            condition: newCondition || undefined,
            unit_code:
                activeSection === "system-units" ||
                activeSection === "peripherals"
                    ? newUnitCode || undefined
                    : undefined,
            search: newSearch || undefined,
            type: newType || undefined, // <-- pass type
        });
    };
    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "hsl(0, 78%, 62%)", // Red
            cancelButtonColor: "gray",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                let routeName = "";
                let params = {};

                if (activeSection === "system-units") {
                    routeName = "technician.units.delete";
                    params = { id: item.id }; // ✅ pass as object
                } else if (activeSection === "peripherals") {
                    routeName = "technician.peripherals.delete";
                    params = { id: item.id }; // ✅ pass as object
                } else if (activeSection === "equipments") {
                    routeName = "technician.equipments.delete";
                    params = { id: item.id }; // ✅ pass as object
                }

                router.delete(route(routeName, params), {
                    onSuccess: () => {
                        Swal.fire(
                            "Deleted!",
                            `${activeSection
                                .replace("-", " ")
                                .replace(/\b\w/g, (l) =>
                                    l.toUpperCase()
                                )} has been deleted.`,
                            "success"
                        );
                    },
                    onError: () => {
                        Swal.fire(
                            "Error!",
                            "There was a problem deleting this item.",
                            "error"
                        );
                    },
                });
            }
        });
    };

    return (
        <>
            <Head title={`Room - ${room.room_name}`} />
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <div className="hidden md:flex">
                    <TechnicianRoomSidebar
                        room={room}
                        active={activeSection}
                        user={auth.user}
                        // The onSelect prop should navigate to the new section
                        onSelect={(sectionKey) => {
                            window.location.href = route(
                                "technician.room.show",
                                {
                                    roomPath: room.room_path,
                                    section: sectionKey,
                                }
                            );
                        }}
                    />
                </div>

                {/* Sidebar Mobile */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-40 flex md:hidden">
                        <div
                            className="fixed inset-0 bg-black/50"
                            onClick={() => setSidebarOpen(false)}
                        />
                        <div
                            className="relative z-50 w-64 shadow-lg"
                            style={{ backgroundColor: "hsl(142,34%,51%)" }}
                        >
                            <TechnicianRoomSidebar
                                room={room}
                                active={activeSection}
                                user={auth.user}
                                onSelect={(sectionKey) => {
                                    window.location.href = route(
                                        "technician.room.show",
                                        {
                                            roomPath: room.room_path,
                                            section: sectionKey,
                                        }
                                    );
                                    setSidebarOpen(false);
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-y-auto bg-gray-50">
                    {" "}
                    {/* Added bg-gray-50 */}
                    {/* Top Bar for Mobile/Tablet */}
                    <div
                        className="p-4 border-b md:hidden flex items-center justify-between shadow-sm"
                        style={{ backgroundColor: "hsl(142,34%,51%)" }}
                    >
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setSidebarOpen(true)}
                            className="bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                        <h2 className="text-xl font-semibold text-white">
                            {room.room_name}
                        </h2>
                    </div>
                    <div className="p-5 max-w-full md:max-w-5xl lg:max-w-7xl mx-auto w-full">
                        {" "}
                        {/* Added mx-auto w-full */}
                        <div className="space-y-6">
                            {/* Section Title */}
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {activeSection === "system-units"
                                        ? "System Units"
                                        : activeSection === "peripherals"
                                        ? "Peripherals"
                                        : "Equipments"}
                                </h2>
                            </div>

                            {/* Table */}
                            <div className="rounded-lg border overflow-hidden shadow-sm bg-white">
                                {/* Header with Filter + Search */}
                                <div className="flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center p-4 border-b">
                                    <div className="flex gap-2 items-center w-full sm:w-auto">
                                        <Filter
                                            filters={filters}
                                            filterOptions={filterOptions}
                                            activeSection={activeSection}
                                            onApplyFilters={applyFilters}
                                        />

                                        <Input
                                            placeholder="Search..."
                                            value={search}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                setSearch(value);
                                                applyFilters(
                                                    condition,
                                                    unitCode,
                                                    value
                                                );
                                            }}
                                            className="flex-1 min-w-0 sm:max-w-xs w-full
                                            border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
                                            focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
                                            placeholder:text-[hsl(142,34%,40%)]"
                                        />
                                    </div>

                                    {/* Add Button per section */}
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                                        {activeSection === "system-units" && (
                                            <Link
                                                href={route(
                                                    "technician.units.create",
                                                    { room: room.id }
                                                )}
                                            >
                                                <Button className="flex items-center gap-2 px-4 py-2 text-sm bg-[hsl(142,34%,51%)] text-white hover:bg-[hsl(142,34%,45%)]">
                                                    <Plus className="h-4 w-4" />
                                                    Add Computer
                                                </Button>
                                            </Link>
                                        )}

                                        {activeSection === "peripherals" && (
                                            <Link
                                                href={route(
                                                    "technician.peripherals.create",
                                                    { room: room.id }
                                                )}
                                            >
                                                <Button className="flex items-center gap-2 px-4 py-2 text-sm bg-[hsl(142,34%,51%)] text-white hover:bg-[hsl(142,34%,45%)]">
                                                    <Plus className="h-4 w-4" />
                                                    Add Peripheral
                                                </Button>
                                            </Link>
                                        )}

                                        {activeSection === "equipments" && (
                                            <Link
                                                href={route(
                                                    "technician.equipments.create",
                                                    { room: room.id }
                                                )}
                                            >
                                                <Button className="flex items-center gap-2 px-4 py-2 text-sm bg-[hsl(142,34%,51%)] text-white hover:bg-[hsl(142,34%,45%)]">
                                                    <Plus className="h-4 w-4" />
                                                    Add Equipment
                                                </Button>
                                            </Link>
                                        )}
                                    </div>
                                </div>

                                <Table className="min-w-full divide-y divide-gray-200">
                                    <TableHeader className="bg-gray-50">
                                        <TableRow className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10">
                                            <TableHead className="w-20 text-center text-gray-600">
                                                No
                                            </TableHead>
                                            <TableHead className="text-gray-600  whitespace-nowrap">
                                                {activeSection ===
                                                "system-units"
                                                    ? "Pc Code"
                                                    : activeSection ===
                                                      "peripherals"
                                                    ? "Peripheral Code"
                                                    : "Equipment Code"}
                                            </TableHead>
                                            {activeSection !==
                                                "system-units" && (
                                                <TableHead className="text-gray-600">
                                                    Type
                                                </TableHead>
                                            )}
                                            <TableHead className="text-gray-600">
                                                Condition
                                            </TableHead>
                                            <TableHead className="text-gray-600">
                                                Actions
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody className="divide-y divide-gray-200">
                                        {paginated.length > 0 ? (
                                            paginated.map(
                                                (item, index) => (
                                                    console.log(
                                                        "Equipment item:",
                                                        item
                                                    ),
                                                    (
                                                        <TableRow key={item.id}>
                                                            <TableCell className="text-center">
                                                                {(page - 1) *
                                                                    pageSize +
                                                                    index +
                                                                    1}
                                                            </TableCell>
                                                            <TableCell className="font-medium text-gray-900 whitespace-nowrap">
                                                                {item.name}
                                                            </TableCell>
                                                            {activeSection !==
                                                                "system-units" && (
                                                                <TableCell className="text-gray-700">
                                                                    {item.type}
                                                                </TableCell>
                                                            )}
                                                            <TableCell>
                                                                <ConditionBadge
                                                                    condition={
                                                                        item.condition
                                                                    }
                                                                />
                                                            </TableCell>

                                                            <TableCell className="flex gap-2 py-3">
                                                                {activeSection ===
                                                                    "system-units" && (
                                                                    <Link
                                                                        href={route(
                                                                            "technician.units.show",
                                                                            {
                                                                                room: room.id,
                                                                                unit: item.id,
                                                                            }
                                                                        )}
                                                                    >
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline"
                                                                            className="flex items-center gap-1 text-[hsl(142,34%,51%)] border-[hsl(142,34%,51%)] hover:bg-[hsl(142,34%,51%)] hover:text-white"
                                                                        >
                                                                            <Eye className="h-4 w-4" />{" "}
                                                                        </Button>
                                                                    </Link>
                                                                )}
                                                                {activeSection ===
                                                                    "peripherals" && (
                                                                    <Link
                                                                        href={route(
                                                                            "technician.peripherals.show",
                                                                            {
                                                                                room: room.id,
                                                                                peripheral:
                                                                                    item.id,
                                                                            }
                                                                        )}
                                                                    >
                                                                        <Button
                                                                            size="sm"
                                                                            variant="outline"
                                                                            className="flex items-center gap-1 text-[hsl(142,34%,51%)] border-[hsl(142,34%,51%)] hover:bg-[hsl(142,34%,51%)] hover:text-white"
                                                                        >
                                                                            <Eye className="h-4 w-4" />{" "}
                                                                        </Button>
                                                                    </Link>
                                                                )}
                                                                {activeSection ===
                                                                    "equipments" &&
                                                                    (console.log(
                                                                        "Room ID:",
                                                                        room.id,
                                                                        "Equipment ID:",
                                                                        item.id
                                                                    ),
                                                                    (
                                                                        <Link
                                                                            href={route(
                                                                                "technician.equipments.show",
                                                                                {
                                                                                    room: room.id,
                                                                                    equipment:
                                                                                        item.id,
                                                                                }
                                                                            )}
                                                                        >
                                                                            <Button
                                                                                size="sm"
                                                                                variant="outline"
                                                                                className="flex items-center gap-1 text-[hsl(142,34%,51%)] border-[hsl(142,34%,51%)] hover:bg-[hsl(142,34%,51%)] hover:text-white"
                                                                            >
                                                                                <Eye className="h-4 w-4" />{" "}
                                                                            </Button>
                                                                        </Link>
                                                                    ))}
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="flex items-center gap-1 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white"
                                                                    onClick={() => {
                                                                        if (
                                                                            activeSection ===
                                                                            "system-units"
                                                                        ) {
                                                                            router.visit(
                                                                                route(
                                                                                    "technician.units.edit",
                                                                                    item.id
                                                                                )
                                                                            );
                                                                        } else if (
                                                                            activeSection ===
                                                                            "peripherals"
                                                                        ) {
                                                                            router.visit(
                                                                                route(
                                                                                    "technician.peripherals.edit",
                                                                                    item.id
                                                                                )
                                                                            );
                                                                        } else if (
                                                                            activeSection ===
                                                                            "equipments"
                                                                        ) {
                                                                            router.visit(
                                                                                route(
                                                                                    "technician.equipments.edit",
                                                                                    item.id
                                                                                )
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                </Button>

                                                                {/* Delete Button */}
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                )
                                            )
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan={
                                                        activeSection ===
                                                        "system-units"
                                                            ? 4
                                                            : 5
                                                    }
                                                    className="text-center text-muted-foreground py-4"
                                                >
                                                    No data found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>

                                {pageCount > 1 && (
                                    <div className="flex justify-end p-4 bg-gray-50">
                                        <Pagination
                                            page={page}
                                            pageCount={pageCount}
                                            onPageChange={setPage}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <SuccessModal
                open={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                message="Report submitted successfully!"
            />
        </>
    );
}

function ConditionBadge({ condition }) {
    if (!condition) return null;

    const normalized = condition.toLowerCase().trim();

    let badgeClass = "bg-gray-100 text-gray-800"; // default

    // 🔴 Check bad conditions first
    if (
        normalized.includes("not working") ||
        normalized.includes("broken") ||
        normalized.includes("defect")
    ) {
        badgeClass = "bg-red-100 text-red-800";
    }
    // 🟡 Warning/maintenance
    else if (
        normalized.includes("maint") ||
        normalized.includes("pending") ||
        normalized.includes("check")
    ) {
        badgeClass = "bg-amber-100 text-amber-800";
    }
    // 🟢 Good/functional
    else if (
        normalized.includes("good") ||
        normalized.includes("functional") ||
        normalized === "working" // exact "working"
    ) {
        badgeClass = "bg-green-100 text-green-800";
    }

    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${badgeClass}`}
        >
            {condition}
        </span>
    );
}
