import { Injectable } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { filter, switchMap, map, tap } from "rxjs/operators";
import { deepDiffMapper, materializeBaseForm } from "src/lob-common/helpers";
import { CommonState } from "src/lob-common/state/common/common.reducer";
import { PropertyDeal } from "../../lob-common/models";
import { DealLoaderService } from "../../lob-common/services/deal-loader.service";
import {
  BaseForms,
  FormGroupRawValue,
  FormService,
} from "../../lob-common/services/form.service";

export interface PropertyDealForm {
  propertyName: FormControl<string>;
  identity: FormGroup<{
    name: FormControl<string>;
  }>;
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
  public readonly diff = this.store
    .select((x) => x.common.deal as PropertyDeal)
    .pipe(
      filter((deal) => !!deal),
      switchMap((deal) => this.formChanges.pipe(map(() => deal))),
      map(
        (deal) =>
          ({
            base: {
              id: deal.id,
              reference: deal.reference,
            },
            other: deal.other,
            perilsCovered: deal.perilsCovered as string[],
            property: {
              propertyName: deal.propertyName,
              identity: {
                name: "",
              },
            },
          } as FormGroupRawValue<PropertyForms>)
      ),
      map((toDeal) => {
        const output: Array<{}> = [];
        Object.entries(this.forms).forEach(
          ([key, value]) =>
            (output[key] = deepDiffMapper.map(toDeal[key], value))
        );

        return output;
      })
    );

  constructor(dealLoaderService: DealLoaderService, store: Store<CommonState>) {
    super(dealLoaderService, store);
    console.log("PropertyFormService");

    this.diff.subscribe(console.log);
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
        propertyName: new FormControl<string>(
          deal.propertyName,
          Validators.required
        ),
        identity: new FormGroup({
          name: new FormControl<string>(""),
        }),
      }),
      other: new FormControl(deal.other),
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
      other: this.forms.other.value,
    };
  }
}
