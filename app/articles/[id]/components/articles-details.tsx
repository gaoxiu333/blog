"use client";

import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { components } from "./mdx";

const ArticlesDetails = (props: { content: any }) => {
  const Component = useMemo(
    () => getMDXComponent(props.content),
    [props.content]
  );
  return (
    <>
      <article className="prose !max-w-none dark:prose-invert">
        <Component components={components} />
      </article>
    </>
  );
};

export { ArticlesDetails };
