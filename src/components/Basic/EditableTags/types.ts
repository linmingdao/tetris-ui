export interface EditableTagsProps {
  value?: string[];
  disabled?: boolean;
  placeholder?: string;
  duplicative?: boolean;
  onChange?: (value: string[]) => void;
}

export interface TagElementProps {
  index: number;
  value: string;
  disabled?: boolean;
  mode?: 'input' | 'tag';
  onConfirm?: (index: number, value: string) => void;
  onDelete?: (index: number) => void;
  onDoubleClick?: (index: number) => void;
}
