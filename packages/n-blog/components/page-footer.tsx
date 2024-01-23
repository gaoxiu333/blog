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
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>Copyright © 2024 - All right reserved by Nextjs Industries Ltd</p>
        </aside>
      </footer>
    </Comp>
  );
};

export { PageFooter };
