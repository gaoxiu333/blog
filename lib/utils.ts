import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getHost(){
  return `${process.env.NEXT_PUBLIC_BASE_URL}`;
}

// 数量级表示法

export function formatNumber(num:number){
  if(!num) return num
  if(num>1000){
    return Math.round(num/10)/100 + 'k'
  }
  return num.toString()
}

