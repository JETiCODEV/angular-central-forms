import { createFeature, createReducer, on } from "@ngrx/store";
import { Deal } from "src/lob-common/models";
import * as CommonActions from "./common.actions";

interface State {
  isTest: boolean;
  deal: Readonly<Deal> | null;
}

const initialState: State = {
  isTest: false,
  deal: null,
};

export interface CommonState {
  common: State;
}

export const commonFeature = createFeature({
  name: "common",
  reducer: createReducer(
    initialState,
    on(CommonActions.dealActions.dealSuccess, (state, action) => ({
      ...state,
      deal: action.deal,
    }))
  ),
});

export const { name, reducer, selectCommonState } = commonFeature;
