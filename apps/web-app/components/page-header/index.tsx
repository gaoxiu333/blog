"use client";

import { usePathname } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import React from "react";
import { Link, NavbarMenu } from "@nextui-org/react";
import GithubSvg from "@/public/icons/github.svg";
import { PageSearch } from "./componsnts/page-search";
import { useThemeSession } from "@/client/hooks/useThemeSection";
import { Logo } from "./componsnts/logo";
import { MoonIcon, SunIcon } from "./componsnts/switch-icon";

const PageHeader: React.FC = () => {
  const pathName = usePathname();
  const { theme, switchTheme, mounted } = useThemeSession();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const onTheme = (event: any) => {
    if (event === "dark") {
      switchTheme("light");
    } else {
      switchTheme("dark");
    }
  };

  return (
    <>
      <header
        className={`flex h-[3.75rem] items-center justify-between  sticky top-0 z-10`}
      >
        <Navbar onMenuOpenChange={setIsMenuOpen} maxWidth="lg">
          <NavbarContent>
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="sm:hidden"
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
                  {mounted && theme === "light" ? <SunIcon /> : <MoonIcon />}
                </div>
                <Link href="https://github.com/gaoxiu333" target="_blank">
                  <GithubSvg className={`currentColor h-5 w-5 fill-current`} />
                </Link>
              </div>
            </NavbarItem>
          </NavbarContent>
          <NavbarMenu>移动端显示</NavbarMenu>
        </Navbar>
      </header>
    </>
  );
};

export { PageHeader };
