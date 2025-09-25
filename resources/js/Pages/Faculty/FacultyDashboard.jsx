import React, { useState, useMemo } from "react";
import { Separator } from "@/components/ui/separator";
import { Head } from "@inertiajs/react";
import { FacultyAppSidebar } from "@/Components/FacultyComponents/faculty-app-sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

// ✅ Lucide Icons
import { Building2, FileText, Eye } from "lucide-react";

// Helper function to format date
const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function FacultyDashboard({ user, recentRooms = [], reports = [] }) {
  const [selectedReport, setSelectedReport] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const filteredReports = useMemo(() => {
    if (activeTab === "all") return reports;
    return reports.filter((report) => report.status === activeTab);
  }, [reports, activeTab]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Pending
          </Badge>
        );
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Resolved
          </Badge>
        );
      case "critical":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            Critical
          </Badge>
        );
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <Head>
        <title>Faculty Dashboard</title>
      </Head>
      <FacultyAppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 items-center gap-2 px-4 border-b bg-white shadow-sm">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6 mx-3" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/faculty/dashboard"
                  aria-current="page"
                  className="font-semibold text-foreground"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Main Content */}
        <main className="w-full px-6 py-6 bg-gray-50 min-h-screen space-y-8">
          {/* Recent Rooms Scanned */}
        <section className="w-full md:max-w-l lg:max-w-5xl">

        <Card className="p-4 w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl max-h-[500px]">
  {/* Header */}
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="h-5 w-5 text-green-600" />
            <h2 className="font-bold text-sm px-3 py-1 rounded-md bg-green-600 border border-green-700 text-white inline-block">
              Recent Rooms Scanned
            </h2>
          </div>

  {/* Scrollable List */}
        <ScrollArea className="max-h-[350px] pr-2">
          <div className="space-y-3">
            {(recentRooms || []).map((room) => (
              <Card
                key={room.room_number}
                className="p-3 w-full sm:w-[280px] md:w-[300px] bg-green-100 border border-green-300 text-green-800 hover:shadow-md transition-all hover:scale-[1.01]"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="font-semibold text-sm">Room {room.room_number}</p>
                  <Badge
                    variant={room.is_active ? "default" : "secondary"}
                    className={
                      room.is_active
                        ? "bg-green-600 border border-green-700 text-white"
                        : "bg-gray-500 border border-gray-600 text-white"
                    }
                  >
                    {room.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-xs">Last scanned: {formatDateTime(room.created_at)}</p>
              </Card>
            ))}
          </div>
        </ScrollArea>
        </Card>


          </section>

          {/* My Reports */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5 text-red-600" />
              <h2 className="font-bold text-lg">My Reports</h2>
            </div>

            <Card>
              <CardContent className="pt-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
                    <TabsTrigger value="all">All Reports</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>

                  {/* Shared table for reports */}
                  <TabsContent value={activeTab} className="mt-4">
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead>Room</TableHead>
                            <TableHead>Condition</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredReports.length > 0 ? (
                            filteredReports.map((report) => (
                              <TableRow key={report.id}>
                                <TableCell className="font-medium">{report.item}</TableCell>
                                <TableCell>Room {report.room_number}</TableCell>
                                <TableCell>{report.condition}</TableCell>
                                <TableCell>{getStatusBadge(report.status)}</TableCell>
                                <TableCell className="text-right">
                                  <Dialog>
                                    <DialogTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedReport(report)}
                                      >
                                        <Eye className="h-4 w-4 mr-2" /> View
                                      </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                      <DialogHeader>
                                        <DialogTitle>Report Details</DialogTitle>
                                        <DialogDescription>
                                          Detailed information about this report.
                                        </DialogDescription>
                                      </DialogHeader>
                                      {selectedReport && (
                                        <div className="grid gap-4 py-4">
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <p className="text-sm font-semibold col-span-1">Item:</p>
                                            <p className="text-sm col-span-3">{selectedReport.item}</p>
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <p className="text-sm font-semibold col-span-1">Room:</p>
                                            <p className="text-sm col-span-3">Room {selectedReport.room_number}</p>
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <p className="text-sm font-semibold col-span-1">Condition:</p>
                                            <p className="text-sm col-span-3">{selectedReport.condition}</p>
                                          </div>
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <p className="text-sm font-semibold col-span-1">Status:</p>
                                            <p className="text-sm col-span-3">{getStatusBadge(selectedReport.status)}</p>
                                          </div>
                                          {selectedReport.remarks && (
                                            <div className="grid grid-cols-4 items-center gap-4">
                                              <p className="text-sm font-semibold col-span-1">Remarks:</p>
                                              <p className="text-sm col-span-3">{selectedReport.remarks}</p>
                                            </div>
                                          )}
                                          <div className="grid grid-cols-4 items-center gap-4">
                                            <p className="text-sm font-semibold col-span-1">Submitted:</p>
                                            <p className="text-sm col-span-3">
                                              {formatDateTime(selectedReport.created_at)}
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                      <DialogFooter>
                                        <Button type="button" onClick={() => setSelectedReport(null)}>
                                          Close
                                        </Button>
                                      </DialogFooter>
                                    </DialogContent>
                                  </Dialog>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                                No reports to display for this category.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
