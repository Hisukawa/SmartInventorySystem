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
    <div className="w-64 bg-white border-r flex flex-col justify-between">
      {/* Top Section */}
      <div>
        {/* Logo + System Title */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-black overflow-hidden">
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
              <span className="truncate text-xs text-muted-foreground">
                System
              </span>
            </div>
          </div>
        </div>

        {/* Room Info */}
        <div className="p-4">
          <h2 className="text-lg font-semibold">{room.room_name}</h2>
          <p className="text-sm text-muted-foreground">{room.department}</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 px-2">
          {links.map(({ key, label, icon: Icon }) => (
           <button
           key={key}
            onClick={() => {
             window.location.href = route("room.show", {
                roomPath: room.room_path,
               section: key, // ✅ pass clicked section in URL
              });
            }}
            className={cn(
              "flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted transition",
              active === key ? "bg-muted text-primary" : "text-muted-foreground"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            {label}
         </button>
          ))}
        </nav>
      </div>

      {/* Bottom Section - Faculty Account with Dropdown */}
      <div className="border-t p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-3"
            >
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-bold">
                {user.name.charAt(0)} {/* Initial as avatar */}
              </div>
              <div className="flex flex-col items-start">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48">
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
