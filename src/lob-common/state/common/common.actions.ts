import {
  createAction,
  createActionGroup,
  props,
  emptyProps,
} from "@ngrx/store";
import { Deal } from "src/lob-common/models";

export const dealActions = createActionGroup({
  source: "Deal",
  events: {
    Deal: props<{ dealId: string }>(),
    "Deal Success": props<{ deal: Readonly<Deal> }>(),
    "Deal Fail": emptyProps(),
    "Autosave trigger": emptyProps()
  },
});
