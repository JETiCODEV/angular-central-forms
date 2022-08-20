import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LobPropertyModule } from './lob-property.module';
import { RouterModule } from '@angular/router';
import { LobPropertyContainerComponent } from './containers/lob-property-container/lob-property-container.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    LobPropertyModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LobPropertyContainerComponent,
      },
    ]),
  ],
  declarations: [],
})
export class LobPropertyRoutingModule {}
