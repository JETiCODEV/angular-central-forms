import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestContainerComponent } from './containers/test-container/test-container.component';
import { FormValuePipe } from './pipes/form-value.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [TestContainerComponent, FormValuePipe],
  exports: [FormValuePipe],
})
export class LobCommonModule {}
