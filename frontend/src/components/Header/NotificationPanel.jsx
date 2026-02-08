import React from "react";
import { X, Bell } from "lucide-react";

const NotificationPanel = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="px-4 py-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-800">
              Notifications
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border ${
                notification.isRead
                  ? "bg-white border-gray-200"
                  : "bg-blue-50 border-blue-100"
              } hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-800 text-sm">
                  {notification.title}
                </h3>
                <span className="text-xs text-gray-500">
                  {notification.time}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {notification.message}
              </p>
              {!notification.isRead && (
                <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded-full">
                  New
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 text-center">
          <button
            onClick={onMarkAllAsRead}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;
