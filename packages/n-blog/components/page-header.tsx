"use client";

import { Slot } from "@radix-ui/react-slot";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <Comp
      className={`container flex h-[3.75rem] items-center justify-between border ${className}`}
      {...props}
    >
      <div className="flex items-center gap-2">
        <img className="size-6" src="/favicon.svg" alt="logo" />
        {navItems.map((item) => {
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`${
                pathName === item.href ? "text-primary" : "text-gray-500"
              } hover:text-primary`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
      <div>toole</div>
    </Comp>
  );
};

export { PageHeader };
