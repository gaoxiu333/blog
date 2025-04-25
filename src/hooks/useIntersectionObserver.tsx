import { useEffect, useRef, useState } from 'react';

/**
 * 监听元素可见性的自定义 Hook
 * @param querySelector - 需要监听的元素的 CSS 选择器
 * @param rootMargin - 根元素的外边距，类似 CSS 中的 margin
 * @param threshold - 目标元素可见比例的阈值，范围 0-1
 * @returns 当前可见元素的 id
 */
export const useIntersectionObserver = (
  querySelector: string,
  rootMargin: string,
  threshold: number
) => {
  // 存储当前可见元素的 id
  const [activeIdState, setActiveIdState] = useState('');
  // 存储 IntersectionObserver 实例的引用
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 处理元素可见性变化的回调函数
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // 当元素进入可视区域时
        if (entry.isIntersecting) {
          setActiveIdState(entry.target.id);
        }
      });
    };

    // 确保 observerRef 已定义
    if (typeof observerRef !== 'undefined') {
      // 创建 IntersectionObserver 实例
      observerRef.current = new IntersectionObserver(handleObserver, {
        rootMargin: rootMargin,
        threshold: threshold
      });

      // 获取所有匹配选择器的元素
      const elements = document.querySelectorAll(querySelector);

      // 开始观察每个元素
      elements.forEach((elem) => {
        if (observerRef.current === null) return;
        observerRef.current.observe(elem);
      });
    }

    // 清理函数：组件卸载时停止观察
    return () => {
      observerRef.current?.disconnect();
    };
  }, [querySelector, rootMargin, threshold]);

  return { activeIdState };
};
