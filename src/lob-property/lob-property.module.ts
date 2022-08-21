import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { LobSharedModule } from "src/lob-shared/lob-shared.module";
import { LobPropertyContainerComponent } from "./containers/lob-property-container/lob-property-container.component";
import { PerilsCoveredContainerComponent } from "./containers/perils-covered-container/perils-covered-container.component";

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, LobSharedModule],
  declarations: [
    LobPropertyContainerComponent,
    PerilsCoveredContainerComponent,
  ],
  exports: [LobPropertyContainerComponent],
})
export class LobPropertyModule {}
