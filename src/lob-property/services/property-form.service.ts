import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Deal, DealForm, PropertyDeal } from "../../lob-common/models";
import { BaseForms, FormService } from "../../lob-common/services/form.service";
import { DealLoaderService } from "../../lob-common/services/deal-loader.service";
import { CommonState } from "src/lob-common/state/common/common.reducer";
import { Store } from "@ngrx/store";
import { materializeBaseForm } from "src/lob-common/helpers";

export interface PropertyDealForm {
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
export class PropertyFormService extends FormService<
  PropertyForms,
  PropertyDeal
> {
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

  materializeDeal(): Readonly<PropertyDeal> {
    return {
      ...materializeBaseForm(this.forms),
      propertyName: this.forms.property.value.propertyName,
    };
  }
}
