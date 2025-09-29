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
} from "@/components/ui/breadcrumb";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/Components/AdminComponents/app-sidebar";
import TopNavBar from "@/Components/AdminComponents/TopNavBar";

export default function EquipmentHistoryIndex() {
    const { histories: initialHistories } = usePage().props;
    const [histories, setHistories] = useState(initialHistories || []);

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
                    await axios.delete(`/equipment-history/${id}`);
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
                                        href="/equipment-history"
                                        aria-current="page"
                                        className="font-semibold text-foreground"
                                    >
                                        Equipment History
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <div className="flex-1" />
                        <Notification />
                    </div>
                </header>

                <div className="p-6 max-w-7xl mx-auto">
                    <TopNavBar />
                    <Head title="Equipment History" />
                    <h1 className="text-2xl text-center font-bold mt-5 mb-4">
                        Equipment History
                    </h1>

                    {histories.length === 0 ? (
                        <p className="text-center mt-10">
                            No equipment history found.
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
                                            Equipment Name
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                            Action
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                            Component
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                            Old Value
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                            New Value
                                        </th>
                                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                                            Room Number
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
                                    {histories.map((h, index) => (
                                        <tr key={h.id}>
                                            <td className="px-4 py-2">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-2">
                                                {h.user?.name || "N/A"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {h.equipment_name}
                                            </td>
                                            <td className="px-4 py-2">
                                                {h.action}
                                            </td>
                                            <td className="px-4 py-2">
                                                {h.component}
                                            </td>
                                            <td className="px-4 py-2">
                                                {h.old_value || "-"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {h.new_value || "-"}
                                            </td>
                                            <td className="px-4 py-2">
                                                Room{" "}
                                                {h.room?.room_number || "N/A"}
                                            </td>
                                            <td className="px-4 py-2">
                                                {new Date(
                                                    h.created_at
                                                ).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-2">
                                                {h.action !== "Deleted" && (
                                                    <button
                                                        className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
                                                        onClick={() =>
                                                            handleDelete(h.id)
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
