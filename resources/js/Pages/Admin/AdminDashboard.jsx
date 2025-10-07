import React, { useState, useEffect } from "react";
import { SlidersHorizontal, Check } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { Head, Link, usePage } from "@inertiajs/react";
import Notification from "@/Components/AdminComponents/Notification";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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
    Cell,
    Tooltip,
    ResponsiveContainer,
    XAxis,
    YAxis,
    CartesianGrid,
    Bar,
    BarChart,
    PieChart as RePieChart,
    Pie,
    Legend,
    ComposedChart,
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { HeatMapGrid } from "react-grid-heatmap";
export default function AdminDashboard() {
    const { auth } = usePage().props;
    const user = auth.user;

    // Dashboard stats
    const [dashboardStats, setDashboardStats] = useState({
        totalRooms: 0,
        totalSystemUnits: 0,
        totalPeripherals: 0,
        totalEquipments: 0,
        occupiedRooms: 0,
        pendingRequests: 0,
        forRepair: 0,
        activeUsers: 0,
        totalUsers: 0,
    });

    // Data states
    const [activityLogs, setActivityLogs] = useState([]);
    const [roomsStatus, setRoomsStatus] = useState([]);
    const [conditionData, setConditionData] = useState({
        system_units: {},
        peripherals: {},
        peripherals_type: {},
        equipments: {},
    });

    const [allEquipmentData, setAllEquipmentData] = useState({
        system_units: {},
        peripherals: {},
        peripherals_type: {},
        equipments: {},
    });

    const [rooms, setRooms] = useState([]);
    const [peripheralTypes, setPeripheralTypes] = useState([]);

    // Left chart filter
    const [selectedRoom, setSelectedRoom] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [equipmentTypes, setEquipmentTypes] = useState([]);
    // Right chart filter (independent)
    const [selectedRoomRight, setSelectedRoomRight] = useState("");
    const [selectedEquipmentType, setSelectedEquipmentType] = useState(""); //
    // Fetch Rooms & Peripheral Types for filters
    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const roomsRes = await axios.get("/admin/rooms-list");
                setRooms(Array.isArray(roomsRes.data) ? roomsRes.data : []);

                const typesRes = await axios.get("/admin/peripheral-types");
                setPeripheralTypes(
                    Array.isArray(typesRes.data) ? typesRes.data : []
                );
                const equipmentRes = await axios.get("/admin/equipment-types");
                setEquipmentTypes(
                    Array.isArray(equipmentRes.data) ? equipmentRes.data : []
                );
            } catch (err) {
                console.error("Error fetching filters:", err);
            }
        };
        fetchFilters();
    }, []);

    // Fetch filtered left chart data
    const fetchFilteredData = async () => {
        try {
            const res = await axios.get("/admin/equipment-condition-filtered", {
                params: { room_id: selectedRoom, type: selectedType },
            });
            console.log("Rooms:", rooms);
            setConditionData(res.data);
        } catch (err) {
            console.error(err);
        }
    };
    const transformToChartData = (category) => {
        if (!conditionData[category]) return [];
        return Object.entries(conditionData[category]).map(([key, value]) => ({
            name: key,
            value,
        }));
    };
    const systemUnitsData = transformToChartData("system_units");
    const peripheralsData = transformToChartData("peripherals");
    const equipmentsData = transformToChartData("equipments");

    // Fetch right chart data (total equipment)
    const fetchAllEquipmentData = async () => {
        try {
            const res = await axios.get("/admin/equipment-condition", {
                params: { room_id: selectedRoomRight || undefined }, // pass room filter
            });

            // 👇 Add this line to debug the API response

            setAllEquipmentData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch dashboard stats, activity logs, rooms status
    const fetchDashboardData = async () => {
        try {
            const statsRes = await axios.get("/admin/dashboard-stats");
            setDashboardStats(statsRes.data);

            const roomsRes = await axios.get("/admin/rooms-status");
            setRoomsStatus(roomsRes.data);

            const logsRes = await axios.get("/admin/activity-logs");
            setActivityLogs(logsRes.data);

            await fetchFilteredData();
            await fetchAllEquipmentData();
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch all data initially and every 5 seconds
    useEffect(() => {
        fetchDashboardData();
        const interval = setInterval(fetchDashboardData, 5000);
        return () => clearInterval(interval);
    }, [selectedRoom, selectedType, selectedRoomRight]);

    // Animated number helper
    const animatedValue = (val) => useSpring({ val, from: { val: 0 } });
    const renderCardValue = (anim) => (
        <animated.p className="text-lg font-bold text-black">
            {anim.val.to((v) => Math.floor(v))}
        </animated.p>
    );

    // Card data
    const cardData = [
        {
            title: "Total Rooms",
            value: animatedValue(dashboardStats.totalRooms),
            icon: Building,
            link: "/admin/rooms",
        },
        {
            title: "Computers",
            value: animatedValue(
                selectedRoom || selectedType
                    ? Object.values(conditionData.system_units).reduce(
                          (a, b) => a + b,
                          0
                      )
                    : dashboardStats.totalSystemUnits
            ),
            icon: Computer,
            link: "/admin/system-units",
        },
        {
            title: "Peripherals",
            value: animatedValue(
                selectedRoom || selectedType
                    ? Object.values(conditionData.peripherals).reduce(
                          (a, b) => a + b,
                          0
                      )
                    : dashboardStats.totalPeripherals
            ),
            icon: Mouse,
            link: "/admin/peripherals",
        },
        {
            title: "Room Equipments",
            value: animatedValue(
                selectedRoom || selectedType
                    ? Object.values(conditionData.equipments).reduce(
                          (a, b) => a + b,
                          0
                      )
                    : dashboardStats.totalEquipments
            ),
            icon: Monitor,
            link: "/admin/equipments",
        },
        {
            title: "Pending Requests",
            value: animatedValue(dashboardStats.pendingRequests),
            icon: ClipboardList,
            link: "/admin/maintenance-requests",
        },
        {
            title: "Total Users",
            value: animatedValue(dashboardStats.totalUsers),
            icon: Users,
            link: "/admin/users",
        },
    ];
    const stackedBarData = [
        {
            name: "All Rooms",
            PCs: allEquipmentData.system_units
                ? Object.values(allEquipmentData.system_units).reduce(
                      (a, b) => a + b,
                      0
                  )
                : 0,
            Peripherals: allEquipmentData.peripherals
                ? Object.values(allEquipmentData.peripherals).reduce(
                      (a, b) => a + b,
                      0
                  )
                : 0,
            Equipments: allEquipmentData.equipments
                ? Object.values(allEquipmentData.equipments).reduce(
                      (a, b) => a + b,
                      0
                  )
                : 0,
        },
    ];

    const sumValues = (obj) =>
        Object.values(obj || {}).reduce((sum, val) => sum + val, 0);

    const totalsData = [
        { name: "PCs", value: sumValues(allEquipmentData.system_units) },
        { name: "Peripherals", value: sumValues(allEquipmentData.peripherals) },
        { name: "Equipment", value: sumValues(allEquipmentData.equipments) },
    ];

    const COLORS = ["#16a34a", "#facc15", "#dc2626", "#3b82f6", "#9333ea"];
    const prepareData = (obj) =>
        Object.entries(obj).map(([name, value]) => ({ name, value }));

    const [showAll, setShowAll] = useState(false);
    const [filterType, setFilterType] = useState("type"); //
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
                    {/* 🔹 Top Row: KPI Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        {/* Heatmap: Condition Across Rooms */}
                        <div className="lg:col-span-1">
                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>
                                        Condition of PCs, Peripherals, Equipment
                                        Across Room
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Room Filter */}
                                    <div className="flex justify-end mb-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="flex items-center gap-2 text-gray-700 font-medium"
                                                >
                                                    {selectedRoom
                                                        ? rooms.find(
                                                              (room) =>
                                                                  room.id ===
                                                                  selectedRoom
                                                          )?.name
                                                        : "All Rooms"}
                                                    <SlidersHorizontal className="h-4 w-4 opacity-70" />
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent
                                                align="end"
                                                className="max-h-60 overflow-y-auto bg-white shadow-lg border rounded-lg"
                                            >
                                                <DropdownMenuItem
                                                    className={`cursor-pointer ${
                                                        selectedRoom === ""
                                                            ? "bg-green-100 text-green-700 font-semibold"
                                                            : "hover:bg-gray-100"
                                                    }`}
                                                    onClick={() =>
                                                        setSelectedRoom("")
                                                    }
                                                >
                                                    All Rooms
                                                    {selectedRoom === "" && (
                                                        <Check className="ml-auto h-4 w-4 text-green-600" />
                                                    )}
                                                </DropdownMenuItem>

                                                {rooms.map((room) => (
                                                    <DropdownMenuItem
                                                        key={room.id}
                                                        className={`cursor-pointer ${
                                                            selectedRoom ===
                                                            room.id
                                                                ? "bg-green-100 text-green-700 font-semibold"
                                                                : "hover:bg-gray-100"
                                                        }`}
                                                        onClick={() =>
                                                            setSelectedRoom(
                                                                room.id
                                                            )
                                                        }
                                                    >
                                                        {room.room_number}
                                                        {selectedRoom ===
                                                            room.id && (
                                                            <Check className="ml-auto h-4 w-4 text-green-600" />
                                                        )}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>

                                    {/* Tabs for PCs / Peripherals / Equipment */}
                                    <Tabs
                                        defaultValue="system_units"
                                        className="w-full"
                                    >
                                        <TabsList>
                                            <TabsTrigger value="system_units">
                                                PCs
                                            </TabsTrigger>
                                            <TabsTrigger value="peripherals">
                                                Peripherals
                                            </TabsTrigger>
                                            <TabsTrigger value="equipments">
                                                Equipment
                                            </TabsTrigger>
                                        </TabsList>

                                        {/* System Units */}
                                        <TabsContent value="system_units">
                                            <ResponsiveContainer
                                                width="100%"
                                                height={300}
                                            >
                                                <BarChart
                                                    data={systemUnitsData}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar
                                                        dataKey="value"
                                                        fill="#3b82f6"
                                                    >
                                                        {systemUnitsData.map(
                                                            (entry, index) => (
                                                                <Cell
                                                                    key={`su-${index}`}
                                                                    fill={
                                                                        COLORS[
                                                                            index %
                                                                                COLORS.length
                                                                        ]
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </TabsContent>

                                        {/* Peripherals */}
                                        <TabsContent value="peripherals">
                                            <ResponsiveContainer
                                                width="100%"
                                                height={300}
                                            >
                                                <BarChart
                                                    data={peripheralsData}
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar
                                                        dataKey="value"
                                                        fill="#16a34a"
                                                    >
                                                        {peripheralsData.map(
                                                            (entry, index) => (
                                                                <Cell
                                                                    key={`per-${index}`}
                                                                    fill={
                                                                        COLORS[
                                                                            index %
                                                                                COLORS.length
                                                                        ]
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </TabsContent>

                                        {/* Equipment */}
                                        <TabsContent value="equipments">
                                            <ResponsiveContainer
                                                width="100%"
                                                height={300}
                                            >
                                                <BarChart data={equipmentsData}>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar
                                                        dataKey="value"
                                                        fill="#f59e0b"
                                                    >
                                                        {equipmentsData.map(
                                                            (entry, index) => (
                                                                <Cell
                                                                    key={`eq-${index}`}
                                                                    fill={
                                                                        COLORS[
                                                                            index %
                                                                                COLORS.length
                                                                        ]
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Stacked Bar Chart: Totals Across All Rooms */}
                        <div className="lg:col-span-1">
                            <Card className="col-span-2">
                                <CardHeader>
                                    <CardTitle>
                                        Total PCs, Peripherals, and Equipment
                                        Across All Rooms
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Room Filter (optional for totals) */}
                                    <div className="flex justify-end mb-4">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="flex items-center gap-2 text-gray-700 font-medium"
                                                >
                                                    {selectedRoomRight
                                                        ? rooms.find(
                                                              (room) =>
                                                                  room.id ===
                                                                  selectedRoomRight
                                                          )?.name
                                                        : "All Rooms"}
                                                    <SlidersHorizontal className="h-4 w-4 opacity-70" />
                                                </Button>
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent
                                                align="end"
                                                className="max-h-60 overflow-y-auto bg-white shadow-lg border rounded-lg"
                                            >
                                                {/* All Rooms Option */}
                                                <DropdownMenuItem
                                                    className={`cursor-pointer text-black dark:text-white ${
                                                        selectedRoomRight === ""
                                                            ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 font-semibold"
                                                            : "hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    }`}
                                                    onClick={() =>
                                                        setSelectedRoomRight("")
                                                    }
                                                >
                                                    All Rooms
                                                    {selectedRoomRight ===
                                                        "" && (
                                                        <Check className="ml-auto h-4 w-4 text-green-600 dark:text-green-400" />
                                                    )}
                                                </DropdownMenuItem>

                                                {/* Dynamic Room Options */}
                                                {rooms.map((room) => (
                                                    <DropdownMenuItem
                                                        key={room.id}
                                                        className={`cursor-pointer text-gray-800 ${
                                                            selectedRoomRight ===
                                                            room.id
                                                                ? "bg-green-100 text-green-700 font-semibold"
                                                                : "hover:bg-gray-100"
                                                        }`}
                                                        onClick={() =>
                                                            setSelectedRoomRight(
                                                                room.id
                                                            )
                                                        }
                                                    >
                                                        {room.room_number}
                                                        {selectedRoomRight ===
                                                            room.id && (
                                                            <Check className="ml-auto h-4 w-4 text-green-600" />
                                                        )}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <ResponsiveContainer
                                        width="100%"
                                        height={340}
                                    >
                                        <BarChart
                                            data={totalsData}
                                            layout="vertical"
                                            barCategoryGap="30%"
                                            margin={{
                                                top: 20,
                                                right: 30,
                                                left: 80,
                                                bottom: 20,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" />
                                            <YAxis
                                                dataKey="name"
                                                type="category"
                                                width={100}
                                            />
                                            <Tooltip />

                                            <Bar
                                                dataKey="value"
                                                barSize={50}
                                                radius={[0, 0, 0, 0]}
                                            >
                                                {totalsData.map(
                                                    (entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={
                                                                [
                                                                    "#3b82f6",
                                                                    "#16a34a",
                                                                    "#f59e0b",
                                                                    "#ef4444",
                                                                    "#8b5cf6",
                                                                ][index % 5]
                                                            }
                                                        />
                                                    )
                                                )}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* 🔹 Bottom Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Recent Activity (2/3) */}
                        <div className="lg:col-span-2">
                            <Card className="rounded-2xl shadow-md bg-white h-full">
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

                        {/* Active Room Occupancy (1/3) */}
                        <div className="lg:col-span-1">
                            <Card className="rounded-2xl shadow-md bg-white h-full">
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
                                                {activeRoom.faculty_photo ? (
                                                    <img
                                                        src={
                                                            activeRoom.faculty_photo
                                                        }
                                                        alt={
                                                            activeRoom.last_scanned_by ||
                                                            "Faculty"
                                                        }
                                                        className="w-28 h-28 rounded-full object-cover border-4 border-[#59AC77] shadow-lg"
                                                        onError={(e) => {
                                                            // Fallback image if the faculty photo URL is broken or not accessible
                                                            e.target.onerror =
                                                                null;
                                                            e.target.src =
                                                                "/default-avatar.png";
                                                        }}
                                                    />
                                                ) : (
                                                    <img
                                                        src="/default-avatar.png"
                                                        alt="No Faculty"
                                                        className="w-28 h-28 rounded-full object-cover border-4 border-gray-300 shadow-lg"
                                                    />
                                                )}
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
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
