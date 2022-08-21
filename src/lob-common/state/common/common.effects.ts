import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { test } from "./common.actions";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root",
})
export class CommonEffects {
  constructor(
    private readonly store: Store,
    private readonly actions: Actions
  ) {
    console.log("CommonEffects");
  }

  test = createEffect(
    () =>
      this.actions.pipe(
        ofType(test),
        tap(() => alert("test effect handled"))
      ),
    { dispatch: false }
  );
}
