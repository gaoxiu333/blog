import { Slot } from "@radix-ui/react-slot";

interface PageFooterPaops extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const PageFooter: React.FC<PageFooterPaops> = ({
  asChild = false,
  className = "",
}) => {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp className={`w-full border ${className}`}>
      <footer className="footer footer-center bg-base-300 p-4 text-base-content">
        <aside>
          <p>由Nextjs + MDX 构建，开发中...</p>
        </aside>
      </footer>
    </Comp>
  );
};

export { PageFooter };
