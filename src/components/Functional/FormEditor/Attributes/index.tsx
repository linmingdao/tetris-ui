import React from 'react';
import { Empty, message } from 'antd';
import { Mode } from '../constants';
import { IAttributes } from '../types';
import DynamicEngine from '../DynamicEngine';
import { findSiblingStageItemsByIndex } from '../utils/helper';

const Attributes: React.FC<IAttributes> = ({ index, config, onClose, onUpdate, stageItemList }) => {
  function onSave(allValues: any) {
    const siblingStageItems = findSiblingStageItemsByIndex(index, stageItemList);
    const res = siblingStageItems.find(item => item.props.name === allValues.name);
    if (res) {
      message.warning(`兄弟控件之间的【name】属性需要保证唯一，该控件与【类型为：${res.name}，label为：${res.props.label}】的控件重名了`);
    } else {
      onUpdate(index, allValues);
      onClose();
    }
  }

  function onCancel() {
    onClose();
  }

  return config ? (
    <>
      <DynamicEngine key={config.name} templateConfig={config} componentProps={{ ...config.props, mode: Mode.Attr, onSave, onCancel }} />
    </>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="还未选中任何控件哟~" />
  );
};

Attributes.displayName = 'Attributes';

export default Attributes;
