declare const ModeOptions: ['tags', 'multiple'];

export declare type ModeOption = typeof ModeOptions[number];

export interface SelectorOptionItemType {
  label: string;
  value: string;
}

export interface SelectorProps {
  name: string;
  value?: any;
  label?: string;
  rules?: string[];
  selectMode?: ModeOption;
  placeholder?: string;
  disabled?: boolean;
  optionList?: SelectorOptionItemType[];
  mode?: string;
  onSave?: (allValues: any) => void;
  onCancel?: () => void;
  onChange?: (values: any) => void;
}
