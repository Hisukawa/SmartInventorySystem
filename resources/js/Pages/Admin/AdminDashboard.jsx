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
import { Card, CardContent, CardHeader, CardTitle, CardFooter  } from "@/components/ui/card";
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

    // new dynamic equipment-condition-by-room
    const [roomConditionData, setRoomConditionData] = useState([]);
    const [conditions, setConditions] = useState([]);

    useEffect(() => {
        axios
            .get("/admin/activity-logs")
            .then((res) => setActivityLogs(res.data));
        axios
            .get("/admin/rooms-status")
            .then((res) => setRoomsStatus(res.data));

        // old endpoint for pie charts
        axios
            .get("/admin/equipment-condition")
            .then((res) => setConditionData(res.data));

        // new endpoint for bar chart
        axios
            .get("/admin/equipment-condition-by-room")
            .then((res) => {
                console.log("Raw roomConditionData:", res.data); // Add this
                setRoomConditionData(res.data);
                if (res.data.length > 0) {
                    const keys = Object.keys(res.data[0]).filter(
                        (k) => k !== "room"
                    );
                    console.log("Detected conditions:", keys); // Add this
                    setConditions(keys);
                } else {
                    console.log(
                        "No data returned for equipment-condition-by-room."
                    );
                }
            })
            .catch((error) => {
                console.error(
                    "Error fetching equipment-condition-by-room:",
                    error
                ); // Add error handling
            });
    }, []);

    // Animation for numbers
    const animatedValue = (val) => useSpring({ val, from: { val: 0 } });

    const renderCardValue = (anim) => (
        <animated.p className="text-4xl font-extrabold text-gray-900">
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
            title: "System Units",
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
        {
            title: "Available Peripherals",
            value: animatedValue(dashboardStats.availablePeripherals),
            icon: Mouse,
            link: "/admin/peripherals",
        },
        {
            title: "Active Users",
            value: animatedValue(dashboardStats.activeUsers),
            icon: Monitor,
            link: "/admin/users",
        },
    ];

    const COLORS = ["#16a34a", "#facc15", "#dc2626", "#3b82f6", "#9333ea"];

    const prepareData = (obj) =>
        Object.entries(obj).map(([name, value]) => ({
            name,
            value,
        }));
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
                    <div className="relative rounded-2xl bg-gradient-to-r from-green-500 via-green-400 to-emerald-500 p-6 text-white shadow-lg">
                        <h1 className="text-3xl font-bold">
                            Welcome back, {user.name.split(" ")[0]}.
                        </h1>
                        <p className="text-sm opacity-90 mt-1">
                            Here’s a summary of your ICT inventory system.
                        </p>
                    </div>
                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cardData.map((card, idx) => (
                            <Link key={idx} href={card.link} className="block">
                                <Card className="hover:shadow-lg hover:border-green-300 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-lg font-medium text-gray-700 flex items-center gap-2">
                                            <card.icon className="h-5 w-5 text-[#006400]" />{" "}
                                            {/* Changed color here */}
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

                    {/* Room Occupancy + Equipment Condition by Room */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Room Occupancy */}
                        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Active Room Occupancy
                </CardTitle>
            </CardHeader>
<CardContent>
  {activeRooms.length === 0 ? (
    <p className="text-green-100 text-sm text-center">No active rooms right now</p>
  ) : (
    <div className="space-y-4 max-w-xl mx-auto">
      {roomsToShow.map((activeRoom) => (
        <div
          key={activeRoom.id}
          className="flex items-center gap-4 p-4 rounded-lg shadow-sm bg-green-700 border border-green-800"
        >
          {/* Faculty Photo */}
          <img
            src={
              activeRoom.faculty_photo
                ? `/storage/${activeRoom.faculty_photo}`
                : "/default-avatar.png"
            }
            alt="Faculty"
            className="w-16 h-16 rounded-full object-cover border-2 border-green-500"
          />

          {/* Room & Scan Info */}
          <div>
            <p className="text-lg font-semibold text-white">
              Room {activeRoom.room_number}
            </p>
            <p className="text-sm text-green-100">
              Scanned by{" "}
              <span className="font-medium text-white">
                {activeRoom.last_scanned_by ?? "Unknown"}
              </span>
            </p>
            <p className="text-xs text-green-200">
              {activeRoom.last_scanned_at
                ? new Date(activeRoom.last_scanned_at).toLocaleString()
                : "No scan time"}
            </p>
          </div>
        </div>
      ))}
    </div>
  )}
</CardContent>




            {/* Footer toggle */}
            {activeRooms.length > 2 && (
                <CardFooter className="flex justify-center">
                    <Button variant="outline" size="sm" onClick={() => setShowAll(!showAll)}>
                        {showAll ? "Show Less" : "View All Active Rooms"}
                    </Button>
                </CardFooter>
            )}
        </Card>
    

                        {/* Equipment Condition by Room (Dynamic) */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BarChartIcon className="w-5 h-5 text-purple-600" />
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
                    {/* Equipment Condition by Type (Pie Charts) */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PieChart className="w-5 h-5 text-emerald-600" />
                                Equipment Condition by Type
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-72">
                                {/* System Units */}
                                <div>
                                    <h3 className="text-center font-semibold mb-2">
                                        System Units
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
                                                outerRadius={70}
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
                                    <h3 className="text-center font-semibold mb-2">
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
                                                outerRadius={70}
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
                                    <h3 className="text-center font-semibold mb-2">
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
                                                outerRadius={70}
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
                                                {log.user?.name ?? "Unknown"}
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
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
