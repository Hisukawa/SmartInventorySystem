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
import { Bell, HardDrive, Monitor, Mouse, Computer } from "lucide-react"; // Import new icons
import { Link } from "@inertiajs/react";
import { useSpring, animated } from "@react-spring/web"; // For number animation

export default function AdminDashboard() {
    const [dashboardStats, setDashboardStats] = useState({
        totalRooms: 0,
        totalSystemUnits: 0,
        totalPeripherals: 0,
        totalEquipments: 0,
        occupiedRooms: 0,
    });

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

    //============================================================================================
    // for checking IP address in the console delete if youre displaying it in the ui
    useEffect(() => {
        fetch(`${window.location.origin}/test-ip`)
            .then((res) => res.json())
            .then((data) => {
                console.log("User IP:", data.ip);
                console.log("User Agent:", data.user_agent);
            });
    }, []);
    //============================================================================================

    // Animation for numbers
    const animatedTotalRooms = useSpring({
        totalRooms: dashboardStats.totalRooms,
        from: { totalRooms: 0 },
    });
    const animatedTotalSystemUnits = useSpring({
        totalSystemUnits: dashboardStats.totalSystemUnits,
        from: { totalSystemUnits: 0 },
    });
    const animatedTotalPeripherals = useSpring({
        totalPeripherals: dashboardStats.totalPeripherals,
        from: { totalPeripherals: 0 },
    });
    const animatedTotalEquipments = useSpring({
        totalEquipments: dashboardStats.totalEquipments,
        from: { totalEquipments: 0 },
    });
    const animatedOccupiedRooms = useSpring({
        occupiedRooms: dashboardStats.occupiedRooms,
        from: { occupiedRooms: 0 },
    });

    // Card data for easier rendering and linking
    const cardData = [
        {
            title: "Total Rooms",
            value: animatedTotalRooms.totalRooms,
            icon: HardDrive, // Changed to a more appropriate icon for rooms
            link: "/admin/rooms",
        },
        {
            title: "Total System Units",
            value: animatedTotalSystemUnits.totalSystemUnits,
            icon: Computer,
            link: "/admin/system-units",
        },
        {
            title: "Total Peripherals",
            value: animatedTotalPeripherals.totalPeripherals,
            icon: Mouse, // Example icon for peripherals
            link: "/admin/peripherals",
        },
        {
            title: "Total Room Equipments",
            value: animatedTotalEquipments.totalEquipments,
            icon: Monitor, // Example icon for general equipment
            link: "/admin/equipments",
        },
        {
            title: "Occupied Rooms",
            value: animatedOccupiedRooms.occupiedRooms,
            icon: HardDrive,
            link: "/admin/monitoring",
        },
    ];

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
                    <div className="flex-1" />
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
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
                        Admin Dashboard
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {cardData.map((card, index) => (
                            <Link
                                key={index}
                                href={card.link}
                                className="block"
                            >
                                <Card className="hover:shadow-lg hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
                                            <card.icon className="h-5 w-5 text-blue-600" />
                                            {card.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <animated.p className="text-4xl font-extrabold text-gray-900">
                                            {card.value.to((val) =>
                                                Math.floor(val)
                                            )}
                                        </animated.p>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
