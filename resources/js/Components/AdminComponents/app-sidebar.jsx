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
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
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
import { route } from "ziggy-js";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Rooms",
            url: "/admin/rooms",
            icon: Home,
        },
        {
            title: "Assets",
            url: "#",
            icon: Boxes,
            isActive: true,
            items: [
                {
                    title: "System Unit Lists",
                    url: "/units",
                },
                {
                    title: "Peripherals",
                    url: "/admin/peripherals",
                },
                {
                    title: "Room Equipments",
                    url: "/equipments",
                },
            ],
        },
        {
            title: "Reports",
            url: "#",
            icon: List,
            isActive: true,
            items: [
                {
                    title: "View Reports",
                    url: "/faculty/reports",
                },
                {
                    title: "Monitoring",
                    url: "/admin/monitoring",
                    icon: LayoutDashboard,
                },
            ],
        },
    ],

    navSecondary: [
        {
            title: "User Lists",
            url: "/admin/users",
            icon: User,
        },
        // {
        //     title: "Feedback",
        //     url: "#",
        //     icon: Send,
        // },
    ],

    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
};

export function AppSidebar({ ...props }) {
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

                                <div className="grid flex-1 text-left text-sm leading-tight">
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
                <NavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
