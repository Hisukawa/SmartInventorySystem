import FacultyRoomSidebar from "@/Components/FacultyComponents/faculty-room-view-sidebar";

export default function FacultyUnitView({ room, unit, user }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <FacultyRoomSidebar
        room={room}
        user={user}
        active="system-units"
        onSelect={() => {}}
      />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-4">Unit Details</h2>

        <div className="grid grid-cols-2 gap-4 bg-white shadow rounded-lg p-4">
          <p><span className="font-medium">Unit Code:</span> {unit.unit_code}</p>
          <p><span className="font-medium">Processor:</span> {unit.processor}</p>
          <p><span className="font-medium">RAM:</span> {unit.ram}</p>
          <p><span className="font-medium">Storage:</span> {unit.storage}</p>
          <p><span className="font-medium">GPU:</span> {unit.gpu ?? "N/A"}</p>
          <p><span className="font-medium">Motherboard:</span> {unit.motherboard}</p>
          <p><span className="font-medium">Condition:</span> {unit.condition}</p>
          <p><span className="font-medium">Created At:</span> {unit.created_at}</p>
          <p><span className="font-medium">Updated At:</span> {unit.updated_at}</p>
        </div>
      </div>
    </div>
  );
}
