import React from 'react';
import { FormInstance } from 'antd';

export type FormEditorDefaultToolbar = 'undo' | 'redo' | 'reset' | 'clear' | 'export' | 'preview';

export interface IRules {
  [key: string]: any;
}
export interface ITemplateItem {
  name: string;
  label: string;
  group: string;
  loader: () => any;
  CustomAttr?: React.ReactNode | undefined;
  icon?: React.ReactElement;
  instance: React.JSXElementConstructor<any>;
  props?: any;
}
export interface Templates {
  [key: string]: ITemplateItem;
}

export interface GroupedTemplates {
  [key: string]: ITemplateItem[];
}

export interface GroupIcons {
  [groupName: string]: React.ReactElement;
}

export interface StageItem {
  id: string;
  name: string;
  props: any;
  children?: StageItem[];
}

export interface FormEditorCustomToolbarParams {
  stageItemList: StageItem[];
  set: (stageItemList: StageItem[]) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
  clear: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export interface FormEditorProps {
  stageItems?: StageItem[];
  templates?: Templates;
  groupIcons?: GroupIcons;
  stageBgColor?: string;
  stageActiveColor?: string;
  stageDropColor?: string;
  tmplPanelWidth?: number;
  attrPanelWidth?: number;
  attLabelWrapperCol?: [number, number];
  className?: string;
  rules?: IRules;
  style?: React.CSSProperties;
  defaultToolbar?: FormEditorDefaultToolbar[];
  customToolbar?: (params: FormEditorCustomToolbarParams) => React.ReactElement;
  onExport?: (stageItemList: StageItem[]) => void;
}

export interface FormEditorContext {
  groupIcons: GroupIcons;
  templates: Templates;
  groupedTemplates: GroupedTemplates;
  stageItemList?: StageItem[];
  stageBgColor?: string;
  stageActiveColor?: string;
  stageDropColor?: string;
  tmplPanelWidth?: number;
  attrPanelWidth?: number;
  attLabelWrapperCol?: [number, number];
  defaultToolbar?: FormEditorDefaultToolbar[];
  rules?: IRules;
  onExport?: (stageItemList: StageItem[]) => void;
  handleClear?: () => void;
}

export interface IEditorProps {
  className?: string;
  style?: React.CSSProperties;
  customToolbar?: (params: FormEditorCustomToolbarParams) => React.ReactElement;
}

export interface IAttributes {
  className?: string;
  style?: React.CSSProperties;
  index: string;
  config: any;
  onClose: () => void;
  onUpdate: (index: string, changedValues: any, allValues: any) => void;
}

export interface CollapseProps {
  collapse: boolean;
  onClick: () => void;
}

export interface ISortableContainerProps {
  index: string;
  itemData: any;
  stageItemList: StageItem[];
  onDropChild: () => void;
  onUp: (index: string, item: StageItem) => void;
  onDown: (index: string, item: StageItem) => void;
  onRemove: (index: string, item: StageItem) => void;
  onUpdate: (index: string, allValues: any, changedValues: any) => void;
}

export interface ISortableItemProps {
  index: string;
  itemData: any;
  stageItemList: StageItem[];
  onUp: (index: string, item: StageItem) => void;
  onDown: (index: string, item: StageItem) => void;
  onRemove: (index: string, item: StageItem) => void;
  onUpdate: (index: string, allValues: any, changedValues: any) => void;
}

export interface ISortHandlerProps {
  index: string;
  itemData: StageItem;
  dropConfig: any;
  dragConfig: any;
  className?: string;
  stageItemList: StageItem[];
  onUp: (index: string, item: StageItem) => void;
  onDown: (index: string, item: StageItem) => void;
  onRemove: (index: string, item: StageItem) => void;
  onUpdate: (index: string, allValues: any, changedValues: any) => void;
}

export type DeserializeDefaultToolbar = 'ok' | 'reset' | 'cancel';

export interface DeserializeCustomToolbarParams {
  form: FormInstance;
  resetForm: () => void;
  getValues: () => Promise<any>;
}

export interface ValuesChangeParams {
  index: string;
  indexMap: any;
  flatValues: any;
  changedValues: any;
  allValues: any;
}

export interface DeserializationProps {
  templates: Templates;
  mode: 'stage' | 'preview';
  stageItems: StageItem[];
  indent?: number;
  okText?: string;
  resetText?: string;
  cancelText?: string;
  rules?: IRules;
  onReset?: () => void;
  onCancel?: () => void;
  onOK?: (values: any) => void;
  onValuesChange?: (params: ValuesChangeParams) => void;
  defaultToolbar?: DeserializeDefaultToolbar[];
  customToolbar?: (params: DeserializeCustomToolbarParams) => React.ReactElement;
}
