"use client";

import * as React from "react";
import {
    List,
    Boxes,
    Frame,
    User,
    Map,
    PieChart,
    Send,
    Settings2,
    Home,
    Activity,
    LayoutDashboard,
    Grid,
    Command,
    Users,
    History,
} from "lucide-react";

import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/admin/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Rooms",
            url: "/admin/rooms",
            icon: Home,
        },
        {
            title: "Assets",
            url: "#",
            icon: Boxes,
            items: [
                { title: "System Unit Lists", url: "/admin/system-units" },
                { title: "Peripherals", url: "/admin/peripherals" },
                { title: "Equipments", url: "/equipments" },
            ],
        },
        {
            title: "Reports",
            url: "#",
            icon: List,
            items: [{ title: "View Reports", url: "/admin/faculty/reports" }],
        },
        {
            title: "Monitoring",
            url: "/admin/monitoring",
            icon: Users,
        },
        {
            title: "History",
            url: "/admin/room-histories",
            icon: History,
        },
        {
            title: "User Lists",
            url: "/admin/users",
            icon: User,
        },
    ],
    navSecondary: [],
};

export function AppSidebar({ ...props }) {
    const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-black overflow-hidden">
                                    <img
                                        src="/ict.png"
                                        alt="Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight ml-2">
                                    <span className="truncate font-semibold">
                                        Inventory Management
                                    </span>
                                    <span className="truncate text-xs">
                                        System
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {data.navMain.map((item) => {
                        const isActive =
                            currentPath === item.url ||
                            item.items?.some((sub) => sub.url === currentPath);

                        // Only show a group header for Assets or Reports
                        const isGroupHeader =
                            item.title === "Assets" || item.title === "Reports";

                        // Skip rendering the main button for Assets
                        const skipMainButton = isGroupHeader;

                        return (
                            <React.Fragment key={item.title}>
                                {/* Group Header */}
                                {isGroupHeader && (
                                    <div className="px-3 mt-2 text-xs font-bold text-gray-400 uppercase tracking-wide">
                                        {item.title}
                                    </div>
                                )}

                                {/* Render main button only if it's not "Assets" */}
                                {!skipMainButton && (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            asChild
                                            className={`flex items-center gap-2 p-2 rounded-md ${
                                                isActive
                                                    ? "bg-teal-100 text-teal-900 font-semibold"
                                                    : "hover:bg-black/5"
                                            }`}
                                        >
                                            <a
                                                href={item.url}
                                                className="flex items-center gap-2 w-full"
                                            >
                                                <item.icon className="text-teal-700" />
                                                <span>{item.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}

                                {/* Render sub-items if any */}
                                {item.items?.length && (
                                    <div className="ml-4 mt-1">
                                        {item.items.map((subItem) => {
                                            const isSubActive =
                                                subItem.url === currentPath;
                                            return (
                                                <SidebarMenuItem
                                                    key={subItem.title}
                                                >
                                                    <SidebarMenuButton
                                                        asChild
                                                        className={`flex items-center gap-2 p-2 pl-8 rounded-md text-sm ${
                                                            isSubActive
                                                                ? "bg-teal-200 text-teal-900 font-semibold"
                                                                : "hover:bg-black/5"
                                                        }`}
                                                    >
                                                        <a
                                                            href={subItem.url}
                                                            className="w-full"
                                                        >
                                                            <span>
                                                                {subItem.title}
                                                            </span>
                                                        </a>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            );
                                        })}
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </SidebarMenu>
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>

            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
