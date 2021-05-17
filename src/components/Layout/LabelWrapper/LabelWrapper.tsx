import React, { ReactNode } from 'react';
import classNames from 'classnames';

export type LabelPlacement = 'left' | 'right' | 'center';

export type Layout = 'vertical' | 'horizontal';

export interface LabelWrapperProps {
  layout?: Layout;
  labelWidth?: number;
  noColon?: boolean;
  required?: boolean;
  label: string | ReactNode;
  labelPlacement?: LabelPlacement;
}

const LabelWrapper: React.FC<LabelWrapperProps> = ({
  label,
  labelWidth = 100,
  noColon = false,
  required = false,
  layout = 'horizontal',
  labelPlacement = 'right',
  children,
}) => {
  const classes = classNames('tetris-bricks_labelwrapper', layout);
  return (
    <div className={classes}>
      <div style={{ width: labelWidth }} className={`tetris-bricks_labelwrapper_label tetris-bricks_labelwrapper_label--${labelPlacement}`}>
        <span style={{ color: '#ff4d4f', paddingRight: 3 }}>{required ? '*' : ''}</span>
        {label}
        <span style={{ paddingRight: 3, paddingLeft: 2 }}>{noColon ? '' : ':'}</span>
      </div>
      <div className="tetris-bricks_labelwrapper_content">{children}</div>
    </div>
  );
};

export default LabelWrapper;
