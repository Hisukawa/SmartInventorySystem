import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Head } from "@inertiajs/react";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import Notification from "@/Components/AdminComponents/Notification";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { X, Filter } from "lucide-react";
import axios from "axios";

export default function AdminDashboard({ children }) {
    const [rooms, setRooms] = useState([]);
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentLogPage, setCurrentLogPage] = useState(1);
    const perPage = 10;
    const [search, setSearch] = useState("");

    const [activeFilters, setActiveFilters] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [logDate, setLogDate] = useState("");
    const [facultyOptions, setFacultyOptions] = useState([]);
    const [roomOptions, setRoomOptions] = useState([]);
    const [facultyId, setFacultyId] = useState("");
    const [roomId, setRoomId] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const [faculties, setFaculties] = useState([]);

    // Fetch rooms from API
    const fetchRooms = async () => {
        try {
            const res = await axios.get(
                `/api/admin/rooms-status?page=${currentPage}&per_page=${perPage}`
            );
            setRooms(res.data.data);
            setTotalPages(res.data.meta.total_pages);
        } catch (err) {
            console.error("Failed to fetch rooms:", err);
        }
    };
    const fetchLogs = async () => {
        try {
            const res = await axios.get(`/admin/faculty-logs`, {
                params: {
                    page: currentLogPage,
                    search,
                    faculty_id: facultyId,
                    room_id: roomId,
                    log_date: logDate,
                },
            });

            // Backend now returns faculty list (with room_statuses)
            setLogs(res.data.logs.data || []);

            // Pagination
            setTotalPages(res.data.logs.last_page || 1);

            // Dropdowns
            if (res.data.facultyOptions)
                setFacultyOptions(res.data.facultyOptions);
            if (res.data.roomOptions) setRoomOptions(res.data.roomOptions);
        } catch (err) {
            console.error("Failed to fetch logs:", err);
        }
    };

    // Initial fetch and auto-refresh every 5 seconds
    // ✅ Unified data fetch and auto-refresh logic
    useEffect(() => {
        fetchRooms();
        fetchLogs();

        const interval = setInterval(() => {
            fetchRooms();
            fetchLogs();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentLogPage, search, facultyId, roomId, logDate]);

    return (
        <SidebarProvider>
            <Head>
                <title>Dashboard</title>
            </Head>
            <AppSidebar />
            <SidebarInset>
                {/* Fixed content header inside the main area */}
                <header className="sticky top-0 z-20 bg-white border-b px-6 py-3">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger />
                        <Separator
                            orientation="vertical"
                            className="h-6 mx-3"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href="/admin/monitoring"
                                        aria-current="page"
                                        className="font-semibold text-foreground"
                                    >
                                        Monitoring
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex-1" />
                        <Notification />
                    </div>
                </header>

                {/* Content */}
                <main className="w-full px-6 py-4">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">
                            Room Monitoring
                        </h1>

                        {/* Room Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
                            {rooms.length === 0 && (
                                <p className="col-span-full text-center text-gray-500">
                                    No rooms found.
                                </p>
                            )}

                            {rooms.map((room) => (
                                <Card
                                    key={room.id}
                                    className={`rounded-2xl transition-all duration-200 ease-in-out shadow-md
                                                hover:scale-[1.02] hover:shadow-lg
                                                ${
                                                    room.is_active
                                                        ? "bg-[#59AC77]  border border-green-700 text-white"
                                                        : "bg-[#59AC77]  border border-gray-300 text-gray-900"
                                                }`}
                                >
                                    {/* Header: Room Name + Status */}
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle
                                            className={`text-lg md:text-xl font-semibold ${
                                                room.is_active
                                                    ? "text-white"
                                                    : "text-gray-900"
                                            }`}
                                        >
                                            {room.name}
                                        </CardTitle>
                                        <Badge
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                                                room.is_active
                                                    ? "bg-white text-green-700"
                                                    : "bg-gray-500 text-white"
                                            }`}
                                        >
                                            {room.is_active
                                                ? "Active"
                                                : "Inactive"}
                                        </Badge>
                                    </CardHeader>

                                    {/* Content: Faculty Info */}
                                    <CardContent>
                                        <div className="flex items-center space-x-4">
                                            {/* Faculty Photo */}
                                            {room.is_active &&
                                            room.last_scanned_user?.photo ? (
                                                <img
                                                    src={
                                                        room.last_scanned_user
                                                            .photo
                                                    }
                                                    alt={
                                                        room.last_scanned_user
                                                            .name
                                                    }
                                                    className="w-28 h-28 rounded-full object-cover border-4 border-green-500 shadow-md"
                                                />
                                            ) : (
                                                <div className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm border-4 border-gray-300 shadow-md">
                                                    No Photo
                                                </div>
                                            )}

                                            {/* Faculty Info */}
                                            <div className="flex flex-col">
                                                <span
                                                    className={`font-medium ${
                                                        room.is_active
                                                            ? "text-white"
                                                            : "text-gray-900"
                                                    }`}
                                                >
                                                    {room.is_active &&
                                                    room.last_scanned_user
                                                        ? room.last_scanned_user
                                                              .name
                                                        : "No Faculty"}
                                                </span>
                                                <span
                                                    className={`text-xs ${
                                                        room.is_active
                                                            ? "text-green-100"
                                                            : "text-gray-600"
                                                    }`}
                                                >
                                                    {room.is_active &&
                                                    room.last_scanned_at
                                                        ? new Date(
                                                              room.last_scanned_at
                                                          ).toLocaleString(
                                                              "en-PH",
                                                              {
                                                                  timeZone:
                                                                      "Asia/Manila",
                                                                  year: "numeric",
                                                                  month: "numeric",
                                                                  day: "numeric",
                                                                  hour: "numeric",
                                                                  minute: "2-digit",
                                                                  hour12: true,
                                                              }
                                                          )
                                                        : "Not yet scanned"}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* 🔍 Search + Filters */}
                        <div className="space-y-4">
                            {/* 🔍 Search + Filter Toggle */}
                            {/* 🔍 Search + Filter Row */}
                            <div className="flex items-center justify-between w-full mb-4">
                                {/* 🌿 Filter Button (left) */}
                                <Button
                                    className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    <Filter className="w-4 h-4" />
                                    {showFilters
                                        ? "Hide Filters"
                                        : "Show Filters"}
                                </Button>

                                {/* 🔍 Search Bar + Button (right) */}
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="text"
                                        placeholder="Search by faculty or room..."
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        className="w-64"
                                    />
                                    <Button
                                        onClick={fetchLogs}
                                        className="bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                                    >
                                        Search
                                    </Button>
                                </div>
                            </div>

                            {/* 🎛️ Filter Options */}
                            {showFilters && (
                                <div className="flex flex-wrap gap-5 items-end">
                                    {/* Faculty Filter */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600 mb-1">
                                            Faculty
                                        </label>
                                        <select
                                            value={facultyId}
                                            onChange={(e) =>
                                                setFacultyId(e.target.value)
                                            }
                                            className="h-9 w-44 px-2 py-1 text-sm border rounded-md focus:ring-2 focus:ring-[hsl(142,34%,51%)] focus:outline-none"
                                        >
                                            <option value="">All</option>
                                            {facultyOptions.map((f) => (
                                                <option key={f.id} value={f.id}>
                                                    {f.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Room Filter */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600 mb-1">
                                            Room
                                        </label>
                                        <select
                                            value={roomId}
                                            onChange={(e) =>
                                                setRoomId(e.target.value)
                                            }
                                            className="h-9 w-44 px-2 py-1 text-sm border rounded-md focus:ring-2 focus:ring-[hsl(142,34%,51%)] focus:outline-none"
                                        >
                                            <option value="">All</option>
                                            {roomOptions.map((r) => (
                                                <option key={r.id} value={r.id}>
                                                    {r.room_number}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Date Filter */}
                                    {/* Date Filter */}
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600 mb-1">
                                            Login Date
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="date"
                                                value={logDate}
                                                onChange={(e) =>
                                                    setLogDate(e.target.value)
                                                }
                                                className="h-9 w-44 text-sm border rounded-md focus:ring-2 focus:ring-[hsl(142,34%,51%)] focus:outline-none"
                                            />
                                            {logDate && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        setLogDate("")
                                                    }
                                                    className="text-xs border-gray-300"
                                                >
                                                    Clear
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 📋 Faculty Logs Table */}
                            <Card className="shadow-md rounded-2xl">
                                <CardHeader>
                                    <CardTitle>Faculty Logs History</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableCaption>
                                            A list of recent faculty room logs.
                                        </TableCaption>
                                        <TableHeader>
                                            <TableRow className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10">
                                                <TableHead>#</TableHead>
                                                <TableHead>Faculty</TableHead>
                                                <TableHead>
                                                    LogIn Date
                                                </TableHead>
                                                <TableHead>
                                                    Logout Date
                                                </TableHead>
                                                <TableHead>Room</TableHead>
                                            </TableRow>
                                        </TableHeader>

                                        <TableBody>
                                            {logs.length === 0 && (
                                                <TableRow>
                                                    <TableCell
                                                        colSpan={5}
                                                        className="text-center text-gray-500"
                                                    >
                                                        No logs found.
                                                    </TableCell>
                                                </TableRow>
                                            )}

                                            {logs.map((faculty, idx) =>
                                                faculty.room_statuses &&
                                                faculty.room_statuses.length >
                                                    0 ? (
                                                    faculty.room_statuses
                                                        .slice() // copy array
                                                        .sort(
                                                            (a, b) =>
                                                                new Date(
                                                                    b.created_at
                                                                ) -
                                                                new Date(
                                                                    a.created_at
                                                                )
                                                        )
                                                        .map((log, subIdx) => {
                                                            // ✅ Safe date parsing (treat backend date as local already)
                                                            const loginDate =
                                                                log.created_at
                                                                    ? new Date(
                                                                          log.created_at.replace(
                                                                              " ",
                                                                              "T"
                                                                          )
                                                                      ).toLocaleString(
                                                                          "en-PH",
                                                                          {
                                                                              year: "numeric",
                                                                              month: "numeric",
                                                                              day: "numeric",
                                                                              hour: "numeric",
                                                                              minute: "2-digit",
                                                                              hour12: true,
                                                                          }
                                                                      )
                                                                    : "—";

                                                            const logoutDate =
                                                                log.logged_out_at &&
                                                                log.logged_out_at !==
                                                                    null
                                                                    ? new Date(
                                                                          log.logged_out_at.replace(
                                                                              " ",
                                                                              "T"
                                                                          )
                                                                      ).toLocaleString(
                                                                          "en-PH",
                                                                          {
                                                                              year: "numeric",
                                                                              month: "numeric",
                                                                              day: "numeric",
                                                                              hour: "numeric",
                                                                              minute: "2-digit",
                                                                              hour12: true,
                                                                          }
                                                                      )
                                                                    : ""; // 👈 Leave blank if not logged out

                                                            return (
                                                                <TableRow
                                                                    key={`${faculty.id}-${log.id}`}
                                                                >
                                                                    <TableCell>
                                                                        {idx +
                                                                            1 +
                                                                            (currentLogPage -
                                                                                1) *
                                                                                perPage}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {
                                                                            faculty.name
                                                                        }
                                                                    </TableCell>

                                                                    {/* ✅ Login Date (correct local time) */}
                                                                    <TableCell>
                                                                        {
                                                                            loginDate
                                                                        }
                                                                    </TableCell>

                                                                    {/* ✅ Logout Date (blank if still active) */}
                                                                    <TableCell>
                                                                        {
                                                                            logoutDate
                                                                        }
                                                                    </TableCell>

                                                                    <TableCell>
                                                                        {log
                                                                            .room
                                                                            ?.room_number ??
                                                                            "N/A"}
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        })
                                                ) : (
                                                    <TableRow
                                                        key={`no-log-${faculty.id}`}
                                                    >
                                                        <TableCell>
                                                            {idx +
                                                                1 +
                                                                (currentLogPage -
                                                                    1) *
                                                                    perPage}
                                                        </TableCell>
                                                        <TableCell>
                                                            {faculty.name}
                                                        </TableCell>
                                                        <TableCell
                                                            colSpan={3}
                                                            className="text-center text-gray-400"
                                                        >
                                                            No log recorded
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
