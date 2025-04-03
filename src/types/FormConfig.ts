export type FieldType =
  | "numeric"
  | "string"
  | "multi-line"
  | "boolean"
  | "date"
  | "enum";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: string[]; // Only for enum fields
}

export interface ButtonConfig {
  text: string;
}

export interface FormConfig {
  title: string;
  fields: FieldConfig[];
  buttons: ButtonConfig[];
}
