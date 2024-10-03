"use client";

import { Button } from "@/components/ui/button"; // Import Shadcn Button

// Define the props interface
interface ChipProps {
  label: string; // Define label as a string
  onSelect: (label: string) => void; // Define onSelect as a function that takes a string and returns void
  isSelected: boolean; // Define isSelected as a boolean
}

// Chip Component
const Chip: React.FC<ChipProps> = ({ label, onSelect, isSelected }) => {
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