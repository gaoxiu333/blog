import { Link } from "@nextui-org/react";
import clsx from "clsx";
import CodeBlock from "./code-block";

export const LINK_STYLES = `text-rose-200 underline decoration-rose-200/20 underline-offset-2 transition-all hover:text-rose-100 hover:decoration-rose-100/40`;
export const FOCUS_VISIBLE_OUTLINE = `focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/70`;

export const components = {
  h1: (props: any) => (
    <h2
      className="relative mt-3 border-t-2 border-rose-200/5 pt-9 text-xl font-medium text-default-600/95 sm:text-3xl"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h3
      className="relative my-5 border-t-2 border-rose-200/5 pt-9 text-xl font-medium text-default-600 sm:text-2xl"
      {...props}
    />
  ),
  h3: (props: any) => (
    <h4 className="text-xl font-medium text-default-600" {...props} />
  ),
  h4: (props: any) => (
    <h5 className="text-lg font-medium text-default-600/90" {...props} />
  ),
  hr: (props: any) => <hr className="border-t-2" {...props} />,
  a: ({ href = "", ...props }) => {
    if (href.startsWith("http")) {
      return (
        <a
          className={clsx(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}
          href={href}
          target="_blank"
          rel="noopener"
          {...props}
        />
      );
    }

    return (
      <Link
        href={href}
        className={clsx(LINK_STYLES, FOCUS_VISIBLE_OUTLINE)}
        {...props}
      />
    );
  },
  ul: (props: any) => (
    <ul
      className="space-y-3 pl-5 list-disc [&_li]:ml-2 [&_li]:pl-2"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol className="list-decimal space-y-3 pl-10" {...props} />
  ),
  strong: (props: any) => <strong className="font-semibold" {...props} />,

  blockquote: (props: any) => (
    <blockquote
      className={clsx(
        "border-l-2 pl-3 [&_em]:block [&_em]:not-italic [&_em]:leading-none [&_em]:before:pr-1 [&_em]:before:content-['—']"
      )}
      {...props}
    />
  ),
  del: (props: any) => (
    <del className="text-default-500/50 line-through" {...props} />
  ),
  pre: (props: any) => <CodeBlock {...props} />,
  p: (props: any) => <p className="my-6" {...props} />,
};
