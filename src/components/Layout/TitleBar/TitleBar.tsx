import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

export interface TitleBarProps {
  url?: string;
  hasBack?: boolean;
  className?: string;
  renderTool?: () => ReactNode;
}

const TitleBar: React.FC<TitleBarProps> = ({ url, hasBack = false, className, children, renderTool = () => <></> }) => {
  const history = useHistory();

  const goBack = () => {
    if (url) {
      history && history.push && history.push(url);
    } else {
      history && history.goBack && history.goBack();
    }
  };

  const classes = classNames('title-bar', className);

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
