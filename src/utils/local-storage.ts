import { jwtDecode } from "jwt-decode";

export const setToLocalStorage = (key: string, token: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.setItem(key, token);
};

export const removeFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }
  return localStorage.removeItem(key);
};


export const getFromLocalStorage = (key: string) => {
  if (!key || typeof window === "undefined") {
    return "";
  }

  const token = localStorage.getItem(key);
  if (!token) return "";

  try {
    const decoded: any = jwtDecode(token); // Assuming token has 'exp' field
    const currentTime = Date.now() / 1000; // Convert current time to seconds

    if (decoded.exp && decoded.exp < currentTime) {
      // Token is expired
      removeFromLocalStorage(key); // Remove expired token
      return "";
    }
    return token;
  } catch (error) {
    // If decoding fails, remove the invalid token
    removeFromLocalStorage(key);
    return "";
  }
};
