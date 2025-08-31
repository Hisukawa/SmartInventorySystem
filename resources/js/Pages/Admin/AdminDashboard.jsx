import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Head } from "@inertiajs/react";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";

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
                {/* Header */}
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" aria-current="page">
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Content */}
                <main className="w-full px-6 py-4">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
