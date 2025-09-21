import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import axios from "axios";
import Swal from "sweetalert2";

import { Separator } from "@/components/ui/separator";
import Notification from "@/Components/AdminComponents/Notification";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import TopNavBar from "@/Components/AdminComponents/TopNavBar";

export default function RoomHistory() {
    const { histories: initialHistories } = usePage().props;

    // separate paginated data and links
    const [histories, setHistories] = useState(initialHistories.data || []);
    const [pagination, setPagination] = useState(initialHistories);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`/room-history/${id}`);
                    setHistories(histories.filter((h) => h.id !== id));

                    Swal.fire({
                        title: "Deleted!",
                        text: "History has been deleted.",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false,
                    });
                } catch (error) {
                    console.error("Error deleting history:", error);
                    Swal.fire("Error!", "Failed to delete history.", "error");
                }
            }
        });
    };

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="#">
                                    Reports
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                                <BreadcrumbLink
                                    href="#"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    Room History
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="flex-1" />
                    <Notification />
                </header>

                <div className="p-6 max-w-7xl mx-auto">
                    <TopNavBar />
                    <Head title="Room Histories" />
                    <h1 className="text-2xl text-center font-bold mt-5 mb-4">
                        Room Activity History
                    </h1>

                    {histories.length === 0 ? (
                        <p className="text-center mt-10">
                            No room activity found.
                        </p>
                    ) : (
                        <div className="overflow-x-auto bg-white shadow rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                            #
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                            User Name
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                            Role
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                            Action
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                            Old Value
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                            New Value
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                            Date & Time
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                            Manage
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {histories.map((history, index) => (
                                        <tr key={history.id}>
                                            <td className="px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-2">
                                                {history.user_name}
                                            </td>
                                            <td className="px-4 py-2">
                                                {history.role}
                                            </td>
                                            <td className="px-4 py-2">
                                                {history.action}
                                            </td>
                                            <td className="px-4 py-2">
                                                {history.old_value || "-"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {history.new_value || "-"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {new Date(
                                                    history.created_at
                                                ).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-2">
                                                <button
                                                    className="px-2 py-1 text-sm text-red-600 hover:underline"
                                                    onClick={() =>
                                                        handleDelete(history.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* ✅ Pagination */}
                            {pagination.links && (
                                <div className="flex justify-center mt-4 space-x-2 mb-3">
                                    {pagination.links.map((link, i) => (
                                        <button
                                            key={i}
                                            disabled={!link.url}
                                            className={`px-3 py-1 rounded ${
                                                link.active
                                                    ? "bg-blue-500 text-white"
                                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            }`}
                                            onClick={() => {
                                                if (link.url) {
                                                    window.location.href =
                                                        link.url;
                                                }
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
