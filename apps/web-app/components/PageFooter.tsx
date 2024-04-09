interface PageFooterPaops extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const PageFooter: React.FC<PageFooterPaops> = ({
  asChild = false,
  className = "",
}) => {
  const Comp = "div";
  return (
    <Comp className={`w-full ${className}`}>
      <footer className="p-4 text-center text-default-500 text-sm">
        <aside>
          <p>由Nextjs + MDX 构建，开发中...</p>
        </aside>
      </footer>
    </Comp>
  );
};

export { PageFooter };
