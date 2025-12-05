// resources/js/Pages/Equipments/EquipmentHistoryIndex.jsx

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

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 10;

    const indexOfLast = currentPage * ITEMS_PER_PAGE;
    const indexOfFirst = indexOfLast - ITEMS_PER_PAGE;
    const currentData = histories.slice(indexOfFirst, indexOfLast);

    const totalPages = Math.ceil(histories.length / ITEMS_PER_PAGE);

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

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
                    const updated = histories.filter((h) => h.id !== id);
                    setHistories(updated);

                    if (updated.length <= indexOfFirst && currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                    }

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
                <header className="sticky top-0 z-20 bg-white border-b px-4 md:px-6 py-3">
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

                <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
                    {/* Sticky TopNavBar */}
                    <div className="sticky top-[64px] z-20 bg-white shadow-sm">
                        <TopNavBar />
                    </div>

                    <Head title="Equipment History" />
                    <h1 className="text-xl md:text-2xl text-center font-bold mt-5 mb-4">
                        Equipment History
                    </h1>

                    {histories.length === 0 ? (
                        <p className="text-center mt-10">
                            No equipment history found.
                        </p>
                    ) : (
                        <>
                            {/* Table */}
                            <div className="overflow-x-auto bg-white shadow rounded-lg">
                                <table className="min-w-full table-auto text-center">
                                    <thead>
                                        <tr className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]">
                                            <th className="px-5 py-1">#</th>
                                            <th className="px-5 py-1">
                                                User Name
                                            </th>
                                            <th className="px-5 py-1">
                                                Equipment Name
                                            </th>
                                            <th className="px-5 py-1">
                                                Action
                                            </th>
                                            <th className="px-5 py-1">
                                                Component
                                            </th>
                                            <th className="px-5 py-1">
                                                Old Value
                                            </th>
                                            <th className="px-5 py-1">
                                                New Value
                                            </th>
                                            <th className="px-5 py-1">
                                                Room Number
                                            </th>
                                            <th className="px-5 py-1">
                                                Date & Time
                                            </th>
                                            <th className="px-5 py-1">
                                                Manage
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentData.map((h, index) => (
                                            <tr
                                                key={h.id}
                                                className="hover:shadow-sm transition-all duration-150"
                                            >
                                                <td className="px-5 py-2 align-middle">
                                                    {(currentPage - 1) *
                                                        ITEMS_PER_PAGE +
                                                        index +
                                                        1}
                                                </td>
                                                <td className="px-5 py-2 align-middle">
                                                    {h.user?.name || "N/A"}
                                                </td>
                                                <td className="px-5 py-2 align-middle">
                                                    {h.equipment_name}
                                                </td>
                                                <td className="px-5 py-2 align-middle">
                                                    {h.action}
                                                </td>
                                                <td className="px-5 py-2 align-middle">
                                                    {h.component || "-"}
                                                </td>
                                                <td className="px-5 py-2 align-middle">
                                                    {h.old_value || "-"}
                                                </td>
                                                <td className="px-5 py-2 align-middle">
                                                    {h.new_value || "-"}
                                                </td>
                                                <td className="px-5 py-2 align-middle">
                                                    Room{" "}
                                                    {h.room?.room_number ||
                                                        "N/A"}
                                                </td>
                                                <td className="px-5 py-2 align-middle">
                                                    {new Date(
                                                        h.created_at
                                                    ).toLocaleString()}
                                                </td>
                                                <td className="px-5 py-2 align-middle">
                                                    {h.action !== "Deleted" && (
                                                        <button
                                                            className="px-2 py-1 text-red-600 text-sm hover:underline"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    h.id
                                                                )
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

                            {/* Pagination */}
                            <div className="flex justify-between items-center p-4 mt-2">
                                <span className="text-sm text-muted-foreground">
                                    Showing{" "}
                                    {histories.length === 0
                                        ? 0
                                        : (currentPage - 1) * ITEMS_PER_PAGE +
                                          1}{" "}
                                    –{" "}
                                    {Math.min(
                                        currentPage * ITEMS_PER_PAGE,
                                        histories.length
                                    )}{" "}
                                    of {histories.length} histories
                                </span>

                                <div className="flex gap-2 flex-wrap">
                                    <button
                                        className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            goToPage(currentPage - 1)
                                        }
                                    >
                                        Previous
                                    </button>

                                    {Array.from(
                                        { length: totalPages },
                                        (_, idx) => idx + 1
                                    )
                                        .filter((page) => {
                                            if (
                                                page === 1 ||
                                                page === totalPages
                                            )
                                                return true;
                                            return (
                                                page >= currentPage - 2 &&
                                                page <= currentPage + 2
                                            );
                                        })
                                        .map((page, idx, arr) => (
                                            <React.Fragment key={page}>
                                                {idx > 0 &&
                                                    arr[idx] - arr[idx - 1] >
                                                        1 && (
                                                        <span className="px-2">
                                                            ...
                                                        </span>
                                                    )}
                                                <button
                                                    className={`px-3 py-1 border rounded text-sm ${
                                                        currentPage === page
                                                            ? "bg-black text-white"
                                                            : "hover:bg-gray-200"
                                                    }`}
                                                    onClick={() =>
                                                        goToPage(page)
                                                    }
                                                >
                                                    {page}
                                                </button>
                                            </React.Fragment>
                                        ))}

                                    <button
                                        className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                                        disabled={currentPage === totalPages}
                                        onClick={() =>
                                            goToPage(currentPage + 1)
                                        }
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
