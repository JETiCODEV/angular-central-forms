import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import { BehaviorSubject, merge, Observable } from "rxjs";
import {
  debounceTime,
  filter,
  map,
  share,
  switchMap,
  take,
  tap
} from "rxjs/operators";
import { Deal, DealForm } from "../models";
import * as commonActions from "../state/common/common.actions";
import { CommonState } from "../state/common/common.reducer";
import { DealLoaderService } from "./deal-loader.service";
import { deepDiffMapper } from "../helpers";

export interface BaseForms {
  base: FormGroup<DealForm>;
}

declare type IsAny<T, Y, N> = 0 extends 1 & T ? Y : N;
export declare type TypedOrUntyped<T, Typed, Untyped> = IsAny<
  T,
  Untyped,
  Typed
>;
export declare type RawValue<T extends AbstractControl | undefined> =
  T extends AbstractControl<any, any>
    ? T["setValue"] extends (v: infer R) => void
      ? R
      : never
    : never;
export declare type FormGroupRawValue<
  T extends {
    [K in keyof T]?: AbstractControl<any>;
  }
> = TypedOrUntyped<
  T,
  {
    [K in keyof T]: RawValue<T[K]>;
  },
  {
    [key: string]: any;
  }
>;

//
// FormService to manage form initialization the same way for each LoB
// **NOTE** We should NOT create an instance of this service since it's abstract.
//

export abstract class FormService<T extends BaseForms, TDeal extends Deal> {
  public forms: Readonly<T> | null = null;
  private readonly _forms$ = new BehaviorSubject<T | null>(this.forms);
  public readonly forms$ = this._forms$.asObservable();
  public readonly formChanges: Observable<FormGroupRawValue<T>> =
    this.forms$.pipe(
      filter(Boolean),
      switchMap((forms) => {
        const valueChanges = Object.entries(forms);
        let stream = merge(
          ...valueChanges.map(([, value]) => value.valueChanges)
        );

        stream = stream.pipe(
          map(() => {
            const output = {};
            Object.assign(
              {},
              valueChanges.map(
                ([key, value]) => (output[key] = value.getRawValue())
              )
            );
            return output as FormGroupRawValue<T>;
          })
        );

        return stream as Observable<FormGroupRawValue<T>>;
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

    this.diff();
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
        const result = this.initForm(this.forms, deal as Readonly<TDeal>);
        this.forms = {
          ...this.forms,
          ...result,
        };
      }
      this._forms$.next(this.forms);
    });
  }

  public diff() {
    // TODO: We need to integrate this with the LoB specific forms too !!!!
    this.store
      .select((x) => x.common.deal)
      .pipe(
        filter(deal => !!deal),
        switchMap(deal => this.formChanges.pipe(map(() => deal)))
      )
      .subscribe((deal) => {
        const toDeal: FormGroupRawValue<BaseForms> = {
          base: {
            id: deal.id,
            reference: deal.reference,
          },
        };

        console.log("Differ",
          deepDiffMapper.map(toDeal, {
            base: this.forms?.base?.value,
          })
        );
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
  abstract initForm(
    baseForms: Readonly<T>,
    deal: Readonly<TDeal>
  ): Omit<T, "base"> | null;
}
