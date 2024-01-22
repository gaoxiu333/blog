import { Slot } from "@radix-ui/react-slot";

interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  className = "",
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : "header";
  return (
    <Comp
      className={`container flex h-[3.75rem] items-center justify-between border ${className}`}
      {...props}
    >
      <div>logo</div>
      <div>toole</div>
    </Comp>
  );
};

export { PageHeader };
