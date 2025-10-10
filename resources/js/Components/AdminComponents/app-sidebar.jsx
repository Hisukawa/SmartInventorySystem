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
    Server,
    Monitor,
    Keyboard,
    ChevronDown,
    ChevronRight,
    Box,
    FileText,
    Megaphone,
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
                {
                    title: "Computers",
                    url: "/admin/system-units",
                    icon: Server,
                },
                {
                    title: "Peripherals",
                    url: "/admin/peripherals",
                    icon: Keyboard,
                },
                {
                    title: "Equipments",
                    url: "/equipments",
                    icon: Box,
                },
            ],
        },
        {
            title: "Reports",
            url: "#",
            icon: List,
            items: [
                {
                    title: "View Reports",
                    url: "/admin/faculty/reports",
                },
                {
                    title: "Audit Reports",
                    url: "/admin/audit_reports",
                },
            ],
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
        // {
        //     title: "Announcements",
        //     url: "/admin/announcement",
        //     icon: Megaphone, // 📢 Icon for announcements
        // },
    ],
    navSecondary: [],
};

export function AppSidebar({ ...props }) {
    const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";

    // ✅ Find which parent menu should be open based on current path
    const defaultOpen = React.useMemo(() => {
        const parent = data.navMain.find(
            (item) =>
                item.items?.some((sub) => sub.url === currentPath) ||
                item.url === currentPath
        );
        return parent ? parent.title : null;
    }, [currentPath]);

    const [openMenu, setOpenMenu] = React.useState(defaultOpen);

    // ✅ Update openMenu when route changes
    React.useEffect(() => {
        setOpenMenu(defaultOpen);
    }, [defaultOpen]);

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

                        const isOpen = openMenu === item.title;

                        return (
                            <React.Fragment key={item.title}>
                                <SidebarMenuItem>
                                    <SidebarMenuButton
                                        onClick={() =>
                                            item.items
                                                ? setOpenMenu(
                                                      isOpen ? null : item.title
                                                  )
                                                : null
                                        }
                                        asChild={
                                            !item.items && item.url !== "#"
                                        } // Only render asChild if it's a direct link
                                        className={`flex items-center justify-between gap-2 p-2 rounded-md ${
                                            isActive
                                                ? "bg-teal-100 text-teal-900 font-semibold"
                                                : "hover:bg-black/5"
                                        }`}
                                    >
                                        {item.items ? ( // If it has sub-items, render without an <a> tag
                                            <>
                                                <div className="flex items-center gap-2">
                                                    <item.icon className="size-4 text-white" />
                                                    <span className="font-sans font-medium text-white">
                                                        {item.title}
                                                    </span>
                                                </div>

                                                {item.items &&
                                                    (isOpen ? (
                                                        <ChevronDown className="size-4 text-white" />
                                                    ) : (
                                                        <ChevronRight className="size-4 text-white" />
                                                    ))}
                                            </>
                                        ) : (
                                            // If it's a direct link, wrap in an <a> tag
                                            <a
                                                href={item.url}
                                                className="flex items-center justify-between gap-2 w-full"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <item.icon className="size-4 text-white" />
                                                    <span className="font-sans font-medium text-white">
                                                        {item.title}
                                                    </span>
                                                </div>
                                            </a>
                                        )}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                                {item.items?.length && isOpen && (
                                    <div className="ml-6 mt-1">
                                        {item.items.map((subItem) => {
                                            const isSubActive =
                                                subItem.url === currentPath;
                                            return (
                                                <SidebarMenuItem
                                                    key={subItem.title}
                                                >
                                                    <SidebarMenuButton
                                                        asChild
                                                        className={`flex items-center gap-2 p-2 rounded-md text-sm ${
                                                            isSubActive
                                                                ? "bg-teal-200 text-teal-900 font-semibold"
                                                                : "hover:bg-black/5"
                                                        }`}
                                                    >
                                                        <a
                                                            href={subItem.url}
                                                            className="flex items-center gap-2 w-full"
                                                        >
                                                            {subItem.icon && (
                                                                <subItem.icon className="size-4 text-white" />
                                                            )}
                                                            <span className="font-sans font-medium text-white">
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
