import { CSSProperties } from 'react';

export interface ExpandableConfig {
  rowExpandable: (record: any) => boolean;
  expandedRowRender?: (record: any) => JSX.Element;
}

export interface SimpleListTableProps {
  rowkey: string;
  total: number;
  columns: any[];
  dataSource: any[];
  loading?: boolean;
  className?: string;
  pageSize?: number;
  currentPage?: number;
  style?: CSSProperties;
  expandable?: ExpandableConfig;
  onPageChange?: (current: number) => void;
  onPageSizeChange?: (size: number, current: number) => void;
}
