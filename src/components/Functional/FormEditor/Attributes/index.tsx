import { Mode } from '../constants';
import { IAttributes } from '../types';
import { Button, Empty, Space } from 'antd';
import DynamicEngine from '../DynamicEngine';
import React, { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const Attributes: React.FC<IAttributes> = ({ index, config, onClose, onUpdate }) => {
  const [attrValues, setAttrValues] = useState<any>(undefined);

  function handleSaveAttrConfig() {
    onUpdate(index, attrValues.allValues, attrValues.changedValues);
    onClose();
  }

  function onAttrPropsChange(changedValues: any, allValues: any) {
    setAttrValues({ allValues, changedValues });
  }

  return config ? (
    <>
      <DynamicEngine key={config.name} templateConfig={config} componentProps={{ ...config.props, mode: Mode.Attr, onAttrPropsChange }} />
      <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #eee', paddingTop: 10, marginTop: 10 }}>
        <Space>
          <Button icon={<CheckOutlined />} type="primary" shape="round" onClick={() => handleSaveAttrConfig()}>
            保 存
          </Button>
          <Button icon={<CloseOutlined />} shape="round" onClick={() => onClose()}>
            取 消
          </Button>
        </Space>
      </div>
    </>
  ) : (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="还未选中任何控件哟~" />
  );
};

Attributes.displayName = 'Attributes';

export default Attributes;
