import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestContainerComponent } from './containers/test-container/test-container.component';
import { FormValuePipe } from './pipes/form-value.pipe';
import { HeaderContainerComponent } from './containers/header-container/header-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TestContainerComponent,
    FormValuePipe,
    HeaderContainerComponent,
  ],
  exports: [FormValuePipe, HeaderContainerComponent],
})
export class LobCommonModule {}
