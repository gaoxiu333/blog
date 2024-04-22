"use client";

import { Card, CardBody, Link } from "@nextui-org/react";
import dayjs from "dayjs";

export const ArticleItem = ({ frontmatter, readingTime, fileName }: any) => {
  return (
    <Card className="py-3 bg-white/5" isHoverable>
      <Link
        className="text-xl text-default-600/90 transition duration-300 line-clamp-2 "
        href={`/articles/${fileName}`}
      >
        <CardBody>
          {frontmatter.title}
          <p className="mt-1 text-sm text-default-400">
            <span>{dayjs(frontmatter.createdAt).format("YYYY-MM-DD")}</span> ·{" "}
            <span>{readingTime}</span>
          </p>
          <p className="mt-2 text-base">{frontmatter.description}</p>
        </CardBody>
      </Link>
    </Card>
  );
};
