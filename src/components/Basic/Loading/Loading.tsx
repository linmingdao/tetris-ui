import React from 'react';
import { Spin } from 'antd';
import { LoadingProps } from './types';

const Loading: React.FC<LoadingProps> = ({ tip = '数据玩命加载中...' }) => {
  return (
    <div className="tetris-ui_loading">
      <Spin tip={tip} />
    </div>
  );
};

Loading.displayName = 'Loading';

export default Loading;
