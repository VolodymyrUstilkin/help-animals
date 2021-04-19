import {Component, OnDestroy} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IPagination, Pagination} from '../../../shared/components/pagination/pagination.component';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params} from '@angular/router';
import {UserAuthService} from '../../../../core/services/user-auth-service/user-auth.service';
import {IAdminAnimalListTableElement} from './models/i-admin-animal-list-table-element';
import {ADMIN_ANIMALS_URL, API_ADMIN_ANIMALS_URL} from '../models/urls';
import {IAdminAnimalListGetResponseElement} from './models/i-admin-animal-list-get-response';
import {convertResponseToAnimalList} from './models/convert-response-to-animal-list';
import {ESortingDirections, ESortingTypes, Sorting} from './models/sorting-types';


@Component({
  selector: 'app-admin-animal-list',
  templateUrl: './admin-animal-list.component.html',
  styleUrls: ['./admin-animal-list.component.css']
})
export class AdminAnimalListComponent implements OnDestroy {
  animalList: IAdminAnimalListTableElement[] = [];
  pagination: IPagination;
  sorting = new Sorting();

  private querySubscription: Subscription;

  constructor(
    private httpClient: HttpClient,
    public userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.pagination = new Pagination();
    this.pagination.url = ADMIN_ANIMALS_URL;

    this.querySubscription = this.activatedRoute.queryParams.subscribe(
      (queryParam: Params) => {
        this.pagination.page = queryParam.page || this.pagination.page;
        this.pagination.perPage = queryParam.per_page || this.pagination.perPage;
        this.getAnimals();
      }
    );
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

  public getAnimals(): void {
    const httpParams = new HttpParams().appendAll({...this.pagination.getQueryParams(), ...this.sorting.getQueryParams()});
    this.httpClient.get<IAdminAnimalListGetResponseElement[]>(API_ADMIN_ANIMALS_URL, {params: httpParams, observe: 'response'})
      .subscribe((res) => {
        if (res.body) {
          this.animalList = convertResponseToAnimalList(res.body);
          this.pagination.setFromResponseHeaders(res.headers);
        }
      });
  }

  public getRedirectToAnimalDetailsLink(id: number | string): string {
    return `${ADMIN_ANIMALS_URL}/${id}`;
  }

  public getRedirectToAddLink(): string {
    return `${ADMIN_ANIMALS_URL}/add`;
  }

  public setSorting(sortingColumn: ESortingTypes): void {
    if (sortingColumn !== this.sorting.column) {
      this.sorting.column = sortingColumn;
      this.sorting.direction = ESortingDirections.asc;
      this.getAnimals();
    } else {
      this.changeSortingDirection();
    }
  }

  public changeSortingDirection(): void {
    this.sorting.direction = this.sorting.direction === ESortingDirections.asc ? ESortingDirections.desc : ESortingDirections.asc;
    this.getAnimals();
  }
}
