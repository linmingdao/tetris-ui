import React, { FC } from 'react';
import { Drawer } from 'antd';
import { StageItem } from '../types';
import PreviewContent from './PreviewContent';

const Preview: FC<{ stageItems: StageItem[] | undefined; onClose: () => void }> = ({ stageItems, onClose }) => {
  if (stageItems) {
    return (
      <Drawer title="预览" destroyOnClose placement="left" width="600" closable maskClosable onClose={onClose} visible={true}>
        <PreviewContent stageItems={stageItems} onClose={onClose} />
      </Drawer>
    );
  } else {
    return <></>;
  }
};

Preview.displayName = 'Preview';

export default Preview;
