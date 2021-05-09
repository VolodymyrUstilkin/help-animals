import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Subscription} from 'rxjs';
import {environment} from '../../../../environments';
import {Router} from '@angular/router';
import {TokenAuthService} from '../token-auth-service/token-auth.service';
import {Convertors} from './models/convertors';
import {IUserAuthPermissions} from './models/i-user-auth-permissions';
import {IUserAuthResponse} from './models/i-user-auth-response';

const GET_CURRENT_USER_API_URL = environment.apiUrl + '/login';
const STORAGE_USER_NAME = 'user';

class UserAuthPermissionsDefault implements IUserAuthPermissions {
  isActive = false;
  permissionForAccessToActiveAdmin = false;
  permissionForAddEditAndRemoveAnimals = false;
  permissionForCreateAndCloseAnimalRequests = false;
}

export interface IUserAuth extends IUserAuthPermissions {
  id: string;
}

class UserGuest extends UserAuthPermissionsDefault implements IUserAuth {
  id = '';
}

const userGuest = new UserGuest();

@Injectable({
  providedIn: 'root'
})

export class UserAuthService implements OnDestroy {
  private currentUser: IUserAuth = userGuest;
  public userUpdatedEvent: BehaviorSubject<IUserAuth> = new BehaviorSubject(this.currentUser);
  public tokenUpdatedEventSubscription: Subscription = this.tokenAuthService.tokenUpdatedEvent.subscribe(() => this.loadUserFromServer());

  constructor(private httpClient: HttpClient,
              private router: Router,
              private tokenAuthService: TokenAuthService) {
    if (!tokenAuthService.getToken()) {
      this.setUser(null);
    }


    const user = localStorage.getItem(STORAGE_USER_NAME);
    if (user) {
      this.currentUser = JSON.parse(atob(user));
    }
  }

  ngOnDestroy(): void {
    this.tokenUpdatedEventSubscription.unsubscribe();
  }

  public isAuthorized(): boolean {
    return !!this.getUser().id.toString();
  }

  public getUser(): IUserAuth {
    return this.currentUser;
  }

  public setUser(user: IUserAuth | null): void {
    if (user && this.tokenAuthService.getToken()) {
      this.currentUser = user;
      localStorage.setItem(STORAGE_USER_NAME, btoa(JSON.stringify(this.currentUser)));
    } else {
      this.currentUser = userGuest;
      localStorage.removeItem(STORAGE_USER_NAME);
    }
    this.userUpdatedEvent.next(this.currentUser);
  }

  private loadUserFromServer(): void {
    if (!this.tokenAuthService.getToken()) {
      return;
    }

    this.httpClient.get<IUserAuthResponse>(GET_CURRENT_USER_API_URL).subscribe((res) => {
        this.setUser(Convertors.convertUserAuthResponseToUserAuth(res));
      }, err => {
        console.log(err);
      }
    );
  }
}
