import { type ClassValue, clsx } from "clsx"
import { headers } from "next/headers"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getHost(){
  const host = headers().get("host")
  return `http://${host}`
}
