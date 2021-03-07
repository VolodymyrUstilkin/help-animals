import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRouting} from './app-routing';
import {AppComponent} from './app.component';
import {NavMenuComponent} from './core/components/nav-menu/nav-menu.component';
import {HeaderComponent} from './core/components/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './modules/shared/shared.module';
import {NavMenuNewComponent} from './core/components/nav-menu-new/nav-menu-new.component';
import {FullSizeHeaderComponent} from './core/components/full-size-header/full-size-header.component';
import {NavMenuMobileComponent} from './core/components/nav-menu-mobile/nav-menu-mobile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HeaderComponent,
    NavMenuNewComponent,
    FullSizeHeaderComponent,
    NavMenuMobileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRouting,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
