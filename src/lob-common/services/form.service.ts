import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DealLoaderService } from './deal-loader.service';
import { take, map, filter, share } from 'rxjs/operators';
import { BehaviorSubject, Observable, merge } from 'rxjs';
import { switchMap, startWith, skip, tap } from 'rxjs/operators';
import { DealForm } from '../models';

export interface BaseForms {
  base: FormGroup<DealForm>;
}

type ExtractGeneric<Type> = Type extends FormGroup<infer X> ? X : never;
type FormGroupType<T> = {
  [P in keyof T]: ExtractGeneric<T[P]>;
};

@Injectable({
  providedIn: 'root',
})
export abstract class FormService<T extends BaseForms> {
  public forms: Readonly<T> | null = null;
  private readonly _forms$ = new BehaviorSubject<T | null>(this.forms);
  private emitCount = 0;
  public readonly forms$ = this._forms$.asObservable();
  public readonly formChanges: Observable<FormGroupType<T>> = this.forms$.pipe(
    filter(Boolean),
    switchMap((forms) => {
      const valueChanges = Object.entries(forms);
      let stream = merge(
        ...valueChanges.map(([, value]) => value.valueChanges)
      );

      console.log(this.emitCount);
      if (this.emitCount) {
        stream = stream.pipe(startWith(null));
      }

      stream = stream.pipe(
        tap(() => (this.emitCount = 1)),
        map(() => {
          const output = {};
          Object.assign(
            {},
            valueChanges.map(
              ([key, value]) => (output[key] = value.getRawValue())
            )
          );
          return output as FormGroupType<T>;
        })
      );

      return stream as Observable<FormGroupType<T>>;
    }),
    share()
  );

  constructor(protected readonly dealLoaderService: DealLoaderService) {
    this._forms$.pipe(
      switchMap(() => this.formChanges)
    )
    .subscribe(this.saveDealUpdate);
  }

  public initializeForm() {
    this.dealLoaderService.deal.pipe(take(1)).subscribe((deal) => {
      console.log('Deal loaded');

      const form = new FormGroup<DealForm>({
        id: new FormControl(deal.id),
        reference: new FormControl(deal.reference),
      });
      const initForm = {
        base: form,
      } as Readonly<T>;
      this.forms = initForm;

      if (this.initForm) {
        const result = this.initForm(this.forms);
        this.forms = {
          ...this.forms,
          ...result,
        };
      }
      this._forms$.next(this.forms);
    });
  }

  private saveDealUpdate(deal: any) {
    console.log('Deal updated ', deal);
  }

  abstract initForm(baseForms: Readonly<T>): Omit<T, 'base'> | null;
}
