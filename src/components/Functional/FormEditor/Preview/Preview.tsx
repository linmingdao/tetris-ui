import React, { FC, useContext, useState } from 'react';
import { Drawer, Radio } from 'antd';
import { StageItem } from '../types';
import { EditorContext } from '../EditorContext';
import { Deserialization } from '../Deserialization';

const Preview: FC<{ stageItems: StageItem[] | undefined; onClose: () => void }> = ({ stageItems, onClose }) => {
  const { templates, rules } = useContext(EditorContext);
  const [mode, setMode] = useState<'stage' | 'preview'>('stage');

  if (stageItems) {
    return (
      <Drawer title="预览" destroyOnClose placement="left" width="700" closable maskClosable onClose={onClose} visible={true}>
        <div>
          表单显示的模式：
          <Radio.Group
            value={mode}
            optionType="button"
            buttonStyle="solid"
            options={[
              { label: '可编辑', value: 'stage' },
              { label: '只读', value: 'preview' },
            ]}
            onChange={(e: any) => setMode(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 10 }}>表单内容：</div>
        <div style={{ padding: '10px 100px' }}>
          <Deserialization
            mode={mode}
            rules={rules}
            templates={templates}
            stageItems={stageItems}
            onCancel={onClose}
            defaultToolbar={mode === 'stage' ? ['cancel', 'reset'] : []}
          />
        </div>
      </Drawer>
    );
  } else {
    return <></>;
  }
};

Preview.displayName = 'Preview';

export default Preview;
