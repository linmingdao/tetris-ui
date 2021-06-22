import React, { FC, useContext } from 'react';
import { Drawer, message } from 'antd';
import { StageItem } from '../types';
import { EditorContext } from '../EditorContext';
import { Deserialization } from '../Deserialization';

const Preview: FC<{ stageItems: StageItem[] | undefined; onClose: () => void }> = ({ stageItems, onClose }) => {
  const { templates, rules } = useContext(EditorContext);

  function handleOk(values: any) {
    message.success(`待提交的表单数据：${JSON.stringify(values)}`);
  }

  if (stageItems) {
    return (
      <Drawer title="预览" destroyOnClose placement="left" width="80%" closable maskClosable onClose={onClose} visible={true}>
        <Deserialization
          mode="stage"
          rules={rules}
          templates={templates}
          stageItems={stageItems}
          defaultToolbar={['ok', 'cancel', 'reset']}
          onOK={handleOk}
          onCancel={onClose}
        />
      </Drawer>
    );
  } else {
    return <></>;
  }
};

Preview.displayName = 'Preview';

export default Preview;
