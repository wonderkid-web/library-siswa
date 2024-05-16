import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
// lib/updateDisplayName.js
import { updateProfile } from 'firebase/auth';
import { auth } from "./firebase";


export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
