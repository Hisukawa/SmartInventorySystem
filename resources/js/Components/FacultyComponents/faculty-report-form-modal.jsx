import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { router } from "@inertiajs/react";

export default function ReportFormModal({
  open,
  onOpenChange,
  room,
  item,
  section,
  onSuccess, // ✅ added callback
}) {
  const [form, setForm] = useState({
    condition: "",
    remarks: "",
    photo: null,
  });

  const handleSubmit = (e) => {
     const typeMap = {
    "system-units": "system_unit",
    "peripherals": "peripheral",
    "equipment": "equipment",
  };

    e.preventDefault();

    const data = new FormData();
    data.append("reportable_type", typeMap[section] || section); // section used as type
    data.append("reportable_id", item.id);   // item id
    data.append("room_id", room.id);
    data.append("condition", form.condition);
    data.append("remarks", form.remarks);
    if (form.photo) {
      data.append("photo", form.photo);
    }

    router.post(route("reports.store"), data, {
      onSuccess: () => {
        onOpenChange(false); // ✅ close modal
        if (onSuccess) onSuccess(); // ✅ trigger success modal from parent
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[95%] rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle>Report Item</DialogTitle>
          <DialogDescription>
            Fill out the details below to report an issue with this item.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Condition */}
          <div>
            <label className="text-sm font-medium">Condition</label>
            <Input
              placeholder="Enter or select condition..."
              className="mt-1"
              value={form.condition}
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {["Working", "Needs Maintenance", "Defective"].map((option) => (
                <Button
                  key={option}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setForm({ ...form, condition: option })}
                  className={`${
                    form.condition === option ? "bg-primary text-white" : ""
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="text-sm font-medium">Remarks</label>
            <Textarea
              placeholder="Enter remarks..."
              className="mt-1"
              value={form.remarks}
              onChange={(e) => setForm({ ...form, remarks: e.target.value })}
            />
          </div>

          {/* File Upload (Camera or Gallery on mobile) */}
          <div>
            <label className="text-sm font-medium">Upload Photo</label>
            <Input
              type="file"
              accept="image/*"
              capture="environment"
              className="mt-1"
              onChange={(e) => setForm({ ...form, photo: e.target.files[0] })}
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
    <Button
        type="submit"
        className="bg-[hsl(142,34%,51%)] text-white hover:bg-[hsl(142,34%,45%)]"
    >
        Save
    </Button>
</div>

        </form>
      </DialogContent>
    </Dialog>
  );
}
