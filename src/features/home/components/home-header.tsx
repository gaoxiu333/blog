import { ModeToggle } from "@/components/theme/mode-toggle";

const HomeHeader = () => {
  return (
    <nav>
      <ul className="flex items-center gap-4">
        <li>首页</li>
        <li>关于</li>
        <li>
          <ModeToggle />
        </li>
      </ul>
    </nav>
  );
};

export { HomeHeader };
