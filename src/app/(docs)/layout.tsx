import { DocsSidebar } from '@/components/DocsSidebar';
import { getNavigation } from '@/lib/docs';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigation = getNavigation();

  return (
    <div className="flex min-h-screen">
      <DocsSidebar navigation={navigation} />
      <SidebarInset className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm md:justify-end">
          <SidebarTrigger className="md:hidden" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/yosebyte/nodepass" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </SidebarInset>
    </div>
  );
}
