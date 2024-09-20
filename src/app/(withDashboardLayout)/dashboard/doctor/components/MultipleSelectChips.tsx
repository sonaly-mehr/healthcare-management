'use client';

import * as React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../components/ui/select';
import { Badge } from '../../../../../components/ui/badge';
import { cn } from '@/lib/utils'; // assuming utility function for class merging
import { useState } from 'react';

export default function MultipleSelectChip({
  allSpecialties,
  setSelectedIds,
  selectedIds,
}: any) {
  const [open, setOpen] = useState(false);

  const handleChange = (value: string) => {
    // Toggle the selected value in the selectedIds array
    if (selectedIds.includes(value)) {
      setSelectedIds(selectedIds.filter((id: string) => id !== value));
    } else {
      setSelectedIds([...selectedIds, value]);
    }
  };

  return (
    <div className="w-full">
      <Select open={open} onOpenChange={setOpen} value={selectedIds}>
        <SelectTrigger className="w-full border border-gray-300 rounded-md p-2">
          <SelectValue placeholder="Specialties" />
        </SelectTrigger>
        <SelectContent>
          {allSpecialties?.map((item: any) => (
            <SelectItem
              key={item?.id}
              value={item.id}
              className={cn(
                'flex items-center justify-between gap-2',
                selectedIds.includes(item.id) && 'font-medium'
              )}
              onSelect={() => handleChange(item.id)}
            >
              {item?.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="mt-2 flex flex-wrap gap-2">
        {selectedIds.map((value: any) => (
          <Badge
            key={value}
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded-md"
          >
            {allSpecialties.find((item: any) => item.id === value)?.title}
          </Badge>
        ))}
      </div>
    </div>
  );
}