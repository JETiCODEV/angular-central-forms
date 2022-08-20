import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Deal, DealForm } from '../../lob-common/models';
import { BaseForms, FormService } from '../../lob-common/services/form.service';
import { DealLoaderService } from '../../lob-common/services/deal-loader.service';

export interface PropertyDeal extends Deal {
  propertyName: FormControl<string>;
}

export interface PropertyDealForm {
  propertyName: FormControl<string>;
}

export interface PropertyForms extends BaseForms {
  property: FormGroup<PropertyDealForm>;
}

@Injectable({
  providedIn: 'root',
})
export class PropertyFormService extends FormService<PropertyForms> {
  constructor(dealLoaderService: DealLoaderService) {
    super(dealLoaderService);
    console.log('PropertyFormService');
  }

  initForm(baseForms: Readonly<BaseForms>): PropertyForms {
    return {
      ...baseForms,
      property: new FormGroup<PropertyDealForm>({
        propertyName: new FormControl<string>('Property name'),
      }),
    };
  }
}
