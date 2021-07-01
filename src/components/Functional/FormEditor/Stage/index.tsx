import { Empty } from 'antd';
import { nanoid } from 'nanoid';
import classnames from 'classnames';
import { useDrop } from 'react-dnd';
import { StageItem } from '../types';
import React, { useContext } from 'react';
import SortableItem from './SortableItem';
import { findStageItemByIndex } from '../utils/helper';
import { EditorContext } from '../EditorContext';
import SortableContainer from './SortableContainer';

const Stage: React.FC<{
  stageItemList: StageItem[];
  onChange: (stageItemList: StageItem[]) => void;
}> = ({ onChange, stageItemList }) => {
  const isNotEmpty = !!stageItemList.length;
  const { stageBgColor, stageActiveColor, stageDropColor } = useContext(EditorContext);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ['TemplateItem'],
    drop(item: any, monitor) {
      if (!monitor.didDrop()) {
        // 从模板新增表单控件到舞台
        onChange([...stageItemList, { id: nanoid(), name: item.config.name, props: { ...item.config.props, name: nanoid() } }]);
      }
    },
    collect: monitor => ({ isOver: monitor.isOver(), canDrop: monitor.canDrop() }),
  });

  // 高亮提示 开始拖拽 以及 可以完成拖拽放置
  const isActive = canDrop && isOver;
  let backgroundColor = stageBgColor ? stageBgColor : '#f3f2f2a3';
  const $collaOutline: HTMLElement | null = document.querySelector('.colla-outline');
  if ($collaOutline) {
    $collaOutline.style['backgroundColor'] = backgroundColor;
  }
  if (isActive) {
    backgroundColor = stageActiveColor ? stageActiveColor : '#1890ff2b';
    if ($collaOutline) {
      $collaOutline.style['backgroundColor'] = backgroundColor;
    }
  } else if (canDrop) {
    backgroundColor = stageDropColor ? stageDropColor : '#1890ff1c';
    if ($collaOutline) {
      $collaOutline.style['backgroundColor'] = backgroundColor;
    }
  }

  function onRemove(index: string, stageItem: StageItem) {
    if (index.includes('-')) {
      // 容器内嵌节点
      const { parent, child } = findStageItemByIndex(index, stageItemList);
      if (parent && parent.children) {
        parent.children = parent.children.filter(item => item.id !== child?.id);
        onChange(stageItemList);
      }
    } else {
      // 根节点，直接删除
      onChange(stageItemList.filter(item => item.id !== stageItem.id));
    }
  }

  function onUpdate(index: string, allValues: unknown) {
    if (index.includes('-')) {
      // 容器内嵌节点
      const { parent, child } = findStageItemByIndex(index, stageItemList);
      if (parent && parent.children && child) {
        child.props = allValues;
        onChange(stageItemList);
      }
    } else {
      // 根节点，直接更新
      stageItemList[Number(index)].props = allValues;
      onChange(stageItemList);
    }
  }

  function onUp(index: string) {
    if (index.includes('-')) {
      // 容器内嵌节点排序
      const { parent, childIndex } = findStageItemByIndex(index, stageItemList);
      if (parent && parent.children) {
        if (!childIndex) return;
        const idx = childIndex;
        const preIdx = idx - 1;
        [parent.children[idx], parent.children[preIdx]] = [parent.children[preIdx], parent.children[idx]];
        onChange(stageItemList);
      }
    } else {
      // 根节点，直接排序
      const idx = Number(index);
      if (!idx) return;
      const preIdx = idx - 1;
      [stageItemList[idx], stageItemList[preIdx]] = [stageItemList[preIdx], stageItemList[idx]];
      onChange(stageItemList);
    }
  }

  function onDown(index: string) {
    if (index.includes('-')) {
      // 容器内嵌节点排序
      const { parent, childIndex } = findStageItemByIndex(index, stageItemList);
      if (parent && parent.children && childIndex !== undefined) {
        if (childIndex === parent.children.length - 1) return;
        const idx = childIndex;
        const nextIdx = idx + 1;
        [parent.children[nextIdx], parent.children[idx]] = [parent.children[idx], parent.children[nextIdx]];
        onChange(stageItemList);
      }
    } else {
      // 根节点，直接排序
      const idx = Number(index);
      if (idx === stageItemList.length - 1) return;
      const nextIdx = idx + 1;
      [stageItemList[nextIdx], stageItemList[idx]] = [stageItemList[idx], stageItemList[nextIdx]];
      onChange(stageItemList);
    }
  }

  function onDropChild() {
    // 请注意，由于添加容器内嵌的子组件是直接拿到父容器引用直接push的，
    // 所以 onDropChild 只是通知历史栈记录该操作以支持撤销和恢复
    onChange(stageItemList);
  }

  return (
    <div ref={drop} className={classnames('stage', 'tetris-bricks_formeditor_scrollbar', { 'empty-list': !isNotEmpty })} style={{ backgroundColor }}>
      <div className={isActive ? 'item-disabled' : ''}>
        {isNotEmpty ? (
          stageItemList.map((item, index) =>
            item.name === 'SortableContainer' ? (
              <SortableContainer
                key={item.id}
                index={index + ''}
                itemData={item}
                stageItemList={stageItemList}
                onUp={onUp}
                onDown={onDown}
                onRemove={onRemove}
                onUpdate={onUpdate}
                onDropChild={onDropChild}
              />
            ) : (
              <SortableItem
                key={item.id}
                index={index + ''}
                itemData={item}
                stageItemList={stageItemList}
                onUp={onUp}
                onDown={onDown}
                onRemove={onRemove}
                onUpdate={onUpdate}
              />
            )
          )
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="赶快拖拽组件来组合你的表单页面吧~" />
        )}
      </div>
    </div>
  );
};

Stage.displayName = 'Stage';

export default Stage;
