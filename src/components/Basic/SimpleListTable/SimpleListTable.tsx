import React from 'react';
import { Table } from 'antd';
import { SimpleListTableProps } from './types';

const SimpleListTable: React.FC<SimpleListTableProps> = ({
  style = {},
  className = '',
  rowkey,
  total,
  columns,
  dataSource,
  loading,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  onPageSizeChange,
  expandable = { rowExpandable: () => false },
}) => {
  function onShowSizeChange(current: number, size: number) {
    onPageSizeChange && onPageSizeChange(size, current);
  }

  return (
    <Table
      size="small"
      rowKey={rowkey}
      columns={columns}
      loading={loading}
      style={{ ...style }}
      className={className}
      dataSource={dataSource}
      pagination={{
        total,
        pageSize,
        // pageSizeOptions,
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
