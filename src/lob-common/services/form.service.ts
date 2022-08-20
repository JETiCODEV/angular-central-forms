import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DealLoaderService } from './deal-loader.service';
import { take } from 'rxjs/operators';
import { BehaviorSubject, EMPTY, forkJoin } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Deal, DealForm } from '../models';

export interface BaseForms {
  base: FormGroup<DealForm>;
}

@Injectable({
  providedIn: 'root',
})
export abstract class FormService<T extends BaseForms> {
  public forms: Readonly<T> | null = null;
  private readonly _forms$ = new BehaviorSubject<T | null>(this.forms);
  public readonly forms$ = this._forms$.asObservable();

  constructor(protected readonly dealLoaderService: DealLoaderService) {}

  public valueChanges() {
    console.log(Object.keys(this.forms));
    return forkJoin([Object.entries(this.forms)]).pipe(
      tap(console.log)
    )
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
        this.forms = this.initForm(this.forms);
      }
      this._forms$.next(this.forms);
    });

    this.valueChanges().subscribe(this.saveDealUpdate);
  }

  private saveDealUpdate(deal: Readonly<Deal>) {
    console.log('Deal updated ', deal);
  }

  abstract initForm(baseForms: Readonly<BaseForms>): T | null;
}
