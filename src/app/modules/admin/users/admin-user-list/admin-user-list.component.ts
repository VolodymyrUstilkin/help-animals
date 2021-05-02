import {Component, OnDestroy} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IPagination, Pagination} from '../../../shared/components/pagination/pagination.component';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {UserAuthService} from '../../../../core/services/user-auth-service/user-auth.service';
import {IAdminUserListTableElement} from './models/i-admin-user-list-table-element';
import {ADMIN_USERS_URL, API_ADMIN_USERS_URL, getUrlForAdminUserDetails} from '../models/urls';
import {IAdminUserListGetResponseElement} from './models/i-admin-user-list-get-response-element';
import {convertResponseToUserList} from './models/convert-response-to-user-list';
import {Filter} from './models/filter';
import {ESortingDirections, ESortingTypes, Sorting} from './models/sorting-types';


@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnDestroy {
  userList: IAdminUserListTableElement[] = [];
  pagination: IPagination;
  filter = new Filter();
  sorting = new Sorting();

  private querySubscription: Subscription;

  constructor(private httpClient: HttpClient, public userAuthService: UserAuthService, private activatedRoute: ActivatedRoute) {
    this.pagination = new Pagination();
    this.pagination.url = ADMIN_USERS_URL;

    this.querySubscription = this.activatedRoute.queryParams.subscribe(
      (queryParam: Params) => {
        this.pagination.page = queryParam.page || this.pagination.page;
        this.pagination.perPage = queryParam.per_page || this.pagination.perPage;
        this.getUsers();
      }
    );
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  public getUsers(): void {
    const httpParams = new HttpParams().appendAll(this.pagination.getQueryParams());
    this.httpClient.get<IAdminUserListGetResponseElement[]>(API_ADMIN_USERS_URL, {params: httpParams, observe: 'response'})
      .subscribe((res) => {
        if (res.body) {
          this.userList = convertResponseToUserList(res.body);
          this.pagination.setFromResponseHeaders(res.headers);
        }
      });


    // const order = this.sorting.getQueryParams();
    // const filter = this.filter.getQueryParams();
    // const body = {
    //   order,
    //   filter
    // };
    //
    // const httpParams = new HttpParams().appendAll({
    //   ...this.pagination.getQueryParams(),
    // });
    // this.httpClient.patch<IAdminUserListGetResponseElement[]>(API_ADMIN_USERS_URL, body, {params: httpParams, observe: 'response'})
    //   .subscribe((res) => {
    //     if (res) {
    //       this.userList = convertResponseToUserList(res.body as IAdminUserListGetResponseElement[]);
    //       this.pagination.setFromResponseHeaders(res.headers);
    //     }
    //   });
  }

  public getRedirectToUserDetailsLink(id: number | string): string {
    return getUrlForAdminUserDetails(id);
  }

  public resetFilter(): void {
    this.filter = new Filter(true);
  }

  public setSorting(sortingColumn: ESortingTypes): void {
    if (sortingColumn !== this.sorting.column) {
      this.sorting.column = sortingColumn;
      this.sorting.direction = ESortingDirections.asc;
      this.getUsers();
    } else {
      this.changeSortingDirection();
    }
  }

  public changeSortingDirection(): void {
    this.sorting.direction = this.sorting.direction === ESortingDirections.asc ? ESortingDirections.desc : ESortingDirections.asc;
    this.getUsers();
  }
}
