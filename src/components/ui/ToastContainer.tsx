"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { removeToast, type Toast } from "@/store/slices/uiSlice"; // 1. Import the Toast type
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Info, XCircle, X } from "lucide-react";

export function ToastContainer() {
  const toasts = useAppSelector((state) => state.ui.toasts || []);
  const dispatch = useAppDispatch();

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={() => dispatch(removeToast(toast.id))}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: Toast;
  onDismiss: () => void;
}) {
  // Auto-dismiss after 3 seconds
  useEffect(() => {
    const timer = setTimeout(onDismiss, 3000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const icons = {
    success: <CheckCircle size={18} className="text-green-500" />,
    info: <Info size={18} className="text-blue-500" />,
    error: <XCircle size={18} className="text-red-500" />,
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="pointer-events-auto flex items-center gap-3 rounded-lg border border-slate-200 dark:border-border-base bg-white dark:bg-bg-surface px-4 py-3 shadow-xl min-w-[300px]"
    >
      {icons[toast.type]}
      <p className="text-sm font-medium text-slate-900 dark:text-text-primary flex-1">
        {toast.message}
      </p>
      <button
        onClick={onDismiss}
        className="text-slate-400 hover:text-slate-900 dark:hover:text-text-primary transition-colors"
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
}
