import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import FacultyRoomSidebar from "@/Components/FacultyComponents/faculty-room-view-sidebar";


export default function FacultyUnitView({ room, unit, user, equipments, systemUnits, peripherals }) {
  console.log("FacultyUnitView props:", { room, unit, equipments, systemUnits, peripherals });    
  const [activeSection, setActiveSection] = useState("system-units");

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <FacultyRoomSidebar
        room={room}
        user={user}
        equipments={equipments}
        systemUnits={systemUnits}
        peripherals={peripherals}
        active={activeSection}
        onSelect={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 p-6 flex justify-start items-start">
        <Card className="w-full max-w-md md:max-w-lg lg:max-w-2xl shadow-lg rounded-2xl border border-gray-200 ml-4">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="text-xl md:text-2xl font-semibold text-gray-800">
              {activeSection === "system-units"
                ? "Unit Details"
                : activeSection === "peripherals"
                ? "Peripheral Details"
                : "Equipment Details"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {activeSection === "system-units" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Unit Code" value={unit.unit_code} />
                <DetailItem label="Processor" value={unit.processor} />
                <DetailItem label="RAM" value={unit.ram} />
                <DetailItem label="Storage" value={unit.storage} />
                <DetailItem label="GPU" value={unit.gpu ?? "N/A"} />
                <DetailItem label="Motherboard" value={unit.motherboard} />
                <DetailItem label="Condition" value={unit.condition} />
              </div>
            ) : (
              <div className="text-gray-600 text-sm md:text-base">
                No detailed view implemented yet for{" "}
                <span className="font-medium">{activeSection}</span>.
              </div>
            )}
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
