import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DealLoaderService } from './deal-loader.service';
import { take } from 'rxjs/operators';
import { BehaviorSubject, EMPTY } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Deal } from '../models';

export interface Forms {
  base: FormGroup;
}

@Injectable({
  providedIn: 'root',
})
export class FormService<T extends Forms> {
  public forms: Readonly<T> | null = null;
  public readonly form$ = new BehaviorSubject<T | null>(this.forms);

  constructor(private readonly dealLoaderService: DealLoaderService) {}

  public valueChanges() {
    return this.form$.pipe(
      switchMap((form) => form.base.valueChanges ?? EMPTY)
    );
  }

  public initializeForm() {
    this.dealLoaderService.deal.pipe(take(1)).subscribe((deal) => {
      const form = new FormGroup({
        id: new FormControl(deal.id),
      });
      this.forms = {
        base: form,
      } as Readonly<T>;
      this.form$.next(this.forms);
    });

    this.valueChanges().subscribe(this.saveDealUpdate);
  }

  private saveDealUpdate(deal: Readonly<Deal>) {
    console.log('Deal updated ', deal);
  }
}
