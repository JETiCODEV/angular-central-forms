import { FormControl } from "@angular/forms";

export interface Deal {
  readonly id: string;
  readonly reference: string;
}

export interface DealForm {
  readonly id: FormControl<string>;
  readonly reference: FormControl<string>;
}