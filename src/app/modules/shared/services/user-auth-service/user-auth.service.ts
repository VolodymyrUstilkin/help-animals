import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../../../environments';
import {Router} from '@angular/router';
import {TokenAuthService} from '../token-auth-service/token-auth.service';

const AUTHENTICATION_URL = environment.serverHost + environment.apiUrl + '/login';
const GET_CURRENT_USER_API_URL = environment.serverHost + environment.apiUrl + '/authUser';

const STORAGE_USER_NAME = 'authUser';

export interface IUserAuthPermissions { //  todo maybe edit, if backend say
  isActive: boolean;
  permissionForAccessToActiveAdmin: boolean;
  permissionForAddEditAndRemoveAnimals: boolean;
  permissionForCreateAndCloseAnimalRequests: boolean;
}

export class UserAuthPermissionsDefault implements IUserAuthPermissions {
  isActive = false;
  permissionForAccessToActiveAdmin = false;
  permissionForAddEditAndRemoveAnimals = false;
  permissionForCreateAndCloseAnimalRequests = false;
}

interface IUser extends IUserAuthPermissions {
  id: string;
}

class UserGuest extends UserAuthPermissionsDefault implements IUser {
  id = '';
}

const userGuest = new UserGuest();

@Injectable({
  providedIn: 'root'
})

export class UserAuthService {

  private currentUser: IUser = userGuest;
  public userUpdatedEvent: BehaviorSubject<IUser>;

  constructor(private httpClient: HttpClient, private router: Router, private tokenAuthService: TokenAuthService) {
    console.log('auth constructor start'); // todo remove
    this.userUpdatedEvent = new BehaviorSubject(this.currentUser);
    console.log('auth constructor end');  // todo remove
  }

  private static getUserFromStorage(): IUser | null {
    const userStr = localStorage.getItem(STORAGE_USER_NAME);
    if (userStr) {
      return environment.production ? JSON.parse(atob(userStr)) : JSON.parse(userStr);
    }
    return null;
  }

  public init(): void {
    console.log('auth init'); // todo remove
    this.currentUser = UserAuthService.getUserFromStorage() || userGuest;

    if (this.tokenAuthService.getToken() && this.isAuthorized()) {
      this.userUpdatedEvent.next(this.currentUser);
    } else if (!this.tokenAuthService.getToken() && this.isAuthorized()) {
      localStorage.removeItem(STORAGE_USER_NAME);
      this.setUser(userGuest);
    } else if (this.tokenAuthService.getToken() && !this.isAuthorized()) {
      this.loadUserFromServer();
    }
  }

  private saveUserToStorage(user: IUser): void {
    if (!this.isAuthorized()) {
      return;
    }
    environment.production
      ? localStorage.setItem(STORAGE_USER_NAME, btoa(JSON.stringify(user)))
      : localStorage.setItem(STORAGE_USER_NAME, JSON.stringify(user));
  }

  public isAuthorized(): boolean {
    return !!this.getUser().id.toString();
  }

  public getUser(): IUser {
    return this.currentUser;
  }

  public setUser(user: IUser): void {
    console.log('auth setUser'); // todo remove
    this.currentUser = user;
    this.saveUserToStorage(user);
    this.userUpdatedEvent.next(user);
  }

  private loadUserFromServer(): void {
    // this.httpClient.get<{ user: IUser }>(GET_CURRENT_USER_API_URL).subscribe((res) => {
    //     this.setUser(res.user);
    //   }, err => {
    //     console.log(err);
    //   }
    // );
    this.setUser({ // todo use real API instead
      id: '0',
      isActive: true,
      permissionForAccessToActiveAdmin: true,
      permissionForAddEditAndRemoveAnimals: true,
      permissionForCreateAndCloseAnimalRequests: true
    });

  }

  public login(email: string, password: string): void {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    this.httpClient.post<{ token: string }>(AUTHENTICATION_URL, JSON.stringify({email, password}), {headers})  // todo use for real server
      // this.httpClient.get<{ token: string }>(environment.fakeApiUrl + '/login') // todo use for fake API
      .subscribe((resp: any) => {
        this.tokenAuthService.setToken(resp.token);
        this.loadUserFromServer();
        this.router.navigate(['']);
      }, error => {
        console.log(error);
      });
  }

  public logout(): void {
    this.tokenAuthService.removeToken();
    localStorage.removeItem(STORAGE_USER_NAME);
    this.setUser(userGuest);
    this.router.navigate(['']);
  }
}
