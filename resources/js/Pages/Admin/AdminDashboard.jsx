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
    CartesianGrid,
} from "recharts";

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
            setConditionData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch right chart data (total equipment)
    const fetchAllEquipmentData = async () => {
        try {
            const res = await axios.get("/admin/equipment-condition", {
                params: { room_id: selectedRoomRight || undefined }, // pass room filter
            });
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
            title: "Active Users",
            value: animatedValue(dashboardStats.activeUsers),
            icon: Monitor,
            link: "/admin/users",
        },
        {
            title: "Total Users",
            value: animatedValue(dashboardStats.totalUsers),
            icon: Users,
            link: "/admin/users",
        },
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

                    {/* 🔹 Middle Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 mb-6">
                        {/* Left (1/3): Active Room Occupancy */}
                        <div className="lg:col-span-2">
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
                                                <img
                                                    src={
                                                        activeRoom.faculty_photo ||
                                                        "/default-avatar.png"
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
                        </div>

                        {/* Middle (2/3): Equipment Condition */}
                        <div className="lg:col-span-3">
                            {/* (Your existing Equipment Condition card here) */}
                            {/** Keep the big Equipment Condition card as you already wrote it **/}
                            {/** Just paste the full <Card> for Equipment Condition here **/}
                            <Card className="rounded-2xl shadow-md bg-white">
                                <CardHeader className="flex justify-between items-center">
                                    <CardTitle className="flex items-center gap-2 text-[#2F4F2F]">
                                        <BarChartIcon className="w-5 h-5 text-[#59AC77]" />
                                        Equipment Condition
                                    </CardTitle>

                                    {/* All Rooms filter button */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                size="lg"
                                                className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
                                            >
                                                <SlidersHorizontal className="w-5 h-5" />
                                                {selectedRoom || "All Rooms"}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    setSelectedRoom("")
                                                }
                                            >
                                                {selectedRoom === "" && (
                                                    <Check className="w-4 h-4 mr-1" />
                                                )}
                                                All Rooms
                                            </DropdownMenuItem>
                                            {rooms.map((room) => (
                                                <DropdownMenuItem
                                                    key={room.id}
                                                    onClick={() =>
                                                        setSelectedRoom(room.id)
                                                    }
                                                >
                                                    {selectedRoom ===
                                                        room.id && (
                                                        <Check className="w-4 h-4 mr-1" />
                                                    )}
                                                    {room.room_number}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardHeader>

                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-72">
                                        {/* Computers (No extra filter) */}
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
                                                    <Legend
                                                        verticalAlign="bottom"
                                                        height={36}
                                                    />
                                                </RePieChart>
                                            </ResponsiveContainer>
                                        </div>

                                        {/* Peripherals (Filter by type) */}
                                        <div>
                                            <div className="flex justify-center items-center gap-2 mb-1">
                                                <h3 className="font-semibold">
                                                    Peripherals
                                                </h3>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            size="lg"
                                                            className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
                                                        >
                                                            <SlidersHorizontal className="w-5 h-5" />
                                                            {selectedType ||
                                                                "All Types"}
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                setSelectedType(
                                                                    ""
                                                                )
                                                            }
                                                        >
                                                            {selectedType ===
                                                                "" && (
                                                                <Check className="w-4 h-4 mr-1" />
                                                            )}
                                                            All Types
                                                        </DropdownMenuItem>
                                                        {peripheralTypes.map(
                                                            (type) => (
                                                                <DropdownMenuItem
                                                                    key={type}
                                                                    onClick={() =>
                                                                        setSelectedType(
                                                                            type
                                                                        )
                                                                    }
                                                                >
                                                                    {selectedType ===
                                                                        type && (
                                                                        <Check className="w-4 h-4 mr-1" />
                                                                    )}
                                                                    {type}
                                                                </DropdownMenuItem>
                                                            )
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                            <ResponsiveContainer
                                                width="100%"
                                                height="80%"
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
                                                    <Legend
                                                        verticalAlign="bottom"
                                                        height={36}
                                                    />
                                                </RePieChart>
                                            </ResponsiveContainer>
                                        </div>

                                        {/* Equipments (Filter by type) */}
                                        {/* Equipments (Filter by type) */}
                                        <div>
                                            <div className="flex justify-center items-center gap-2 mb-1">
                                                <h3 className="font-semibold">
                                                    Equipments
                                                </h3>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            size="lg"
                                                            className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
                                                        >
                                                            <SlidersHorizontal className="w-5 h-5" />
                                                            {selectedEquipmentType ||
                                                                "All Types"}
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent>
                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                setSelectedEquipmentType(
                                                                    ""
                                                                )
                                                            }
                                                        >
                                                            {selectedEquipmentType ===
                                                                "" && (
                                                                <Check className="w-4 h-4 mr-1" />
                                                            )}
                                                            All Types
                                                        </DropdownMenuItem>
                                                        {equipmentTypes.map(
                                                            (type) => (
                                                                <DropdownMenuItem
                                                                    key={type}
                                                                    onClick={() =>
                                                                        setSelectedEquipmentType(
                                                                            type
                                                                        )
                                                                    }
                                                                >
                                                                    {selectedEquipmentType ===
                                                                        type && (
                                                                        <Check className="w-4 h-4 mr-1" />
                                                                    )}
                                                                    {type}
                                                                </DropdownMenuItem>
                                                            )
                                                        )}
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            <ResponsiveContainer
                                                width="100%"
                                                height="80%"
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
                                                    <Legend
                                                        verticalAlign="bottom"
                                                        height={36}
                                                    />
                                                </RePieChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right (1/3): Total Rooms Assets */}
                        <div className="lg:col-span-1">
                            {/* (Your existing Total Rooms Assets card here) */}
                            {/** Just paste the full <Card> for Total Rooms Assets here **/}
                            {/* Right: Total Rooms Assets */}
                            <Card className="rounded-2xl shadow-md bg-white">
                                <CardHeader className="flex justify-between items-center">
                                    <CardTitle className="flex items-center gap-2 text-[#2F4F2F]">
                                        <BarChartIcon className="w-5 h-5 text-[#59AC77]" />
                                        Total Rooms Assets
                                    </CardTitle>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                size="lg"
                                                className="flex items-center gap-2 bg-green-600 text-white hover:bg-green-700"
                                            >
                                                <SlidersHorizontal className="w-5 h-5" />
                                                {selectedRoomRight ||
                                                    "All Rooms"}
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    setSelectedRoomRight("")
                                                }
                                            >
                                                {selectedRoomRight === "" && (
                                                    <Check className="w-4 h-4 mr-1" />
                                                )}
                                                All Rooms
                                            </DropdownMenuItem>
                                            {rooms.map((room) => (
                                                <DropdownMenuItem
                                                    key={room.id}
                                                    onClick={() =>
                                                        setSelectedRoomRight(
                                                            room.id
                                                        )
                                                    }
                                                >
                                                    {selectedRoomRight ===
                                                        room.id && (
                                                        <Check className="w-4 h-4 mr-1" />
                                                    )}
                                                    {room.room_number}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardHeader>

                                <CardContent>
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <BarChart
                                            data={[
                                                {
                                                    name: "Total",
                                                    Computers:
                                                        allEquipmentData.system_units
                                                            ? Object.values(
                                                                  allEquipmentData.system_units
                                                              ).reduce(
                                                                  (a, b) =>
                                                                      a + b,
                                                                  0
                                                              )
                                                            : 0,
                                                    Peripherals:
                                                        allEquipmentData.peripherals_type
                                                            ? Object.values(
                                                                  allEquipmentData.peripherals_type
                                                              ).reduce(
                                                                  (a, b) =>
                                                                      a + b,
                                                                  0
                                                              )
                                                            : 0,
                                                    Equipments:
                                                        allEquipmentData.equipments
                                                            ? Object.values(
                                                                  allEquipmentData.equipments
                                                              ).reduce(
                                                                  (a, b) =>
                                                                      a + b,
                                                                  0
                                                              )
                                                            : 0,
                                                },
                                            ]}
                                            margin={{
                                                top: 20,
                                                right: 20,
                                                left: 0,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />{" "}
                                            {/* Hover to see values */}
                                            <Legend />
                                            <Bar
                                                dataKey="Computers"
                                                fill="#59AC77"
                                            />
                                            <Bar
                                                dataKey="Peripherals"
                                                fill="#FFD700"
                                            />
                                            <Bar
                                                dataKey="Equipments"
                                                fill="#FF6B6B"
                                            />
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

                        {/* Optional empty space (1/3) */}
                        <div className="lg:col-span-1"></div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
