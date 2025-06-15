import {
  Control,
  FieldPath,
  FieldValues,
  UseFormReturn,
} from "react-hook-form";
import { SelectAsyncType } from "./customField/selectAsync.cpn";
import { MutableRefObject } from "react";

export interface OptionItem {
  label: string;
  value: string | number | boolean;
}

export type GridOptions =
  | {
      xs?: number;
      sm?: number;
      md?: number;
      lg?: number;
      xl?: number;
    }
  | number;

export interface IOptionsField {
  text: {
    required?: { message?: string } | boolean;
    min?: { val: number; message?: string };
    max?: { val: number; message?: string };
    length?: { val: number; message?: string };
    matches?: { regex: RegExp; message?: string };
    email?: { message?: string } | boolean;
    url?: { message?: string } | boolean;
    trim?: { message?: string } | boolean;
  };
  textarea: {
    required?: { message?: string } | boolean;
    min?: { val: number; message?: string };
    max?: { val: number; message?: string };
  };
  password: {
    required?: { message?: string } | boolean;
    min?: { val: number; message?: string };
    max?: { val: number; message?: string };
    length?: { val: number; message?: string };
    matches?: { regex: RegExp; message?: string };
  };
  number: {
    required?: { message?: string } | boolean;
    min?: { val: number; message?: string };
    max?: { val: number; message?: string };
    lessThan?: { val: number; message?: string };
    moreThan?: { val: number; message?: string };
    positive?: { message?: string } | boolean;
    negative?: { message?: string } | boolean;
    integer?: { message?: string } | boolean;
  };
  switch: {
    required?: { message?: string } | boolean;
    oneOf?: { values: boolean[]; message?: string };
  };
  select: {
    options: OptionItem[];
    required?: { message?: string } | boolean;
  };
  date: {
    required?: { message?: string } | boolean;
    min?: { val: Date | string; message?: string };
    max?: { val: Date | string; message?: string };
  };
  checkbox: {
    required?: { message?: string } | boolean;
    options: OptionItem[];
  };
  markdown: {
    required?: { message?: string } | boolean;
  };
  select_async: {
    required?: { message?: string } | boolean;
    type: SelectAsyncType;
    multiple?: boolean;
  };
}

export type FieldType = keyof IOptionsField;

// Base field option properties, shared among all field types
export interface BaseFieldOption<T extends FieldValues = any> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  disabled?: boolean;
  hidden?: boolean;
  dependencies?: Array<FieldPath<T>>;
  render?: (field: FieldOption<T>, control: Control<T>) => React.ReactNode;
  grid?: GridOptions;
}

// Field option with type-specific options
export interface TypedFieldOption<
  T extends FieldValues = any,
  FT extends FieldType = FieldType
> extends BaseFieldOption<T> {
  type: FT;
  options?: Partial<IOptionsField[FT]>;
}

// Union type for all possible field options
export type FieldOption<T extends FieldValues = any> = {
  [FT in FieldType]: TypedFieldOption<T, FT>;
}[FieldType];

export type FormRef<T extends FieldValues> = UseFormReturn<T, any, T> | null;

export interface FormBuilderProps<T extends FieldValues> {
  ref?: MutableRefObject<UseFormReturn<T, any, T> | null>;
  fields: FieldOption<T>[];
  onSubmit: (values: T) => void;
  onCancel?: () => void;
  defaultValues?: Partial<T>;
  button?: {
    ok?: string;
    cancel?: string;
    position?: "start" | "center" | "end";
  };
  loading?: boolean;
  gridGutter?: string; // CSS gap class như "gap-4"
  className?: string;
}
