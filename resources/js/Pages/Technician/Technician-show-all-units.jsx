import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TechnicianAppSidebar } from "@/Components/TechnicianComponent/technician-app-sidebar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import Notification from "@/Components/AdminComponents/Notification";
import Swal from "sweetalert2";


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

/* Filters */
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

/* Modals */
import AddUnitModal from "@/Components/TechnicianComponent/AddUnitModal";
import EditUnitModal from "@/Components/TechnicianComponent/EditUnitModal";

/* QR */
import QRCode from "react-qr-code";

const CONDITION_OPTIONS = [
    { label: "Functional", color: "bg-green-500" },
    { label: "Defective", color: "bg-red-500" },
    { label: "Under Maintenance", color: "bg-yellow-500" },
    { label: "Needs Upgrade", color: "bg-blue-500" },
    { label: "For Disposal", color: "bg-gray-500" },
];

/* ✅ Filter Component */
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

    const hasAnyFilter = Object.values(filters).some((v) => !!v);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
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

                    {/* Value selector */}
                    {selectedField &&
                        (filterOptions[selectedField + "s"] ||
                            filterOptions[selectedField]) && (
                            <Select
                                value={selectedValue || "all"}
                                onValueChange={handleValueChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select Value" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    {Array.isArray(
                                        filterOptions[selectedField + "s"]
                                    )
                                        ? filterOptions[
                                              selectedField + "s"
                                          ].map((v) => (
                                              <SelectItem key={v} value={v}>
                                                  {v}
                                              </SelectItem>
                                          ))
                                        : Object.entries(
                                              filterOptions[selectedField]
                                          ).map(([id, label]) => (
                                              <SelectItem key={id} value={id}>
                                                  Room {label}
                                              </SelectItem>
                                          ))}
                                </SelectContent>
                            </Select>
                        )}

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

/* ✅ Technician Units Page */
export default function TechnicianUnitsPage({ units, rooms, filters = {} }) {
    const [search, setSearch] = useState(filters.search || "");
    const [currentPage, setCurrentPage] = useState(1);
    const [editUnit, setEditUnit] = useState(null);
    const [qrUnit, setQrUnit] = useState(null);
    const itemsPerPage = 10;

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

    function onApplyFilters(newFilters) {
        const cleaned = Object.fromEntries(
            Object.entries({
                ...newFilters,
                search: search || undefined,
            }).filter(([, v]) => v !== "" && v !== undefined)
        );
        router.get("/technician/units", cleaned, {
            preserveState: true,
            replace: true,
        });
    }

    function resetFilters() {
        setSearch("");
        router.get("/technician/units", {}, { preserveState: true, replace: true });
    }

    function handleSearchKey(e) {
        if (e.key === "Enter") {
            onApplyFilters(filters);
        }
    }

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

    const getConditionColor = (value) => {
        const match = CONDITION_OPTIONS.find(
            (opt) => opt.label.toLowerCase() === (value || "").toLowerCase()
        );
        return match ? match.color : "bg-muted";
    };
const handleDelete = (unitId) => {
    Swal.fire({
        title: "Are you sure?",
        text: "This action will permanently delete the system unit.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(`/technician/units/${unitId}`, {
                onSuccess: () => {
                    Swal.fire({
                        title: "Deleted!",
                        text: "System unit has been deleted.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                },
                onError: (errors) => {
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to delete the system unit.",
                        icon: "error",
                    });
                },
            });
        }
    });
};

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
                                    href="/technician/units"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    System Units
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                <main className="w-full px-6 py-4">
                    <Notification />

                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-semibold">System Units</h1>
                        <AddUnitModal rooms={rooms} />
                    </div>

                    {/* Search + Filter */}
                    <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center justify-between mb-4">
                        <div className="flex gap-2 items-center">
                            <UnitsFilter
                                filters={filters}
                                filterOptions={filterOptions}
                                onApplyFilters={onApplyFilters}
                                onReset={resetFilters}
                            />

                            <Input
                                placeholder="Search Unit Code or Room"
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                onKeyDown={handleSearchKey}
                                className="w-64"
                            />
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="h-10">
                                    <TableHead>#</TableHead>
                                    <TableHead>Pc Code</TableHead>
                                    <TableHead>Room</TableHead>
                                    <TableHead>Processor</TableHead>
                                    <TableHead>RAM</TableHead>
                                    <TableHead>Storage</TableHead>
                                    <TableHead>GPU</TableHead>
                                    <TableHead>Motherboard</TableHead>
                                    <TableHead>Condition</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {paginatedUnits.length > 0 ? (
                                    paginatedUnits.map((unit, index) => (
                                        <TableRow key={unit.id}>
                                            <TableCell>
                                                {(currentPage - 1) *
                                                    itemsPerPage +
                                                    index +
                                                    1}
                                            </TableCell>
                                            <TableCell>{unit.unit_code}</TableCell>
                                            <TableCell>
                                                ROOM {unit.room?.room_number || "N/A"}
                                            </TableCell>
                                            <TableCell>{unit.processor}</TableCell>
                                            <TableCell>{unit.ram}</TableCell>
                                            <TableCell>{unit.storage}</TableCell>
                                            <TableCell>{unit.gpu}</TableCell>
                                            <TableCell>{unit.motherboard}</TableCell>
                                            <TableCell>
                                                {unit.condition && (
                                                    <div className="mt-1 text-sm flex items-center gap-2">
                                                        <span
                                                            className={cn(
                                                                "inline-block w-3 h-3 rounded-full",
                                                                getConditionColor(unit.condition)
                                                            )}
                                                        />
                                                        <span className="capitalize">
                                                            {unit.condition}
                                                        </span>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setEditUnit(unit)}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => setQrUnit(unit)}
                                                    >
                                                        QR
                                                    </Button>
                                                   <Button
                                                    size="sm"
                                                    variant="destructive"
                                                    onClick={() => handleDelete(unit.id)}
                                                >
                                                    Delete
                                                </Button>

                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={10}
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
                        <span className="text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </span>
                        <div className="flex gap-2 items-center">
                            <Button
                                size="sm"
                                variant="outline"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                            >
                                Previous
                            </Button>

                            {Array.from({ length: totalPages }, (_, idx) => idx + 1)
                                .filter((page) => {
                                    if (page === 1 || page === totalPages) return true;
                                    return (
                                        page >= currentPage - 2 &&
                                        page <= currentPage + 2
                                    );
                                })
                                .map((page, idx, arr) => (
                                    <React.Fragment key={page}>
                                        {idx > 0 &&
                                            arr[idx] - arr[idx - 1] > 1 && (
                                                <span className="px-1">...</span>
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
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </main>
            </SidebarInset>

            {/* ✅ Modals */}
            {editUnit && (
                <EditUnitModal
                    unit={editUnit}
                    rooms={rooms}
                    open={!!editUnit}
                    onClose={() => setEditUnit(null)}
                />
            )}

            {qrUnit && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                        <h3 className="text-lg font-semibold mb-4">
                            QR Code - {qrUnit.unit_code}
                        </h3>
                        <QRCode value={`Unit: ${qrUnit.unit_code}`} size={200} />
                        <div className="mt-4">
                            <Button variant="outline" onClick={() => setQrUnit(null)}>
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </SidebarProvider>
    );
}
