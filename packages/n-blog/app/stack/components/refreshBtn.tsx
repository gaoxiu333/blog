"use client";
import { getHost } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { RefreshCcw } from "lucide-react";

export const RefreshBtn = () => {
  const onRefresh = async () => {
    await fetch(`/api/stack`, { method: "PUT" });
  };
  return <Button size="sm" isIconOnly onClick={onRefresh}><RefreshCcw size={14} aria-label="刷新" /></Button>;
};