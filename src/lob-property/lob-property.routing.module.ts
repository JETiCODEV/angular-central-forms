import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobPropertyModule } from './lob-property.module';
import { RouterModule } from '@angular/router';
import { LobPropertyContainerComponent } from './containers/lob-property-container/lob-property-container.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DealLoadGuard } from '../lob-common/guards/deal-load.guard';

@NgModule({
  imports: [
    CommonModule,
    LobPropertyModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'submission',
        component: LobPropertyContainerComponent,
      },
    ]),
  ],
  declarations: [],
})
export class LobPropertyRoutingModule {
  constructor() {
    console.log('LobPropertyRoutingModule');
  }
}
