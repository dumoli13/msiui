import type React from 'react';

export type UploaderItem = File | string;
export type UploaderSingleValue = UploaderItem | null;
export type UploaderMultipleValue = UploaderItem[];
export type UploaderValue = UploaderSingleValue | UploaderMultipleValue;

export type FilePreviewConfig = {
  label: string;
  color: string;
  accent: string;
};

export type PreviewItem = {
  key: string;
  name: string;
  sizeLabel: string;
  imageUrl?: string;
  preview?: FilePreviewConfig;
  createdObjectUrl: boolean;
};

export interface UploaderRef {
  element: HTMLInputElement | null;
  value: UploaderValue;
  focus: () => void;
  reset: () => void;
  disabled: boolean;
}

type UploaderBaseProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  | 'onChange'
  | 'size'
  | 'required'
  | 'checked'
  | 'defaultChecked'
  | 'placeholder'
  | 'value'
  | 'defaultValue'
  | 'type'
> & {
  label?: string;
  labelPosition?: 'top' | 'left';
  autoHideLabel?: boolean;
  helperText?: React.ReactNode;
  fullWidth?: boolean;
  inputRef?:
    | React.RefObject<UploaderRef | null>
    | React.RefCallback<UploaderRef | null>;
  size?: 'default' | 'large';
  clearable?: boolean;
  accept?: string;
  error?: boolean | string;
  success?: boolean;
  loading?: boolean;
  width?: number;
  required?: boolean;
};

export interface UploaderSingleProps extends UploaderBaseProps {
  multiple?: false;
  value?: UploaderSingleValue;
  defaultValue?: UploaderSingleValue;
  initialValue?: UploaderSingleValue;
  onChange?: (value: UploaderSingleValue) => void;
}

export interface UploaderMultipleProps extends UploaderBaseProps {
  multiple: true;
  value?: UploaderMultipleValue;
  defaultValue?: UploaderMultipleValue;
  initialValue?: UploaderMultipleValue;
  onChange?: (value: UploaderMultipleValue) => void;
}

export type UploaderProps = UploaderSingleProps | UploaderMultipleProps;
