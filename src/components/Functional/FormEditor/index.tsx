export * from './types';
import { FC } from 'react';
import FormEditor from './FormEditor';
import { Deserialization } from './Deserialization';
import { DeserializationProps, FormEditorProps } from './types';

export type IFormEditor = FC<FormEditorProps> & {
  Deserialization: FC<DeserializationProps>;
};

const TransFormEditor = FormEditor as IFormEditor;

TransFormEditor.Deserialization = Deserialization;

export default TransFormEditor;
