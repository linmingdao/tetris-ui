export interface OptionItemType {
  label?: string;
  value?: string;
}

export interface OptionEditorProps {
  value?: OptionItemType;
  onRemove: () => void;
  onChange?: (value: OptionItemType) => void;
}
