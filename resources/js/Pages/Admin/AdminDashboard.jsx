import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Head } from "@inertiajs/react";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";

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

import axios from "axios";

export default function AdminDashboard({ children }) {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 10;

    // Fetch rooms from API
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

    // Initial fetch and auto-refresh every 5 seconds
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
                                <BreadcrumbLink
                                    href="/admin/rooms"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Content */}
                <main className="w-full px-6 py-4">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">
                            Admin Dashboard
                        </h1>

                        {/* Room Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {rooms.length === 0 && (
                                <p className="col-span-full text-center text-gray-500">
                                    No rooms found.
                                </p>
                            )}
                            {rooms.map((room) => (
                                <div
                                    key={room.id}
                                    className={`p-4 rounded-lg shadow-md cursor-pointer transition-colors duration-300 ${
                                        room.is_active
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-300 text-gray-700"
                                    }`}
                                >
                                    <h2 className="text-lg font-semibold">
                                        {room.name}
                                    </h2>
                                    <p>
                                        Status:{" "}
                                        {room.is_active ? "Active" : "Inactive"}
                                    </p>
                                    {room.last_scanned_by && (
                                        <p className="text-sm mt-1">
                                            Last Used By: {room.last_scanned_by}
                                        </p>
                                    )}
                                    {room.last_scanned_at && (
                                        <p className="text-sm mt-1">
                                            Last Scanned:{" "}
                                            {new Date(
                                                room.last_scanned_at
                                            ).toLocaleString()}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center mt-6 space-x-2">
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            <span className="px-4 py-2">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
