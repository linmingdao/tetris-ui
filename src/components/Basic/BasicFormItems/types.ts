export interface ICustomConfig {
  label: string;
  name: string;
  widget: React.ReactNode;
}

export type CustomAttrType = ICustomConfig[] | undefined;
export interface CommonAttributesPropTypes {
  name: string;
  label?: string;
  rules?: string[];
  placeholder?: string;
  initialValues?: any;
  onSave?: (allValues: any) => void;
  onCancel?: () => void;
  noRules?: boolean;
  noPlaceholder?: boolean;
  CustomAttr?: CustomAttrType;
  [key: string]: any;
}
