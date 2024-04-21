import { Button } from "@nextui-org/react";
import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";

interface CodeBlockProps {
  children: React.ReactNode;
}

export default function CodeBlock({ children, ...props }: CodeBlockProps) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  async function copy() {
    if (copied) return;
    setCopied(true);
    await navigator.clipboard.writeText(preRef.current?.textContent ?? "");
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="code-block relative group">
      <pre {...props} ref={preRef}>
        {children}
      </pre>
      <Button
        className="invisible group-hover:visible absolute border-none top-[6px] right-[8px]"
        isIconOnly
        variant="ghost"
        size="sm"
        onClick={copy}
      >
        {copied ? (
          <Check className="text-green-500" width={16} height={16} />
        ) : (
          <Copy width={16} height={16} />
        )}
      </Button>
    </div>
  );
}
