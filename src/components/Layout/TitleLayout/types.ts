import { ReactNode } from 'react';

export type TitleType = string | React.FunctionComponentElement<unknown> | ReactNode;

export type RenderToolType = () => ReactNode;

export interface TitleLayoutProps {
  title: TitleType;
  url?: string;
  hasBack?: boolean;
  editable?: boolean;
  className?: string;
  renderTool?: RenderToolType;
  titleContentStyle?: React.CSSProperties;
}
