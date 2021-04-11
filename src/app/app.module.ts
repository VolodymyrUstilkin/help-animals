import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRouting} from './app-routing';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {PageNotFoundComponent} from './core/components/page-not-found/page-not-found.component';
import {AuthInterceptor} from './core/interceptors/auth.interceptor';
import {NavigationUiComponent} from './core/components/navigation-new-design/navigation-ui.component';
import {HeaderUiComponent} from './core/components/header-new-design/header-ui.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    NavigationUiComponent,
    HeaderUiComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouting,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, // Injection Token
    useClass: AuthInterceptor, // Interceptor class
    multi: true, // we added array
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
