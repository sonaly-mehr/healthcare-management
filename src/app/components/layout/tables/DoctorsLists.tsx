"use client";
import { Input } from "@/components/ui/input";
import {
  useDeleteDoctorMutation,
  useGetAllDoctorsQuery,
} from "@/redux/api/doctorsApi";
import { useDebounced } from "@/redux/hooks";
import { Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import doctorIcon from "../../../../assets/icons/doctor-icon.png";
import Image from "next/image";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";
import AddDoctor from "../FormLayout/AddDoctor";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const DoctorsLists = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  const router = useRouter();
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  const debouncedTerm = useDebounced({ searchQuery: searchTerm, delay: 600 });

  const { data, isLoading } = useGetAllDoctorsQuery({
    page: currentPage,
    limit: itemsPerPage,
    searchTerm: debouncedTerm, // Use debounced term for API query
  });
  const totalPages = Math.ceil((data?.meta?.total || 0) / itemsPerPage);

  const [deleteDoctor] = useDeleteDoctorMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteDoctor(id).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Doctor deleted successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  // Pagination handler
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Search term change handler
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value); // Update searchTerm on each keystroke
  };

  // Reset page when debounced search term changes
  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when the debounced search term changes
  }, [debouncedTerm]);

  return (
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Doctors
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the doctors in the protal including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <AddDoctor />
        </div>
      </div>
      {/* Serarch */}
      <Input
        className="w-full lg:w-[500px] mt-5 mb-2"
        placeholder="Search..."
        onChange={handleSearchChange}
      />
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data?.doctors?.map((doctor: any, index: number) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center pl-2">
                        <div className="h-11 w-11 flex-shrink-0">
                          <Image
                            alt=""
                            src={doctor?.profilePhoto || doctorIcon}
                            width={36}
                            height={36}
                            className="h-9 w-9 rounded-full"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {doctor.name}
                          </div>
                          <div className="mt-1 text-gray-500">
                            {doctor.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">{doctor.designation}</div>
                      <div className="mt-1 text-gray-500">
                        {doctor.qualification}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        Active
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {doctor.role ? doctor.role : "Doctor"}
                    </td>
                    <td className="relative flex gap-3 items-center whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <Pencil
                        className="text-primary cursor-pointer"
                        width={18}
                        height={18}
                        onClick={() =>
                          router.push(
                            `/dashboard/admin/doctor/edit/${doctor?.id}`
                          )
                        }
                      />

                      <AlertDialog>
                        <AlertDialogTrigger>
                          {" "}
                          <Trash
                            className="text-red-600 cursor-pointer"
                            width={18}
                            height={18}
                          />
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-sm">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you sure you want to delete?
                            </AlertDialogTitle>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="text-black">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(doctor?.id)}
                              className="bg-red-600"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Component */}
          <Pagination className="my-4">
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
            />
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  isActive={index + 1 === currentPage}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              className="mr-3"
            />
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default DoctorsLists;
