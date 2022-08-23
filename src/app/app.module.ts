import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LobCommonRoutingModule } from '../lob-common/lob-common.routing.module';
import { RouterModule } from '@angular/router';
import { createReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appReducer = createReducer({});

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false,
      name: 'testApp'
    }),
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
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor() {
    console.log('AppModule');
  }
}
