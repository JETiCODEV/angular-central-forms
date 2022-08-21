import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import * as commonActions from "../state/common/common.actions";
import { CommonState } from "../state/common/common.reducer";
import { selectCommonState } from "../state/common/common.reducer";

//
// We can probably get rid of this service because it can be fully implemented using NGRX (dispatch action, handle loading by an effect)
// 

@Injectable({
  providedIn: "root",
})
export class DealLoaderService {
  public readonly deal = this.store
    .select(selectCommonState)
    .pipe(map((state) => state.deal));

  constructor(private readonly store: Store<CommonState>) {}

  public loadDeal(id: string) {
    this.store.dispatch(commonActions.dealActions.deal({ dealId: id }));
  }
}
