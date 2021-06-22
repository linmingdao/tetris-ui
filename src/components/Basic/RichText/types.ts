import React from 'react';

export interface RichTextProps {
  value?: string;
  readOnly?: boolean;
  placeholder?: string;
  contentStyle?: React.CSSProperties;
  onChange?: (value: string) => void;
}
