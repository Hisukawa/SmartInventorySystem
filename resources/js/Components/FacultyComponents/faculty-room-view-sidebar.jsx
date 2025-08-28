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
    <div className="w-64 bg-gradient-to-b from-green-50 to-green-100 border-r flex flex-col justify-between shadow-md">
  {/* Top Section */}
  <div>
    {/* Logo + Title */}
    <div className="p-4 border-b bg-green-600 text-white flex items-center gap-3">
      <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-white overflow-hidden shadow">
        <img src="/ict.png" alt="Logo" className="w-full h-full object-contain" />
      </div>
      <div className="grid flex-1 text-left leading-tight">
        <span className="truncate font-semibold text-sm">Inventory Management</span>
        <span className="truncate text-xs opacity-90">System</span>
      </div>
    </div>

    {/* Room Info */}
    <div className="p-4 bg-yellow-50 border-b">
      <h2 className="text-lg font-semibold text-green-700">{room.room_name}</h2>
      <p className="text-sm text-gray-600">{room.department}</p>
    </div>

    {/* Navigation */}
    <nav className="space-y-1 px-2 mt-2">
      {links.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          onClick={() => {
            window.location.href = route("room.show", {
              roomPath: room.room_path,
              section: key,
            });
          }}
          className={cn(
            "flex items-center w-full px-3 py-2 rounded-lg text-sm font-medium transition",
           
          )}
        >
          <Icon className="mr-2 h-4 w-4" />
          {label}
        </button>
      ))}
    </nav>
  </div>

  {/* Faculty Account */}
  <div className="border-t p-4 bg-green-50">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-start gap-3 text-green-700"
        >
          <div className="h-10 w-10 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold">
            {user.name.charAt(0)}
          </div>
          <div className="flex flex-col items-start">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-600">{user.email}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-48">
        <DropdownMenuItem onClick={handleLogout} className="text-red-600">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>

  );
}
