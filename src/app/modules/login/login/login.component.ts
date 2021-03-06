import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserAuthService} from '../../../core/services/user-auth-service/user-auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments';
import {TokenAuthService} from '../../../core/services/token-auth-service/token-auth.service';
import {Router} from '@angular/router';

const AUTHENTICATION_URL = environment.apiUrl + '/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  activeAdminApiUrl = environment.activeAdminApiUrl;

  loginForm: FormGroup = this.formBuilder.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: false
  });

  constructor(
    private httpClient: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private userAuthService: UserAuthService,
    private tokenAuthService: TokenAuthService
  ) {
  }

  ngOnInit(): void {
    if (this.userAuthService.isAuthorized()) {
      this.submitLogout();
    }
  }

  submitLogout(): void {
    this.tokenAuthService.removeToken();
    this.userAuthService.setUser(null);
    this.router.navigate(['']);
  }

  submitLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'});
    const reqBody: string = JSON.stringify({
      login: this.loginForm.value.login,
      password: this.loginForm.value.password,
      remember_me: this.loginForm.value.remember
    });
    this.httpClient.post<{ token: string }>(AUTHENTICATION_URL, reqBody, {headers})
      .subscribe((resp: any) => {
        this.tokenAuthService.setToken(resp.token, this.loginForm.value.remember);
        this.router.navigate(['']);
      }, error => {
        const errCode = error.error.error.error_code;
        const errMsg = error.error.error.message;
        switch (errCode) {
          case 400:
            console.error(errMsg);
            alert('Невірний логин або пароль');
            break;
          case 401:
            console.error(errMsg);
            alert('Невірний логин або пароль');
            break;
          default:
            console.error(errMsg);
        }
      });
    this.loginForm.patchValue({password: ''});
  }

  submitKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.loginForm.valid) {
      this.submitLogin();
    }
  }
}
