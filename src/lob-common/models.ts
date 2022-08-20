import { FormControl } from "@angular/forms";

export interface Deal {
  readonly id: string;
}

export interface DealForm {
  readonly id: FormControl<string>;
}