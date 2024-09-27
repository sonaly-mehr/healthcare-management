"use client";

import { Button } from "@/components/ui/button"; // Import Shadcn Button

// Chip Component
const Chip = ({ label, onSelect, isSelected }) => {
  return (
    <Button
      onClick={() => onSelect(label)}
      className={`px-2 py-1 rounded-full text-sm ${
        isSelected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
      }`}
    >
      {label} {/* Displaying the label */}
    </Button>
  );
};

export default Chip;