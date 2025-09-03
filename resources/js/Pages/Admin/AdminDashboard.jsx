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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";

import { Bell } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function AdminDashboard() {
    const [dashboardStats, setDashboardStats] = useState({
        totalRooms: 0,
        totalSystemUnits: 0,
        totalPeripherals: 0,
        totalEquipments: 0, // ✅ renamed for clarity
    });

    // Fetch dashboard stats
    const fetchDashboardStats = async () => {
        try {
            const res = await axios.get(`/admin/dashboard-stats`);
            setDashboardStats(res.data);
        } catch (err) {
            console.error("Failed to fetch stats:", err);
        }
    };

    useEffect(() => {
        fetchDashboardStats();

        const interval = setInterval(() => {
            fetchDashboardStats();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        axios.get("/admin/notifications").then((res) => {
            setNotifications(res.data);
        });
    }, []);

    return (
        <SidebarProvider>
            <Head>
                <title>Admin Dashboard</title>
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
                    {/* Spacer to push bell to the right */}
                    <div className="flex-1" />

                    {/* Bell + Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="relative p-2 rounded-full hover:bg-gray-100"
                        >
                            <Bell className="w-6 h-6 text-gray-700" />
                            {notifications.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
                                    {notifications.length}
                                </span>
                            )}
                        </button>

                        {/* Dropdown */}
                        {open && (
                            <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg overflow-hidden z-50">
                                <div className="p-3 border-b font-semibold">
                                    Notifications
                                </div>
                                <ul className="max-h-64 overflow-y-auto">
                                    {notifications.length > 0 ? (
                                        notifications.map((notif) => (
                                            <li
                                                key={notif.id}
                                                className="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b"
                                            >
                                                <p className="text-sm font-bold">
                                                    {notif.data.user_name}
                                                </p>
                                                <p className="text-sm">
                                                    Condition:{" "}
                                                    {notif.data.condition}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Room ID:{" "}
                                                    {notif.data.room_id}
                                                </p>
                                                <p className="text-xs">
                                                    {notif.data.remarks}
                                                </p>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="p-4 text-gray-500 text-sm">
                                            No notifications
                                        </li>
                                    )}
                                </ul>
                                <div className="p-2 text-center border-t">
                                    <a
                                        href="/admin/notifications"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        View all
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Content */}
                <main className="w-full px-6 py-6 space-y-6">
                    {/* Title */}
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Total Rooms</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">
                                    {dashboardStats.totalRooms}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Total System Units</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">
                                    {dashboardStats.totalSystemUnits}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Total Peripherals</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">
                                    {dashboardStats.totalPeripherals}
                                </p>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Total Room Equipments</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-3xl font-bold">
                                    {dashboardStats.totalEquipments}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
