import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderContainerComponent } from "./containers/header-container/header-container.component";
import { FormValuePipe } from "./pipes/form-value.pipe";
import { MatTooltipModule } from "@angular/material/tooltip";
import { FormPropertyPathDirective } from "./form-property-path.directive";

@NgModule({
  declarations: [
    HeaderContainerComponent,
    FormValuePipe,
    FormPropertyPathDirective,
  ],
  imports: [CommonModule, MatTooltipModule],
  exports: [HeaderContainerComponent, FormValuePipe, FormPropertyPathDirective],
})
export class LobSharedModule {}
