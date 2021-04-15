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


@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnDestroy {
  userList: IAdminUserListTableElement[] = [];
  pagination: IPagination;

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
  }

  public getRedirectToUserDetailsLink(id: number | string): string {
    return getUrlForAdminUserDetails(id);
  }
}
