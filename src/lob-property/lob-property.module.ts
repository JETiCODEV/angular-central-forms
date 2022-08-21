import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LobPropertyContainerComponent } from './containers/lob-property-container/lob-property-container.component';
import { LobCommonModule } from '../lob-common/lob-common.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, LobCommonModule],
  declarations: [
    LobPropertyContainerComponent,
  ],
  exports: [LobPropertyContainerComponent],
})
export class LobPropertyModule {}
