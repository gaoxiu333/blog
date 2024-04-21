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
    <div className="code-block">
      <pre {...props} ref={preRef}>
        {children}
      </pre>
      <button onClick={copy} className="copy">
        <span className="sr-only">Copy</span>
        {copied ? <Check /> : <Copy />}
      </button>

      <style jsx>
        {`
          .code-block {
            position: relative;
          }

          .copy {
            cursor: pointer;
            position: absolute;
            top: 14px;
            right: 14px;
            font-size: 1rem;
            background: none;
            border-radius: var(--border-base);
            border: none;
            transition: transform 0.1s ease;
          }

          .copy:active {
            transform: scale(0.9);
          }
        `}
      </style>
    </div>
  );
}
