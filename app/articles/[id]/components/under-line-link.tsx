export const UnderlineLink: React.FC<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({ className, ...props }) => {
  return (
    <a
      className="animated-underline with-dots cursor-pointer"
      target="_blank"
      rel="noopener"
      {...props}
    />
  );
};
