import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Store, StoreModule } from "@ngrx/store";
import { commonFeature } from "./state/common/common.reducer";
import { EffectsModule } from "@ngrx/effects";
import { CommonEffects } from "./state/common/common.effects";

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(commonFeature),
    EffectsModule.forFeature([CommonEffects]),
  ],
})
export class LobCommonModule {
  constructor(private readonly store: Store) {
    console.log("LobCommonModule");
  }
}
