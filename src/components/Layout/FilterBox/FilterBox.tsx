import classNames from 'classnames';
import React from 'react';
import { Space } from 'antd';
import { FilterBoxProps } from './types';

const FilterBox: React.FC<FilterBoxProps> = ({ align = 'right', children, disableSpace = false }) => {
  const classes = classNames('tetris-ui_filterbox', `tetris-ui_filterbox--${align}`);
  return <div className={classes}>{disableSpace ? children : <Space>{children}</Space>}</div>;
};

FilterBox.displayName = 'FilterBox';

export default FilterBox;
