import {Component, OnDestroy} from '@angular/core';
import {environment} from '../../../../environments';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IAnimalInfo} from './models/ianimal-info';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';
import {IPagination, Pagination} from '../../shared/components/pagination/pagination.component';
import {IAnimalInfoGetResponse} from './models/ianimal-infoget-response';
import {convertAnimalGetResponseToAnimalList} from './models/convert-animal-get-response-to-animal-list';

export const ANIMALS_URL = '/animals';
const API_GET_ANIMALS_URL = environment.apiUrl + ANIMALS_URL;

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.css']
})
export class AnimalListComponent implements OnDestroy {
  animalList: IAnimalInfo[] = [];
  pagination: IPagination;

  private querySubscription: Subscription;

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute) {
    this.pagination = new Pagination();
    this.pagination.url = ANIMALS_URL;
    this.pagination.perPage = 12;

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
    const httpParams = new HttpParams().appendAll(this.pagination.getQueryParams());
    this.httpClient.get<IAnimalInfoGetResponse[]>(API_GET_ANIMALS_URL, {params: httpParams, observe: 'response'})
      .subscribe((res) => {
        if (res.body) {
          this.animalList = convertAnimalGetResponseToAnimalList(res.body);
          this.pagination.setFromResponseHeaders(res.headers);
        }
      }, error => {
        const errCode = error.error.error.error_code;
        const errMsg = error.error.error.message;
        switch (errCode) {
          case 404:
            console.error(`Page: "${API_GET_ANIMALS_URL}" not found`);
            break;
          default:
            console.error(`Request error: ${errMsg}`);
            alert('Сталася помилка при загрузці сторінки');
        }
      });
  }
}
