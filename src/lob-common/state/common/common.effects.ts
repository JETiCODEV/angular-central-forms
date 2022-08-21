import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createFeature, Store } from "@ngrx/store";
import { tap, map } from "rxjs/operators";
import * as commonActions from "../common/common.actions";

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

  loadDeal = createEffect(() =>
    this.actions.pipe(
      ofType(commonActions.dealActions.deal),
      map(() =>
        commonActions.dealActions.dealSuccess({
          deal: {
            id: "id",
            reference: "reference",
          },
        })
      )
    )
  );
}