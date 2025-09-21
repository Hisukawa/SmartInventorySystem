import React, { useState, useEffect } from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Swal from "sweetalert2";
import Notification from "@/Components/AdminComponents/Notification";

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

// ✅ Reusable Filter component
function Filter({ filters, filterOptions, onApplyFilters, onResetFilters }) {
    const [selectedField, setSelectedField] = useState("");
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        if (filters.condition) {
            setSelectedField("condition");
            setSelectedValue(filters.condition);
        } else if (filters.room) {
            setSelectedField("room");
            setSelectedValue(filters.room);
        } else if (filters.faculty) {
            setSelectedField("faculty");
            setSelectedValue(filters.faculty);
        } else if (filters.reportable_type) {
            setSelectedField("reportable_type");
            setSelectedValue(filters.reportable_type);
        } else {
            setSelectedField("");
            setSelectedValue("");
        }
    }, [filters]);

    const handleValueChange = (value) => {
        const newValue = value === "all" ? "" : value;
        setSelectedValue(newValue);

        let newFilters = { ...filters };
        if (selectedField) {
            newFilters[selectedField] = newValue;
        }
        onApplyFilters(newFilters);
    };

    const handleReset = () => {
        setSelectedField("");
        setSelectedValue("");
        onResetFilters(); // calls parent reset function
    };

    const fields = [
        { value: "condition", label: "Condition" },
        { value: "room", label: "Room" },
        { value: "faculty", label: "Faculty" },
        { value: "reportable_type", label: "Report Type" },
    ];

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                    <FilterIcon className="h-4 w-4" />
                    Filter
                    {(filters.condition ||
                        filters.room ||
                        filters.faculty ||
                        filters.reportable_type) && (
                        <X
                            className="h-4 w-4 ml-1 cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleReset();
                            }}
                        />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[calc(100vw-2rem)] sm:w-[400px] p-4">
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
                            {fields.map((f) => (
                                <SelectItem key={f.value} value={f.value}>
                                    {f.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Values */}
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
                                {filterOptions.conditions.map((c, i) => (
                                    <SelectItem key={i} value={c}>
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

                    {selectedField === "faculty" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Faculty" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {Object.entries(filterOptions.faculties).map(
                                    ([id, name]) => (
                                        <SelectItem key={id} value={id}>
                                            {name}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>
                    )}

                    {selectedField === "reportable_type" && (
                        <Select
                            value={selectedValue || "all"}
                            onValueChange={handleValueChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {filterOptions.reportable_types.map((t) => (
                                    <SelectItem key={t} value={t}>
                                        {t}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}

                    {/* Reset Button */}
                    {/* Reset Button */}
                    <div className="flex justify-end">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={handleReset}
                            className="w-auto px-3"
                        >
                            <X className="mr-1 h-4 w-4" /> Reset
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default function FacultyReportsIndex({
    reports,
    filters = {},
    filterOptions,
}) {
    const [search, setSearch] = useState(filters.search || "");

    // ✅ Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // ✅ Slice data for pagination
    const totalPages = Math.ceil(reports.length / itemsPerPage);
    const paginatedData = reports.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    function onApplyFilters(newFilters) {
        const cleanedFilters = Object.fromEntries(
            Object.entries(newFilters).filter(
                ([_, v]) => v !== "" && v !== undefined
            )
        );

        router.get("/faculty/reports", {
            ...cleanedFilters,
            search: search || undefined,
        });
    }

    function resetFilters() {
        setSearch(""); // clear search
        router.get(route("admin.reports.index")); // fetch all data
    }
    function handleSearch(e) {
        if (e.key === "Enter") {
            onApplyFilters(filters);
        }
    }

    function handleDelete(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/faculty-reports/${id}`);
            }
        });
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">
                                    Reports
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="/admin/faculty-reports"
                                    className="font-semibold text-foreground"
                                >
                                    Faculty Reports
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex-1" />
                    <Notification />
                </header>

                <main>
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-5">
                            Faculty Reports
                        </h1>

                        {/* Filters + Search */}
                        <div className="flex flex-col sm:flex-row gap-2 mb-4">
                            <Filter
                                filters={filters}
                                filterOptions={filterOptions}
                                onApplyFilters={onApplyFilters}
                                onResetFilters={resetFilters}
                            />
                            <Input
                                placeholder="Search reports..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleSearch}
                                className="flex-1 min-w-0 sm:max-w-xs w-full"
                            />
                        </div>

                        {/* Reports Table */}
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>#</TableHead>
                                            <TableHead>Faculty</TableHead>
                                            <TableHead>Reports Type</TableHead>
                                            <TableHead>Reports ID</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Code</TableHead>
                                            <TableHead>Condition</TableHead>
                                            <TableHead>Remarks</TableHead>
                                            <TableHead>Room</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {paginatedData.length > 0 ? (
                                            paginatedData.map((r, index) => (
                                                <TableRow key={r.id}>
                                                    <TableCell>
                                                        {(currentPage - 1) *
                                                            itemsPerPage +
                                                            index +
                                                            1}
                                                    </TableCell>
                                                    <TableCell>
                                                        {r.user?.name || "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {r.reportable_type}
                                                    </TableCell>
                                                    <TableCell>
                                                        {r.reportable_id}
                                                    </TableCell>
                                                    <TableCell>
                                                        {r.reportable_type ===
                                                        "peripheral"
                                                            ? r.reportable?.type
                                                            : r.reportable_type ===
                                                              "system_unit"
                                                            ? "System Unit"
                                                            : r.reportable_type ===
                                                              "equipment"
                                                            ? r.reportable
                                                                  ?.equipment_type
                                                            : "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {r.reportable_type ===
                                                        "peripheral"
                                                            ? r.reportable
                                                                  ?.peripheral_code
                                                            : r.reportable_type ===
                                                              "system_unit"
                                                            ? r.reportable
                                                                  ?.unit_code
                                                            : r.reportable_type ===
                                                              "equipment"
                                                            ? r.reportable
                                                                  ?.equipment_code
                                                            : "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {r.condition}
                                                    </TableCell>
                                                    <TableCell>
                                                        {r.remarks}
                                                    </TableCell>
                                                    <TableCell>
                                                        ROOM{" "}
                                                        {r.room
                                                            ? r.room.room_number
                                                            : "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(
                                                            r.created_at
                                                        ).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell className="space-x-2">
                                                        <Link
                                                            href={`/admin/faculty-reports/${r.id}/edit`}
                                                        >
                                                            <Button
                                                                variant="outline"
                                                                size="sm"
                                                            >
                                                                Edit
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="destructive"
                                                            size="sm"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    r.id
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell
                                                    colSpan="11"
                                                    className="text-center"
                                                >
                                                    No reports found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>

                                {/* Pagination */}
                                <div className="flex justify-center mt-4 space-x-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            setCurrentPage(currentPage - 1)
                                        }
                                    >
                                        Previous
                                    </Button>
                                    {[...Array(totalPages)].map((_, idx) => (
                                        <Button
                                            key={idx}
                                            variant={
                                                currentPage === idx + 1
                                                    ? "default"
                                                    : "outline"
                                            }
                                            size="sm"
                                            onClick={() =>
                                                setCurrentPage(idx + 1)
                                            }
                                        >
                                            {idx + 1}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        disabled={currentPage === totalPages}
                                        onClick={() =>
                                            setCurrentPage(currentPage + 1)
                                        }
                                    >
                                        Next
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
