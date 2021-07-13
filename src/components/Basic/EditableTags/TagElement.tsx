import { Input, Tag, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { TagElementProps } from './types';

const TagElement: React.FC<TagElementProps> = ({ index, mode, value, disabled = false, onConfirm, onDelete, onDoubleClick }) => {
  const inputRef = React.useRef<any>(null);
  const [editInputValue, setEditInputValue] = useState<string>(value);

  function handleEditInputConfirm() {
    const val = editInputValue.trim();
    onConfirm?.(index, val);
  }

  function handleOnDoubleClick(e: { preventDefault: () => void }) {
    if (disabled) return;
    onDoubleClick?.(index);
    e.preventDefault();
  }

  useEffect(() => {
    mode === 'input' && inputRef && inputRef.current && inputRef.current.focus();
  }, [mode, inputRef]);

  if (mode === 'input') {
    return (
      <Input
        ref={inputRef}
        value={editInputValue}
        placeholder="请输入"
        onBlur={handleEditInputConfirm}
        onPressEnter={handleEditInputConfirm}
        onChange={e => setEditInputValue(e.target.value)}
      />
    );
  } else {
    const isLongTag = value.length > 20;
    const tagElem = (
      <Tag closable={!disabled} onClose={() => onDelete?.(index)} style={{ padding: 5, margin: 2 }}>
        <span style={{ padding: '0 6px', cursor: 'pointer' }} onDoubleClick={handleOnDoubleClick}>
          {isLongTag ? `${value.slice(0, 20)}...` : value}
        </span>
      </Tag>
    );

    return isLongTag ? <Tooltip title={value}>{tagElem}</Tooltip> : tagElem;
  }
};

TagElement.displayName = 'TagElement';

export default TagElement;
