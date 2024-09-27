import React from 'react';

type ChipType = 'error' | 'success' | 'warning' | 'info';

const Chips = ({ label, type }: { label: string; type: ChipType }) => {
  let chipStyles = 'bg-green-100 text-green-800'; // Default to success style

  if (type === 'success') {
    chipStyles = 'bg-green-100 text-green-800';
  } else if (type === 'warning') {
    chipStyles = 'bg-yellow-100 text-yellow-800';
  } else if (type === 'info') {
    chipStyles = 'bg-blue-100 text-blue-800';
  } else if (type === 'error') {
    chipStyles = 'bg-red-100 text-red-800';
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${chipStyles}`}
    >
      {label}
    </span>
  );
};

export default Chips;