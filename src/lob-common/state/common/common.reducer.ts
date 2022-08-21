import { createFeature, createReducer, on } from "@ngrx/store";
import * as CommonActions from "./common.actions";

interface State {
  isTest: boolean;
}

const initialState: State = {
  isTest: false,
};

export const commonFeature = createFeature({
  name: "common",
  reducer: createReducer(
    initialState,
    on(CommonActions.test, (state) => {
        return {
            ...state,
            isTest: true
        };
    })
  ),
});

export const {
    name,
    reducer,
    selectCommonState
} = commonFeature