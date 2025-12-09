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
import { ChevronRight } from "lucide-react";

export default function AuditReportsIndex({ auditReports }) {
    const [open, setOpen] = useState(false);
    const [selectedAudit, setSelectedAudit] = useState(null);

    const handleViewDetails = (audit) => {
        setSelectedAudit(audit);
        setOpen(true);
    };

    // Condition badge color mapping
    const getConditionBadge = (condition) => {
        const normalized = condition?.toLowerCase() || "";
        switch (normalized) {
            case "working":
                return "bg-green-100 text-green-800";
            case "repaired":
            case "needs repair":
            case "intermittent issue":
            case "minor damage":
            case "intermittent connectivity":
            case "no signal":
            case "needs configuration":
            case "to be diagnosed":
            case "not working":
                return "bg-red-100 text-red-800";
            case "for replacement":
            case "for disposal":
            case "condemned":
                return "bg-orange-100 text-orange-800";
            case "needs cleaning":
            case "under maintenance":
                return "bg-blue-100 text-blue-800";
            case "expired":
            case "needs refill":
            case "rusting":
            case "needs maintenance":
                return "bg-yellow-100 text-yellow-800";
            // case "replaced":
            //     return "bg-black/60 text-yellow-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
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
                                        <TableHead>Resolved By</TableHead>
                                        <TableHead>Old Condition</TableHead>
                                        <TableHead>New Condition</TableHead>
                                        <TableHead>Date Resolved</TableHead>
                                        <TableHead></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {auditReports.length > 0 ? (
                                        auditReports.map((audit, index) => (
                                            <TableRow
                                                key={audit.id}
                                                className="cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                                                onClick={() =>
                                                    handleViewDetails(audit)
                                                }
                                            >
                                                <TableCell>
                                                    {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                    {audit.resolver?.name ||
                                                        "N/A"}
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-sm font-semibold ${getConditionBadge(
                                                            audit.old_condition
                                                        )}`}
                                                    >
                                                        {audit.old_condition}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    <span
                                                        className={`px-2 py-1 rounded-full text-sm font-semibold ${getConditionBadge(
                                                            audit.new_condition
                                                        )}`}
                                                    >
                                                        {audit.new_condition}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(
                                                        audit.created_at
                                                    ).toLocaleString()}
                                                </TableCell>
                                                <TableCell className="text-gray-400">
                                                    <ChevronRight size={18} />
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan="6"
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
                        <DialogContent className="max-w-lg w-full">
                            {selectedAudit && (
                                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                                    {/* Header with color bar */}
                                    <div className="bg-[hsl(142,34%,25%)] p-4">
                                        <DialogTitle className="text-white text-lg font-bold">
                                            Audit Report Details
                                        </DialogTitle>
                                        {/* No DialogClose or X button here */}
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-500 font-semibold">
                                                    Report ID:
                                                </p>
                                                <p className="text-gray-800 font-medium">
                                                    {selectedAudit.report_id}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 font-semibold">
                                                    Resolved By:
                                                </p>
                                                <p className="text-gray-800 font-medium">
                                                    {selectedAudit.resolver
                                                        ?.name || "N/A"}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 font-semibold">
                                                    Old Condition:
                                                </p>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-sm font-semibold ${getConditionBadge(
                                                        selectedAudit.old_condition
                                                    )}`}
                                                >
                                                    {
                                                        selectedAudit.old_condition
                                                    }
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-gray-500 font-semibold">
                                                    New Condition:
                                                </p>
                                                <span
                                                    className={`px-2 py-1 rounded-full text-sm font-semibold ${getConditionBadge(
                                                        selectedAudit.new_condition
                                                    )}`}
                                                >
                                                    {
                                                        selectedAudit.new_condition
                                                    }
                                                </span>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <p className="text-gray-500 font-semibold">
                                                    Details:
                                                </p>
                                                <p className="text-gray-800">
                                                    {selectedAudit.details ||
                                                        "-"}
                                                </p>
                                            </div>
                                            <div className="sm:col-span-2">
                                                <p className="text-gray-500 font-semibold">
                                                    Date Resolved:
                                                </p>
                                                <p className="text-gray-800">
                                                    {new Date(
                                                        selectedAudit.created_at
                                                    ).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex justify-end mt-4">
                                            <Button
                                                onClick={() => setOpen(false)}
                                                className="bg-[hsl(142,34%,25%)] text-white hover:bg-[hsl(142,34%,20%)]"
                                            >
                                                Close
                                            </Button>
                                        </div>
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
