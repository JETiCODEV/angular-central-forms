import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DealLoaderService } from './deal-loader.service';
import { take, map, filter, share } from 'rxjs/operators';
import {
  BehaviorSubject,
  combineLatest,
  EMPTY,
  forkJoin,
  Observable,
  of,
  zip,
} from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Deal, DealForm } from '../models';

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
  public readonly forms$ = this._forms$.asObservable();
  private readonly formChanges = this.forms$.pipe(
    filter(Boolean),
    map((forms) =>
      Object.assign(
        {},
        Object.values(forms).map((k, v) => k)
      )
    ),
    switchMap((result) => result[0].valueChanges),
    share()
  );

  constructor(protected readonly dealLoaderService: DealLoaderService) {
    this.valueChanges().subscribe((result) => result);
  }

  // public valueChanges(): Observable<FormGroupType<T>> {
  public valueChanges() {
    return this.formChanges;
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

    this.valueChanges().subscribe(this.saveDealUpdate);
  }

  private saveDealUpdate(deal: any) {
    console.log('Deal updated ', deal);
  }

  abstract initForm(baseForms: Readonly<T>): Omit<T, 'base'> | null;
}
