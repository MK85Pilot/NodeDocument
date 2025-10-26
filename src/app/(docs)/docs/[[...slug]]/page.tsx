import { notFound } from 'next/navigation';
import { getDocBySlug, getAllDocSlugs, getFirstDocSlug } from '@/lib/docs';
import { MarkdocRenderer } from '@/components/markdoc/MarkdocRenderer';
import type { Metadata } from 'next';
import { format } from 'date-fns';

type Props = {
  params: {
    slug: string[];
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug || getFirstDocSlug().split('/');
  const doc = getDocBySlug(slug);

  if (!doc) {
    return {};
  }

  return {
    title: `${doc.data.title} | NodePass 文档`,
    description: doc.data.description,
  };
}

export async function generateStaticParams() {
  const slugs = getAllDocSlugs();
  return slugs.map(slug => ({ slug }));
}

export default function DocPage({ params }: Props) {
  // If slug is not provided, we are on the root docs page.
  // We should render the first available document.
  const slug = params.slug || getFirstDocSlug().split('/');
  const doc = getDocBySlug(slug);
  
  // Get current UTC time
  const buildTime = new Date();
  // Convert to Beijing Time (UTC+8)
  const beijingTime = new Date(buildTime.getTime() + 8 * 60 * 60 * 1000);

  if (!doc) {
    notFound();
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline text-foreground">{doc.data.title}</h1>
        {doc.data.description && (
          <p className="mt-2 text-lg text-muted-foreground">{doc.data.description}</p>
        )}
      </header>
      <article className="prose prose-sm md:prose-base dark:prose-invert max-w-none prose-headings:font-headline prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:font-semibold prose-code:font-code">
        <MarkdocRenderer doc={doc.content} />
      </article>
      <footer className="py-8 mt-8 border-t">
        <div className="text-center text-muted-foreground text-sm">
          <p>
            文档版本: v1.8.3 | 编译于: {format(beijingTime, 'yyyy-MM-dd HH:mm:ss')} (UTC+8)
          </p>
          <p className="mt-2">对这个页面有疑问或建议？欢迎在 <a href="https://github.com/yosebyte/nodepass/issues" className="text-primary hover:underline">GitHub</a> 上提出 Issue。</p>
        </div>
      </footer>
    </div>
  );
}
