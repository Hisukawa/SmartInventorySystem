import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { Card, CardContent } from "@/components/ui/card";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function AuditReportsIndex({ auditReports }) {
    const [open, setOpen] = useState(false);
    const [selectedAudit, setSelectedAudit] = useState(null);

    const handleViewDetails = (audit) => {
        setSelectedAudit(audit);
        setOpen(true);
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                {/* Header with Breadcrumb */}
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
                                        href="/admin/audit-reports"
                                        aria-current="page"
                                        className="font-semibold text-foreground"
                                    >
                                        Audit Reports
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>

                <main className="p-6">
                    <h1 className="text-2xl font-bold mb-5">Audit Reports</h1>

                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]">
                                        <TableHead>#</TableHead>
                                        <TableHead>Report ID</TableHead>
                                        <TableHead>Resolved By</TableHead>
                                        <TableHead>Old Condition</TableHead>
                                        <TableHead>New Condition</TableHead>
                                        <TableHead>Details</TableHead>
                                        <TableHead>Date Resolved</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {auditReports.length > 0 ? (
                                        auditReports.map((audit, index) => (
                                            <TableRow key={audit.id}>
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {audit.report_id}
                                                </TableCell>
                                                <TableCell>
                                                    {audit.resolver?.name ||
                                                        "N/A"}
                                                </TableCell>
                                                <TableCell>
                                                    {audit.old_condition}
                                                </TableCell>
                                                <TableCell>
                                                    {audit.new_condition}
                                                </TableCell>
                                                <TableCell>
                                                    {audit.details || "-"}
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        audit.created_at
                                                    ).toLocaleString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() =>
                                                            handleViewDetails(
                                                                audit
                                                            )
                                                        }
                                                    >
                                                        View
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan="8"
                                                className="text-center"
                                            >
                                                No audit reports found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Modal for viewing audit details */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="max-w-md w-full">
                            <DialogHeader>
                                <DialogTitle>Audit Report Details</DialogTitle>
                            </DialogHeader>
                            {selectedAudit && (
                                <div className="flex flex-col gap-2">
                                    <p>
                                        <strong>Report ID:</strong>{" "}
                                        {selectedAudit.report_id}
                                    </p>
                                    <p>
                                        <strong>Resolved By:</strong>{" "}
                                        {selectedAudit.resolver?.name || "N/A"}
                                    </p>
                                    <p>
                                        <strong>Old Condition:</strong>{" "}
                                        {selectedAudit.old_condition}
                                    </p>
                                    <p>
                                        <strong>New Condition:</strong>{" "}
                                        {selectedAudit.new_condition}
                                    </p>
                                    <p>
                                        <strong>Details:</strong>{" "}
                                        {selectedAudit.details || "-"}
                                    </p>
                                    <p>
                                        <strong>Date Resolved:</strong>{" "}
                                        {new Date(
                                            selectedAudit.created_at
                                        ).toLocaleString()}
                                    </p>
                                    <div className="flex justify-end mt-4">
                                        <Button onClick={() => setOpen(false)}>
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
