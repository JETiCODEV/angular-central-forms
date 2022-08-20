import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LobCommonRoutingModule } from '../lob-common/lob-common.routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        loadChildren: () =>
          import('../lob-common/lob-common.module').then(
            (m) => m.LobCommonModule
          ),
      },
    ]),
    LobCommonRoutingModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}