import React from 'react';
import { FormEditorContext } from './types';

export const EditorContext = React.createContext<FormEditorContext>({
  templates: {},
  groupIcons: {},
  groupedTemplates: {},
});
