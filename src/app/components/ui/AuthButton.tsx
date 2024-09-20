import { Button } from "@/components/ui/button";
import { getUserInfo, removeUser } from "@/services/auth.services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const AuthButton = () => {
  const userInfo = getUserInfo();
  const router = useRouter();
  console.log("user info", userInfo)

  const handleLogOut = () => {
    removeUser();
    router.refresh();
  };
  return (
    <>
      {userInfo?.email ? (
        <Button variant="destructive" onClick={() => handleLogOut()}>
          Logout
        </Button>
      ) : (
        <Button asChild>
          <Link href="/login">Login</Link>
        </Button>
      )}
    </>
  );
};

export default AuthButton;
