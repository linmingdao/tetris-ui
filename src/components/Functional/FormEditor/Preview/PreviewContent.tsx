import { Radio } from 'antd';
import { StageItem } from '../types';
import { EditorContext } from '../EditorContext';
import { Deserialization } from '../Deserialization';
import React, { FC, useContext, useEffect, useState } from 'react';

const Preview: FC<{ stageItems: StageItem[] | undefined; onClose: () => void }> = ({ stageItems, onClose }) => {
  const { templates, rules } = useContext(EditorContext);
  const [mode, setMode] = useState<'stage' | 'preview'>('stage');
  const [localStageItems, setLocalStageItems] = useState<StageItem[]>(stageItems || []);

  function changeMode(stageItems: StageItem[], mode: 'preview' | 'stage'): StageItem[] {
    stageItems.forEach(item => {
      if (item.children && item.children.length) {
        changeMode(item.children, mode);
      } else {
        item.props.mode = mode;
      }
    });
    return stageItems;
  }

  useEffect(() => {
    if (mode === 'preview') {
      setLocalStageItems([...changeMode(localStageItems, 'preview')]);
    } else {
      changeMode(localStageItems, 'stage');
      setLocalStageItems([...changeMode(localStageItems, 'stage')]);
    }
  }, [mode]);

  if (stageItems) {
    return (
      <>
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
            stageItems={localStageItems}
            onCancel={onClose}
            defaultToolbar={mode === 'stage' ? ['cancel', 'reset'] : []}
          />
        </div>
      </>
    );
  } else {
    return <></>;
  }
};

Preview.displayName = 'Preview';

export default Preview;
