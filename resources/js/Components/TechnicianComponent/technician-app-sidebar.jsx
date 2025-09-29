import * as React from "react";
import { LayoutDashboard, Home, Boxes, Send, User } from "lucide-react";

import { TechnicianNavMain } from "@/components/TechnicianComponent/technician-nav-main";
import { TechnicianNavProjects } from "@/components/TechnicianComponent/technician-nav-projects";
import { TechnicianNavSecondary } from "@/components/TechnicianComponent/technician-nav-secondary";
import { TechnicianNavUser } from "@/components/TechnicianComponent/technician-nav-user";

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
        name: "Technician",
        email: "tech@example.com",
        avatar: "/avatars/technician.jpg",
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/technician/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Rooms",
            url: "/technician/rooms",
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
                    url: "/technician/units",
                },
                {
                    title: "Peripherals",
                    url: "/technician/peripherals",
                },
                {
                    title: "Equipments",
                    url: "/technician/equipments",
                },
            ],
        },
    ],

    navSecondary: [
      
    ],

    projects: [
     
    ],
};

export function TechnicianAppSidebar({ ...props }) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="/technician/dashboard">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-full bg-black overflow-hidden">
                                    <img
                                        src="/ict.png"
                                        alt="Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        Technician Portal
                                    </span>
                                    <span className="truncate text-xs">
                                        Inventory & Tasks
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <TechnicianNavMain items={data.navMain} />
                {/* <TechnicianNavProjects projects={data.projects} /> */}
                <TechnicianNavSecondary
                    items={data.navSecondary}
                    className="mt-auto"
                />
            </SidebarContent>
            <SidebarFooter>
                <TechnicianNavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
