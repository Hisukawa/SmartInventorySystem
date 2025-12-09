import React, { useState, useEffect, setOpen } from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Swal from "sweetalert2";
import Notification from "@/Components/AdminComponents/Notification";
import { Eye, Edit2, Trash2, CheckCircle2, Check } from "lucide-react";
import { Printer, Upload, Download } from "lucide-react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
                <Button className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]">
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
    const [reportsData, setReportsData] = useState(reports); // ✅ local state
    const [search, setSearch] = useState(filters.search || "");
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [open, setOpen] = useState(false);

    const handlePhotoClick = (photoPath) => {
        setSelectedPhoto(photoPath);
        setOpen(true);
    };

    //for reporting

    const [resolveOpen, setResolveOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(reports);
    const [updatedCondition, setUpdatedCondition] = useState("");
    const [resolveRemarks, setResolveRemarks] = useState("");

    const [isResolving, setIsResolving] = useState(false); // ✅ track submit state
    const handleResolve = (report) => {
        setSelectedReport(report); // store the clicked report
        setUpdatedCondition(report.condition); // prefill condition
        setResolveRemarks(""); // clear previous remarks
        setResolveOpen(true); // open the resolve dialog
    };
    const handleResolveSubmit = (report) => {
        if (!updatedCondition) {
            toast.warning("Select Condition", {
                description: "Please select a new condition before resolving.",
                duration: 2500,
            });
            return;
        }

        setIsResolving(true); // ✅ disable save while processing

        router.post(
            `/admin/faculty-reports/${report.id}/resolve`,
            {
                report_id: report.id,
                old_condition: report.condition,
                new_condition: updatedCondition,
                details: resolveRemarks,
            },
            {
                onSuccess: () => {
                    setResolveOpen(false);
                    setSelectedReport(null);
                    setUpdatedCondition("");
                    setResolveRemarks("");

                    toast.success("Resolved!", {
                        description: `Report #${report.id} has been successfully resolved.`,
                        duration: 2000,
                    });

                    // ✅ update local state
                    setReportsData((prev) =>
                        prev.map((r) =>
                            r.id === report.id
                                ? {
                                      ...r,
                                      resolved: true,
                                      condition: updatedCondition,
                                  }
                                : r
                        )
                    );
                },
                onError: () => {
                    toast.error("Error", {
                        description:
                            "Failed to resolve report. Please try again.",
                        duration: 2500,
                    });
                },
            }
        );
    };
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(reportsData.length / itemsPerPage);
    const paginatedData = reportsData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    function onApplyFilters(newFilters) {
        const cleanedFilters = Object.fromEntries(
            Object.entries(newFilters).filter(
                ([_, v]) => v !== "" && v !== undefined
            )
        );

        router.get(route("admin.reports.index"), {
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

    // Handle printing reports table
    const handlePrint = () => {
        if (!reportsData || reportsData.length === 0) {
            alert("No reports available to print.");
            return;
        }

        const printWindow = window.open("", "", "width=900,height=700");

        // Generate table rows
        const tableRows = reportsData
            .map(
                (r) => `
        <tr>
            <td>${r.id}</td>
            <td>${r.room?.room_number ?? "N/A"}</td>
            <td>${r.user?.name ?? "N/A"}</td>
            <td>${r.reportable_type ?? "N/A"}</td>
            <td>${r.condition ?? "N/A"}</td>
            <td>${r.remarks ?? "N/A"}</td>
            <td>${
                r.created_at ? new Date(r.created_at).toLocaleString() : "N/A"
            }</td>
            <td>${r.resolved ? "Resolved" : "Pending"}</td>
        </tr>
    `
            )
            .join("");

        // Print layout
        printWindow.document.write(`
        <html>
            <head>
                <title>Faculty Reports</title>
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
                <h2>Faculty Reports</h2>
                <p>Generated on: ${new Date().toLocaleString()}</p>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Room</th>
                            <th>Faculty</th>
                            <th>Report Type</th>
                            <th>Condition</th>
                            <th>Details</th>
                            <th>Date Created</th>
                            <th>Status</th>
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

    // Condition options per item type
    const CONDITION_OPTIONS = {
        system_unit: [
            "Working",
            "Not Working",
            "Intermittent Issue",
            "Needs Cleaning",
            "For Replacement",
            "For Disposal",
            "Condemned",
            "Needs Repair",
            "No Signal",
            "Needs Configuration",
            "Under Maintenance",
            "To Be Diagnosed",
        ],
        peripheral: [
            "Working",
            "Not Working",
            "Intermittent Issue",
            "Needs Cleaning",
            "For Replacement",
            "For Disposal",
            "Condemned",
            "Needs Repair",
            "No Signal",
            "Needs Configuration",
            "Under Maintenance",
            "To Be Diagnosed",
        ],
        equipment: [
            "Working",
            "Not Working",
            "Intermittent Issue",
            "Needs Cleaning",
            "For Replacement",
            "For Disposal",
            "Condemned",
            "Minor Damage",
            "Needs Repair",
            "Intermittent Connectivity",
            "No Signal",
            "Needs Configuration",
            "Expired",
            "Needs Refill",
            "Rusting",
            "To Be Diagnosed",
        ],
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
                                        Reports
                                    </BreadcrumbLink>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbLink
                                        href="/admin/faculty/reports"
                                        aria-current="page"
                                        className="font-semibold text-foreground"
                                    >
                                        Faculty Reports
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
                        <h1 className="text-2xl font-bold mb-5">
                            Faculty Reports
                        </h1>

                        {/* Filters + Search */}
                        <div className="flex flex-col sm:flex-row gap-2 mb-4">
                            <Input
                                placeholder="Search reports..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleSearch}
                                className="flex-1 min-w-0 sm:max-w-xs w-full
             border-[hsl(142,34%,51%)] text-[hsl(142,34%,20%)]
             focus:border-[hsl(142,34%,45%)] focus:ring-[hsl(142,34%,45%)]
             placeholder:text-[hsl(142,34%,40%)]"
                            />
                            <Filter
                                filters={filters}
                                filterOptions={filterOptions}
                                onApplyFilters={onApplyFilters}
                                onResetFilters={resetFilters}
                            />
                            <Button
                                className="flex items-center gap-2 bg-[hsl(183,40%,45%)] text-white border-none hover:bg-[hsl(183,40%,38%)]"
                                onClick={handlePrint}
                            >
                                <Printer className="h-4 w-4" />
                                Print
                            </Button>
                        </div>

                        {/* Reports Table */}
                        <Card>
                            <CardContent className="p-0">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]">
                                            <TableHead>#</TableHead>
                                            <TableHead>Faculty</TableHead>
                                            <TableHead>Room</TableHead>

                                            <TableHead>Reports Type</TableHead>
                                            <TableHead>Reports ID</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Code</TableHead>
                                            <TableHead>Condition</TableHead>
                                            <TableHead>Remarks</TableHead>
                                            <TableHead>Photo</TableHead>

                                            <TableHead>Date Reported</TableHead>
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
                                                        ROOM{" "}
                                                        {r.room
                                                            ? r.room.room_number
                                                            : "N/A"}
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
                                                                  ?.type ||
                                                              r.reportable
                                                                  ?.equipment_type ||
                                                              "N/A"
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
                                                        {r.photo_url ? (
                                                            <img
                                                                src={
                                                                    r.photo_url
                                                                }
                                                                alt="Report"
                                                                className="w-16 h-16 object-cover rounded cursor-pointer hover:shadow-lg"
                                                                onClick={() =>
                                                                    handlePhotoClick(
                                                                        r.photo_url
                                                                    )
                                                                }
                                                            />
                                                        ) : (
                                                            "No photo"
                                                        )}
                                                    </TableCell>

                                                    <TableCell>
                                                        {new Date(
                                                            r.created_at
                                                        ).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            {!r.resolved ? (
                                                                <Button
                                                                    size="sm"
                                                                    variant="secondary"
                                                                    className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                                                                    onClick={() =>
                                                                        handleResolve(
                                                                            r
                                                                        )
                                                                    }
                                                                >
                                                                    <CheckCircle2 className="w-4 h-4" />
                                                                    Resolve
                                                                </Button>
                                                            ) : (
                                                                <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                                                                    <CheckCircle2 className="w-4 h-4" />
                                                                    Resolved
                                                                </span>
                                                            )}
                                                        </div>
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
                                    {/* Modal for selected photo */}
                                </Table>

                                <div className="flex flex-col sm:flex-row justify-between items-center mt-4 p-2 gap-2">
                                    {/* Showing text */}
                                    <span className="text-sm text-muted-foreground">
                                        Showing{" "}
                                        {reportsData.length === 0
                                            ? 0
                                            : (currentPage - 1) * itemsPerPage +
                                              1}{" "}
                                        –
                                        {Math.min(
                                            currentPage * itemsPerPage,
                                            reportsData.length
                                        )}{" "}
                                        of {reportsData.length} reports
                                    </span>

                                    {/* Pagination buttons */}
                                    <div className="flex space-x-2">
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

                                        {[...Array(totalPages)].map(
                                            (_, idx) => (
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
                                            )
                                        )}

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled={
                                                currentPage === totalPages
                                            }
                                            onClick={() =>
                                                setCurrentPage(currentPage + 1)
                                            }
                                        >
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </main>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="flex flex-col items-center">
                        <DialogHeader>
                            <DialogTitle>Report Photo</DialogTitle>
                        </DialogHeader>
                        {selectedPhoto && (
                            <img
                                src={selectedPhoto}
                                alt="Report"
                                className="max-w-full max-h-[80vh] object-contain rounded"
                            />
                        )}
                    </DialogContent>
                </Dialog>

                {/* Resolve Modal */}
                <Dialog open={resolveOpen} onOpenChange={setResolveOpen}>
                    <DialogContent className="max-w-md w-full rounded-2xl border border-[hsl(142,34%,85%)] shadow-xl bg-white/90 backdrop-blur-lg">
                        {/* Modal Header */}
                        <DialogHeader className="pb-2">
                            <DialogTitle className="text-[hsl(142,34%,25%)] text-xl font-semibold">
                                Resolve Report #{selectedReport?.id}
                            </DialogTitle>

                            {/* Dynamic Header Info */}
                            <div className="text-sm text-[hsl(142,34%,30%)] mt-1 flex flex-col gap-0.5">
                                {/* Code / Identifier */}
                                <span>
                                    {selectedReport?.reportable_type ===
                                        "system_unit" && (
                                        <>
                                            Unit Code:{" "}
                                            <span className="font-medium text-[hsl(142,34%,45%)]">
                                                {selectedReport?.reportable
                                                    ?.unit_code || "N/A"}
                                            </span>
                                        </>
                                    )}
                                    {selectedReport?.reportable_type ===
                                        "equipment" && (
                                        <>
                                            Equipment Code:{" "}
                                            <span className="font-medium text-[hsl(142,34%,45%)]">
                                                {selectedReport?.reportable
                                                    ?.equipment_code || "N/A"}
                                            </span>
                                        </>
                                    )}
                                    {selectedReport?.reportable_type ===
                                        "peripheral" && (
                                        <>
                                            Peripheral Code:{" "}
                                            <span className="font-medium text-[hsl(142,34%,45%)]">
                                                {selectedReport?.reportable
                                                    ?.peripheral_code || "N/A"}
                                            </span>
                                        </>
                                    )}
                                </span>

                                {/* Type */}
                                <span>
                                    Type:{" "}
                                    <span className="font-medium text-[hsl(142,34%,45%)]">
                                        {selectedReport?.reportable_type ===
                                        "system_unit"
                                            ? "System Unit"
                                            : selectedReport?.reportable_type ===
                                              "equipment"
                                            ? selectedReport?.reportable
                                                  ?.equipment_type ||
                                              "Equipment"
                                            : selectedReport?.reportable_type ===
                                              "peripheral"
                                            ? selectedReport?.reportable
                                                  ?.type || "Peripheral"
                                            : "N/A"}
                                    </span>
                                </span>

                                {/* Room */}
                                {selectedReport?.room && (
                                    <span>
                                        Room:{" "}
                                        <span className="font-medium text-[hsl(142,34%,45%)]">
                                            {selectedReport.room.room_number}
                                        </span>
                                    </span>
                                )}
                            </div>
                        </DialogHeader>

                        <div className="flex flex-col gap-5 mt-3">
                            {/* Existing Remarks */}
                            {selectedReport?.remarks && (
                                <div className="flex flex-col gap-1">
                                    <Label className="text-gray-700 font-medium">
                                        Remarks
                                    </Label>
                                    <div className="border border-[hsl(142,34%,80%)] rounded-lg p-3 text-sm bg-[hsl(142,34%,96%)]">
                                        {selectedReport.remarks}
                                    </div>
                                </div>
                            )}

                            {/* Condition Select */}
                            <div className="flex flex-col gap-1">
                                <Label className="text-gray-700 font-medium">
                                    Set Condition
                                </Label>
                                <Select
                                    value={
                                        updatedCondition ||
                                        selectedReport?.condition
                                    }
                                    onValueChange={setUpdatedCondition}
                                >
                                    <SelectTrigger className="rounded-lg border-[hsl(142,34%,75%)] focus:ring-[hsl(142,34%,45%)]">
                                        <SelectValue placeholder="Select Condition" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {(() => {
                                            const type =
                                                selectedReport?.reportable_type;
                                            const options =
                                                CONDITION_OPTIONS[type] || [];

                                            return options.map((cond) => (
                                                <SelectItem
                                                    key={cond}
                                                    value={cond}
                                                    className="cursor-pointer"
                                                >
                                                    {cond}
                                                </SelectItem>
                                            ));
                                        })()}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Resolution Details */}
                            <div className="flex flex-col gap-1">
                                <Label className="text-gray-700 font-medium">
                                    Resolution Details
                                </Label>
                                <Input
                                    type="text"
                                    placeholder="Describe how you fixed it..."
                                    value={resolveRemarks}
                                    onChange={(e) =>
                                        setResolveRemarks(e.target.value)
                                    }
                                    className="rounded-lg border-[hsl(142,34%,75%)] focus:ring-[hsl(142,34%,45%)]"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3 pt-2">
                                <Button
                                    variant="outline"
                                    onClick={() => setResolveOpen(false)}
                                    disabled={isResolving}
                                    className="rounded-lg border-[hsl(142,34%,60%)] text-[hsl(142,34%,30%)] hover:bg-[hsl(142,34%,90%)]"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onClick={() =>
                                        handleResolveSubmit(selectedReport)
                                    }
                                    disabled={isResolving}
                                    className="rounded-lg bg-[hsl(142,34%,45%)] text-white hover:bg-[hsl(142,34%,40%)]"
                                >
                                    {isResolving ? "Saving..." : "Save"}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </SidebarInset>
        </SidebarProvider>
    );
}
