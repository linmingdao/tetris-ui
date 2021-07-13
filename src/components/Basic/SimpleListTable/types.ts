import { CSSProperties } from 'react';
import { ExpandableConfig } from 'antd/lib/table/interface';

// export interface ExpandableConfig {
//   rowExpandable: (record: any) => boolean;
//   expandedRowRender?: (record: any) => JSX.Element;
// }

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
  expandable?: ExpandableConfig<any>;
  paginationOption?: PaginationOption;
  onChange?: (pagination: any, filters: any, sorter: any, extra: any) => void;
  onPageChange?: (current: number) => void;
  onPageSizeChange?: (size: number, current: number) => void;
}

export interface PaginationOption {
  size?: 'default' | 'small';
  showQuickJumper?: boolean;
  showTotal?: (total: number, range: [number, number]) => React.ReactNode;
}
