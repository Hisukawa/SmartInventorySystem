// resources/js/Pages/Rooms/RoomHistory.jsx

import React from "react";
import { Head, usePage } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";
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

export default function RoomHistory() {
    const { histories } = usePage().props;

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
                    await Inertia.delete(`/room-history/${id}`, {
                        onSuccess: () => {
                            Swal.fire({
                                title: "Deleted!",
                                text: "History has been deleted.",
                                icon: "success",
                                timer: 1000,
                                showConfirmButton: false,
                            });
                        },
                    });
                } catch (error) {
                    console.error("Error deleting history:", error);
                    Swal.fire("Error!", "Failed to delete history.", "error");
                }
            }
        });
    };

    const goToPage = (page) => {
        Inertia.get(
            `/admin/room-histories?page=${page}`,
            {},
            { preserveState: true }
        );
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
                                        href="/admin/room-histories"
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
                    </div>
                </header>

                <div className="p-4 md:p-6 max-w-7xl mx-auto w-full">
                    <div className="sticky top-[64px] z-20 bg-white shadow-sm">
                        <TopNavBar />
                    </div>

                    <Head title="Room Histories" />
                    <h1 className="text-xl md:text-2xl text-center font-bold mt-5 mb-4">
                        Room Activity History
                    </h1>

                    {histories.data.length === 0 ? (
                        <p className="text-center mt-10">
                            No room activity found.
                        </p>
                    ) : (
                        <>
                            <div className="overflow-x-auto bg-white shadow rounded-lg">
                                <table className="min-w-full table-auto text-center">
                                    <thead>
                                        <tr className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]">
                                            <th className="px-5 py-2">#</th>
                                            <th className="px-5 py-2">
                                                User Name
                                            </th>
                                            <th className="px-5 py-2">Role</th>
                                            <th className="px-5 py-2">
                                                Action
                                            </th>
                                            <th className="px-5 py-2">
                                                Old Value
                                            </th>
                                            <th className="px-5 py-2">
                                                New Value
                                            </th>
                                            <th className="px-5 py-2">
                                                Date & Time
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {histories.data.map(
                                            (history, index) => (
                                                <tr
                                                    key={history.id}
                                                    className="hover:shadow-sm"
                                                >
                                                    <td className="px-5 py-2 align-middle">
                                                        {(histories.current_page -
                                                            1) *
                                                            histories.per_page +
                                                            index +
                                                            1}
                                                    </td>
                                                    <td className="px-5 py-2 align-middle">
                                                        {history.user_name}
                                                    </td>
                                                    <td className="px-5 py-2 align-middle">
                                                        {history.role}
                                                    </td>
                                                    <td className="px-5 py-2 align-middle">
                                                        {history.action}
                                                    </td>
                                                    <td className="px-5 py-2 align-middle">
                                                        {history.old_value ??
                                                            "-"}
                                                    </td>
                                                    <td className="px-5 py-2 align-middle">
                                                        {history.new_value ??
                                                            "-"}
                                                    </td>
                                                    <td className="px-5 py-2 align-middle">
                                                        {new Date(
                                                            history.created_at
                                                        ).toLocaleString()}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-between items-center p-4 mt-3 bg-white rounded-lg shadow-sm">
                                <span className="text-sm text-muted-foreground">
                                    Showing{" "}
                                    {(histories.current_page - 1) *
                                        histories.per_page +
                                        1}{" "}
                                    –{" "}
                                    {Math.min(
                                        histories.current_page *
                                            histories.per_page,
                                        histories.total
                                    )}{" "}
                                    of {histories.total} histories
                                </span>

                                <div className="flex gap-2">
                                    <button
                                        className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                                        disabled={histories.current_page === 1}
                                        onClick={() =>
                                            goToPage(histories.current_page - 1)
                                        }
                                    >
                                        Prev
                                    </button>

                                    {Array.from(
                                        { length: histories.last_page },
                                        (_, i) => i + 1
                                    )
                                        .filter((page) => {
                                            if (
                                                page === 1 ||
                                                page === histories.last_page
                                            )
                                                return true;
                                            return (
                                                page >=
                                                    histories.current_page -
                                                        2 &&
                                                page <=
                                                    histories.current_page + 2
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
                                                        histories.current_page ===
                                                        page
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
                                        disabled={
                                            histories.current_page ===
                                            histories.last_page
                                        }
                                        onClick={() =>
                                            goToPage(histories.current_page + 1)
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
