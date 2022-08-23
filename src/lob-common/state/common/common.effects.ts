import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map } from "rxjs/operators";
import { PropertyDeal } from "src/lob-common/models";
import * as commonActions from "../common/common.actions";

@Injectable({
  providedIn: "root",
})
export class CommonEffects {
  constructor(private readonly actions: Actions) {
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
            propertyName: "Property name",
            perilsCovered: ["flood", "eq", "test", "bleah"],
            other: "other",
          } as PropertyDeal,
        })
      )
    )
  );
}
