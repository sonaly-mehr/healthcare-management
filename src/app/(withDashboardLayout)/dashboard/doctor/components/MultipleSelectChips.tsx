'use client'
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Badge } from '../../../../../components/ui/badge';
import { cn } from '@/lib/utils';

interface IMultipleSelectChips {
  name: string;
  items: { id: string; title: string }[];
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  className?: string;
  defaultValue?: string[];
}

const MultipleSelectChips = ({
  items,
  name,
  label,
  required,
  fullWidth,
  className,
  defaultValue = [],
}: IMultipleSelectChips) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        // Ensure value is an array
        const selectedValue = Array.isArray(value) ? value : [];

        return (
          <div className={`flex flex-col ${fullWidth ? "w-full" : ""} ${className}`}>
            {label && (
              <label
                className={`mb-1 text-sm font-medium text-gray-700 ${
                  required ? "after:content-['*'] after:ml-0.5 after:text-red-500" : ""
                }`}
              >
                {label}
              </label>
            )}
            <div className="relative">
              <select
                multiple
                value={selectedValue}
                onChange={(e) => {
                  const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                  onChange(selectedOptions);
                }}
                className={`py-3 px-3 bg-transparent cursor-pointer border rounded-md focus:ring-2 focus:ring-blue-500 text-sm ${
                  isError ? "border-red-500" : "border-gray-400"
                }`}
              >
                {items?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedValue.map((selectedId: string) => {
                  const selectedItem = items?.find(item => item.id === selectedId);
                  return selectedItem ? (
                    <Badge key={selectedId} className="px-2 py-1 text-sm bg-blue-500 text-white rounded-md">
                      {selectedItem.title}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
            {isError && (
              <span className="mt-1 text-xs text-red-500">
                {formState.errors[name]?.message as string}
              </span>
            )}
          </div>
        );
      }}
    />
  );
};

export default MultipleSelectChips;