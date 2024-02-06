"use client"
import { useEffect } from "react";

export function Log ({ info }:any){
  useEffect(()=>{

    console.log('=======================',info)
  },[info])
  return null
}