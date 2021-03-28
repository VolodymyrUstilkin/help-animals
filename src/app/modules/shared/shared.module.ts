import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './components/pagination/pagination.component';
import {RouterModule} from '@angular/router';
import {sharedServices} from './services';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [PaginationComponent, LoaderComponent],
  exports: [
    PaginationComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  providers: [...sharedServices],
})
export class SharedModule {
}
