import React from 'react';
import { Empty } from 'antd';
import { nanoid } from 'nanoid';
import SortHandler from './SortHandler';
import SortableItem from './SortableItem';
import { DropTargetMonitor } from 'react-dnd';
import { getComponentErrorTips } from '../utils/helper';
import { ISortableContainerProps } from '../types';

const SortableContainer: React.FC<ISortableContainerProps> = ({ itemData, index, stageItemList, onRemove, onDown, onUp, onUpdate, onDropChild }) => {
  /**
   * 递归多层容器嵌套
   * @param item
   * @param parentIndex
   * @returns
   */
  function loop(item: any, parentIndex: string) {
    const { name } = item.props;

    // 空的容器组件
    if (!item.children || !item.children.length)
      return (
        <div key={item.id}>
          <div>
            {name ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="该容器还未嵌入任何组件哟~" />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: getComponentErrorTips(name) }}></div>
            )}
          </div>
        </div>
      );

    // 非空容器组件
    if (item.children && item.children.length)
      return item.children.map((itemData: any, childIndex: number) => {
        const idx = `${parentIndex}-${childIndex}`;
        if (itemData.name === 'SortableContainer') {
          return (
            <div key={itemData.id}>
              <div>
                {name ? (
                  <SortableContainer
                    index={idx}
                    itemData={itemData}
                    stageItemList={stageItemList}
                    onUp={onUp}
                    onDown={onDown}
                    onRemove={onRemove}
                    onUpdate={onUpdate}
                    onDropChild={onDropChild}
                  >
                    {loop(itemData, idx)}
                  </SortableContainer>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: getComponentErrorTips(name) }}></div>
                )}
              </div>
            </div>
          );
        } else {
          return (
            <SortableItem
              key={itemData.id}
              index={idx}
              itemData={itemData}
              stageItemList={stageItemList}
              onRemove={onRemove}
              onUp={onUp}
              onDown={onDown}
              onUpdate={onUpdate}
            />
          );
        }
      });
  }

  return (
    <SortHandler
      key={itemData.id}
      index={index}
      itemData={itemData}
      dropConfig={{
        accept: ['TemplateItem'],
        drop(item: any, monitor: DropTargetMonitor) {
          const didDrop = monitor.didDrop();
          if (didDrop) return;
          if (!itemData.children) itemData.children = [];
          itemData.children.push({ id: nanoid(), name: item.config.name, props: { ...item.config.props, name: nanoid() } });
          // 请注意，由于添加容器内嵌的子组件是直接拿到父容器引用直接push的，
          // 所以 onDropChild 只是通知历史栈记录该操作以支持撤销和恢复
          onDropChild();
        },
        collect: (monitor: any) => ({ isOver: monitor.isOver(), isOverCurrent: monitor.isOver({ shallow: true }) }),
      }}
      dragConfig={{
        item: { type: 'SortableContainer', id: itemData.id, index, data: itemData },
        collect: (monitor: any) => ({ isDragging: monitor.isDragging(), opacity: monitor.isDragging() ? 0 : 1 }),
      }}
      stageItemList={stageItemList}
      onUp={onUp}
      onDown={onDown}
      onRemove={onRemove}
      onUpdate={onUpdate}
    >
      {loop(itemData, index)}
    </SortHandler>
  );
};

export default SortableContainer;
