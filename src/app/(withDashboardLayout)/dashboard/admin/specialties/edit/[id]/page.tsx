"use client";

import { toast } from "sonner";
import {
  useGetSingleSpecialtyQuery,
  useUpdateSpecialtyMutation,
} from "@/redux/api/specialtiesApi";
import { useRouter } from "next/navigation";
import Form from "@/app/components/ui/Forms/Form";
import { FieldValues } from "react-hook-form";
import InputFeild from "@/app/components/ui/Forms/InputFeild";
import { useState } from "react";

const EditSpecialtyPage = ({ params }: any) => {
  const router = useRouter();
  const { id } = params;
  const { data, isLoading, refetch } = useGetSingleSpecialtyQuery(id, {
    refetchOnMountOrArgChange: true, // Ensure data refetches when component mounts
  });
  const [updateSpecialty] = useUpdateSpecialtyMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Handle the form submission
  const handleSubmit = async (values: FieldValues) => {
    // Prepare data to match backend expectations
    const formData = new FormData();
    formData.append("title", values.title);

    // Only add the file if it's selected
    if (selectedFile) {
      formData.append("icon", selectedFile); // Use the correct key expected by the backend
    }

    try {
      // Send the correct data structure to the backend
      const res = await updateSpecialty({ id, body: formData }).unwrap();
      if (res?.id) {
        toast.success("Specialty Updated Successfully!");

        // Refetch the updated data
        await refetch(); // This should fetch the updated data to ensure the state is fresh

        // Navigate to the specialty list
        router.push("/dashboard/admin/specialties");
      }
    } catch (err: any) {
      console.error("Error updating specialty:", err);
      toast.error("Failed to update the specialty.");
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  if (isLoading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Specialty</h2>
      <Form onSubmit={handleSubmit} defaultValues={data && { title: data.title }}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <InputFeild name="title" label="Name" defaultValue={data?.title} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Image</label>
          {data?.icon && (
            <img
              src={data.icon}
              alt="Current specialty icon"
              className="mt-2 mb-4 h-32 w-32 object-cover rounded-md border border-gray-300"
            />
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Update Image</label>
          <input
            type="file"
            name="icon"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150"
        >
          Update Specialty
        </button>
      </Form>
    </div>
  );
};

export default EditSpecialtyPage;