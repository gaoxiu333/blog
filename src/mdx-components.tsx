import type { MDXComponents } from "mdx/types";
import { TocHighlight } from "./components/toc/highlight";

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    aside: ({ children, ...props }) => {
      const tocHighlightProps = {
        headingsToObserve: "h1, h2, h3",
        rootMargin: "-5% 0px -50% 0px",
        threshold: 1,
        ...props,
      };
      return (
        <>
          {props.id === "articleToc" ? (
            <TocHighlight {...tocHighlightProps}>{children}</TocHighlight>
          ) : (
            <aside {...props}>{children}</aside>
          )}
        </>
      );
    },
    ...components,
  };
}
