import { FormControl } from "@angular/forms";

export interface Deal {
  readonly id: string;
  readonly reference: string;
}

export interface PropertyDeal extends Deal {
  readonly propertyName: string;
  readonly perilsCovered: ReadonlyArray<string>;
  readonly other: string;
}

export interface DealForm {
  readonly id: FormControl<string>;
  readonly reference: FormControl<string>;
}
