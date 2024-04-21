"use client";

import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import CodeBlock from "./code-block";

const ArticlesDetails = (props: { content: any }) => {
  const Component = useMemo(
    () => getMDXComponent(props.content),
    [props.content]
  );
  return (
    <>
      <article className="prose !max-w-none dark:prose-invert">
        <Component components={{ pre: CodeBlock as any }} />
      </article>
    </>
  );
};

export { ArticlesDetails };
