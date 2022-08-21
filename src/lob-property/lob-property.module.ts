import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LobPropertyContainerComponent } from './containers/lob-property-container/lob-property-container.component';
import { LobSharedModule } from 'src/lob-shared/lob-shared.module';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, LobSharedModule],
  declarations: [
    LobPropertyContainerComponent,
  ],
  exports: [LobPropertyContainerComponent],
})
export class LobPropertyModule {}
