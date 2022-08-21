import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Deal } from "../../lob-common/models";
import { BaseForms, FormService } from "../../lob-common/services/form.service";
import { DealLoaderService } from "../../lob-common/services/deal-loader.service";
import { CommonState } from "src/lob-common/state/common/common.reducer";
import { Store } from "@ngrx/store";

export interface PropertyDeal extends Deal {
  propertyName: FormControl<string>;
}

export interface PropertyDealForm {
  propertyName: FormControl<string>;
}

export interface PropertyForms extends BaseForms {
  property: FormGroup<PropertyDealForm>;
  other: FormControl<string>;
}

@Injectable({
  providedIn: "root",
})
export class PropertyFormService extends FormService<PropertyForms> {
  constructor(dealLoaderService: DealLoaderService, store: Store<CommonState>) {
    super(dealLoaderService, store);
    console.log("PropertyFormService");
  }

  initForm(baseForms: Readonly<PropertyForms>) {
    return {
      property: new FormGroup<PropertyDealForm>({
        propertyName: new FormControl<string>(null, Validators.required),
      }),
      other: new FormControl(null),
    };
  }
}
