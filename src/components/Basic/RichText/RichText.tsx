import 'braft-editor/dist/index.css';
import React, { FC, useEffect, useState } from 'react';
import BraftEditor, { EditorState } from 'braft-editor';
import { RichTextProps } from './types';
import classnames from 'classnames';

const RichText: FC<RichTextProps> = ({ value, readOnly = false, placeholder = '请输入', onChange, contentStyle }) => {
  const [editorState, setEditorState] = useState(() => BraftEditor.createEditorState(null));
  function handleChange(editorState: EditorState) {
    setEditorState(editorState);
    triggerChange(editorState.toHTML());
  }

  const triggerChange = (changedValue: string) => {
    onChange?.(changedValue);
  };

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(value || null));
  }, [value]);

  return (
    <div className="tetris-ui_richtext">
      <BraftEditor
        onBlur={handleChange}
        value={editorState}
        readOnly={readOnly}
        placeholder={placeholder}
        contentStyle={{ height: 200, overflowY: 'auto', ...contentStyle }}
        controlBarClassName={classnames({ 'hide-control-bar': readOnly })}
        style={{ border: '1px solid #d4d4d4', borderRadius: 2 }}
      />
    </div>
  );
};

export default RichText;
