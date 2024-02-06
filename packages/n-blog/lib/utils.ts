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

// 数量级表示法

export function formatNumber(num:number){
  if(num>1000){
    return Math.round(num/10)/100 + 'k'
  }
  return num.toString()
}

