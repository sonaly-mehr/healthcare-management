"use client";

import { CloudUpload } from "lucide-react";
import { ReactElement } from "react";

interface IFileUploadButton {
  name: string;
  label?: string;
  accept?: string;
  icon?: ReactElement;
  variant?: "contained" | "text";
  onFileUpload: (file: File) => void;
}

const AutoFileUploader = ({
  name,
  label,
  accept,
  icon,
  variant = "contained",
  onFileUpload,
}: IFileUploadButton) => {
  return (
    <div>
      <label className={`flex items-center gap-1 cursor-pointer ${variant === "contained" ? "bg-blue-600 text-white" : "bg-transparent text-blue-600"} py-2 px-4 rounded-md shadow-md hover:bg-blue-500 hover:text-white transition`}>
        {icon ? icon : <CloudUpload className="mr-2" />}
        {label || "Upload file"}
        <input
          type="file"
          name={name}
          accept={accept}
          className="hidden"
          onChange={(e) => {
            const fileInput = e.target as HTMLInputElement;
            const file = fileInput.files?.[0];
            if (file) {
              onFileUpload(file);
            }
          }}
        />
      </label>
    </div>
  );
};

export default AutoFileUploader;