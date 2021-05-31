import React from 'react';
import classNames from 'classnames';
import TitleBar from '../TitleBar';
import { TitleLayoutProps } from './types';

const TitleLayout: React.FC<TitleLayoutProps> = ({
  title,
  url,
  editable = true,
  hasBack = false,
  className,
  renderTool,
  titleContentStyle = {},
  children,
}) => {
  const classes = classNames('tetris-ui_titlelayout', className);
  return (
    <div className={classes}>
      <TitleBar url={url} hasBack={hasBack} renderTool={renderTool}>
        {title}
      </TitleBar>
      <div className="title-content" style={{ ...titleContentStyle }}>
        {editable ? <></> : <div className="content-mask-not-edit" />}
        {children}
      </div>
    </div>
  );
};

TitleLayout.displayName = 'TitleLayout';

export default TitleLayout;
