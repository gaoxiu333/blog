import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}
export const metadata: Metadata = {
  title: 'Blog page'
};
export default async function Page({ params }: PageProps) {
  const slug = (await params).slug;
  return <div>Slug: {slug}</div>;
}
