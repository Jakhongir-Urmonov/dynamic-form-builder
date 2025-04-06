// export type InputType =
//   | "numeric"
//   | "string"
//   | "multi-line"
//   | "boolean"
//   | "date"
//   | "enum";

export enum InputTypeEnum {
  NUMERIC = "numeric",
  STRING = "string",
  MULTILINE = "multi-line",
  BOOLEAN = "boolean",
  DATE = "date",
  ENUM = "enum",
}

export type InputType = `${InputTypeEnum}`;

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
