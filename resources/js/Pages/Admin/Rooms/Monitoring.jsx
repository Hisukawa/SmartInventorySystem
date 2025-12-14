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
import { X, Filter, Tally1Icon } from "lucide-react";
import axios from "axios";

export default function AdminDashboard({ children }) {
    const [rooms, setRooms] = useState([]);
    const [logs, setLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentLogPage, setCurrentLogPage] = useState(1);
    const [totalLogPages, setTotalLogPages] = useState(1);
    const [totalLogs, setTotalLogs] = useState(0);
    const perPage = 10;

    const [search, setSearch] = useState("");
    const [facultyOptions, setFacultyOptions] = useState([]);
    const [roomOptions, setRoomOptions] = useState([]);
    const [facultyId, setFacultyId] = useState("");
    const [roomId, setRoomId] = useState("");
    const [logDate, setLogDate] = useState("");
    const [showFilters, setShowFilters] = useState(false);

    const [currentTime, setCurrentTime] = useState(new Date());

    // Fetch rooms
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

    // Fetch logs
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
            setLogs(res.data.logs.data || []);
            setTotalLogPages(res.data.logs.last_page || 1);
            setTotalLogs(res.data.logs.total || 0);
            if (res.data.facultyOptions)
                setFacultyOptions(res.data.facultyOptions);
            if (res.data.roomOptions) setRoomOptions(res.data.roomOptions);
        } catch (err) {
            console.error("Failed to fetch logs:", err);
        }
    };

    // Auto-refresh rooms and logs every 5 seconds
    useEffect(() => {
        fetchRooms();
        const roomInterval = setInterval(fetchRooms, 5000);
        return () => clearInterval(roomInterval);
    }, [currentPage]);

    useEffect(() => {
        fetchLogs();
        const logInterval = setInterval(fetchLogs, 5000);
        return () => clearInterval(logInterval);
    }, [currentLogPage, search, facultyId, roomId, logDate]);

    // Current time update
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = currentTime.getHours() % 12 || 12;
    const minutes = String(currentTime.getMinutes()).padStart(2, "0");
    const seconds = String(currentTime.getSeconds()).padStart(2, "0");
    const ampm = currentTime.getHours() >= 12 ? "PM" : "AM";
    const handleGenerateReport = () => {
        if (logs.length === 0) {
            alert("No logs available to generate report.");
            return;
        }

        const printWindow = window.open("", "", "width=1000,height=800");

        const tableRows = logs
            .map((log, idx) => {
                const loginDate = log.created_at
                    ? new Date(log.created_at.replace(" ", "T")).toLocaleString(
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

                const logoutDate = log.logged_out_at
                    ? new Date(
                          log.logged_out_at.replace(" ", "T")
                      ).toLocaleString("en-PH", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                      })
                    : "—";

                return `
                <tr>
                    <td>${idx + 1}</td>
                    <td>${log.faculty?.name ?? "N/A"}</td>
                    <td>${log.faculty?.role ?? "N/A"}</td>
                    <td>${loginDate}</td>
                    <td>${logoutDate}</td>
                    <td>${log.room?.room_number ?? "N/A"}</td>
                </tr>
            `;
            })
            .join("");

        printWindow.document.write(`
        <html>
            <head>
                <title>Faculty Logs Report</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .header { text-align: center; margin-bottom: 20px; }
                    .logo { width: 80px; height: 80px; object-fit: contain; margin-bottom: 10px; }
                    h1 { font-size: 24px; margin: 0; color: #2e7d32; }
                    p { text-align: center; font-size: 14px; margin: 5px 0; color: #555; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 13px; }
                    th { background-color: #2e7d32; color: white; }
                    tr:nth-child(even) { background-color: #f9f9f9; }
                    .summary { margin-top: 20px; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="header">
                    <img src="/logo.png" class="logo" alt="School Logo" />
                    <h1>Smart Inventory Management System</h1>
                    <p>Faculty Logs Report</p>
                    <p>Generated on: ${new Date().toLocaleString()}</p>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Role</th>
                            <th>Login Date</th>
                            <th>Logout Date</th>
                            <th>Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${tableRows}
                    </tbody>
                </table>

                <div class="summary">
                    <strong>Total Logs:</strong> ${logs.length}
                </div>
            </body>
        </html>
    `);

        printWindow.document.close();
        printWindow.print();
    };

    return (
        <SidebarProvider>
            <Head>
                <title>Dashboard</title>
            </Head>
            <AppSidebar />
            <SidebarInset>
                {/* Header */}
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

                {/* Main content */}
                <main className="w-full px-6 py-4">
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-4">
                            Room Monitoring
                        </h1>

                        {/* Current Date & Time */}
                        <div className="mb-6">
                            <span className="text-gray-800 text-3xl md:text-4xl font-bold">
                                {currentTime.toLocaleDateString("en-PH", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}{" "}
                                at {hours}:{minutes}:{seconds} {ampm}
                            </span>
                        </div>

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
                                                        ? "bg-[#59AC77] border border-green-700 text-white"
                                                        : "bg-[#59AC77] border border-gray-300 text-gray-900"
                                                }`}
                                >
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
                                    <CardContent>
                                        <div className="flex items-center space-x-4">
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
                                                        ? `${room.last_scanned_user.name} (${room.last_scanned_user.role})`
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
                                                              { hour12: true }
                                                          )
                                                        : "Not yet scanned"}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Search + Filters */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between w-full mb-4">
                                <div className="flex gap-2">
                                    <Button
                                        className="flex items-center gap-2 bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                                        onClick={() =>
                                            setShowFilters(!showFilters)
                                        }
                                    >
                                        <Filter className="w-4 h-4" />
                                        {showFilters
                                            ? "Hide Filters"
                                            : "Show Filters"}
                                    </Button>

                                    <Button
                                        className="bg-[hsl(142,34%,51%)] text-white border-none hover:bg-[hsl(142,34%,45%)]"
                                        onClick={handleGenerateReport}
                                    >
                                        Generate Report
                                    </Button>
                                </div>

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

                            {/* Filter Options */}
                            {showFilters && (
                                <div className="flex flex-wrap gap-5 items-end">
                                    <div className="flex flex-col">
                                        <label className="text-sm text-gray-600 mb-1">
                                            Users
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

                            {/* Users Logs Table */}
                            <Card className="shadow-md rounded-2xl">
                                <CardHeader>
                                    <CardTitle>Users Logs History</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableCaption>
                                            A list of recent faculty room logs.
                                        </TableCaption>
                                        <TableHeader>
                                            <TableRow className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)] h-10">
                                                <TableHead>#</TableHead>
                                                <TableHead>User</TableHead>
                                                <TableHead>Role</TableHead>
                                                <TableHead>
                                                    Login Date
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
                                                        colSpan={6}
                                                        className="text-center text-gray-500"
                                                    >
                                                        No logs found.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            {logs.map((log, idx) => {
                                                const loginDate = log.created_at
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
                                                    log.logged_out_at
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
                                                        : "";
                                                return (
                                                    <TableRow key={log.id}>
                                                        <TableCell>
                                                            {idx +
                                                                1 +
                                                                (currentLogPage -
                                                                    1) *
                                                                    perPage}
                                                        </TableCell>
                                                        <TableCell>
                                                            {log.faculty
                                                                ?.name ?? "N/A"}
                                                        </TableCell>
                                                        <TableCell>
                                                            {log.faculty
                                                                ?.role ?? "N/A"}
                                                        </TableCell>
                                                        <TableCell>
                                                            {loginDate}
                                                        </TableCell>
                                                        <TableCell>
                                                            {logoutDate}
                                                        </TableCell>
                                                        <TableCell>
                                                            {log.room
                                                                ?.room_number ??
                                                                "N/A"}
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>

                                    {/* Pagination */}
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-sm text-muted-foreground">
                                            Showing{" "}
                                            {logs.length === 0
                                                ? 0
                                                : (currentLogPage - 1) *
                                                      perPage +
                                                  1}{" "}
                                            –{" "}
                                            {Math.min(
                                                currentLogPage * perPage,
                                                totalLogs
                                            )}{" "}
                                            of {totalLogs} Logs
                                        </span>

                                        <div className="flex gap-2 items-center">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                disabled={currentLogPage === 1}
                                                onClick={() =>
                                                    setCurrentLogPage(
                                                        (prev) => prev - 1
                                                    )
                                                }
                                            >
                                                Previous
                                            </Button>

                                            {Array.from(
                                                { length: totalLogPages },
                                                (_, idx) => idx + 1
                                            )
                                                .filter((page) => {
                                                    if (
                                                        page === 1 ||
                                                        page === totalLogPages
                                                    )
                                                        return true;
                                                    return (
                                                        page >=
                                                            currentLogPage -
                                                                2 &&
                                                        page <=
                                                            currentLogPage + 2
                                                    );
                                                })
                                                .map((page, idx, arr) => (
                                                    <React.Fragment key={page}>
                                                        {idx > 0 &&
                                                            arr[idx] -
                                                                arr[idx - 1] >
                                                                1 && (
                                                                <span className="px-1">
                                                                    ...
                                                                </span>
                                                            )}
                                                        <Button
                                                            size="sm"
                                                            variant={
                                                                currentLogPage ===
                                                                page
                                                                    ? "default"
                                                                    : "outline"
                                                            }
                                                            onClick={() =>
                                                                setCurrentLogPage(
                                                                    page
                                                                )
                                                            }
                                                        >
                                                            {page}
                                                        </Button>
                                                    </React.Fragment>
                                                ))}

                                            <Button
                                                size="sm"
                                                variant="outline"
                                                disabled={
                                                    currentLogPage ===
                                                    totalLogPages
                                                }
                                                onClick={() =>
                                                    setCurrentLogPage(
                                                        (prev) => prev + 1
                                                    )
                                                }
                                            >
                                                Next
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
