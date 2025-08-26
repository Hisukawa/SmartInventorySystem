// FacultyUnitView.jsx
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import FacultyRoomSidebar from "@/Components/FacultyComponents/faculty-room-view-sidebar";

export default function FacultyUnitView({ room, unit, user }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex">
        <FacultyRoomSidebar
          room={room}
          user={user}
          onSelect={(section) => {
            window.location.href = route("room.show", {
              roomPath: room.room_path,
              section: section,
            });
          }}
          active="system-units"
        />
      </div>

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <div className="relative z-50 w-64 bg-white shadow-lg">
            <FacultyRoomSidebar
              room={room}
              user={user}
              onSelect={(section) => {
                setSidebarOpen(false);
                window.location.href = route("room.show", {
                  roomPath: room.room_path,
                  section: section,
                });
              }}
              active="system-units"
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        {/* Top Bar for mobile */}
        <div className="flex items-center gap-2 mb-4">
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-lg md:text-xl font-semibold text-gray-800">
            Unit Details
          </h1>
        </div>

        <div className="flex justify-center">
          <Card className="w-full max-w-md sm:max-w-lg md:max-w-2xl shadow-lg rounded-2xl border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg md:text-2xl font-semibold text-gray-800">
                {unit.unit_code}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DetailItem label="Unit Code" value={unit.unit_code} />
                <DetailItem label="Processor" value={unit.processor} />
                <DetailItem label="RAM" value={unit.ram} />
                <DetailItem label="Storage" value={unit.storage} />
                <DetailItem label="GPU" value={unit.gpu ?? "N/A"} />
                <DetailItem label="Motherboard" value={unit.motherboard} />
                <DetailItem label="Condition" value={unit.condition} />
              </div>

              {/* Back button */}
              <div className="mt-6">
                <Link href={route("room.show", { roomPath: room.room_path })}>
                  <Button variant="outline">← Back to Units</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Reusable detail item
function DetailItem({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs sm:text-sm font-medium text-gray-500">
        {label}
      </span>
      <span className="text-sm sm:text-base font-semibold text-gray-800">
        {value}
      </span>
    </div>
  );
}
