import { useEffect } from "react";

const useCmdKListener = (cb: (event?: KeyboardEvent) => void) => {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const kKey = event.key === "k";
      const cmdKey = event.metaKey || event.ctrlKey;

      if (cmdKey && kKey) {
        cb(event);
      }
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [cb]);
};

export { useCmdKListener };
