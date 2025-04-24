import { Logo } from "./logo";

import { ModeToggle } from "../theme/mode-toggle";
import Link from "next/link";

export function Nav() {
  return (
    <nav className="container m-auto flex items-center justify-between h-[64px]">
      <Link href="/">
        <Logo />
      </Link>
      <ul className="flex items-center gap-4">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">About</li>
        <li className="cursor-pointer">Effect</li>
      </ul>
      <ModeToggle />
    </nav>
  );
}
