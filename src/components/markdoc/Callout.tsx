import type { ReactNode } from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'destructive';
  title?: string;
  children: ReactNode;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  destructive: XCircle,
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const Icon = icons[type] || Info;
  
  return (
    <Alert variant={type === 'destructive' ? 'destructive' : 'default'} className="my-4">
      <Icon className="h-4 w-4" />
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
