import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TestContainerComponent } from "./containers/test-container/test-container.component";
import { FormValuePipe } from "./pipes/form-value.pipe";
import { HeaderContainerComponent } from "./containers/header-container/header-container.component";
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
  declarations: [
    TestContainerComponent,
    FormValuePipe,
    HeaderContainerComponent,
  ],
  exports: [FormValuePipe, HeaderContainerComponent],
})
export class LobCommonModule {
  constructor(private readonly store: Store) {
    console.log("LobCommonModule");
  }
}
