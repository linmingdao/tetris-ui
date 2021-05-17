import React, { memo } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { DataType } from '../types';
import NodeLabel from '../NodeLabel/NodeLabel';

const End: React.FC<{ data: DataType }> = ({ data }) => {
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div className="node end">
        <NodeLabel label={data.label} />
      </div>
    </>
  );
};

export default memo(End);
