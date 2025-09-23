import React, { useState, useEffect } from "react";
import axios from "axios";
import { Head, Link, usePage } from "@inertiajs/react";
import FacultyLayout from "@/Layouts/FacultyLayout";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";

import FacultyDashboard from "@/Pages/Faculty/FacultyDashboard";

export default function FacultyRoomDashboard() {
    const { rooms: initialRooms } = usePage().props;
    const [rooms, setRooms] = useState(Array.isArray(initialRooms) ? initialRooms : []);

    // auto-refresh every 5s
  useEffect(() => {
    const interval = setInterval(async () => {
        try {
            const res = await axios.get("/faculty/rooms-status");

            if (res.data && Array.isArray(res.data.rooms)) {
                setRooms(res.data.rooms);
            } else {
                console.warn("Invalid rooms data:", res.data);
                // don't reset, just keep old state
            }
        } catch (err) {
            console.error("Failed to fetch rooms:", err);
            // ❌ don't clear rooms, just keep last known rooms
        }
    }, 5000);
    return () => clearInterval(interval);
}, []);

    return (
        <>
            <Head>
                <title>Faculty Rooms</title>
            </Head>

            <div className="mb-6">
               <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                    <Link href={route("faculty.dashboard")} className="font-semibold">
                        Dashboard
                    </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                    <Link href={route("faculty.rooms.dashboard")} className="font-semibold">
                        Rooms
                    </Link>
                    </BreadcrumbItem>
                </BreadcrumbList>
                </Breadcrumb>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
                {Array.isArray(rooms) && rooms.length > 0 ? (
                  rooms.map((room) => (
                        <Card
                            key={room.id}
                            className={`rounded-2xl transition-all duration-200 ease-in-out shadow-md 
                                hover:scale-[1.02] hover:shadow-lg
                                ${room.is_active
                                    ? "bg-green-600 border border-green-700 text-white"
                                    : "bg-white border border-gray-300 text-gray-900"
                                }`}
                        >
                            {/* Room Number + Status */}
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

                            {/* Faculty Info Row */}
                            <CardContent>
                                <div className="flex items-center space-x-4">
                                    {/* Photo */}
                                {/* Photo */}
                                        {room.faculties && room.faculties.length > 0 && room.faculties[0].photo ? (
                                            <img
                                                src={`/storage/${room.faculties[0].photo}`}
                                                alt={room.faculties[0].name}
                                                className="w-20 h-20 rounded-full object-cover border-2 border-green-500"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                                                No Photo
                                            </div>
                                        )}


                                    {/* Name + Scanned At */}
                                    <div className="flex flex-col">
                                        <span className={`font-medium ${room.is_active ? "text-white" : "text-gray-900"}`}>
                                            {room.faculties && room.faculties.length > 0
                                                ? room.faculties[0].name
                                                : "No faculty"}
                                        </span>
                                        <span className={`text-xs ${room.is_active ? "text-green-100" : "text-gray-600"}`}>
                                            {room.scanned_at
                                                ? new Date(room.scanned_at).toLocaleString()
                                                : "Not yet scanned"}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))

                ) : (
                    <p className="text-gray-500 dark:text-gray-400 col-span-full text-center">
                        No rooms available.
                    </p>
                )}
            </div>
        </>
    );
}

FacultyRoomDashboard.layout = (page) => <FacultyLayout>{page}</FacultyLayout>;