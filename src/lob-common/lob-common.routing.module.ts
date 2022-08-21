import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DealLoadGuard } from "./guards/deal-load.guard";
import { LobCommonModule } from "./lob-common.module";

@NgModule({
  imports: [
    CommonModule,
    LobCommonModule,
    RouterModule.forChild([
      {
        path: "property/:dealId",
        canActivate: [DealLoadGuard],
        loadChildren: () =>
          import("../lob-property/lob-property.routing.module").then(
            (m) => m.LobPropertyRoutingModule
          ),
      },
    ]),
  ],
})
export class LobCommonRoutingModule {
  constructor() {
    console.log("LobCommonRoutingModule");
  }
}
