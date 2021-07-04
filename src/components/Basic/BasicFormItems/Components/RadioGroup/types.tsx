import { CustomAttrType } from '../../types';

export interface RadioGroupPropTypes {
  name: string;
  value?: any[];
  label?: string;
  rules?: string[];
  disabled?: boolean;
  optionList?: any[];
  mode?: string;
  CustomAttr?: CustomAttrType;
  onSave?: (allValues: any) => void;
  onCancel?: () => void;
  onChange?: (values: any) => void;
  [key: string]: any;
}
