import React, { useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import axios from "axios";

import { Separator } from "@/components/ui/separator";
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
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard({ children }) {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const perPage = 10;

  // Fetch rooms
  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        `/api/admin/rooms-status?page=${currentPage}&per_page=${perPage}`
      );
      setRooms(res.data.data);
      setTotalPages(res.data.meta.total_pages);
    } catch (err) {
      console.error("Failed to fetch rooms:", err);
    }
  };

  useEffect(() => {
    fetchRooms();
    const interval = setInterval(fetchRooms, 5000);
    return () => clearInterval(interval);
  }, [currentPage]);

  return (
    <SidebarProvider>
      <Head>
        <title>Dashboard</title>
      </Head>
      <AppSidebar />
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6 mx-3" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#" aria-current="page">
                  Reports
                </BreadcrumbLink>
                <BreadcrumbSeparator />
                <BreadcrumbLink
                  href="/admin/rooms"
                  aria-current="page"
                  className="font-semibold text-foreground"
                >
                  Monitoring
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Content */}
        <main className="w-full px-6 py-4">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Room Monitoring</h1>

            {/* Room Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {rooms.length === 0 && (
                <p className="col-span-full text-center text-gray-500">
                  No rooms found.
                </p>
              )}
              {rooms.map((room) => (
                <motion.div
                  key={room.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    onClick={() =>
                      setSelectedRoom(
                        selectedRoom?.id === room.id ? null : room
                      )
                    }
                    className={`cursor-pointer transition-colors duration-300 ${
                      room.is_active
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Status: {room.is_active ? "Active" : "Inactive"}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Room Details Table */}
      {/* Room Details Table */}
<AnimatePresence>
  {selectedRoom && (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6"
    >
      <h2 className="text-xl font-semibold mb-2">
        Room Details – {selectedRoom.name}
      </h2>

      {/* Table aligned left with smaller width */}
      <div className="rounded-md border overflow-x-auto w-full md:w-1/2 lg:w-1/3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Role</TableHead>
              <TableHead className="text-left">Name</TableHead>
              <TableHead className="text-left">Scanned At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-left">{selectedRoom.role || "—"}</TableCell>
              <TableCell className="text-left">{selectedRoom.last_scanned_by || "—"}</TableCell>
              <TableCell className="text-left">
                {selectedRoom.last_scanned_at
                  ? new Date(selectedRoom.last_scanned_at + "Z").toLocaleString(
                      "en-PH",
                      {
                        timeZone: "Asia/Manila",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )
                  : "—"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )}
</AnimatePresence>



            {/* Pagination */}
            <div className="flex justify-center mt-6 space-x-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
