export default function Layout({ children }: { children: React.ReactNode }) {
  return <article className="container prose">{children}</article>;
}
