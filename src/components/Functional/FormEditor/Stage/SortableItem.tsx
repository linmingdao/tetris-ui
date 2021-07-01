import React from 'react';
import { Mode } from '../constants';
import SortHandler from './SortHandler';
import DynamicEngine from '../DynamicEngine';
import { ISortableItemProps } from '../types';
import { getComponentErrorTips } from '../utils/helper';

const SortableItem: React.FC<ISortableItemProps> = ({ index, itemData, stageItemList, onRemove, onUp, onDown, onUpdate }) => {
  const { name, rules = [] } = itemData.props;

  return (
    <SortHandler
      index={index}
      itemData={itemData}
      className="sort-item"
      dropConfig={{ accept: ['SortableContainer', 'SortableItem', 'TemplateItem'] }}
      dragConfig={{
        item: { type: 'SortableItem', id: itemData.id, data: itemData, index },
        collect: (monitor: any) => ({ isDragging: monitor.isDragging(), opacity: monitor.isDragging() ? 0 : 1 }),
      }}
      stageItemList={stageItemList}
      onUp={onUp}
      onDown={onDown}
      onRemove={onRemove}
      onUpdate={onUpdate}
    >
      {name ? (
        rules.includes('Required') ? (
          <DynamicEngine
            templateConfig={itemData}
            componentProps={{ ...itemData.props, mode: Mode.Stage, rules: [{ required: true, message: '该字段必填哟~~' }] }}
          />
        ) : (
          <DynamicEngine templateConfig={itemData} componentProps={{ ...itemData.props, mode: itemData.Stage }} />
        )
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: getComponentErrorTips(name),
          }}
        ></div>
      )}
    </SortHandler>
  );
};

SortableItem.displayName = 'SortableItem';

export default SortableItem;
