import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root'
})

export class PasswordRecoveryService {

  FORGOT_URL = environment.apiUrl + '/forgot';
  RESET_URL = environment.apiUrl + '/reset';

  constructor(private httpClient: HttpClient) {}

  forogotPassword(email: string): Observable<any>{
    const options = {
      params: {
        email,
      },
    };

    return this.httpClient.post<any>(this.FORGOT_URL, '', options);
  }

  resetPassword(password: string, token: string): Observable<any>{
    const options = {
      params: {
        password,
        token
      },
    };

    return this.httpClient.post<any>(this.RESET_URL, '', options);
  }
}
