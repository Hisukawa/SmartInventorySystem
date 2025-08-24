// FacultyUnitView.jsx
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import FacultyRoomSidebar from "@/Components/FacultyComponents/faculty-room-view-sidebar";

export default function FacultyUnitView({ room, unit, user }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <FacultyRoomSidebar
        room={room}
        user={user}
        // when clicked, redirect back to FacultyRoomView
        onSelect={(section) => {
          // navigate back to FacultyRoomView with section state
          window.location.href = route("room.show", {
          roomPath: room.room_path,
          section: section,
        });

        }}
        active="system-units" // we're inside Unit details, keep this highlighted
      />

      {/* Main Content */}
      <div className="flex-1 p-6 flex justify-start items-start">
        <Card className="w-full max-w-md md:max-w-lg lg:max-w-2xl shadow-lg rounded-2xl border border-gray-200 ml-4">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-semibold text-gray-800">
              Unit Details
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <button className="px-4 py-2 bg-gray-200 rounded-lg">
                      ← Back to Room
                    </button>
              </Link>

            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

      // Reusable detail item
      function DetailItem({ label, value }) {
        return (
          <div className="flex flex-col">
            <span className="text-xs md:text-sm font-medium text-gray-500">
              {label}
            </span>
            <span className="text-sm md:text-base font-semibold text-gray-800">
              {value}
            </span>
          </div>
        );
      }
