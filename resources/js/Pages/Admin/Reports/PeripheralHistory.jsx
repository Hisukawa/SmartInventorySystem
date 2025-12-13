import React from "react";
import { Head, usePage } from "@inertiajs/react";

import { Inertia } from "@inertiajs/inertia"; // ✅ correct

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

export default function PeripheralHistory() {
    const { histories } = usePage().props; // server-side paginated
    const data = histories.data;

    const goToPage = (page) => {
        Inertia.get(
            "/admin/peripherals-history",
            { page },
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
                                        href="/admin/peripherals-history"
                                        aria-current="page"
                                        className="font-semibold text-foreground"
                                    >
                                        Peripherals History
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

                    <Head title="Peripherals History" />
                    <h1 className="text-xl md:text-2xl text-center font-bold mt-5 mb-4">
                        Peripherals Activity History
                    </h1>

                    {data.length === 0 ? (
                        <p className="text-center mt-10">
                            No peripherals history found.
                        </p>
                    ) : (
                        <>
                            <div className="overflow-x-auto bg-white shadow rounded-lg">
                                <table className="min-w-full table-auto text-center">
                                    <thead>
                                        <tr className="bg-[hsl(142,34%,85%)] text-[hsl(142,34%,25%)] hover:bg-[hsl(142,34%,80%)]">
                                            <th className="px-5 py-1">#</th>
                                            <th className="px-5 py-1">
                                                User Name
                                            </th>
                                            <th className="px-5 py-1">
                                                Peripheral Code
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
                                            <th className="px-5 py-1">Room</th>
                                            <th className="px-5 py-1">Unit</th>
                                            <th className="px-5 py-1">
                                                Date & Time
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((h, index) => (
                                            <tr
                                                key={h.id}
                                                className="hover:shadow-sm"
                                            >
                                                <td className="px-5 py-2">
                                                    {histories.from + index}
                                                </td>
                                                <td className="px-5 py-2">
                                                    {h.user?.name ?? "-"}
                                                </td>
                                                <td className="px-5 py-2">
                                                    {h.peripheral_code}
                                                </td>
                                                <td className="px-5 py-2">
                                                    {h.action}
                                                </td>
                                                <td className="px-5 py-2">
                                                    {h.component ?? "-"}
                                                </td>
                                                <td className="px-5 py-2">
                                                    {h.old_value ?? "-"}
                                                </td>
                                                <td className="px-5 py-2">
                                                    {h.new_value ?? "-"}
                                                </td>
                                                <td className="px-5 py-2">
                                                    {h.room?.room_number ?? "-"}
                                                </td>
                                                <td className="px-5 py-2">
                                                    {h.unit?.unit_code ?? "-"}
                                                </td>
                                                <td className="px-5 py-2">
                                                    {new Date(
                                                        h.created_at
                                                    ).toLocaleString()}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                                <span className="text-sm text-muted-foreground mb-2 md:mb-0">
                                    Showing {histories.from} – {histories.to} of{" "}
                                    {histories.total} histories
                                </span>

                                <div className="flex gap-2 flex-wrap">
                                    {/* Previous Button */}
                                    <button
                                        className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                                        disabled={!histories.prev_page_url}
                                        onClick={() =>
                                            goToPage(histories.current_page - 1)
                                        }
                                    >
                                        Prev
                                    </button>

                                    {/* Page Numbers */}
                                    {Array.from(
                                        { length: histories.last_page },
                                        (_, i) => i + 1
                                    ).map((page) => {
                                        if (
                                            page === 1 ||
                                            page === histories.last_page ||
                                            (page >=
                                                histories.current_page - 2 &&
                                                page <=
                                                    histories.current_page + 2)
                                        ) {
                                            return (
                                                <button
                                                    key={page}
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
                                            );
                                        } else if (
                                            page ===
                                                histories.current_page - 3 ||
                                            page === histories.current_page + 3
                                        ) {
                                            return (
                                                <span
                                                    key={page}
                                                    className="px-3 py-1 border rounded text-sm"
                                                >
                                                    ...
                                                </span>
                                            );
                                        }
                                        return null;
                                    })}

                                    {/* Next Button */}
                                    <button
                                        className="px-3 py-1 border rounded text-sm disabled:opacity-50"
                                        disabled={!histories.next_page_url}
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
