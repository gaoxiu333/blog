"use client";

import { Slot } from "@radix-ui/react-slot";
import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import React, { use, useEffect } from "react";
import { Link, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { useTheme } from "next-themes";
import LogoSvg from "@/public/icons/javascript.svg";
import { useThemeSession } from "@/app/hooks/useThemeSection";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  className?: string;
}

const navItems = [
  {
    name: "首页",
    href: "/",
    current: true,
  },
  {
    name: "文章",
    href: "/posts",
    current: false,
  },
  {
    name: "关于",
    href: "/about",
    current: false,
  },
];

const PageHeader: React.FC<PageHeaderProps> = ({
  className = "",
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "header";
  const pathName = usePathname();
  const { theme, switchTheme, mounted } = useThemeSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const onTheme = (event: any) => {
    if (event.target.checked) {
      switchTheme("light");
    } else {
      switchTheme("dark");
    }
  };

  return (
    <Comp
      className={`container flex h-[3.75rem] items-center justify-between ${className}`}
      {...props}
    >
      <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            {/* <Image
              className="size-6 rounded-none dark:bg-white"
              src="/icons/javascript.svg"
              alt="logo"
            /> */}
            <LogoSvg
              size={12}
              className={`currentColor h-5 w-5 fill-current`}
            />
          </NavbarBrand>
          {/* <p suppressHydrationWarning>当前主题：{theme || ""}</p> */}
        </NavbarContent>

        <NavbarContent className="hidden gap-4 sm:flex" justify="center">
          {navItems.map((item) => {
            return (
              <NavbarItem key={item.href} isActive={item.href === pathName}>
                <Link color="foreground" href={item.href}>
                  {item.name}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                checked={theme === "light"}
                onChange={onTheme}
              />
              <svg
                className="swap-on size-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
              <svg
                className="swap-off size-5 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {navItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <Link
                color={pathName === item.href ? "primary" : "foreground"}
                className="w-full"
                href={item.href}
                size="lg"
              >
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </Comp>
  );
};

export { PageHeader };
