import { CloudUpload } from "lucide-react";
import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label?: string;
};

export default function FileUpload({ name, label }: TProps) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <label className="inline-flex gap-x-3 text-primary justify-center items-center px-4 py-2 bg-transparent border-[1px] border-primary  rounded cursor-pointer">
            <CloudUpload />
            {label || "Upload file"}
            <input
              {...field}
              type={name}
              value={value?.fileName}
              onChange={(e) =>
                onChange((e.target as HTMLInputElement).files?.[0])
              }
              className="hidden"
            />
          </label>
        );
      }}
    />
  );
}
