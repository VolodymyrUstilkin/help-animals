import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPasswordRecovery } from 'src/app/modules/passwordRecovery/password-recovery/model/password-recovery.interface';
import { environment } from 'src/environments';

@Injectable({
  providedIn: 'root'
})

export class PasswordRecoveryService {

  FORGOT_URL = environment.apiUrl + '/forgot';
  RESET_URL = environment.apiUrl + '/reset';

  constructor(private httpClient: HttpClient) {}

  forogotPassword(email: string): Observable<IPasswordRecovery>{
    const options = {
      params: {
        email,
      },
    };

    return this.httpClient.post<IPasswordRecovery>(this.FORGOT_URL, '', options);
  }

  resetPassword(password: string, token: string): Observable<IPasswordRecovery>{
    const options = {
      params: {
        password,
        token
      },
    };

    return this.httpClient.post<IPasswordRecovery>(this.RESET_URL, '', options);
  }
}
