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

                    {/* Total Cards Section */}
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
                            <CardContent className="flex-1 flex items-center justify-center">
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
                            <CardContent className="flex-1 flex items-center justify-center">
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
                            <CardContent className="flex-1 flex items-center justify-center">
                                <p className="text-3xl font-bold">
                                    {stats.peripherals.by_type?.keyboard || 0}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Total Equipment */}
                        <Card className="w-full p-4 rounded-2xl shadow-lg hover:shadow-xl transition bg-white">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex flex-col">
                                    <CardTitle className="text-lg font-semibold">
                                        Total Equipments
                                    </CardTitle>
                                </div>
                                <Boxes className="w-8 h-8 text-[hsl(142,34%,45%)]" />
                            </div>
                            <CardContent className="flex-1 flex items-center justify-center">
                                <p className="text-3xl font-bold mb-2">
                                    {stats.equipments.total || 0}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Equipment Count Chart (Best for category counts) */}
                    <div
                        className="
    w-full 
    mt-6 
    bg-white 
    p-4 
    rounded-2xl 
    shadow-md 
    max-w-2xl   /* Limits width on web */
    mx-auto     /* Centers chart */
"
                    >
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={Object.entries(stats.equipments.by_name)
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0, 5)
                                    .map(([name, count]) => ({ name, count }))}
                                layout="vertical"
                                margin={{
                                    top: 10,
                                    right: 20,
                                    left: 0,
                                    bottom: 10,
                                }}
                            >
                                <defs>
                                    <linearGradient
                                        id="greenGrad"
                                        x1="0"
                                        y1="0"
                                        x2="1"
                                        y2="0"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor="#4CAF50"
                                            stopOpacity={0.9}
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor="#A5D6A7"
                                            stopOpacity={0.7}
                                        />
                                    </linearGradient>
                                </defs>

                                <XAxis type="number" hide />
                                <YAxis
                                    type="category"
                                    dataKey="name"
                                    width={120}
                                    tick={{ fontSize: 12 }}
                                />

                                <Tooltip formatter={(v) => [v, "Count"]} />

                                <Bar
                                    dataKey="count"
                                    radius={[8, 8, 8, 8]}
                                    fill="url(#greenGrad)"
                                    barSize={20}
                                />
                            </BarChart>
                        </ResponsiveContainer>
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
