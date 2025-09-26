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

import { FacultyNavMain } from "@/components/FacultyComponents/faculty-nav-main";
import { FacultyNavProjects } from "@/components/FacultyComponents/faculty-nav-projects";
import { FacultyNavSecondary } from "@/components/FacultyComponents/faculty-nav-secondary";
import { FacultyNavUser } from "@/components/FacultyComponents/faculty-nav-user";

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
            title: "Dashboard",
            url: "/faculty/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Rooms",
              url: route("faculty.rooms.dashboard"), 
            icon: Home,
        },
        // {
        //     title: "Assets",
        //     url: "#",
        //     icon: Boxes,
        //     isActive: true,
        //     items: [
        //         {
        //             title: "System Unit Lists",
        //             url: "#",
        //         },
        //         {
        //             title: "Peripherals",
        //             url: "#",
        //         },
        //         {
        //             title: "Room Equipments",
        //             url: "#",
        //         },
        //     ],
        // },
    ],

    navSecondary: [
        {
            title: "Feedback",
            url: "#",
            icon: Send,
        },
        // {
        //     title: "User Lists",
        //     url: "#",
        //     icon: User,
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

export function FacultyAppSidebar({ ...props }) {
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
                <FacultyNavMain items={data.navMain} />
                {/* <NavProjects projects={data.projects} /> */}
                <FacultyNavSecondary
                    items={data.navSecondary}
                    className="mt-auto"
                />
            </SidebarContent>
            <SidebarFooter>
                <FacultyNavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}