import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DealLoaderService } from "./deal-loader.service";
import { take, map, filter, share, debounceTime } from "rxjs/operators";
import { BehaviorSubject, Observable, merge } from "rxjs";
import { switchMap, startWith, skip, tap } from "rxjs/operators";
import { Deal, DealForm } from "../models";
import { CommonState } from "../state/common/common.reducer";
import { Store } from "@ngrx/store";
import * as commonActions from "../state/common/common.actions";

export interface BaseForms {
  base: FormGroup<DealForm>;
}

type ExtractGeneric<Type> = Type extends FormGroup<infer X> ? X : never;
type FormGroupType<T> = {
  [P in keyof T]: ExtractGeneric<T[P]>;
};

//
// FormService to manage form initialization the same way for each LoB
// **NOTE** We should NOT create an instance of this service since it's abstract.
//

export abstract class FormService<T extends BaseForms, TDeal extends Deal> {
  public forms: Readonly<T> | null = null;
  private readonly _forms$ = new BehaviorSubject<T | null>(this.forms);
  public readonly forms$ = this._forms$.asObservable();
  public readonly formChanges: Observable<FormGroupType<T>> = this.forms$.pipe(
    filter(Boolean),
    switchMap((forms) => {
      const valueChanges = Object.entries(forms);
      let stream = merge(
        ...valueChanges.map(([, value]) => value.valueChanges)
      );

      // const isAllValid = () =>
      //   valueChanges
      //     .map(([key, value]) => value.valid)
      //     .reduce((previous, current) => previous && current, true);

      stream = stream.pipe(
        // filter(() => isAllValid()),
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

  constructor(
    protected readonly dealLoaderService: DealLoaderService,
    private readonly store: Store<CommonState>
  ) {
    this._forms$
      .pipe(
        switchMap(() => this.formChanges),
        debounceTime(200)
      )
      .subscribe(() => this.saveDealUpdate());
  }

  public initializeForm() {
    this.dealLoaderService.deal.pipe(take(1)).subscribe((deal) => {
      console.log("Deal loaded");

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

  private saveDealUpdate() {
    const materializedDeal = this.materializeDeal();
    console.log("materialized deal", materializedDeal);
    this.store.dispatch(
      commonActions.dealActions.autosaveTrigger({
        deal: materializedDeal,
      })
    );
  }

  abstract materializeDeal(): Readonly<TDeal>;
  abstract initForm(baseForms: Readonly<T>): Omit<T, "base"> | null;
}
