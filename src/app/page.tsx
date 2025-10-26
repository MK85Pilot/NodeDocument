"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/docs/1-getting-started/1-introduction');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <p className="text-muted-foreground">正在跳转到文档...</p>
    </div>
  );
}
