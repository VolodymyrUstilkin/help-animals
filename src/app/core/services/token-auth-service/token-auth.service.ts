import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

const STORAGE_TOKEN_NAME = 'authToken';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthService {
  private token: string;
  public tokenUpdatedEvent: BehaviorSubject<string>;

  constructor() {
    this.token = localStorage.getItem(STORAGE_TOKEN_NAME) || '';
    this.tokenUpdatedEvent = new BehaviorSubject(this.token);
  }

  setToken(token: string): void {
    if (token) {
      this.token = token;
      localStorage.setItem(STORAGE_TOKEN_NAME, this.token);
      this.tokenUpdatedEvent.next(this.token);
    }
  }

  getToken(): string {
    return this.token;
  }

  removeToken(): void {
    this.token = '';
    localStorage.removeItem(STORAGE_TOKEN_NAME);
  }
}
