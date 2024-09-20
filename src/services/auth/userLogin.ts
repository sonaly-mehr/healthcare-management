"use client";

import { FieldValues } from "react-hook-form";
import setAccessToken from "./setAccessToken";

export const userLogin = async (data: FieldValues) => {
  try {
    const res = await fetch('http://localhost:5000/api/v1/auth/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: 'include', // Include cookies for session handling
    });

    if (!res.ok) {
      throw new Error('Login failed');
    }

    const userInfo = await res.json();

    // If accessToken is present, set it and manage the redirect
    if (userInfo.data.accessToken) {
      setAccessToken(userInfo.data.accessToken); // Pass the router instance
    }

    return userInfo;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};