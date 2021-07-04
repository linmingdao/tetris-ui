import React from 'react';
import { Empty } from 'antd';
import { Mode } from '../constants';
import { IAttributes } from '../types';
import DynamicEngine from '../DynamicEngine';

const Attributes: React.FC<IAttributes> = ({ index, config, onClose, onUpdate }) => {
  function onSave(allValues: any) {
    onUpdate(index, allValues);
    onClose();
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
