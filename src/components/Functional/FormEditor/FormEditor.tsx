import { nanoid } from 'nanoid';
import Stage from './Stage';
import Toolbar from './Toolbar';
import Collapse from './Collapse';
import Iconfont from './Iconfont';
import Templates from './Templates';
import classnames from 'classnames';
import clonedeep from 'lodash.clonedeep';
import { Popconfirm, Button } from 'antd';
import { EditorContext } from './EditorContext';
import useUndo from '../../../hooks/useHistory';
import React, { useState, useContext, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { groupTemplates } from './utils/helper';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Preview from './Preview/Preview';
import { FormEditorProps, FormEditorContext, IEditorProps, StageItem } from './types';

const Editor: React.FC<IEditorProps> = ({ className, style, customToolbar }) => {
  const { stageItemList, defaultToolbar, handleClear, onExport } = useContext(EditorContext);
  const [collapse, setCollapse] = useState<boolean>(false);
  const [previewStageItems, setPreviewStageItems] = useState<StageItem[] | undefined>();
  const { present, set, undo, redo, clear, canUndo, canRedo } = useUndo(stageItemList && stageItemList.length ? [...stageItemList] : []);

  const renderDefaultToolbar = () => {
    function handleExport() {
      // FIXME: name唯一性校验
      onExport && onExport(present);
    }

    function handlePreview() {
      setPreviewStageItems(present);
    }

    return (
      <>
        {defaultToolbar?.includes('undo') && (
          <Button type="text" disabled={!canUndo} icon={<Iconfont type="icon-undo" />} onClick={() => undo()}>
            撤 销
          </Button>
        )}
        {defaultToolbar?.includes('redo') && (
          <Button type="text" disabled={!canRedo} icon={<Iconfont type="icon-redo" />} onClick={() => redo()}>
            恢 复
          </Button>
        )}
        {defaultToolbar?.includes('reset') && (
          <Popconfirm disabled={!present.length} title="确认要重置么?" onConfirm={() => clear()} okText="确定" cancelText="取消">
            <Button type="text" disabled={!present.length} icon={<Iconfont type="icon-reset" />}>
              重 置
            </Button>
          </Popconfirm>
        )}
        {defaultToolbar?.includes('clear') && (
          <Popconfirm
            disabled={!present.length}
            title="确认要清空面板么?"
            onConfirm={() => {
              clear();
              handleClear && handleClear();
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button type="text" disabled={!present.length} icon={<Iconfont type="icon-empty" />}>
              清 空
            </Button>
          </Popconfirm>
        )}
        {defaultToolbar?.includes('export') && (
          <Button type="text" disabled={!present.length} icon={<Iconfont type="icon-export" />} onClick={() => handleExport()}>
            保 存
          </Button>
        )}
        {defaultToolbar?.includes('preview') && (
          <>
            <Button type="text" disabled={!present.length} icon={<Iconfont type="icon-preview" />} onClick={() => handlePreview()}>
              预 览
            </Button>
            <Preview stageItems={previewStageItems} onClose={() => setPreviewStageItems(undefined)} />
          </>
        )}
      </>
    );
  };

  const renderToolbar = () => {
    return (
      <>
        {renderDefaultToolbar()}
        {customToolbar ? (
          customToolbar({
            canUndo,
            canRedo,
            stageItemList: present,
            set,
            undo,
            redo,
            reset: clear,
            clear: function () {
              handleClear && handleClear();
            },
          })
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <div className={classnames('tetris-bricks_formeditor', className)} style={style}>
      <Toolbar renderToolbar={renderToolbar} />
      <div className="content">
        <Templates visible={collapse} />
        <Collapse collapse={collapse} onClick={() => setCollapse(!collapse)} />
        <Stage onChange={(stageItemList: StageItem[]) => set(stageItemList)} stageItemList={clonedeep(present)} />
      </div>
    </div>
  );
};

Editor.displayName = 'Editor';

const FormEditor: React.FC<FormEditorProps> = ({
  stageItems,
  stageBgColor,
  stageActiveColor,
  stageDropColor,
  tmplPanelWidth,
  attrPanelWidth,
  attLabelWrapperCol,
  templates = {},
  groupIcons = {},
  onExport,
  rules,
  defaultToolbar = ['undo', 'redo', 'reset', 'clear', 'export', 'preview'],
  ...restProps
}) => {
  const [stageItemList, setStageItemList] = useState<StageItem[]>([]);

  useEffect(() => {
    setStageItemList(stageItems ? stageItems : []);
  }, [stageItems]);

  const passedContext: FormEditorContext = {
    stageBgColor,
    stageDropColor,
    stageActiveColor,
    tmplPanelWidth,
    attrPanelWidth,
    attLabelWrapperCol,
    templates,
    groupIcons,
    groupedTemplates: groupTemplates(templates),
    stageItemList,
    defaultToolbar,
    rules,
    onExport,
    handleClear() {
      setStageItemList([]);
    },
  };

  return (
    <EditorContext.Provider value={passedContext}>
      <DndProvider key={nanoid()} backend={HTML5Backend}>
        <Editor {...restProps} />
      </DndProvider>
    </EditorContext.Provider>
  );
};

FormEditor.displayName = 'FormEditor';

export default FormEditor;
