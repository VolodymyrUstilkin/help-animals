import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

const STORAGE_TOKEN_NAME = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthService {
  private token: string;
  public tokenUpdatedEvent: BehaviorSubject<string>;

  constructor(private cookieService: CookieService) {
    this.token = cookieService.get(STORAGE_TOKEN_NAME);
    this.tokenUpdatedEvent = new BehaviorSubject(this.token);
  }

  setToken(token: string, remember: boolean): void {
    if (token) {
      this.token = token;
      const expires = remember ? 28 : 0;
      this.cookieService.set(STORAGE_TOKEN_NAME, this.token, expires, '/');
      this.tokenUpdatedEvent.next(this.token);
    }
  }

  getToken(): string {
    return this.token;
  }

  removeToken(): void {
    this.token = '';
    this.cookieService.delete(STORAGE_TOKEN_NAME);
  }
}
