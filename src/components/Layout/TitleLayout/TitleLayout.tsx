import classNames from 'classnames';
import React, { ReactNode } from 'react';
import TitleBar from '../TitleBar';

export type TitleType = string | React.FunctionComponentElement<unknown> | ReactNode;
export type RenderToolType = () => ReactNode;

export interface TitleLayoutProps {
  title: TitleType;
  url?: string;
  hasBack?: boolean;
  editable?: boolean;
  className?: string;
  renderTool?: RenderToolType;
  titleContentStyle?: React.CSSProperties;
}

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
  const classes = classNames('title-layout', className);

  return (
    <div className={classes}>
      <TitleBar url={url} hasBack={hasBack} renderTool={renderTool}>
        {title}
      </TitleBar>
      <div className="title-content" style={{ ...titleContentStyle }}>
        {!editable && <div className="content-mask-not-edit" />}
        {children}
      </div>
    </div>
  );
};

TitleLayout.displayName = 'TitleLayout';

export default TitleLayout;
