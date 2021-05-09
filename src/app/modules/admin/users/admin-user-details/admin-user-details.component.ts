import {AfterViewInit, Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UserAuthService} from '../../../../core/services/user-auth-service/user-auth.service';
import {IAdminUserDetailsGetResponse} from './models/i-admin-user-details-get-response';
import {IAdminUserDetails} from './models/i-admin-user-details';
import {API_ADMIN_USERS_URL} from '../models/urls';
import {convertTimestampToLocalDateTime} from '../../../shared/models/convert-timestamp-to-locale-date-time';

class AdminUserDetails implements IAdminUserDetails {
  email = '';
  // id = '';
  isActive = false;
  // login = '';
  name = '';
  permissionForAddEditAndRemoveAnimals = false;
  // permissionForAccessToActiveAdmin = false;
  permissionForCreateAndCloseAnimalRequests = false;
  phone1 = '';
  phone2 = '';
  createdAt = '';
  editedBy = '';
  updatedAt = '';
}

@Component({
  selector: 'app-user-animal-details',
  templateUrl: './admin-user-details.component.html',
  styleUrls: ['./admin-user-details.component.css']
})
export class AdminUserDetailsComponent implements AfterViewInit {
  userDetails = new AdminUserDetails();

  constructor(private httpClient: HttpClient,
              private activatedRouter: ActivatedRoute,
              public userAuthService: UserAuthService,
              private router: Router) {
  }

  ngAfterViewInit(): void {
    this.getUser(this.activatedRouter.snapshot.params.id);
  }

  public getUser(id?: number | string): void {
    if (!id) {
      return;
    }

    this.httpClient.get<IAdminUserDetailsGetResponse>(`${API_ADMIN_USERS_URL}/${id}`)
      .subscribe((res) => {
        this.userDetails = {
          // id: res.id.toString(),
          // login: res.login,
          name: res.name,
          phone1: res.phone1,
          phone2: res.phone2,
          email: res.email,

          isActive: res.is_active,
          // permissionForAccessToActiveAdmin: res.activeadmin,
          permissionForAddEditAndRemoveAnimals: res.animals_crud,
          permissionForCreateAndCloseAnimalRequests: res.requests_crud,

          createdAt: convertTimestampToLocalDateTime(res.created_at),
          updatedAt: convertTimestampToLocalDateTime(res.updated_at),
          editedBy: res.edited_by
        };
      }, error => {
        const errCode = error.error.error.error_code;
        const errMsg = error.error.error.message;
        switch (errCode) {
          case 404:
            console.error(`Page: "${API_ADMIN_USERS_URL}/${id}" not found`);
            this.router.navigateByUrl('/404');
            break;
          default:
            console.error(`Request error: ${errMsg}`);
            alert('Сталася помилка при загрузці сторінки');
        }
      });
  }
}
