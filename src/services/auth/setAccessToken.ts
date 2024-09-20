"use client";

import { authKey } from '@/constants/authkey';
import { setToLocalStorage } from '@/utils/local-storage';

const setAccessToken = (token: string) => {
  setToLocalStorage(authKey, token); // Store token in localStorage
};

export default setAccessToken;