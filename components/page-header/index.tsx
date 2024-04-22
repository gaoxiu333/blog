"use client";

import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import React, { useEffect, useState } from "react";
import { Link } from "@nextui-org/react";
import { PageSearch } from "./componsnts/page-search";
import { Logo } from "./componsnts/logo";
import { MoonIcon, SunIcon } from "./componsnts/switch-icon";
import { useTheme } from "next-themes";
import { LogosGithubIcon } from "./componsnts/github";

const PageHeader = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const onTheme = (event: any) => {
    if (event === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <header
        className={`flex h-[3.75rem] items-center justify-between  sticky top-0 z-10`}
      >
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="lg">
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="hidden"
            />
            <NavbarBrand>
              <Logo />
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent className="hidden gap-4 sm:flex" justify="center">
            <PageSearch />
          </NavbarContent>
          <NavbarContent justify="end">
            <NavbarItem>
              <div className="flex gap-3">
                <div className="cursor-pointer" onClick={() => onTheme(theme)}>
                  {mounted ? (
                    resolvedTheme === "light" ? (
                      <SunIcon />
                    ) : (
                      <MoonIcon />
                    )
                  ) : null}
                </div>
                <Link href="https://github.com/gaoxiu333" target="_blank">
                  <LogosGithubIcon
                    className={`currentColor h-5 w-5 fill-current`}
                  />
                </Link>
              </div>
            </NavbarItem>
          </NavbarContent>
          {/* <NavbarMenu>移动端显示</NavbarMenu> */}
        </Navbar>
      </header>
    </>
  );
};

export { PageHeader };
