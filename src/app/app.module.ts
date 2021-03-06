import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { ErrorHandler, Injectable, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthModule } from './modules/auth/auth.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

import * as Sentry from '@sentry/browser';
import { NavModule } from './modules/nav/nav.module';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { LoggedInGuard } from './logged-in.guard';
import { HomeComponent } from './modules/home/home/home.component';
import { HomeModule } from './modules/home/home.module';
import { GraphQLModule } from './modules/graphql/graphql.module';

Sentry.init({
  dsn: 'https://c71ef13256fa486bada4f4c609b3fbe5@sentry.io/1411998'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}

  handleError(error) {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registreren', component: RegisterComponent },
  { path: 'wachtwoord-vergeten', component: ForgotPasswordComponent },
  {
    path: 'speelpleinen', loadChildren: () =>
      import('./modules/playgrounds/playgrounds.module').then(m => m.PlaygroundsModule), canActivate: [LoggedInGuard]
  },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,

    AuthModule,
    HomeModule,
    NavModule,

    HttpClientModule,
    MatIconModule,
    GraphQLModule,
  ],
  providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) {
    matIconRegistry.addSvgIconSet(domSanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));
  }
}
