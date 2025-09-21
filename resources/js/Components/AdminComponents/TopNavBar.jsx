// resources/js/Components/AdminComponents/TopNavBar.jsx

import React, { useState } from "react";
import {
    Cpu,
    Keyboard,
    HardDrive,
    Users,
    History,
    Menu,
    X,
} from "lucide-react";

const data = {
    navMain: [
        {
            title: "Room History",
            url: "/admin/room-histories",
            icon: History,
        },
        {
            title: "System Unit History",
            url: "/admin/system-unit-histories",
            icon: Cpu,
        },
        {
            title: "Peripherals History",
            url: "#",
            icon: Keyboard,
        },
        { title: "Equipments History", url: "#", icon: HardDrive },
        {
            title: "Users History",
            url: "/admin/rooms",
            icon: Users,
        },
    ],
};

export default function TopNavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const currentPath = window.location.pathname;

    return (
        <nav className="w-full bg-white shadow-sm border-b flex items-center justify-between px-4 py-3 relative">
            {/* Desktop Menu - Scrollable on small screens */}
            <div className="flex-1 flex justify-center overflow-x-auto scrollbar-hide">
                <ul className="flex items-center gap-4 sm:gap-6 md:gap-8 min-w-max">
                    {data.navMain.map((item, index) => {
                        const isActive = currentPath === item.url;
                        return (
                            <li key={index} className="flex-shrink-0">
                                <a
                                    href={item.url}
                                    className={`flex items-center gap-2 text-xs sm:text-sm md:text-base font-medium px-2 sm:px-3 py-1 sm:py-2 rounded-md transition-colors ${
                                        isActive
                                            ? "bg-gray-200 text-black"
                                            : "text-gray-700 hover:bg-gray-100 hover:text-black"
                                    }`}
                                >
                                    <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                                    {item.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Mobile Dropdown */}
            {mobileOpen && (
                <div className="absolute top-14 left-0 w-full bg-white border-b shadow-md md:hidden max-h-[70vh] overflow-y-auto">
                    <ul className="flex flex-col items-start p-4 gap-2">
                        {data.navMain.map((item, index) => {
                            const isActive = currentPath === item.url;
                            return (
                                <li key={index} className="w-full">
                                    <a
                                        href={item.url}
                                        className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md w-full ${
                                            isActive
                                                ? "bg-gray-200 text-black"
                                                : "text-gray-700 hover:bg-gray-100 hover:text-black"
                                        }`}
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.title}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </nav>
    );
}
