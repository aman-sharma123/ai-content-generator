"use client";

import React, { useState } from "react";
import { ChevronDown, FileClock, WalletCards, Settings } from "lucide-react";

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Trigger */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 p-2 border rounded-md bg-white shadow-sm hover:bg-gray-100"
      >
        <span className="font-medium">Menu</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg"
          onMouseLeave={() => setIsOpen(false)}
        >
          <a
            href="/dashboard/history"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
          >
            <FileClock className="w-4 h-4 text-gray-500" />
            History
          </a>
          <a
            href="/dashboard/billing"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
          >
            <WalletCards className="w-4 h-4 text-gray-500" />
            Billing
          </a>
          <a
            href="/dashboard/settings"
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
          >
            <Settings className="w-4 h-4 text-gray-500" />
            Setting
          </a>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
