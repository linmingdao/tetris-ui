import React from 'react';
import { DoubleRightOutlined } from '@ant-design/icons';
import { CollapseProps } from '../types';

const Collapse: React.FC<CollapseProps> = props => {
  const { onClick, collapse } = props;

  return (
    <div className="colla-outline">
      <span className="colla" onClick={onClick}>
        <DoubleRightOutlined rotate={collapse ? 0 : 180} style={{ fontSize: 15 }} />
      </span>
    </div>
  );
};

Collapse.displayName = 'Collapse';

export default Collapse;
