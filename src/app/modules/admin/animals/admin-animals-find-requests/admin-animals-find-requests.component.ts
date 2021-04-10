import {Component, OnDestroy} from '@angular/core';
import {environment} from '../../../../../environments';
import {IPagination, Pagination} from '../../../shared/components/pagination/pagination.component';
import {Subscription} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {IAdminOpenedAnimalFindRequest} from './models/i-admin-opened-animal-find-request';
import {UserAuthService} from '../../../shared/services/user-auth-service/user-auth.service';
import {IAdminOpenedAnimalFindRequestGetResponse} from './models/i-admin-opened-animal-find-request-get-response';
import {Convertors} from './models/convertors';
import {IAdminClosedAnimalFindRequest} from './models/i-admin-closed-animal-find-request';
import {IAdminClosedAnimalFindRequestGetResponse} from './models/i-admin-closed-animal-find-request-get-response';

// const API_ANIMALS_FIND_REQUESTS_URL = environment.fakeApiUrl + '/animals-find-requests/';
const API_ANIMALS_REQUESTS_OPENED_URL = environment.serverHost + environment.apiUrl + '/opened-requests';
const API_ANIMALS_REQUESTS_CLOSED_URL = environment.serverHost + environment.apiUrl + '/closed-requests';
const ADMIN_ANIMALS_FIND_REQUESTS_URL = '/admin/animals/find-requests';


class AnimalFindRequest implements IAdminOpenedAnimalFindRequest {
  id = '';
  address = '';
  closedData = '';
  openedDate = '';
  userClosedId = '';
  userCreatedId = '';
}

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

  QueryFilterParamTypes = {
    opened: 'opened',
    closed: 'closed'
  };

  currentQueryFilterParams = this.QueryFilterParamTypes.opened;

  private querySubscription: Subscription;

  constructor(private httpClient: HttpClient,
              private userAuthService: UserAuthService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
    this.pagination = new Pagination();
    this.pagination.additionalParams = {type: this.QueryFilterParamTypes.opened};
    this.pagination.url = ADMIN_ANIMALS_FIND_REQUESTS_URL;

    this.querySubscription = this.activatedRoute.queryParams.subscribe(
      (queryParam: Params) => {
        this.pagination.page = queryParam.page || this.pagination.page;
        this.pagination.perPage = queryParam.per_page || this.pagination.perPage;
        this.currentQueryFilterParams = queryParam.type || this.QueryFilterParamTypes.opened;
        this.getAnimalsFindRequests();
      }
    );
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  public getAnimalsFindRequests(): void {
    const httpParams = new HttpParams();
    httpParams.append('filter', this.currentQueryFilterParams);
    httpParams.appendAll(this.pagination.getQueryParams());

    if (this.currentQueryFilterParams !== this.QueryFilterParamTypes.closed) {
      this.httpClient.get<IAdminOpenedAnimalFindRequestGetResponse[]>(API_ANIMALS_REQUESTS_OPENED_URL, {
        params: httpParams,
        observe: 'response'
      }).subscribe((res) => {
        if (res.body) {
          this.animalOpenedRequestList = Convertors.convertOpenedAnimalFindRequestGetResponseToOpenedAnimalFindRequest(res.body);
          this.pagination.setFromResponseHeaders(res.headers);
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
      });
    }
  }

  public closeAnimalFindRequest(id: string | number): void {
    const url = `${API_ANIMALS_REQUESTS_OPENED_URL}/${id}`;

    // const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    // this.httpClient.patch(url, JSON.stringify({id}), {headers}).subscribe((resp) => {
    this.httpClient.patch(url, null).subscribe((resp) => {
      this.getAnimalsFindRequests();
    }, (err) => this.submitErrorHandler(err));
  }

  public createAnimalFindRequest(): void {
    const animalFindRequest = {address: this.newRequestAddress};
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});

    this.httpClient.post(API_ANIMALS_REQUESTS_OPENED_URL, JSON.stringify(animalFindRequest), {headers}).subscribe(() => {
      this.getAnimalsFindRequests();
      this.newRequestAddress = '';
    }, (err) => this.submitErrorHandler(err));
  }

  changeQueryFilterParams(type: string): void {
    this.currentQueryFilterParams = type;
    this.pagination.additionalParams = {type};
    this.router.navigate([ADMIN_ANIMALS_FIND_REQUESTS_URL], {
      queryParams: {type}
    });
  }

  submitErrorHandler(err: Error): void {
    alert('Сталася помилка при відправці форми: ' + err.message);
  }
}
