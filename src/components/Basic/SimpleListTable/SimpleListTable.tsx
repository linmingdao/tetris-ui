import React, { useEffect, useState } from 'react';
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
  onChange,
  onPageChange,
  onPageSizeChange,
  paginationOption,
  expandable = { rowExpandable: () => false },
}) => {
  const [localPageSize, setLocalPageSize] = useState<number>(pageSize);

  useEffect(() => {
    setLocalPageSize(pageSize);
  }, [pageSize]);

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
      onChange={onChange}
      pagination={{
        size: 'small',
        total,
        pageSize: localPageSize,
        current: currentPage,
        onShowSizeChange,
        onChange: onPageChange,
        showQuickJumper: false,
        showSizeChanger: false,
        showTotal: undefined,
        ...paginationOption,
      }}
      expandable={expandable}
    />
  );
};

SimpleListTable.displayName = 'SimpleListTable';

export default SimpleListTable;
