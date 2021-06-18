import React from 'react';
import Iconfont from '../Iconfont';
import { useDrag } from 'react-dnd';
import { ITemplateItem } from '../types';

const TemplateItem: React.FC<{ config: ITemplateItem }> = ({ config }) => {
  const { label, icon = <Iconfont type="icon-template" /> } = config;

  const [{ isDragging }, drag] = useDrag({
    type: 'TemplateItem',
    item: { type: 'TemplateItem', config },
    collect: (monitor: any) => ({ isDragging: monitor.isDragging() }),
  });

  return (
    <div className="item" style={{ opacity: isDragging ? 0.3 : 1 }}>
      <div ref={drag} className="item-content">
        <div className="preview">{icon}</div>
        <div className="name">{label}</div>
      </div>
    </div>
  );
};

TemplateItem.displayName = 'TemplateItem';

export default TemplateItem;
