import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './components/pagination/pagination.component';
import {RouterModule} from '@angular/router';
import {LoaderComponent} from './components/loader/loader.component';
import { SortingComponent } from './components/sorting/sorting.component';


@NgModule({
  declarations: [PaginationComponent, LoaderComponent, SortingComponent],
    exports: [
        PaginationComponent,
        LoaderComponent,
        SortingComponent
    ],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class SharedModule {
}
