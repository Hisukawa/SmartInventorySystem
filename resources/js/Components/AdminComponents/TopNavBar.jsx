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
        { title: "Room History", url: "/admin/room-histories", icon: History },
        {
            title: "System Unit History",
            url: "/admin/system-unit-histories",
            icon: Cpu,
        },
        {
            title: "Peripherals History",
            url: "/admin/peripherals-history",
            icon: Keyboard,
        },
        {
            title: "Equipments History",
            url: "/admin/equipment-history",
            icon: HardDrive,
        },
        { title: "Users History", url: "/admin/user-histories", icon: Users },
    ],
};

export default function TopNavBar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const currentPath = window.location.pathname;

    // Get active navigation title
    const activeNav = data.navMain.find((item) => item.url === currentPath);

    return (
        <nav className="w-full bg-white shadow-sm border-b flex items-center justify-between px-4 py-3 relative">
            {/* Left: Mobile Menu Button */}
            <div className="flex items-center gap-2">
                <button
                    className="md:hidden p-2 rounded hover:bg-gray-100"
                    onClick={() => setMobileOpen(!mobileOpen)}
                >
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>

                {/* Show active page title on mobile */}
                <span className="md:hidden font-semibold text-gray-800 text-sm">
                    {activeNav ? activeNav.title : ""}
                </span>
            </div>

            {/* Center: Desktop Scrollable Navigation */}
            <div className="flex-1 flex justify-center overflow-x-auto scrollbar-hide hidden md:flex">
                <ul className="flex items-center gap-6 min-w-max">
                    {data.navMain.map((item, index) => {
                        const isActive = currentPath === item.url;
                        return (
                            <li key={index}>
                                <a
                                    href={item.url}
                                    className={`flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-md transition
                                        ${
                                            isActive
                                                ? "bg-gray-200 text-black"
                                                : "text-gray-700 hover:bg-gray-100 hover:text-black"
                                        }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {/* Right spacer (desktop) */}
            <div className="md:hidden w-6" />

            {/* Mobile Menu Panel */}
            {mobileOpen && (
                <>
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setMobileOpen(false)}
                    ></div>

                    <div className="absolute top-14 left-0 w-full bg-white border-b shadow-lg z-50 md:hidden animate-slide-down">
                        <ul className="flex flex-col p-4 gap-2">
                            {data.navMain.map((item, index) => {
                                const isActive = currentPath === item.url;
                                return (
                                    <li key={index}>
                                        <a
                                            href={item.url}
                                            onClick={() => setMobileOpen(false)}
                                            className={`flex items-center gap-3 text-base px-3 py-3 rounded-md w-full transition
                                                ${
                                                    isActive
                                                        ? "bg-gray-200 text-black"
                                                        : "text-gray-700 hover:bg-gray-100 hover:text-black"
                                                }`}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.title}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </>
            )}
        </nav>
    );
}

/* Tailwind animation (add in globals.css) */
/*
@keyframes slide-down {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
.animate-slide-down {
    animation: slide-down 0.2s ease-out;
}
*/
