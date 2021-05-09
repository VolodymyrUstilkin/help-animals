import {AfterContentChecked, Component, Input} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

export const PAGE_HEADER_NAME = 'X-Page';
export const TOTAL_PAGES_HEADER_NAME = 'X-Total-Pages';

export interface IPagination {
  page: number;
  perPage: number;
  totalPages: number;
  url: string;
  additionalParams: object;
  getQueryParams: () => { [param: string]: string };
  setFromResponseHeaders: (headers: HttpHeaders) => void;
}

export class Pagination implements IPagination {
  page = 1;
  perPage = 20;
  totalPages = 1;
  url = '';
  additionalParams = {};

  getQueryParams(): { [param: string]: string } {
    return {
      page: this.page.toString(),
      per_page: this.perPage.toString(),
      ...this.additionalParams
    };
  }

  setFromResponseHeaders(headers: HttpHeaders): void {
    this.page = Number(headers.get(PAGE_HEADER_NAME)) || 1;
    this.totalPages = Number(headers.get(TOTAL_PAGES_HEADER_NAME)) || 1;
  }
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements AfterContentChecked {

  @Input() pagination: IPagination = new Pagination();
  paginationPages: number[] = [];

  constructor() {
  }

  updatePaginationItems(): void {
    this.pagination.page = Number(this.pagination.page) || 1;

    const offset = 3;
    const pagination: number[] = [];
    const startPage = this.pagination.page - offset > 1 ? this.pagination.page - offset : 1;
    const endPage = this.pagination.page + offset <= this.pagination.totalPages
      ? this.pagination.page + offset
      : this.pagination.totalPages;

    for (let i: number = startPage; i <= endPage; i++) {
      pagination.push(i);
    }

    this.paginationPages = pagination;
  }

  getUrlForPage(): string {
    return this.pagination.url;
  }

  getUrlParamsForPage(page: number | string): { [param: string]: string } {
    return {
      page: page.toString(),
      per_page: this.pagination.perPage.toString(),
      ...this.pagination.additionalParams
    };
  }

  ngAfterContentChecked(): void {
    this.updatePaginationItems();
  }
}
