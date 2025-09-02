import React, { useState, useEffect } from "react";
import axios from "axios";
import { Head, Link } from "@inertiajs/react";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";

import FacultyDashboard from "@/Pages/Faculty/FacultyDashboard";

export default function FacultyRoomDashboard() {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);

    // Fetch rooms from API
    const fetchRooms = async () => {
        try {
            const res = await axios.get("/faculty/rooms-status");
            setRooms(res.data.data);
        } catch (err) {
            console.error("Failed to fetch rooms:", err);
        }
    };

    // Fetch rooms initially and every 5 seconds
    useEffect(() => {
        fetchRooms();
        const interval = setInterval(fetchRooms, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleRoomClick = (room) => {
        if (selectedRoom && selectedRoom.id === room.id) {
            setSelectedRoom(null);
        } else {
            setSelectedRoom(room);
        }
    };

    const FacultyTable = ({ room }) => (
        <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md w-full md:max-w-xl md:mx-auto">
            <h2 className="text-lg md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                Faculty in Room {room.room_number}
            </h2>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                <Table className="w-full text-sm">
                    <TableHeader className="bg-gray-100 dark:bg-gray-700">
                        <TableRow>
                            <TableHead className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                                Faculty Name
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {room.faculties && room.faculties.length > 0 ? (
                            room.faculties.map((faculty) => (
                                <TableRow
                                    key={faculty.id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <TableCell className="px-4 py-2 whitespace-nowrap text-gray-900 dark:text-gray-100">
                                        {faculty.name}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={1}
                                    className="px-4 py-3 text-center text-gray-500 dark:text-gray-400"
                                >
                                    No faculty assigned to this room.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );

    return (
        <>
            <Head>
                <title>Faculty Rooms</title>
            </Head>

            <div className="mb-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <Link
                                href="/faculty/dashboard"
                                className="font-semibold text-foreground dark:text-gray-200"
                            >
                                Dashboard
                            </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link
                                href="/faculty/faculty-room-dashboard"
                                className="font-semibold text-foreground dark:text-gray-200"
                            >
                                Rooms
                            </Link>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                {rooms.map((room) => (
                    <div key={room.id} className="w-full">
                        <Card
                            onClick={() => handleRoomClick(room)}
                            className={`cursor-pointer rounded-2xl transition-all duration-200 ease-in-out shadow-md 
                                hover:scale-[1.02] hover:shadow-lg
                                ${room.is_active
                                    ? "bg-green-600 border border-green-700 text-white"
                                    : "bg-white border border-gray-300 text-gray-900"
                                }`}
                        >
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle
                                    className={`text-lg md:text-xl font-semibold ${room.is_active ? "text-white" : "text-gray-900"}`}
                                >
                                    {room.room_number}
                                </CardTitle>
                                <Badge
                                    className={`px-3 py-1 text-xs font-medium rounded-full ${room.is_active ? "bg-white text-green-700" : "bg-gray-500 text-white"}`}
                                >
                                    {room.is_active ? "Active" : "Inactive"}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <CardDescription
                                    className={`text-sm ${room.is_active ? "text-green-100" : "text-gray-700"}`}
                                >
                                    Tap to view faculty details
                                </CardDescription>
                            </CardContent>
                        </Card>

                        {/* Mobile table */}
                        {selectedRoom && selectedRoom.id === room.id && (
                            <div className="block md:hidden">
                                <FacultyTable room={selectedRoom} />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Desktop table */}
            {selectedRoom && (
                <div className="hidden md:block">
                    <FacultyTable room={selectedRoom} />
                </div>
            )}
        </>
    );
}

FacultyRoomDashboard.layout = page => <FacultyDashboard>{page}</FacultyDashboard>;
