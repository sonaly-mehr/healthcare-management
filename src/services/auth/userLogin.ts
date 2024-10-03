'use client'
import { FieldValues } from "react-hook-form";
import setAccessTokenLocal from "./setAccessToken";
// import { setAccessToken, setUser } from '@/store/authSlice';
// import { useAppDispatch } from "@/redux/hooks";
// import { setAccessToken, setUser } from "@/redux/slice/authSlice";

export const userLogin = async (data: FieldValues) => {
  // const dispatch = useAppDispatch();
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      throw new Error(errorResponse?.message || "Login failed!");
    }

    const userInfo = await res.json();

    if (userInfo.data.accessToken) {
      setAccessTokenLocal(userInfo.data.accessToken);
      // dispatch(setAccessToken(userInfo.data.accessToken));
      // dispatch(setUser(userInfo.data.user)); // Assuming user data is returned
    }

    return userInfo;
  } catch (error: any) {
    console.error('Login error:', error);
    throw error; 
  }
};