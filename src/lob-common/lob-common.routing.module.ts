import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestContainerComponent } from './containers/test-container/test-container.component';
import { LobCommonModule } from './lob-common.module';
import { DealLoadGuard } from './guards/deal-load.guard';

@NgModule({
  imports: [
    CommonModule,
    LobCommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: TestContainerComponent,
      },
      {
        path: 'property/:dealId',
        canActivate: [DealLoadGuard],
        loadChildren: () =>
          import('../lob-property/lob-property.routing.module').then(
            (m) => m.LobPropertyRoutingModule
          ),
      },
    ]),
  ],
  declarations: [],
})
export class LobCommonRoutingModule {
  constructor() {
    console.log('LobCommonRoutingModule');
  }
}
