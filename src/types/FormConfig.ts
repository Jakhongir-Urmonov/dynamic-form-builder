export type InputType =
  | "numeric"
  | "string"
  | "multi-line"
  | "boolean"
  | "date"
  | "enum";

export interface InputConfig {
  name: string;
  label: string;
  type: InputType;
  options?: string[]; // Only for enum Inputs
  validation?: {
    required?: boolean;
    pattern?: string;
  };
}

export interface ButtonConfig {
  text: string;
}

export interface FormConfig {
  title: string;
  inputs: InputConfig[];
  buttons: ButtonConfig[];
}
