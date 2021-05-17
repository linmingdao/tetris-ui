import React from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined, SaveOutlined } from '@ant-design/icons';

export interface ToolbarProps {
  editable?: boolean;
  onSave?: () => void;
  onEmpty?: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ editable, onSave, onEmpty }) => {
  return editable ? (
    <>
      <Button type="primary" shape="round" icon={<SaveOutlined />} style={{ zIndex: 100, left: 10, top: 10 }} onClick={() => onSave && onSave()}>
        保 存
      </Button>
      <Popconfirm okText="确定" cancelText="取消" title="确认清空面板内容么?" onConfirm={() => onEmpty && onEmpty()}>
        <Button danger shape="round" icon={<DeleteOutlined />} style={{ zIndex: 100, left: 20, top: 10 }}>
          清 空
        </Button>
      </Popconfirm>
    </>
  ) : (
    <></>
  );
};

Toolbar.displayName = 'Toolbar';

export default Toolbar;
