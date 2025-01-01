import { MatFormFieldAppearance } from '@angular/material/form-field';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: string;
  appearance?: MatFormFieldAppearance;
  required?: boolean;
  pattern?: string | RegExp;
  placeholder?: string;
  errorMessage?: string;
  options?: { value: number; viewValue: string }[];
  colSize: string // Specify the column size here
}
