import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContainerComponent } from './containers/header-container/header-container.component';
import { FormValuePipe } from './pipes/form-value.pipe';



@NgModule({
  declarations: [
    HeaderContainerComponent,
    FormValuePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderContainerComponent,
    FormValuePipe
  ]
})
export class LobSharedModule { }
