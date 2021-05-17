import classNames from 'classnames';
import React from 'react';
import { Space } from 'antd';

export type AlignType = 'right' | 'left';

export interface FilterBoxProps {
  disableSpace?: boolean;
  align?: AlignType;
  className?: string;
}

const FilterBox: React.FC<FilterBoxProps> = ({ align, children, disableSpace = false }) => {
  const classes = classNames('filter-box', align);
  return <div className={classes}>{disableSpace ? children : <Space>{children}</Space>}</div>;
};

FilterBox.displayName = 'FilterBox';

export default FilterBox;
