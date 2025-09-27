import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { FacultyAppSidebar } from "@/Components/FacultyComponents/faculty-app-sidebar";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from "recharts";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Building, DoorOpen, CheckCircle } from "lucide-react";
// Dummy placeholders for charts
const Placeholder = ({ label }) => (
    <Card className="rounded-2xl shadow-md bg-white flex items-center justify-center h-64">
        <p className="text-gray-500">{label}</p>
    </Card>
);

export default function FacultyDashboard({
    user,
    activeRooms = [],
    summary = {},
}) {
    const [showAll, setShowAll] = useState(false);
    const roomsToShow = showAll ? activeRooms : activeRooms.slice(0, 2);

    return (
        <SidebarProvider>
            <Head>
                <title>Faculty Dashboard</title>
            </Head>
            <FacultyAppSidebar />
            <SidebarInset>
                {/* Header */}
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white shadow-sm">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href="/faculty/dashboard"
                                    className="font-semibold"
                                >
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Main Content */}
                <main className="w-full px-6 py-6 bg-gray-50 min-h-screen space-y-6">
                    {/* === Top Row: Summary Cards === */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="p-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500">
                                        Total Rooms
                                    </h2>
                                    <p className="text-2xl font-bold">
                                        {summary.totalRooms ?? 0}
                                    </p>
                                </div>
                                <Building className="w-8 h-8 text-blue-600" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500">
                                        Available Rooms
                                    </h2>
                                    <p className="text-2xl font-bold">
                                        {summary.availableRooms ?? 0}
                                    </p>
                                </div>
                                <DoorOpen className="w-8 h-8 text-green-600" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500">
                                        Occupied Rooms
                                    </h2>
                                    <p className="text-2xl font-bold">
                                        {summary.occupiedRooms ?? 0}
                                    </p>
                                </div>
                                <Users className="w-8 h-8 text-red-600" />
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-sm font-medium text-gray-500">
                                        Items Working %
                                    </h2>
                                    <p className="text-2xl font-bold">
                                        {summary.itemsWorkingPercent ?? 0}%
                                    </p>
                                </div>
                                <CheckCircle className="w-8 h-8 text-emerald-600" />
                            </CardContent>
                        </Card>
                    </div>

                    {/* === Content Area: Left & Right === */}
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        {/* LEFT SIDE: Active Room Occupancy */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="rounded-2xl shadow-md bg-white">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-green-600" />
                                        Active Room Occupancy
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    {activeRooms.length === 0 ? (
                                        <p className="text-gray-500 text-sm text-center">
                                            No active rooms right now
                                        </p>
                                    ) : (
                                        roomsToShow.map((room) => (
                                            <div
                                                key={room.room_id}
                                                className="flex items-center gap-4 border-b pb-4 last:border-b-0"
                                            >
                                                <img
                                                    src={
                                                        room.faculty_photo
                                                            ? `/storage/${room.faculty_photo}`
                                                            : "/default-avatar.png"
                                                    }
                                                    alt="Faculty"
                                                    className="w-20 h-20 rounded-full object-cover border-2 border-green-600"
                                                />
                                                <div>
                                                    <p className="text-lg font-semibold">
                                                        Room {room.room_number}
                                                    </p>
                                                    <p className="text-sm">
                                                        Scanned by{" "}
                                                        <span className="font-medium">
                                                            {room.faculty_name}
                                                        </span>
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {room.scanned_at
                                                            ? new Date(
                                                                  room.scanned_at
                                                              ).toLocaleString()
                                                            : "No scan time"}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </CardContent>
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

                        {/* RIGHT SIDE: Charts */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Equipment Condition Pie Chart */}
                                <Card className="rounded-2xl shadow-md bg-white p-6">
                                    <h2 className="text-lg font-semibold mb-4">
                                        Equipment Condition
                                    </h2>
                                    {summary.totalItems > 0 ? (
                                        <>
                                            <ResponsiveContainer
                                                width="100%"
                                                height={250}
                                            >
                                                <PieChart>
                                                    <Pie
                                                        data={
                                                            summary.conditions ??
                                                            []
                                                        }
                                                        cx="50%"
                                                        cy="50%"
                                                        outerRadius={80}
                                                        dataKey="value"
                                                        label
                                                    >
                                                        {(
                                                            summary.conditions ??
                                                            []
                                                        ).map(
                                                            (entry, index) => (
                                                                <Cell
                                                                    key={`cell-${index}`}
                                                                    fill={
                                                                        [
                                                                            "#4CAF50",
                                                                            "#FFC107",
                                                                            "#FF9800",
                                                                            "#F44336",
                                                                            "#2196F3",
                                                                            "#9C27B0",
                                                                        ][
                                                                            index %
                                                                                6
                                                                        ]
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </Pie>
                                                    <Tooltip />
                                                </PieChart>
                                            </ResponsiveContainer>

                                            {/* ✅ Legend */}
                                            <div className="flex flex-wrap justify-center gap-4 mt-4">
                                                {(summary.conditions ?? []).map(
                                                    (entry, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center space-x-2 text-sm"
                                                        >
                                                            <span
                                                                className="w-4 h-4 inline-block rounded"
                                                                style={{
                                                                    backgroundColor:
                                                                        [
                                                                            "#4CAF50",
                                                                            "#FFC107",
                                                                            "#FF9800",
                                                                            "#F44336",
                                                                            "#2196F3",
                                                                            "#9C27B0",
                                                                        ][
                                                                            index %
                                                                                6
                                                                        ],
                                                                }}
                                                            ></span>
                                                            <span>
                                                                {entry.name} (
                                                                {entry.value})
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </>
                                    ) : (
                                        <p className="text-gray-500 text-sm text-center">
                                            No equipment data
                                        </p>
                                    )}
                                </Card>

                                {/* Items by Category Bar Chart */}
                                <Card className="rounded-2xl shadow-md bg-white p-6">
                                    <h2 className="text-lg font-semibold mb-4">
                                        Items by Category
                                    </h2>
                                    <ResponsiveContainer
                                        width="100%"
                                        height={250}
                                    >
                                        <BarChart
                                            data={[
                                                {
                                                    category: "Computers",
                                                    total:
                                                        summary.systemUnitsTotal ??
                                                        0,
                                                },
                                                {
                                                    category: "Peripherals",
                                                    total:
                                                        summary.peripheralsTotal ??
                                                        0,
                                                },
                                                {
                                                    category: "Equipments",
                                                    total:
                                                        summary.equipmentsTotal ??
                                                        0,
                                                },
                                            ]}
                                            margin={{
                                                top: 10,
                                                right: 10,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="category" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar
                                                dataKey="total"
                                                fill="#2196F3"
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Card>
                            </div>

                            {/* Overview Section */}
                            <Card className="rounded-2xl shadow-md bg-white p-6">
                                <h2 className="text-lg font-semibold mb-4">
                                    Equipment Overview Across Rooms
                                </h2>
                                <ul className="space-y-2 text-gray-700">
                                    <li>
                                        Total items in all rooms:{" "}
                                        <span className="font-medium">
                                            {summary.totalItems ?? 0}
                                        </span>
                                    </li>
                                    <li>
                                        Items working:{" "}
                                        <span className="font-medium">
                                            {summary.workingItems ?? 0}
                                        </span>
                                    </li>
                                    <li>
                                        Percentage working / not working:{" "}
                                        <span className="font-medium">
                                            {summary.itemsWorkingPercent ?? 0}%
                                        </span>
                                    </li>
                                    <li>
                                        Room Occupancy:{" "}
                                        <span className="font-medium">
                                            {summary.occupiedRooms ?? 0}/
                                            {summary.totalRooms ?? 0}
                                        </span>
                                    </li>
                                </ul>
                            </Card>
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
