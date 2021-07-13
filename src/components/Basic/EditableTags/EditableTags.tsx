import { Input, Space } from 'antd';
import React, { useState } from 'react';
import { EditableTagsProps } from './types';
import TagElement from './TagElement';

const EditableTags: React.FC<EditableTagsProps> = ({ value, onChange, disabled = false, duplicative = true, placeholder = '请输入...' }) => {
  const inputRef = React.useRef<any>(null);
  const [tags, setTags] = useState<string[]>(value ? [...value] : []);
  const [editInputIndex, setEditInputIndex] = useState<number>(-1);
  const [tagInputValue, setTagInputValue] = useState<string | undefined>(undefined);

  function handleTagInputChange(e: any) {
    setTagInputValue(e.target.value);
  }

  function handleTagInputConfirm() {
    const _tagInputValue = tagInputValue?.trim();
    if (!_tagInputValue) return;
    const _tags = [...tags, _tagInputValue];
    const _value = duplicative ? _tags : Array.from(new Set(_tags));
    setTags(_value);
    onChange?.(_value);
    setTagInputValue(undefined);
  }

  function handleDeleteTag(index: number) {
    const _tags = [...tags];
    _tags.splice(index, 1);
    setTags(_tags);
    onChange?.(_tags);
  }

  function handleEditInputConfirm(index: number, value: string) {
    tags[index] = value;
    const _tags = [...tags];
    const _value = duplicative ? _tags : Array.from(new Set(_tags));
    setTags(_value);
    onChange?.(_value);
    setEditInputIndex(-1);
  }

  return (
    <Space style={{ flexWrap: 'wrap' }} size={1}>
      {tags && tags.length ? (
        tags.map((tag, index: number) => {
          return (
            <TagElement
              key={index}
              index={index}
              value={tag}
              disabled={disabled}
              onDelete={handleDeleteTag}
              onConfirm={handleEditInputConfirm}
              onDoubleClick={index => setEditInputIndex(index)}
              mode={editInputIndex === index ? 'input' : 'tag'}
            />
          );
        })
      ) : (
        <div
          style={{
            display: 'flex',
            fontSize: 12,
            color: '#c7c7c7',
            alignItems: 'center',
            height: 30,
            border: '1px dashed #e6e6e6',
            padding: '0 10px',
            marginRight: 10,
            borderRadius: 5,
          }}
        >
          无数据...
        </div>
      )}
      {disabled ? (
        <></>
      ) : (
        <Input
          type="text"
          ref={inputRef}
          value={tagInputValue}
          placeholder={placeholder}
          onChange={handleTagInputChange}
          onPressEnter={handleTagInputConfirm}
        />
      )}
    </Space>
  );
};

EditableTags.displayName = 'EditableTags';

export default EditableTags;
