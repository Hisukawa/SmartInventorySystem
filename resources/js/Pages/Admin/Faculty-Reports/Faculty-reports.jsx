import React, { useMemo, useState } from "react";
import { Link, router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Swal from "sweetalert2";

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

export default function FacultyReportsIndex({ reports, search }) {
    const [searchTerm, setSearchTerm] = useState(search || "");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Delete handler
    function handleDelete(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "This report will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/admin/faculty-reports/${id}`);
            }
        });
    }

    // Search handler
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            router.get("/admin/faculty-reports", { search: searchTerm });
        }
    };

    // Filtering (just search, no dropdown filters)
    const filteredData = useMemo(() => {
        return reports.filter((r) => {
            const matchesSearch =
                searchTerm === "" ||
                r.remarks?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                r.condition?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (r.room?.room_number || "N/A")
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                r.user?.name?.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesSearch;
        });
    }, [reports, searchTerm]);

    // Pagination logic
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Header */}
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">Reports</BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="/admin/faculty-reports"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    Faculty Reports
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Main Content */}
                <main>
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-5">
                            Faculty Reports
                        </h1>

                        {/* Search bar + actions */}
                        <div className="flex justify-between items-center mb-4">
                            <Input
                                placeholder="Search reports..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleSearch}
                                className="w-full sm:w-1/3"
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
                                            <TableHead>Reportable Type</TableHead>
                                            <TableHead>Reportable ID</TableHead>
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
                                                      <TableCell>{r.reportable_type}</TableCell>
                                                     <TableCell>{r.reportable_id}</TableCell>
                                                    <TableCell>
                                                        {r.condition}
                                                    </TableCell>
                                                    <TableCell>
                                                        {r.remarks}
                                                    </TableCell>
                                                    <TableCell>
                                                        ROOM{" "}
                                                        {r.room
                                                            ? r.room
                                                                  .room_number
                                                            : "N/A"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {new Date(
                                                            r.created_at
                                                        ).toLocaleDateString()}
                                                    </TableCell>
                                                    <TableCell className="space-x-2">
                                                        <Link
                                                            href={`/admin/faculty-reports/${r.id}`}
                                                        >
                                                            <Button
                                                                variant="secondary"
                                                                size="sm"
                                                            >
                                                                View
                                                            </Button>
                                                        </Link>
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
                                                    colSpan="7"
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
