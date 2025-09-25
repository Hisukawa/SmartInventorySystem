import React, { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Head } from "@inertiajs/react";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import Notification from "@/Components/AdminComponents/Notification";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
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

import axios from "axios";

export default function AdminDashboard({ children }) {
    const [rooms, setRooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 10;

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

    // Initial fetch and auto-refresh every 5 seconds
    useEffect(() => {
        fetchRooms();
        const interval = setInterval(fetchRooms, 5000);
        return () => clearInterval(interval);
    }, [currentPage]);

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
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
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
              ${room.is_active
                ? "bg-[#59AC77]  border border-green-700 text-white"
                : "bg-[#59AC77]  border border-gray-300 text-gray-900"
              }`}
          >
            {/* Header: Room Name + Status */}
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle
                className={`text-lg md:text-xl font-semibold ${
                  room.is_active ? "text-white" : "text-gray-900"
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
                {room.is_active ? "Active" : "Inactive"}
              </Badge>
            </CardHeader>

      {/* Content: Faculty Info */}
      <CardContent>
        <div className="flex items-center space-x-4">
          {/* Faculty Photo */}
          {room.is_active && room.last_scanned_user?.photo ? (
            <img
              src={room.last_scanned_user.photo}
              alt={room.last_scanned_user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-green-500"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm border-2 border-gray-300">
              No Photo
            </div>
          )}

          {/* Faculty Info */}
          <div className="flex flex-col">
            <span
              className={`font-medium ${
                room.is_active ? "text-white" : "text-gray-900"
              }`}
            >
              {room.is_active && room.last_scanned_user
                ? room.last_scanned_user.name
                : "No Faculty"}
            </span>
            <span
              className={`text-xs ${
                room.is_active ? "text-green-100" : "text-gray-600"
              }`}
            >
              {room.is_active && room.last_scanned_at
                ? new Date(room.last_scanned_at).toLocaleString()
                : "Not yet scanned"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  ))}
</div>




                        {/* Pagination */}
                        
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
