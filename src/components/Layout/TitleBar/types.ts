import { ReactNode } from 'react';

export interface TitleBarProps {
  url?: string;
  hasBack?: boolean;
  className?: string;
  renderTool?: () => ReactNode;
}
