import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Monitor, Mouse, Keyboard, Boxes, Menu } from "lucide-react";

import {
    LineChart,
    Line,
    Area,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import FacultyRoomSidebar from "@/Components/FacultyComponents/faculty-room-view-sidebar";
import { Button } from "@/components/ui/button";

export default function FacultyDashboard({ room, stats, user, activeSection }) {
    const colors = [
        "#4CAF50",
        "#FF9800",
        "#F44336",
        "#2196F3",
        "#9C27B0",
        "#00BCD4",
    ];
    const prepareChartData = (data) =>
        data
            ? Object.entries(data).map(([name, value]) => ({ name, value }))
            : [];

    const [selectedPeripheralType, setSelectedPeripheralType] = useState(null);
    const [selectedEquipmentName, setSelectedEquipmentName] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const peripheralConditionData = selectedPeripheralType
        ? prepareChartData(
              stats.peripherals.by_type_condition?.[selectedPeripheralType]
          )
        : prepareChartData(stats.peripherals.by_condition);

    const equipmentConditionData = selectedEquipmentName
        ? prepareChartData(
              stats.equipments.by_name_condition?.[selectedEquipmentName]
          )
        : prepareChartData(stats.equipments.by_condition);
    const [equipmentExpanded, setEquipmentExpanded] = useState(false);

    // Convert equipment object to array
    const equipmentList = stats.equipments.by_name
        ? Object.entries(stats.equipments.by_name).map(([name, count]) => ({
              name,
              count,
          }))
        : [];

    // Total equipment count
    const totalEquipment = stats.equipments.total || 0;

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar Desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <FacultyRoomSidebar
                    room={room}
                    user={user}
                    active={activeSection || "dashboard"}
                    onSelect={(sectionKey) => {
                        window.location.href = route("faculty.dashboard.show", {
                            roomPath: room.room_path,
                            section: sectionKey,
                        });
                    }}
                />
            </div>

            {/* Sidebar Mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 flex md:hidden">
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <div className="relative z-50 w-64 shadow-lg bg-[hsl(142,34%,51%)]">
                        <FacultyRoomSidebar
                            room={room}
                            user={user}
                            active={activeSection || "dashboard"}
                            onSelect={(sectionKey) => {
                                window.location.href = route(
                                    "faculty.dashboard.show",
                                    {
                                        roomPath: room.room_path,
                                        section: sectionKey,
                                    }
                                );
                                setSidebarOpen(false);
                            }}
                        />
                    </div>
                </div>
            )}

            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Top Bar Mobile */}
                <div className="p-4 border-b md:hidden flex items-center justify-between shadow-sm bg-[hsl(142,34%,51%)]">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSidebarOpen(true)}
                        className="bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <h2 className="text-xl font-semibold text-white">
                        {room.room_name}
                    </h2>
                </div>

                <div className="p-4 md:p-6 w-full space-y-6">
                    <Head title={`${room.room_name} Dashboard`} />
                    <h1 className="text-2xl md:text-3xl font-bold">
                        {room.room_name} Dashboard
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {/* Total Computers */}
                        <Card className="w-full flex flex-col p-4 rounded-2xl shadow-lg hover:shadow-xl active:scale-[0.97] transition cursor-pointer bg-white">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex flex-col">
                                    <CardTitle className="text-lg font-semibold">
                                        Total Computers
                                    </CardTitle>
                                </div>
                                <Monitor className="w-8 h-8 text-[hsl(142,34%,45%)]" />
                            </div>
                            <CardContent className="flex-1 flex flex-col items-center justify-center">
                                <p className="text-3xl font-bold">
                                    {stats.computers.total || 0}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Total Mouse */}
                        <Card className="w-full flex flex-col p-4 rounded-2xl shadow-lg hover:shadow-xl active:scale-[0.97] transition cursor-pointer bg-white">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex flex-col">
                                    <CardTitle className="text-lg font-semibold">
                                        Total Mouse
                                    </CardTitle>
                                </div>
                                <Mouse className="w-8 h-8 text-[hsl(142,34%,45%)]" />
                            </div>
                            <CardContent className="flex-1 flex flex-col items-center justify-center">
                                <p className="text-3xl font-bold">
                                    {stats.peripherals.by_type?.mouse || 0}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Total Keyboards */}
                        <Card className="w-full flex flex-col p-4 rounded-2xl shadow-lg hover:shadow-xl active:scale-[0.97] transition cursor-pointer bg-white">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex flex-col">
                                    <CardTitle className="text-lg font-semibold">
                                        Total Keyboards
                                    </CardTitle>
                                </div>
                                <Keyboard className="w-8 h-8 text-[hsl(142,34%,45%)]" />
                            </div>
                            <CardContent className="flex-1 flex flex-col items-center justify-center">
                                <p className="text-3xl font-bold">
                                    {stats.peripherals.by_type?.keyboard || 0}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Total Equipment (Expandable) */}
                        <Card className="w-full flex flex-col p-4 rounded-2xl shadow-lg hover:shadow-xl transition cursor-pointer bg-white">
                            <div
                                className="flex flex-col flex-1"
                                onClick={() =>
                                    setEquipmentExpanded(!equipmentExpanded)
                                }
                            >
                                <div className="flex items-center justify-between mb-2 cursor-pointer">
                                    <div className="flex flex-col">
                                        <CardTitle className="text-lg font-semibold">
                                            Total Equipments
                                        </CardTitle>
                                    </div>
                                    <Boxes className="w-8 h-8 text-[hsl(142,34%,45%)]" />
                                </div>

                                {/* Centered count like other cards */}
                                <CardContent className="flex-1 flex items-center justify-center">
                                    <p className="text-3xl font-bold">
                                        {totalEquipment}
                                    </p>
                                </CardContent>

                                {/* Tap to see details */}
                                <span className="text-xs text-gray-500 mt-1 text-center">
                                    Tap to see details
                                </span>
                            </div>

                            {/* Expanded list */}
                            {equipmentExpanded && (
                                <CardContent className="flex flex-col mt-2 space-y-1 max-h-40 overflow-y-auto">
                                    {equipmentList.map((item) => (
                                        <div
                                            key={item.name}
                                            className="flex justify-between text-sm border-b border-gray-200 pb-1"
                                        >
                                            <span>{item.name}</span>
                                            <span>{item.count}</span>
                                        </div>
                                    ))}
                                </CardContent>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Reusable Bar Chart Card
function BarChartCard({ title, data, barFill, onClick, selected, reset }) {
    return (
        <Card className="w-full flex flex-col h-96">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="value"
                                fill={barFill}
                                onClick={(d) => onClick(d.name)}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-gray-500">
                        No data available
                    </p>
                )}
                {selected && (
                    <p className="mt-2 text-sm text-gray-700">
                        Showing condition for <b>{selected}</b>{" "}
                        <button
                            className="ml-2 text-blue-600 underline"
                            onClick={reset}
                        >
                            Reset
                        </button>
                    </p>
                )}
            </CardContent>
        </Card>
    );
}

// Reusable Pie Chart Card
function PieChartCard({ title, data, colors }) {
    return (
        <Card className="w-full flex flex-col h-96">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                {data.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius="70%"
                                label
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={colors[index % colors.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                ) : (
                    <p className="text-center text-gray-500">
                        No data available
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
