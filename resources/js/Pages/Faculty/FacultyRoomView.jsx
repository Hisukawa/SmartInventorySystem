import React, { useState, useEffect } from "react";
import { usePage, Link, Head } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Menu, Eye, FileText, Filter as FilterIcon, X } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

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

import FacultyRoomSidebar from "@/Components/FacultyComponents/faculty-room-view-sidebar";
import ReportFormModal from "@/Components/FacultyComponents/faculty-report-form-modal";
import SuccessModal from "@/Components/FacultyComponents/faculty-sucess-modal";

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

function Filter({ filters, filterOptions, activeSection, onApplyFilters }) {
    const [selectedField, setSelectedField] = useState("");
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
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

    const handleValueChange = (value) => {
        const newValue = value === "all" ? "" : value;
        setSelectedValue(newValue);

        if (selectedField === "condition") {
            onApplyFilters(
                newValue,
                filters.unit_code,
                filters.search,
                filters.type
            );
        } else if (selectedField === "unit_code") {
            onApplyFilters(
                filters.condition,
                newValue,
                filters.search,
                filters.type
            );
        } else if (selectedField === "type") {
            onApplyFilters(
                filters.condition,
                filters.unit_code,
                filters.search,
                newValue
            );
        }
    };

    const handleReset = () => {
        setSelectedField("");
        setSelectedValue("");
        onApplyFilters("", "", filters.search || "", "");
    };

    const getAvailableFields = () => {
        const fields = [{ value: "condition", label: "Condition" }];
        if (
            activeSection === "system-units" ||
            activeSection === "peripherals"
        ) {
            fields.push({ value: "unit_code", label: "Unit Code" });
        }
        if (activeSection === "equipments" || activeSection === "peripherals") {
            fields.push({ value: "type", label: "Type" });
        }
        return fields;
    };

    const getTypeOptions = () => {
        if (activeSection === "equipments")
            return filterOptions.types?.equipments || [];
        if (activeSection === "peripherals")
            return filterOptions.types?.peripherals || [];
        return [];
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]">
                    <FilterIcon className="h-4 w-4" />
                    Filter
                    {(filters.condition ||
                        filters.unit_code ||
                        filters.type) && (
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

                    {/* Condition */}
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

                    {/* Unit Code */}
                    {selectedField === "unit_code" &&
                        (activeSection === "system-units" ||
                            activeSection === "peripherals") && (
                            <Select
                                value={selectedValue || "all"}
                                onValueChange={handleValueChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Unit Code" />
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

                    {/* ✅ Type */}
                    {selectedField === "type" &&
                        (activeSection === "equipments" ||
                            activeSection === "peripherals") && (
                            <Select
                                value={selectedValue || "all"}
                                onValueChange={handleValueChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    {getTypeOptions().map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}

                    {/* Reset Button */}
                    {(filters.condition ||
                        filters.unit_code ||
                        filters.type) && (
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

export default function FacultyRoomView({
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
            window.location.href = route("faculty.ScannedRoom.dashboard", {
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
        window.location.href = route("faculty.room.show", {
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
    const handleSuccess = () => {
        setShowReportModal(false);
        toast.success("Report submitted successfully!", {
            description: "Thank you for your feedback!",
            duration: 2500,
        });
    };
    return (
        <>
            <Head title={`Room - ${room.room_name}`} />
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                <div className="hidden md:flex">
                    <FacultyRoomSidebar
                        room={room}
                        active={activeSection}
                        user={auth.user}
                        // The onSelect prop should navigate to the new section
                        onSelect={(sectionKey) => {
                            window.location.href = route("faculty.room.show", {
                                roomPath: room.room_path,
                                section: sectionKey,
                            });
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
                            <FacultyRoomSidebar
                                room={room}
                                active={activeSection}
                                user={auth.user}
                                onSelect={(sectionKey) => {
                                    window.location.href = route(
                                        "faculty.room.show",
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
                                        <div className="flex gap-2 items-center">
                                            <Input
                                                placeholder="Search..."
                                                value={search}
                                                onChange={(e) => {
                                                    const value =
                                                        e.target.value;
                                                    setSearch(value);

                                                    // ✅ If user clears the search bar, immediately show all data
                                                    if (value.trim() === "") {
                                                        applyFilters(
                                                            condition,
                                                            unitCode,
                                                            ""
                                                        );
                                                    }
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        const value =
                                                            search.trim();
                                                        // ✅ If empty, show all data; otherwise search
                                                        applyFilters(
                                                            condition,
                                                            unitCode,
                                                            value || ""
                                                        );
                                                    }
                                                }}
                                                className="flex-1 min-w-0 sm:max-w-xs w-full
      border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
      focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
      placeholder:text-[hsl(142,34%,40%)]"
                                            />

                                            <Button
                                                className="bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                                                onClick={() => {
                                                    const value = search.trim();
                                                    // ✅ Click “Search” → apply filter (empty means show all)
                                                    applyFilters(
                                                        condition,
                                                        unitCode,
                                                        value || ""
                                                    );
                                                }}
                                            >
                                                Search
                                            </Button>

                                            <Filter
                                                filters={filters}
                                                filterOptions={filterOptions}
                                                activeSection={activeSection}
                                                onApplyFilters={applyFilters}
                                            />
                                        </div>
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
                                                                    <motion.div
                                                                        whileTap={{
                                                                            scale: 0.9,
                                                                        }}
                                                                        transition={{
                                                                            duration: 0.1,
                                                                        }}
                                                                    >
                                                                        <Link
                                                                            href={route(
                                                                                "faculty.units.show",
                                                                                {
                                                                                    roomId: room.id,
                                                                                    unitId: item.id,
                                                                                }
                                                                            )}
                                                                        >
                                                                            <Button
                                                                                size="sm"
                                                                                variant="outline"
                                                                                className="flex items-center gap-1 
                text-[hsl(142,34%,51%)] 
                border-[hsl(142,34%,51%)] 
                hover:bg-[hsl(142,34%,51%)] 
                hover:text-white 
                transition-all duration-200"
                                                                            >
                                                                                <Eye className="h-4 w-4" />{" "}
                                                                                View
                                                                            </Button>
                                                                        </Link>
                                                                    </motion.div>
                                                                )}
                                                                {activeSection ===
                                                                    "peripherals" && (
                                                                    <motion.div
                                                                        whileTap={{
                                                                            scale: 0.9,
                                                                        }}
                                                                        transition={{
                                                                            duration: 0.1,
                                                                        }}
                                                                    >
                                                                        <Link
                                                                            href={route(
                                                                                "faculty.peripherals.show",
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
                                                                                className="flex items-center gap-1 
                text-[hsl(142,34%,51%)] 
                border-[hsl(142,34%,51%)] 
                hover:bg-[hsl(142,34%,51%)] 
                hover:text-white 
                transition-all duration-200"
                                                                            >
                                                                                <Eye className="h-4 w-4" />{" "}
                                                                                View
                                                                            </Button>
                                                                        </Link>
                                                                    </motion.div>
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
                                                                        <motion.div
                                                                            whileTap={{
                                                                                scale: 0.9,
                                                                            }}
                                                                            transition={{
                                                                                duration: 0.1,
                                                                            }}
                                                                        >
                                                                            <Link
                                                                                href={route(
                                                                                    "faculty.equipments.show",
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
                                                                                    className="flex items-center gap-1 
                text-[hsl(142,34%,51%)] 
                border-[hsl(142,34%,51%)] 
                hover:bg-[hsl(142,34%,51%)] 
                hover:text-white 
                transition-all duration-200"
                                                                                >
                                                                                    <Eye className="h-4 w-4" />{" "}
                                                                                    View
                                                                                </Button>
                                                                            </Link>
                                                                        </motion.div>
                                                                    ))}
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    className="flex items-center gap-1 text-[hsl(142,34%,51%)] border-[hsl(142,34%,51%)] hover:bg-[hsl(142,34%,45%)] hover:text-white"
                                                                    onClick={() => {
                                                                        setSelectedItem(
                                                                            item
                                                                        );
                                                                        setShowReportModal(
                                                                            true
                                                                        );
                                                                    }}
                                                                >
                                                                    <FileText className="h-4 w-4" />{" "}
                                                                    Report
                                                                </Button>
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
            {showReportModal && (
                <ReportFormModal
                    open={showReportModal}
                    onOpenChange={setShowReportModal}
                    item={selectedItem}
                    section={activeSection}
                    room={room}
                    onSuccess={handleSuccess}
                />
            )}
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
