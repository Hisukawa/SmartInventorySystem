import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Head, Link, usePage } from "@inertiajs/react";
import Notification from "@/Components/AdminComponents/Notification";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
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
    HardDrive,
    Monitor,
    Mouse,
    Computer,
    ClipboardList,
    Activity,
    Users,
    PieChart,
    BarChart as BarChartIcon,
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

export default function AdminDashboard() {
    const [dashboardStats, setDashboardStats] = useState({
        totalRooms: 0,
        totalSystemUnits: 0,
        totalPeripherals: 0,
        totalEquipments: 0,
        occupiedRooms: 0,
        pendingRequests: 0,
        forRepair: 0,
        // availablePeripherals: 0,
        activeUsers: 0,
        totalUsers: 0,
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
        const interval = setInterval(fetchDashboardStats, 5000);
        return () => clearInterval(interval);
    }, []);

    const [activityLogs, setActivityLogs] = useState([]);
    const [roomsStatus, setRoomsStatus] = useState([]);
    const [conditionData, setConditionData] = useState({
        system_units: {},
        peripherals: {},
        equipments: {},
    });

    const [roomConditionData, setRoomConditionData] = useState([]);
    const [conditions, setConditions] = useState([]);

    useEffect(() => {
        axios
            .get("/admin/activity-logs")
            .then((res) => setActivityLogs(res.data));
        axios
            .get("/admin/rooms-status")
            .then((res) => setRoomsStatus(res.data));
        axios
            .get("/admin/equipment-condition")
            .then((res) => setConditionData(res.data));

        axios
            .get("/admin/equipment-condition-by-room")
            .then((res) => {
                setRoomConditionData(res.data);
                if (res.data.length > 0) {
                    const keys = Object.keys(res.data[0]).filter(
                        (k) => k !== "room"
                    );
                    setConditions(keys);
                }
            })
            .catch((error) =>
                console.error(
                    "Error fetching equipment-condition-by-room:",
                    error
                )
            );
    }, []);

    const animatedValue = (val) => useSpring({ val, from: { val: 0 } });
    const renderCardValue = (anim) => (
        <animated.p className="text-lg font-bold text-black">
            {anim.val.to((val) => Math.floor(val))}
        </animated.p>
    );

    const cardData = [
        {
            title: "Total Rooms",
            value: animatedValue(dashboardStats.totalRooms),
            icon: Building,
            link: "/admin/rooms",
        },
        {
            title: "Computers",
            value: animatedValue(dashboardStats.totalSystemUnits),
            icon: Computer,
            link: "/admin/system-units",
        },
        {
            title: "Peripherals",
            value: animatedValue(dashboardStats.totalPeripherals),
            icon: Mouse,
            link: "/admin/peripherals",
        },
        {
            title: "Room Equipments",
            value: animatedValue(dashboardStats.totalEquipments),
            icon: Monitor,
            link: "/admin/equipments",
        },
        {
            title: "Occupied Rooms",
            value: animatedValue(dashboardStats.occupiedRooms),
            icon: Users,
            link: "/admin/monitoring",
        },
        {
            title: "Pending Requests",
            value: animatedValue(dashboardStats.pendingRequests),
            icon: ClipboardList,
            link: "/admin/maintenance-requests",
        },
        {
            title: "For Repair",
            value: animatedValue(dashboardStats.forRepair),
            icon: Activity,
            link: "/admin/repairs",
        },
        // {
        //     title: "Available Peripherals",
        //     value: animatedValue(dashboardStats.availablePeripherals),
        //     icon: Mouse,
        //     link: "/admin/peripherals",
        // },
        {
            title: "Active Users",
            value: animatedValue(dashboardStats.activeUsers),
            icon: Monitor,
            link: "/admin/users",
        },
        {
            title: "Total Users", // ✅ New card
            value: animatedValue(dashboardStats.totalUsers),
            icon: Users,
            link: "/admin/users",
        },
    ];

    const COLORS = ["#16a34a", "#facc15", "#dc2626", "#3b82f6", "#9333ea"];
    const prepareData = (obj) =>
        Object.entries(obj).map(([name, value]) => ({ name, value }));

    const [showAll, setShowAll] = useState(false);
    const activeRooms = roomsStatus.details
        ? roomsStatus.details.filter((room) => room.is_active)
        : [];
    const roomsToShow = showAll ? activeRooms : activeRooms.slice(0, 2);

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
                    <Notification />
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

                    {/* Main Analytics Section */}

                    {/* Left (2 cols) */}
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

                    {/* Right (1 col) */}
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                        {/* Equipment Condition by Type */}
                        <Card className="rounded-2xl shadow-md bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PieChart className="w-5 h-5 text-emerald-600" />
                                    Equipment Condition by Type
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-72">
                                    {/* System Units */}
                                    <div>
                                        <h3 className="text-center font-semibold mb-1">
                                            Computers
                                        </h3>
                                        <ResponsiveContainer
                                            width="100%"
                                            height="90%"
                                        >
                                            <RePieChart>
                                                <Pie
                                                    data={prepareData(
                                                        conditionData.system_units
                                                    )}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    outerRadius={60}
                                                    label
                                                >
                                                    {prepareData(
                                                        conditionData.system_units
                                                    ).map((_, idx) => (
                                                        <Cell
                                                            key={idx}
                                                            fill={
                                                                COLORS[
                                                                    idx %
                                                                        COLORS.length
                                                                ]
                                                            }
                                                        />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </RePieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    {/* Peripherals */}
                                    <div>
                                        <h3 className="text-center font-semibold mb-1">
                                            Peripherals
                                        </h3>
                                        <ResponsiveContainer
                                            width="100%"
                                            height="90%"
                                        >
                                            <RePieChart>
                                                <Pie
                                                    data={prepareData(
                                                        conditionData.peripherals
                                                    )}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    outerRadius={60}
                                                    label
                                                >
                                                    {prepareData(
                                                        conditionData.peripherals
                                                    ).map((_, idx) => (
                                                        <Cell
                                                            key={idx}
                                                            fill={
                                                                COLORS[
                                                                    idx %
                                                                        COLORS.length
                                                                ]
                                                            }
                                                        />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </RePieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    {/* Equipments */}
                                    <div>
                                        <h3 className="text-center font-semibold mb-1">
                                            Equipments
                                        </h3>
                                        <ResponsiveContainer
                                            width="100%"
                                            height="90%"
                                        >
                                            <RePieChart>
                                                <Pie
                                                    data={prepareData(
                                                        conditionData.equipments
                                                    )}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    outerRadius={60}
                                                    label
                                                >
                                                    {prepareData(
                                                        conditionData.equipments
                                                    ).map((_, idx) => (
                                                        <Cell
                                                            key={idx}
                                                            fill={
                                                                COLORS[
                                                                    idx %
                                                                        COLORS.length
                                                                ]
                                                            }
                                                        />
                                                    ))}
                                                </Pie>
                                                <Tooltip />
                                            </RePieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Equipment Condition by Room */}
                        <Card className="rounded-2xl shadow-md bg-white">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-[#2F4F2F]">
                                    <BarChartIcon className="w-5 h-5 text-[#59AC77]" />
                                    Equipment Condition by Room
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
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
