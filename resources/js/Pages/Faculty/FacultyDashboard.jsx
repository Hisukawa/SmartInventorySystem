import React, { useState, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Head } from "@inertiajs/react";
import { FacultyAppSidebar } from "@/Components/FacultyComponents/faculty-app-sidebar";

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

export default function FacultyDashboard({ children }) {
    return (
        <SidebarProvider>
            <Head>
                <title>Faculty Dashboard</title>
            </Head>
            <FacultyAppSidebar />
            <SidebarInset>
                {/* Header */}
                <header className="flex h-16 items-center gap-2 px-4 border-b bg-white">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="h-6 mx-3" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink
                                    href="/admin/rooms"
                                    aria-current="page"
                                    className="font-semibold text-foreground"
                                >
                                    Dashboard
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>

                {/* Content */}
                <main className="w-full px-6 py-4">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
