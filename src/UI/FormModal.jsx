import { useEffect } from "react";
import { X } from "lucide-react";

const FormModal = ({ isOpen, onClose, children, className = "" }) => {
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when modal is open
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      // Restore body scroll when modal is closed
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={`relative w-full max-w-6xl max-h-[95vh] mx-4 ${className}`}
      >
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Scrollable Content */}
          <div className="max-h-[95vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
