import { throttle } from "lodash";
import { useEffect, useState } from "react";

export const useActiveHeading = (headings: any) => {
  const [activeHeadingId, setActiveHeading] = useState(null);
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (window.pageYOffset === 0) {
        return setActiveHeading(null);
      }

      let headingBoxes = headings.map(({ id }: any) => {
        const elem: any = document.querySelector(`${id}`);
        return { id: id, box: elem.getBoundingClientRect() };
      });

      const TOP_OFFSET = 120;
      let firstHeadingInViewport = headingBoxes.find(({ box }: any) => {
        return box.bottom > TOP_OFFSET && box.top < window.innerHeight;
      });

      if (!firstHeadingInViewport) {
        const reversedBoxes = [...headingBoxes].reverse();

        firstHeadingInViewport = reversedBoxes.find(({ box }) => {
          return box.bottom < TOP_OFFSET;
        });
      }

      if (!firstHeadingInViewport) {
        setActiveHeading(null);
      } else if (firstHeadingInViewport.id !== activeHeadingId) {
        setActiveHeading(firstHeadingInViewport.id);
      }
    }, 500);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeHeadingId, headings]);

  return activeHeadingId;
};
