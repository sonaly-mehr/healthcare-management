import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode@4.x.x

export const setToLocalStorage = (key: string, token: string) => {
  if (typeof window === "undefined" || !key) {
    return "";
  }
  return localStorage.setItem(key, token);
};

export const removeFromLocalStorage = (key: string) => {
  if (typeof window === "undefined" || !key) {
    return "";
  }
  return localStorage.removeItem(key);
};

export const getFromLocalStorage = (key: string) => {
  // Ensure this code only runs on the client side
  if (typeof window === "undefined" || !key) {
    return "";
  }

  const token = localStorage.getItem(key);
  if (!token) return "";

  try {
    // Ensure jwtDecode is only called on the client side
    const decoded: any = jwtDecode(token); 

    const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds

    // If the token has expired, remove it from localStorage
    if (decoded.exp && decoded.exp < currentTime) {
      removeFromLocalStorage(key); // Token expired, remove it
      return "";
    }

    return token; // Return valid token
  } catch (error) {
    // If decoding fails (invalid token), remove it from localStorage
    removeFromLocalStorage(key);
    return "";
  }
};