import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface ITextField {
  name: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  items: string[];
  className?: string;
  selectLable?: string;
  defaultValue?: any;
}

const SelecetInput = ({
  items,
  name,
  label,
  required,
  fullWidth,
  className,
  defaultValue,
}: ITextField) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div
          className={`flex flex-col ${fullWidth ? "w-full" : ""} ${className}`}
        >
          {label && (
            <label
              className={`mb-1 text-sm font-medium text-gray-700 ${
                required
                  ? "after:content-['*'] after:ml-0.5 after:text-red-500"
                  : ""
              }`}
            >
              {label}
            </label>
          )}
          <select
            {...field}
            defaultValue={defaultValue}
            className={`${"py-3 px-3 bg-transparent cursor-pointer"} border rounded-md focus:ring-2 focus:ring-blue-500 text-sm ${
              isError ? "border-red-500" : "border-gray-400"
            }`}
          >
            {items.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          {isError && (
            <span className="mt-1 text-xs text-red-500">
              {formState.errors[name]?.message as string}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default SelecetInput;
