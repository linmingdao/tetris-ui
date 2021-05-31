import classNames from 'classnames';
import React from 'react';
import { Result } from 'antd';
import { ErrorProps } from './types';

const Error: React.FC<ErrorProps> = ({ message = '未知的错误信息' }) => {
  const classes = classNames('tetris-ui_error');
  return (
    <div className={classes}>
      <Result status="warning" title="出错啦!" subTitle={`错误消息：${message}`} />
    </div>
  );
};

Error.displayName = 'Error';

export default Error;
