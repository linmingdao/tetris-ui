import classnames from 'classnames';
import { useDrop } from 'react-dnd';
import Attributes from '../Attributes';
import { Drawer, Popconfirm } from 'antd';
import { ISortHandlerProps } from '../types';
import { EditorContext } from '../EditorContext';
import React, { FC, useContext, useRef, useState } from 'react';
import { ArrowUpOutlined, MinusCircleOutlined, SettingOutlined, ToolOutlined } from '@ant-design/icons';

const AttrDrawer: FC<{
  payload: { type: string; data: any };
  onClose: () => void;
  onUpdate: (index: string, allValues: any, changedValues: any) => void;
}> = ({ payload, onClose, onUpdate }) => {
  const { attrPanelWidth } = useContext(EditorContext);

  if (!payload) return <></>;

  switch (payload.type) {
    case 'attr':
      return (
        <Drawer
          title={
            <span>
              <ToolOutlined /> 属性设置
            </span>
          }
          visible={true}
          destroyOnClose
          placement="right"
          onClose={onClose}
          maskClosable={false}
          width={attrPanelWidth ? attrPanelWidth : 400}
        >
          <Attributes index={payload.data.index} config={payload.data.config} onClose={onClose} onUpdate={onUpdate} />
        </Drawer>
      );
    default:
      return <></>;
  }
};

const SortHandler: FC<ISortHandlerProps> = ({ index, className, children, itemData, dropConfig, onUp, onDown, onRemove, onUpdate }) => {
  const [attrDrawerPayload, setAttrDrawerPayload] = useState<any | undefined>();

  const ref = useRef<HTMLDivElement>(null);
  const [{ isOverCurrent }, drop] = useDrop({ ...dropConfig });
  drop(ref);

  function handleUp(e: React.MouseEvent) {
    e?.stopPropagation();
    onUp(index, itemData);
  }

  function handleDown(e: React.MouseEvent) {
    e?.stopPropagation();
    onDown(index, itemData);
  }

  function handleRemove(e: React.MouseEvent | undefined) {
    e?.stopPropagation();
    onRemove(index, itemData);
  }

  return (
    <div className={classnames('sort-handler', className)} ref={ref}>
      <div className="item" style={{ backgroundColor: isOverCurrent ? '#fff5989c' : '#fff' }} onClick={e => e.stopPropagation()}>
        <div className={classnames('label-wrapper', { required: itemData.props.rules && itemData.props.rules.includes('Required') })}>
          {itemData.props.label || '标题'}
        </div>
        <div className="component-wrapper">{children}</div>
        <div className="operator">
          <Popconfirm title="确定要删除么?" onConfirm={handleRemove} okText="确定" cancelText="取消">
            <MinusCircleOutlined style={{ color: '#f55757' }} onClick={e => e.stopPropagation()} />
          </Popconfirm>
          <ArrowUpOutlined style={{ color: '#555' }} onClick={handleUp} />
          <ArrowUpOutlined style={{ color: '#555' }} rotate={180} onClick={handleDown} />
          <SettingOutlined style={{ color: '#555' }} onClick={() => setAttrDrawerPayload({ type: 'attr', data: { index, config: itemData } })} />
        </div>
      </div>
      <AttrDrawer payload={attrDrawerPayload} onClose={() => setAttrDrawerPayload(undefined)} onUpdate={onUpdate} />
    </div>
  );
};

SortHandler.displayName = 'SortHandler';

export default SortHandler;
