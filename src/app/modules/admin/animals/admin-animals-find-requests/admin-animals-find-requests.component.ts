import {Component, OnDestroy} from '@angular/core';
import {environment} from '../../../../../environments';
import {IPagination, Pagination} from '../../../shared/components/pagination/pagination.component';
import {Subscription} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {IAdminOpenedAnimalFindRequest} from './models/i-admin-opened-animal-find-request';
import {UserAuthService} from '../../../../core/services/user-auth-service/user-auth.service';
import {IAdminOpenedAnimalFindRequestGetResponse} from './models/i-admin-opened-animal-find-request-get-response';
import {Convertors} from './models/convertors';
import {IAdminClosedAnimalFindRequest} from './models/i-admin-closed-animal-find-request';
import {IAdminClosedAnimalFindRequestGetResponse} from './models/i-admin-closed-animal-find-request-get-response';
import {getUrlForAdminUserDetails} from '../../users/models/urls';

const API_ANIMALS_REQUESTS_OPENED_URL = environment.apiUrl + '/opened-requests';
const API_ANIMALS_REQUESTS_CLOSED_URL = environment.apiUrl + '/closed-requests';
const ADMIN_ANIMALS_FIND_REQUESTS_URL = '/admin/animals/find-requests';

@Component({
  selector: 'app-admin-animals-find-requests',
  templateUrl: './admin-animals-find-requests.component.html',
  styleUrls: ['./admin-animals-find-requests.component.css']
})
export class AdminAnimalsFindRequestsComponent implements OnDestroy {

  animalOpenedRequestList: IAdminOpenedAnimalFindRequest[] = [];
  animalClosedRequestList: IAdminClosedAnimalFindRequest[] = [];
  pagination: IPagination;
  newRequestAddress = '';

  RequestParamTypes = {
    opened: 'opened',
    closed: 'closed'
  };

  currentRequestType = this.RequestParamTypes.opened;

  private querySubscription: Subscription;

  constructor(private httpClient: HttpClient,
              private userAuthService: UserAuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.pagination = new Pagination();
    this.pagination.additionalParams = {type: this.RequestParamTypes.opened};
    this.pagination.url = ADMIN_ANIMALS_FIND_REQUESTS_URL;

    this.querySubscription = this.activatedRoute.queryParams.subscribe(
      (queryParam: Params) => {
        this.pagination.page = queryParam.page || this.pagination.page;
        this.pagination.perPage = queryParam.per_page || this.pagination.perPage;
        this.currentRequestType = queryParam.type || this.RequestParamTypes.opened;
        this.getAnimalsFindRequests();
      }
    );
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  public getAnimalsFindRequests(): void {
    const httpParams = new HttpParams().appendAll({
      ...this.pagination.getQueryParams(),
      type: this.currentRequestType
    });

    if (this.currentRequestType !== this.RequestParamTypes.closed) {
      this.httpClient.get<IAdminOpenedAnimalFindRequestGetResponse[]>(API_ANIMALS_REQUESTS_OPENED_URL, {
        params: httpParams,
        observe: 'response'
      }).subscribe((res) => {
        if (res.body) {
          this.animalOpenedRequestList = Convertors.convertOpenedAnimalFindRequestGetResponseToOpenedAnimalFindRequest(res.body);
          this.pagination.setFromResponseHeaders(res.headers);
        }
      }, error => {
        const errCode = error.error.error.error_code;
        const errMsg = error.error.error.message;
        switch (errCode) {
          case 404:
            console.error(`Page: "${API_ANIMALS_REQUESTS_OPENED_URL}" not found`);
            this.router.navigateByUrl('/404');
            break;
          default:
            console.error(`Request error: ${errMsg}`);
            alert('Сталася помилка при загрузці сторінки');
        }
      });
    } else {
      this.httpClient.get<IAdminClosedAnimalFindRequestGetResponse[]>(API_ANIMALS_REQUESTS_CLOSED_URL, {
        params: httpParams,
        observe: 'response'
      }).subscribe((res) => {
        if (res.body) {
          this.animalClosedRequestList = Convertors.convertClosedAnimalFindRequestGetResponseToClosedAnimalFindRequest(res.body);
          this.pagination.setFromResponseHeaders(res.headers);
        }
      }, error => {
        const errCode = error.error.error.error_code;
        const errMsg = error.error.error.message;
        switch (errCode) {
          case 404:
            console.error(`Page: "${API_ANIMALS_REQUESTS_OPENED_URL}" not found`);
            this.router.navigateByUrl('/404');
            break;
          default:
            console.error(`Request error: ${errMsg}`);
            alert('Сталася помилка при загрузці сторінки');
        }
      });
    }
  }

  public closeAnimalFindRequest(id: string | number): void {
    const url = `${API_ANIMALS_REQUESTS_OPENED_URL}/${id}`;

    // const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    // this.httpClient.patch(url, JSON.stringify({id}), {headers}).subscribe((resp) => {
    this.httpClient.patch(url, null).subscribe(() => {
      this.getAnimalsFindRequests();
    }, error => {
      const errCode = error.error.error.error_code;
      const errMsg = error.error.error.message;
      switch (errCode) {
        case 404:
          console.error(`Page: "${API_ANIMALS_REQUESTS_OPENED_URL}" not found`);
          this.router.navigateByUrl('/404');
          break;
        default:
          console.error(`Request error: ${errMsg}`);
          alert('Сталася помилка при загрузці сторінки');
      }
    });
  }

  public createAnimalFindRequest(): void {
    const animalFindRequest = {address: this.newRequestAddress};
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    this.httpClient.post(API_ANIMALS_REQUESTS_OPENED_URL, JSON.stringify(animalFindRequest), {headers}).subscribe(() => {
      this.getAnimalsFindRequests();
      this.newRequestAddress = '';
    }, error => {
      const errCode = error.error.error.error_code;
      const errMsg = error.error.error.message;
      switch (errCode) {
        case 400:
          console.error(errMsg);
          alert('Некоректна адреса');
          break;
        default:
          console.error(`Request error: ${errMsg}`);
          alert('Сталася помилка при загрузці сторінки');
      }
    });
  }

  changeQueryFilterParams(type: string): void {
    this.currentRequestType = type;
    this.pagination.additionalParams = {type};
    this.router.navigate([ADMIN_ANIMALS_FIND_REQUESTS_URL], {
      queryParams: {type}
    });
  }

  public getRedirectToUserDetailsLink(id: number | string): string {
    return getUrlForAdminUserDetails(id);
  }
}
