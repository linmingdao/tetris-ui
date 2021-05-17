import React from 'react';
import classNames from 'classnames';
import { NodeDescription } from '../types';

export interface SidebarProps {
  editable: boolean;
  nodes: NodeDescription[];
}

const Sidebar: React.FC<SidebarProps> = ({ nodes, editable }) => {
  const onDragStart = (event: any, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return editable ? (
    <aside className="sidebar">
      {nodes.map(({ type, label }) => {
        const classes = classNames('node', type);
        return (
          <div draggable className="dnd-node-wrapper" key={type} onDragStart={event => onDragStart(event, type)}>
            <div className={classes}>
              <div className="label">{label}</div>
            </div>
          </div>
        );
      })}
    </aside>
  ) : (
    <></>
  );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
