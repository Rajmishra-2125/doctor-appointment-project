import React from "react";
import { X, Bell } from "lucide-react";

const NotificationPanel = ({ isOpen, onClose, notifications, onClear }) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-80 bg-white dark:bg-gray-900 shadow-2xl transform transition-transform duration-300 ease-in-out border-l border-transparent dark:border-gray-800 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-4 py-6 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-orange-500 dark:text-orange-400" />
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Notifications
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-xl border ${
                notification.isRead
                  ? "bg-white border-gray-200 dark:bg-gray-800/50 dark:border-gray-700/50"
                  : "bg-orange-50 border-orange-100 dark:bg-gray-800 dark:border-orange-500/20"
              } hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 transition-all duration-200`}
            >
              <div className="flex justify-between items-start mb-1 gap-2">
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                  {notification.title}
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {notification.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 leading-relaxed">
                {notification.message}
              </p>
              {!notification.isRead && (
                <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-wider font-semibold text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30 rounded-full">
                  New
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        {notifications && notifications.length > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 text-center">
            <button
              onClick={onClear}
              className="text-sm text-orange-600 hover:text-orange-800 dark:text-orange-500 dark:hover:text-orange-400 font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
