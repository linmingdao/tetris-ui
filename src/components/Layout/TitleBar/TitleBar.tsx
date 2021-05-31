import React from 'react';
import { Button } from 'antd';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { TitleBarProps } from './types';

const TitleBar: React.FC<TitleBarProps> = ({ url, hasBack = false, className, children, renderTool = () => <></> }) => {
  const history = useHistory();

  const goBack = () => {
    if (url) {
      history?.push(url);
    } else {
      history?.goBack();
    }
  };

  const classes = classNames('tetris-ui_titlebar', className);

  return (
    <div className={classes}>
      {hasBack && <Button shape="round" type="primary" style={{ marginRight: 10 }} icon={<LeftOutlined />} onClick={goBack} />}
      <span className="title-txt">{children}</span>
      <div className="title-append">{renderTool()}</div>
    </div>
  );
};

TitleBar.displayName = 'TitleBar';

export default TitleBar;
