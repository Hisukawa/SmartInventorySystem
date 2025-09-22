import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Head } from "@inertiajs/react";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import Notification from "@/Components/AdminComponents/Notification";

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
                                        href="/admin/monitoring"
                                        aria-current="page"
                                        className="font-semibold text-foreground"
                                    >
                                        Monitoring
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex-1" />
                        <Notification />
                    </div>
                </header>

                {/* Content */}
                <main className="w-full px-6 py-4">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">
                            Room Monitoring
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
                                    className="p-4 rounded-lg shadow-md cursor-pointer transition-colors duration-300 bg-[#0B6623] border-2 text-white"
                                    // Dark green card background (like logo), gold border
                                >
                                    {/* Faculty Photo */}
                                    {room.last_scanned_user?.photo ? (
                                        <div className="flex justify-center mb-3">
                                            <img
                                                src={
                                                    room.last_scanned_user.photo
                                                }
                                                alt={
                                                    room.last_scanned_user.name
                                                }
                                                className="w-40 h-40 rounded-full object-cover border-2 border-[#FFD700]"
                                                // Larger photo (40x40), gold border
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex justify-center mb-3">
                                            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-2 border-[#FFD700]">
                                                No Photo
                                            </div>
                                        </div>
                                    )}
                                    {/* Room Name */}
                                    <h2 className="text-center text-lg font-semibold mb-1 text-[#FFD700]">
                                        {room.name}
                                    </h2>
                                    {/* Status */}
                                    <p className="text-center text-sm">
                                        Status:{" "}
                                        <span
                                            className={`font-semibold ${
                                                room.is_active
                                                    ? "text-[#FFD700]"
                                                    : "text-[#FF4500]"
                                            }`}
                                        >
                                            {room.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </span>
                                    </p>
                                    {/* Previous Code */}
                                    {/* Faculty Name */}{" "}
                                    {/* {room.last_scanned_user && (
                                        <p className="text-center text-sm mt-2">
                                            {" "}
                                            Used By:{" "}
                                            {room.last_scanned_user.name} ({" "}
                                            {room.last_scanned_user.role}){" "}
                                        </p>
                                    )}{" "} */}
                                    {/* Scan Time */}{" "}
                                    {/* {room.last_scanned_at && (
                                        <p className="text-center text-xs text-gray-300 mt-1">
                                            {" "}
                                            Scanned at:{" "}
                                            {new Date(
                                                room.last_scanned_at
                                            ).toLocaleString()}{" "}
                                        </p>
                                    )} */}
                                    {/* Show Faculty + Time only if Active */}
                                    {room.is_active && (
                                        <>
                                            {room.last_scanned_user && (
                                                <p className="text-center text-sm mt-2">
                                                    Used By:{" "}
                                                    {
                                                        room.last_scanned_user
                                                            .name
                                                    }{" "}
                                                    (
                                                    {
                                                        room.last_scanned_user
                                                            .role
                                                    }
                                                    )
                                                </p>
                                            )}

                                            {room.last_scanned_at && (
                                                <p className="text-center text-xs text-gray-300 mt-1">
                                                    Scanned at:{" "}
                                                    {new Date(
                                                        room.last_scanned_at
                                                    ).toLocaleString()}
                                                </p>
                                            )}
                                        </>
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
                                className="px-4 py-2 bg-[#FFD700] text-[#006400] rounded hover:bg-[#DAA520]" // Yellow button, green text
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            <span className="px-4 py-2 text-white">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                                className="px-4 py-2 bg-[#FFD700] text-[#006400] rounded hover:bg-[#DAA520]" // Yellow button, green text
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
