import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { materializeBaseForm } from "src/lob-common/helpers";
import { CommonState } from "src/lob-common/state/common/common.reducer";
import { PropertyDeal } from "../../lob-common/models";
import { DealLoaderService } from "../../lob-common/services/deal-loader.service";
import { BaseForms, FormService } from "../../lob-common/services/form.service";

export interface PropertyDealForm {
  propertyName: FormControl<string>;
}

export interface PropertyDealForm {
  propertyName: FormControl<string>;
}

export interface PropertyForms extends BaseForms {
  property: FormGroup<PropertyDealForm>;
  other: FormControl<string>;
  perilsCovered: FormArray<FormControl<string>>;
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

  public togglePeril(peril: string) {
    const currentPerils = this.forms.perilsCovered;
    const hasPeril = currentPerils.value.findIndex((x) => x === peril);
    if (hasPeril !== -1) {
      this.forms.perilsCovered.removeAt(hasPeril);
    }
  }

  initForm(baseForms: Readonly<PropertyForms>, deal: Readonly<PropertyDeal>) {
    return {
      property: new FormGroup<PropertyDealForm>({
        propertyName: new FormControl<string>(null, Validators.required),
      }),
      other: new FormControl(null),
      perilsCovered: new FormArray<FormControl<string>>(
        deal.perilsCovered.map((peril) => new FormControl<string>(peril))
      ),
    };
  }

  materializeDeal(): Readonly<PropertyDeal> {
    return {
      ...materializeBaseForm(this.forms),
      propertyName: this.forms.property.value.propertyName,
      perilsCovered: this.forms.perilsCovered.value,
    };
  }
}
