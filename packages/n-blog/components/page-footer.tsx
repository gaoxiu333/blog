import { Slot } from "@radix-ui/react-slot";

interface PageFooterPaops extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const PageFooter: React.FC<PageFooterPaops> = ({
  asChild = false,
  className = "",
}) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp className={`w-full border ${className}`}>
      <div className="container">footer</div>
    </Comp>
  );
};

export { PageFooter };
