import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoreConfigModule } from './core/config/config.module';
import { translateProviders } from './localization.module';
import { RegistrationComponent } from './layouts/registration/registration.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, RegistrationComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}, {}),
    CoreConfigModule.forRoot({
      preload: true,
      path: `config/config.json`
    }),
    TranslateModule.forRoot(translateProviders)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
