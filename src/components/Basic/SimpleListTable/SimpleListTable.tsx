import React, { useState, CSSProperties } from 'react';
import { Table } from 'antd';

export interface ExpandableConfig {
  rowExpandable: (record: any) => boolean;
  expandedRowRender?: (record: any) => JSX.Element;
}
export interface SimpleListTableProps {
  style?: CSSProperties;
  className?: string;
  rowkey: string;
  columns: any[];
  dataSource: any[];
  total: number;
  loading?: boolean;
  currentPage?: number;
  onPageChange?: (cPage: number) => void;
  expandable?: ExpandableConfig;
}

const SimpleListTable: React.FC<SimpleListTableProps> = ({
  style = {},
  className = '',
  rowkey,
  columns,
  dataSource,
  loading,
  total,
  currentPage = 1,
  onPageChange,
  expandable = { rowExpandable: () => false },
}) => {
  const [pageSizeOptions] = useState(['10', '20', '50', '100', '150']);
  const [pageSize, setPageSize] = useState(Number(pageSizeOptions[0]));

  function onShowSizeChange(current: number, size: number) {
    setPageSize(size);
  }

  return (
    <Table
      rowKey={rowkey}
      columns={columns}
      loading={loading}
      dataSource={dataSource}
      size="small"
      style={{ ...style }}
      className={className}
      pagination={{
        total,
        pageSize,
        pageSizeOptions,
        current: currentPage,
        onShowSizeChange,
        onChange: onPageChange,
      }}
      expandable={expandable}
    />
  );
};

SimpleListTable.displayName = 'SimpleListTable';

export default SimpleListTable;
