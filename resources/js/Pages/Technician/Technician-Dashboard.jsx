import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Head, Link, usePage } from "@inertiajs/react";
import Notification from "@/Components/AdminComponents/Notification";
import { TechnicianAppSidebar } from "@/Components/TechnicianComponent/technician-app-sidebar";

import { Button } from "@/components/ui/button";
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
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from "@/components/ui/card";
import axios from "axios";
import {
    Monitor,
    Mouse,
    Computer,
    ClipboardList,
    Activity,
    Users,
    Building,
} from "lucide-react";
import { useSpring, animated } from "@react-spring/web";
import {
    PieChart as RePieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
} from "recharts";

export default function TechnicianDashboard() {
    const [dashboardStats, setDashboardStats] = useState({
        totalRooms: 0,
        totalSystemUnits: 0,
        totalPeripherals: 0,
        totalEquipments: 0,
        occupiedRooms: 0,
        pendingRequests: 0,
        forRepair: 0,
    });

    const { auth } = usePage().props;
    const user = auth.user;

    // Dashboard Data States
    const [activityLogs, setActivityLogs] = useState([]);
    const [roomsStatus, setRoomsStatus] = useState({ details: [] });
    const [conditionData, setConditionData] = useState({
        system_units: {},
        peripherals: {},
        equipments: {},
    });
    const [roomConditionData, setRoomConditionData] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [showAll, setShowAll] = useState(false);

    // Active Rooms
    const activeRooms = roomsStatus.details
        ? roomsStatus.details.filter((room) => room.is_active)
        : [];
    const roomsToShow = showAll ? activeRooms : activeRooms.slice(0, 2);

    // Fetch all dashboard data
    const fetchDashboardData = async () => {
        try {
            // Stats
            const statsRes = await axios.get("/technician/dashboard-stats");
            setDashboardStats(statsRes.data);

            // Logs
            const logsRes = await axios.get("/technician/activity-logs");
            setActivityLogs(logsRes.data);

            // Room status
            const roomsRes = await axios.get("/technician/rooms-status");
            setRoomsStatus(roomsRes.data);

            // Equipment condition (overall)
            const condRes = await axios.get("/technician/equipment-condition");
            setConditionData(condRes.data);

            // Equipment condition by room
            const condRoomRes = await axios.get(
                "/technician/equipment-condition-by-room"
            );
            setRoomConditionData(condRoomRes.data);

            if (condRoomRes.data.length > 0) {
                const keys = Object.keys(condRoomRes.data[0]).filter(
                    (k) => k !== "room"
                );
                setConditions(keys);
            }

            // Notifications
            const notifRes = await axios.get("/technician/notifications");
            setNotifications(notifRes.data);
        } catch (err) {
            console.error("Error fetching dashboard data:", err);
        }
    };

    useEffect(() => {
        fetchDashboardData(); // initial load
        const interval = setInterval(fetchDashboardData, 5000); // refresh every 5s
        return () => clearInterval(interval);
    }, []);

    // Animations
    const animatedValue = (val) => useSpring({ val, from: { val: 0 } });
    const renderCardValue = (anim) => (
        <animated.p className="text-lg font-bold text-black">
            {anim.val.to((val) => Math.floor(val))}
        </animated.p>
    );

    // KPI Cards
    const cardData = [
        {
            title: "Total Rooms",
            value: animatedValue(dashboardStats.totalRooms),
            icon: Building,
            link: "/technician/rooms",
        },
        {
            title: "Computers",
            value: animatedValue(dashboardStats.totalSystemUnits),
            icon: Computer,
            link: "/technician/units",
        },
        {
            title: "Peripherals",
            value: animatedValue(dashboardStats.totalPeripherals),
            icon: Mouse,
            link: "/technician/peripherals",
        },
        {
            title: "Room Equipments",
            value: animatedValue(dashboardStats.totalEquipments),
            icon: Monitor,
            link: "/technician/equipments",
        },
        {
            title: "Occupied Rooms",
            value: animatedValue(dashboardStats.occupiedRooms),
            icon: Users,
            link: "/technician/monitoring",
        },
        {
            title: "Pending Requests",
            value: animatedValue(dashboardStats.pendingRequests),
            icon: ClipboardList,
            link: "/technician/maintenance-requests",
        },
        {
            title: "For Repair",
            value: animatedValue(dashboardStats.forRepair),
            icon: Activity,
            link: "/technician/repairs",
        },
    ];

    const CONDITION_COLORS = {
        Functional: "#16a34a",
        Defective: "#dc2626",
        "Needs Maintenance": "#facc15",
    };

    const COLORS = ["#16a34a", "#facc15", "#dc2626", "#3b82f6", "#9333ea"];
    const prepareData = (obj) =>
        Object.entries(obj).map(([name, value]) => ({ name, value }));

    return (
        <SidebarProvider>
            <Head>
                <title>Technician Dashboard</title>
            </Head>
            <TechnicianAppSidebar />
            <SidebarInset>
                {/* Header */}
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#" aria-current="page">
                                    Technician Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex-1" />
                    <Notification notifications={notifications} />
                </header>

                {/* Content */}
                <main className="w-full px-6 py-6 space-y-6">
                    {/* Welcome Banner */}
                    <div className="relative rounded-2xl bg-gradient-to-r from-[#A8D5BA] via-[#7FCF9E] to-[#59AC77] p-6 text-white shadow-lg">
                        <h1 className="text-3xl font-bold">
                            Welcome back, {user.name.split(" ")[0]}.
                        </h1>
                        <p className="text-sm opacity-90 mt-1">
                            Here’s a summary of your ICT inventory system.
                        </p>
                    </div>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {cardData.map((card, idx) => (
                            <Link key={idx} href={card.link} className="block">
                                <Card className="rounded-xl shadow-sm bg-white hover:shadow-md transition-all duration-300 cursor-pointer p-3">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                                        <CardTitle className="text-xs font-medium flex items-center gap-1 text-gray-500">
                                            <card.icon className="h-4 w-4 text-[hsl(142,34%,51%)]" />
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

                    {/* Active Rooms + Recent Activity */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Active Room Occupancy */}
                        <Card className="rounded-2xl shadow-md bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-[#2F4F2F]">
                                    <Users className="w-5 h-5 text-[#59AC77]" />
                                    Active Room Occupancy
                                </CardTitle>
                            </CardHeader>
                            <div className="space-y-6 p-4">
                                {activeRooms.length === 0 ? (
                                    <p className="text-[#3B5C47] text-sm text-center">
                                        No active rooms right now
                                    </p>
                                ) : (
                                    roomsToShow.map((activeRoom) => (
                                        <div
                                            key={activeRoom.id}
                                            className="flex items-center gap-6 border-b pb-6 last:border-b-0"
                                        >
                                            <img
                                                src={
                                                    activeRoom.faculty_photo
                                                        ? `/storage/${activeRoom.faculty_photo}`
                                                        : "/default-avatar.png"
                                                }
                                                alt="Faculty"
                                                className="w-16 h-16 rounded-full object-cover border-4 border-[#59AC77]"
                                            />
                                            <div>
                                                <p className="text-base font-semibold text-[#2F4F2F]">
                                                    Room{" "}
                                                    {activeRoom.room_number}
                                                </p>
                                                <p className="text-sm text-[#3B5C47]">
                                                    Scanned by{" "}
                                                    <span className="font-medium text-[#2F4F2F]">
                                                        {activeRoom.last_scanned_by ??
                                                            "Unknown"}
                                                    </span>
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {activeRoom.last_scanned_at
                                                        ? new Date(
                                                              activeRoom.last_scanned_at
                                                          ).toLocaleString()
                                                        : "No scan time"}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            {activeRooms.length > 2 && (
                                <CardFooter className="flex justify-center">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowAll(!showAll)}
                                    >
                                        {showAll
                                            ? "Show Less"
                                            : "View All Active Rooms"}
                                    </Button>
                                </CardFooter>
                            )}
                        </Card>

                        {/* Recent Activity */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-green-600" />
                                    Recent Activity
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 max-h-72 overflow-y-auto">
                                    {Array.isArray(activityLogs) &&
                                    activityLogs.length > 0 ? (
                                        activityLogs.map((log, idx) => (
                                            <li
                                                key={idx}
                                                className="text-sm border-b pb-2"
                                            >
                                                <span className="font-semibold">
                                                    {log.user?.name ??
                                                        "Unknown"}
                                                </span>{" "}
                                                {log.action}
                                                <span className="block text-xs text-gray-500">
                                                    {log.timestamp}
                                                </span>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="text-gray-500">
                                            No activity logs found
                                        </li>
                                    )}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Equipment Condition Breakdown */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Equipment Condition</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RePieChart>
                                        <Pie
                                            data={prepareData(
                                                conditionData.equipments
                                            )}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            outerRadius={80}
                                            dataKey="value"
                                            label
                                        >
                                            {prepareData(
                                                conditionData.equipments
                                            ).map((entry, index) => (
                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={
                                                        CONDITION_COLORS[
                                                            entry.name
                                                        ] || "#3b82f6"
                                                    }
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </RePieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        {/* Equipment Condition by Room */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Condition by Room</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={roomConditionData}>
                                        <XAxis dataKey="room" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        {conditions.map((cond, idx) => (
                                            <Bar
                                                key={cond}
                                                dataKey={cond}
                                                stackId="a"
                                                fill={
                                                    COLORS[idx % COLORS.length]
                                                }
                                            />
                                        ))}
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
