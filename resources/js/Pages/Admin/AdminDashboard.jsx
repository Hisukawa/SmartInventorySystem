import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Head, Link, usePage } from "@inertiajs/react";
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
import {
    Bell,
    HardDrive,
    Monitor,
    Mouse,
    Computer,
    ClipboardList,
    Activity,
} from "lucide-react";
import { useSpring, animated } from "@react-spring/web";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {
    const [dashboardStats, setDashboardStats] = useState({
        totalRooms: 0,
        totalSystemUnits: 0,
        totalPeripherals: 0,
        totalEquipments: 0,
        occupiedRooms: 0,
        pendingRequests: 0,
        forRepair: 0,
        availablePeripherals: 0,
        activeUsers: 0,
    });

    const { auth } = usePage().props;
    const user = auth.user;

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

    const [activityLogs, setActivityLogs] = useState([]);
    useEffect(() => {
        axios.get("/admin/activity-logs").then((res) => {
            setActivityLogs(res.data);
        });
    }, []);

    const [maintenanceRequests, setMaintenanceRequests] = useState([]);
    useEffect(() => {
        axios.get("/admin/maintenance-requests").then((res) => {
            setMaintenanceRequests(res.data);
        });
    }, []);

    const [reportData, setReportData] = useState([]);
    useEffect(() => {
        axios.get("/admin/report-stats").then((res) => {
            setReportData(res.data);
        });
    }, []);

    // Animation for numbers (springs)
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
    const animatedPendingRequests = useSpring({
        pendingRequests: dashboardStats.pendingRequests,
        from: { pendingRequests: 0 },
    });
    const animatedForRepair = useSpring({
        forRepair: dashboardStats.forRepair,
        from: { forRepair: 0 },
    });
    const animatedAvailablePeripherals = useSpring({
        availablePeripherals: dashboardStats.availablePeripherals,
        from: { availablePeripherals: 0 },
    });
    const animatedActiveUsers = useSpring({
        activeUsers: dashboardStats.activeUsers,
        from: { activeUsers: 0 },
    });

    // Card data (now 9 cards for 3x3)
    const cardData = [
        {
            title: "Total Rooms",
            value: animatedTotalRooms.totalRooms,
            icon: HardDrive,
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
            icon: Mouse,
            link: "/admin/peripherals",
        },
        {
            title: "Total Room Equipments",
            value: animatedTotalEquipments.totalEquipments,
            icon: Monitor,
            link: "/admin/equipments",
        },
        {
            title: "Occupied Rooms",
            value: animatedOccupiedRooms.occupiedRooms,
            icon: HardDrive,
            link: "/admin/monitoring",
        },
        {
            title: "Pending Requests",
            value: animatedPendingRequests.pendingRequests,
            icon: ClipboardList,
            link: "/admin/maintenance-requests",
        },
        {
            title: "For Repair",
            value: animatedForRepair.forRepair,
            icon: Activity,
            link: "/admin/repairs",
        },
        {
            title: "Available Peripherals",
            value: animatedAvailablePeripherals.availablePeripherals,
            icon: Mouse,
            link: "/admin/peripherals",
        },
        {
            title: "Active Users",
            value: animatedActiveUsers.activeUsers,
            icon: Monitor,
            link: "/admin/users",
        },
    ];

    // Helper to render value (handles animated & plain numbers)
    const renderCardValue = (value) => {
        // Animated value from react-spring exposes .to()
        if (value && typeof value.to === "function") {
            return (
                <animated.p className="text-4xl font-extrabold text-gray-900">
                    {value.to((val) => Math.floor(val))}
                </animated.p>
            );
        }

        // Plain number / string fallback
        const num = Math.floor(Number(value) || 0);
        return <p className="text-4xl font-extrabold text-gray-900">{num}</p>;
    };

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
                    {/* Welcome Banner */}
                    <div className="relative rounded-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-6 text-white shadow-lg">
                        <h1 className="text-3xl font-bold">
                            Welcome back, {user.name.split(" ")[0]}.
                        </h1>
                        <p className="text-sm opacity-90 mt-1">
                            Here’s a summary of recent reports and activities.
                        </p>
                    </div>

                    {/* Cards Section (3x3 Grid) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                        {renderCardValue(card.value)}
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {/* Extra Features Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Activity Logs */}
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-blue-600" />
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 max-h-64 overflow-y-auto">
                                    {(activityLogs.length > 0
                                        ? activityLogs
                                        : []
                                    ).map((log, idx) => (
                                        <li
                                            key={idx}
                                            className="text-sm border-b pb-2"
                                        >
                                            <span className="font-semibold">
                                                {log.user}
                                            </span>{" "}
                                            {log.action}
                                            <span className="block text-xs text-gray-500">
                                                {log.timestamp}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        {/* Maintenance Requests */}
                        <Card className="lg:col-span-1">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ClipboardList className="w-5 h-5 text-yellow-600" />
                                    Pending Maintenance
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 max-h-64 overflow-y-auto">
                                    {(maintenanceRequests.length > 0
                                        ? maintenanceRequests
                                        : []
                                    ).map((req, idx) => (
                                        <li
                                            key={idx}
                                            className="text-sm border-b pb-2"
                                        >
                                            <span className="font-semibold">
                                                {req.equipment}
                                            </span>{" "}
                                            - {req.issue}
                                            <span className="block text-xs text-gray-500">
                                                Reported by {req.reported_by}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Reports Snapshot */}
                    <Card className="lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Monitor className="w-5 h-5 text-green-600" />
                                Reports Snapshot
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="h-96">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={
                                        reportData.length > 0 ? reportData : []
                                    }
                                >
                                    <XAxis dataKey="day" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar
                                        dataKey="equipments"
                                        fill="#3b82f6"
                                        name="Equipments Added"
                                    />
                                    <Bar
                                        dataKey="issues"
                                        fill="#ef4444"
                                        name="Issues Reported"
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
