"use client";
import { useRouter } from "next/navigation";
import Layout from "./(components)/Layout";
import { isLoggedIn } from "@/services/auth.services";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  if (!isLoggedIn()) {
    return router.push("/login");
  }
  return <Layout>{children} </Layout>;
};

export default DashboardLayout;
