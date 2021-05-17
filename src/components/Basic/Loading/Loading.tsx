import React from 'react';
import { Spin } from 'antd';
import classNames from 'classnames';

export interface LoadingProps {
  tip?: string;
}

const Loading: React.FC<LoadingProps> = ({ tip = '数据玩命加载中...' }) => {
  const classes = classNames('loading-box');
  return (
    <div className={classes}>
      <Spin tip={tip} />
    </div>
  );
};

Loading.displayName = 'Loading';

export default Loading;
