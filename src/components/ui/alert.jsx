import { CircleCheck, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";

function Alert({
  type = "success",
  title,
  message,
  duration = 3000,
  onClose,
}) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setVisible(false);
    }, duration);

    const closeTimer = setTimeout(() => {
      onClose?.();
    }, duration + 200);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(closeTimer);
    };
  }, [message, duration, onClose]);

  const base =
    "fixed top-5 right-5 z-50 w-80 px-4 py-3 rounded-xl text-sm shadow-md transition-all duration-200 border";

  const styles = {
    success: "bg-white border-green-200",
    error: "bg-white border-red-200",
  };

  const Icon =
    type === "success" ? CircleCheck : CircleAlert;

  const iconColor =
    type === "success" ? "text-green-500" : "text-red-500";

  return (
    <div
      onClick={() => setVisible(false)}
      className={`
        ${base}
        ${styles[type]}
        ${visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 pointer-events-none"}
      `}
    >
      <div className="flex gap-3 items-start">
        <Icon size={20} className={`${iconColor} pt-1 shrink-0`} />
      
        <div className="flex flex-col">
          {title && (
            <div className="font-semibold text-gray-900">
              {title}
            </div>
          )}
          <div className="text-xs text-gray-500 leading-snug">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alert;