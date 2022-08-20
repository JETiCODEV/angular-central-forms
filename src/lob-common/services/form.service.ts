import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DealLoaderService } from './deal-loader.service';
import { take } from 'rxjs/operators';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Deal, DealForm } from '../models';

export interface BaseForms {
  base: FormGroup;
}

@Injectable({
  providedIn: 'root',
})
export abstract class FormService<T extends BaseForms> {
  public forms: Readonly<T> | null = null;
  public readonly form$ = new BehaviorSubject<T | null>(this.forms);

  constructor(protected readonly dealLoaderService: DealLoaderService) {}

  public valueChanges() {
    return this.form$.pipe(
      switchMap((form) => form.base.valueChanges ?? EMPTY)
    );
  }

  public initializeForm() {
    this.dealLoaderService.deal.pipe(take(1)).subscribe((deal) => {
      const form = new FormGroup<DealForm>({
        id: new FormControl(deal.id),
        reference: new FormControl(deal.reference),
      });
      const initForm = (this.initForm(this.forms) ?? {
        base: form,
      }) as Readonly<T>;

      this.forms = initForm;
      this.form$.next(this.forms);
    });

    this.valueChanges().subscribe(this.saveDealUpdate);
  }

  private saveDealUpdate(deal: Readonly<Deal>) {
    console.log('Deal updated ', deal);
  }

  abstract initForm(baseForms: Readonly<BaseForms>): T | null;
}
