import React, { CSSProperties } from 'react';

export interface NodeLabelProps {
  label: string;
  lineClamp?: number;
  style?: CSSProperties;
}

const NodeLabel: React.FC<NodeLabelProps> = ({ label, style = {}, lineClamp = 2 }) => {
  return (
    <div className="label" title={label} style={{ WebkitLineClamp: lineClamp, ...style }}>
      {label}
    </div>
  );
};

NodeLabel.displayName = 'NodeLabel';

export default NodeLabel;
