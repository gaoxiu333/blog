import { throttle } from "lodash";
import { useEffect, useState } from "react";

export function useScrollListener() {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const throttledHandleScroll = throttle((e: Event) => {
      const scrollPosition = window.scrollY || window.pageYOffset;
      setScrollY(scrollPosition);
    }, 100);
    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  return { scrollY };
}
