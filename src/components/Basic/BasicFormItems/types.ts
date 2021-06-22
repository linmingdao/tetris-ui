export interface CommonAttributesPropTypes {
  name: string;
  label?: string;
  rules?: string[];
  placeholder?: string;
  initialValues?: any;
  onAttrPropsChange?: (changedValues: any, allValues: any) => void;
  valuesChangeInterceptor?: (changedValues: any, allValues: any) => { changedValues: any; allValues: any };
  noRules?: boolean;
  noPlaceholder?: boolean;
}

export type ExtractCommonAttributes = (params: CommonAttributesPropTypes) => any;
