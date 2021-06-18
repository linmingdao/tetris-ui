import React from 'react';
import { Empty } from 'antd';

const List: React.FC = props => {
  const { children } = props;
  return (
    <div className="list tetris-bricks_formeditor_scrollbar">
      {children && (children as any[]).length ? (
        children
      ) : (
        <Empty style={{ width: '100%' }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="无该类目数据~" />
      )}
    </div>
  );
};

List.displayName = 'List';

export default List;
