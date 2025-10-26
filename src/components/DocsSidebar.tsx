'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import { Code } from 'lucide-react';
import type { NavCategory } from '@/lib/docs';
import { useSidebar } from '@/components/ui/sidebar';
import { ScrollArea } from './ui/scroll-area';
import { useEffect, useState } from 'react';

interface DocsSidebarProps {
  navigation: NavCategory[];
}

export function DocsSidebar({ navigation }: DocsSidebarProps) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
           <div className="flex-grow flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="h-6 w-6 text-primary"
              fill="currentColor"
            >
              <path d="M168,40H88A48,48,0,0,0,40,88v80a48,48,0,0,0,48,48h80a48,48,0,0,0,48-48V88A48,48,0,0,0,168,40Zm24,128a24,24,0,0,1-24,24H88a24,24,0,0,1-24-24V88A24,24,0,0,1,88,64h80a24,24,0,0,1,24,24ZM128,80a32,32,0,1,0,32,32A32,32,0,0,0,128,80Zm0,40a8,8,0,1,1-8-8A8,8,0,0,1,128,120Z"/>
            </svg>
            <h1 className="text-xl font-bold font-headline text-sidebar-primary-foreground">NodePass</h1>
          </div>
          <SidebarTrigger className="md:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent asChild>
        {isClient ? (
          <ScrollArea>
            <div className="flex flex-col gap-4 p-2 md:p-0">
              {navigation.map((category) => (
                <SidebarGroup key={category.title}>
                  <SidebarGroupLabel>{category.title}</SidebarGroupLabel>
                  <SidebarMenu>
                    {category.items.map((item) => (
                      <SidebarMenuItem key={item.slug}>
                        <SidebarMenuButton
                          asChild
                          isActive={pathname === `/docs/${item.slug}`}
                          onClick={() => setOpenMobile(false)}
                          tooltip={item.title}
                        >
                          <Link href={`/docs/${item.slug}`}>{item.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroup>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col gap-4 p-2 md:p-0">
            {navigation.map((category) => (
              <SidebarGroup key={category.title}>
                <SidebarGroupLabel>{category.title}</SidebarGroupLabel>
                <SidebarMenu>
                  {category.items.map((item) => (
                    <SidebarMenuItem key={item.slug}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === `/docs/${item.slug}`}
                        onClick={() => setOpenMobile(false)}
                        tooltip={item.title}
                      >
                        <Link href={`/docs/${item.slug}`}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            ))}
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
