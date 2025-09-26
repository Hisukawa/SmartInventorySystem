import { Monitor, Mouse, Package, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { router } from "@inertiajs/react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function FacultyRoomSidebar({ room, user, active, onSelect }) {
    const links = [
        { key: "system-units", label: "System Units", icon: Monitor },
        { key: "peripherals", label: "Peripherals", icon: Mouse },
        { key: "equipments", label: "Equipments", icon: Package },
    ];

    const handleLogout = () => {
        router.post(route("logout")); // Laravel logout route
    };

    return (
        <div
            className="w-64 flex flex-col justify-between shadow-md text-white"
            style={{ backgroundColor: "hsl(142, 34%, 51%)" }} // Solid sidebar color
        >
            {/* Top Section */}
            <div>
                {/* Logo + Title */}
                <div className="px-4 py-3 flex items-center gap-2">
                    <div className="flex aspect-square w-10 items-center justify-center rounded-full bg-white overflow-hidden shadow">
                        <img
                            src="/ict.png"
                            alt="Logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="grid flex-1 text-left leading-tight">
                        <span className="truncate font-semibold text-sm">
                            Inventory Management
                        </span>
                        <span className="truncate text-xs opacity-90">
                            System
                        </span>
                    </div>
                </div>

                {/* Room Info */}
                <div className="px-4 py-2">
                    <h2 className="text-lg font-semibold">{room.room_name}</h2>
                    <p className="text-sm opacity-90">{room.department}</p>
                </div>

                {/* Navigation */}
                <nav className="space-y-1 px-2 mt-1">
                    {links.map(({ key, label, icon: Icon }) => (
                        <button
                            key={key}
                            onClick={() => {
                                window.location.href = route("faculty.room.show", {
                                    roomPath: room.room_path,
                                    section: key,
                                });
                            }}
                            className={cn(
                                "flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition",
                                active === key
                                    ? "bg-hsl(142,34%,45%)" // slightly darker for active
                                    : "hover:bg-hsl(142,34%,45%)"
                            )}
                        >
                            <Icon className="mr-2 h-4 w-4" />
                            {label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Faculty Account */}
            <div className="px-4 py-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="w-full flex items-center justify-start gap-3 text-white"
                        >
                            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-green-800 font-bold">
                                {user.name.charAt(0)}
                            </div>
                            <div className="flex flex-col items-start">
                                <p className="text-sm font-medium">{user.name}</p>
                                <p className="text-xs opacity-90">{user.email}</p>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-48">
                        <DropdownMenuItem
                            onClick={handleLogout}
                            className="text-red-600"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}