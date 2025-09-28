import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle2, X } from "lucide-react";

export default function SuccessModal({ open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-[90%] p-6 rounded-2xl shadow-xl text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
       
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-3">
          <CheckCircle2 className="w-16 h-16 text-green-500" />
        </div>

        <DialogHeader>
          {/* Add text-center to DialogTitle */}
          <DialogTitle className="text-lg font-semibold text-center">Reported successfully</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}