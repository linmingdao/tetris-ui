export type AreaCascaderValueType = (string | number)[] | undefined;

export interface AreaCascaderProps {
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties;
  value?: AreaCascaderValueType;
  valueFormat?: 'code' | 'label';
  onChange?: (value: AreaCascaderValueType) => void;
}
