import { ReactNode } from 'react';

export type Layout = 'vertical' | 'horizontal';
export type LabelPlacement = 'left' | 'right' | 'center';
export interface LabelWrapperProps {
  layout?: Layout;
  labelWidth?: number;
  noColon?: boolean;
  required?: boolean;
  label: string | ReactNode;
  labelPlacement?: LabelPlacement;
}
