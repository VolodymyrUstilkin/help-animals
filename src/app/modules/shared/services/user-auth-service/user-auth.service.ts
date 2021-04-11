import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../../../../environments';
import {Router} from '@angular/router';
import {TokenAuthService} from '../token-auth-service/token-auth.service';
import {Convertors} from './models/convertors';
import {IUserAuthPermissions} from './models/i-user-auth-permissions';
import {IUserAuthResponse} from './models/i-user-auth-response';

const AUTHENTICATION_URL = environment.serverHost + environment.apiUrl + '/login';
const GET_CURRENT_USER_API_URL = environment.serverHost + environment.apiUrl + '/login';

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

export class UserAuthService {
  private currentUser: IUserAuth = userGuest;
  public userUpdatedEvent: BehaviorSubject<IUserAuth>;

  constructor(private httpClient: HttpClient, private router: Router, private tokenAuthService: TokenAuthService) {
    this.userUpdatedEvent = new BehaviorSubject(this.currentUser);
  }

  public init(): void {
    if (this.tokenAuthService.getToken()) {
      this.loadUserFromServer();
    }
  }

  public isAuthorized(): boolean {
    return !!this.getUser().id.toString();
  }

  public getUser(): IUserAuth {
    return this.currentUser;
  }

  public setUser(user: IUserAuth): void {
    this.currentUser = user;
    this.userUpdatedEvent.next(user);
  }

  private loadUserFromServer(): void {
    console.log('loading user from server');
    this.httpClient.get<IUserAuthResponse>(GET_CURRENT_USER_API_URL).subscribe((res) => {
        this.setUser(Convertors.convertUserAuthResponseToUserAuth(res));
        console.log('updated user from server:' + JSON.stringify(this.getUser()));
      }, err => {
        console.log(err);
      }
    );
  }

  public login(email: string, password: string): void {
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    this.httpClient.post<{ token: string }>(AUTHENTICATION_URL, JSON.stringify({email, password}), {headers})
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
    this.setUser(userGuest);
    this.router.navigate(['']);
  }
}
