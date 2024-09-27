"use client";
import {
  useDeleteSpecialtyMutation,
  useGetAllSpecialtiesQuery,
} from "@/redux/api/specialtiesApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import specialtyIcon from "../../../../assets/icons/specialty-icon.png";
import ClipLoader from "react-spinners/ClipLoader";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { getUserInfo } from "@/services/auth.services";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

const SpecialtiesTable = () => {
  const router = useRouter()
  const userInfo = getUserInfo();
  console.log("user info", userInfo);
  const { data, isLoading } = useGetAllSpecialtiesQuery({});
  const [deleteSpecialty] = useDeleteSpecialtyMutation();
  console.log("data", data);


  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSpecialty(id).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Specialty deleted successfully!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle ">
              {isLoading ? (
                <div className="flex justify-center w-full items-center h-full mt-36">
                  <ClipLoader
                    loading={true}
                    color="#2563EB"
                    speedMultiplier={1}
                    cssOverride={{}}
                    size={50}
                  />
                </div>
              ) : (
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Icon
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {data.length>0 ?
                    data?.map((data: any, index: number) => (
                      <tr key={index} className="even:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                          {data?.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <Image
                            src={data?.icon ? data?.icon : specialtyIcon}
                            width={30}
                            height={30}
                            alt=""
                            className=""
                          />
                        </td>
                        <td className="flex items-center gap-3 justify-end relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                          {/* <Pencil
                            className="text-primary cursor-pointer"
                            width={18}
                            height={18}
                            onClick={() =>
                              router.push(
                                `/dashboard/admin/specialties/edit/${data?.id}`
                              )
                            }
                          /> */}
                          <AlertDialog>
                            <AlertDialogTrigger>
                              {" "}
                              <Trash
                                className="text-red-600 cursor-pointer"
                                width={18}
                                height={18}
                              />{" "}
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
                                  onClick={() => handleDelete(data?.id)}
                                  className="bg-red-600"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </td>
                      </tr>
                    )): <p className="text-center bg-transparent py-5">No Specialties Found</p>}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialtiesTable;
