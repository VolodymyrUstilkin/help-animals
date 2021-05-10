import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent, of, Subscription, throwError, timer } from 'rxjs';
import { catchError, delay} from 'rxjs/operators';
import { PasswordRecoveryService } from 'src/app/core/services/password-recovery/password-recovery.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('form') form!: HTMLFormElement;

  resetPasswordForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
  });


  private subscription: Subscription = new Subscription();
  private statePassword = 'password';
  private stateRepeatPassword = 'repeatPassword';
  public message = 'initialValue';
  private tokenForChangePassword = '';

  constructor(private passwordRecoveryService: PasswordRecoveryService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
    ) {
      this.route.params.subscribe((params) => {
        this.tokenForChangePassword = params.token;
      });
    }

  ngOnInit(): void {
    this.subscription.add(this.resetPasswordForm.controls.password.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.statePassword = this.resetPasswordForm.controls.password.value;
      }
    }));

    this.subscription.add(this.resetPasswordForm.controls.repeatPassword.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.stateRepeatPassword = this.resetPasswordForm.controls.repeatPassword.value;
      }
    }));

  }

  ngAfterViewInit(): void {

    this.subscription.add(fromEvent<Event>(this.form.nativeElement, 'submit').subscribe((e) => {
      e.preventDefault();
      if (this.validField() && this.exactDataField()) {
        this.passwordRecoveryService.resetPassword(this.statePassword, this.tokenForChangePassword).pipe(
          catchError((error) => {
            this.message = 'error';
            return throwError(error);
          }),
        ).subscribe(() => {
          this.message = 'success';
          this.subscription.add(of(true).pipe(delay(5000))
          .subscribe(() => this.router.navigate(['login'])));
        });
        this.resetForm();
      }
    }));

  }

  private validField(): boolean {
    return this.resetPasswordForm.controls.password.valid && this.resetPasswordForm.controls.repeatPassword.valid;
  }

  exactDataField(): boolean {
    return this.statePassword  === this.stateRepeatPassword;
  }

  submit(event: Event): void {
    console.log(event);
  }

  private resetForm(): void {
    this.resetPasswordForm.reset();
  }

  changeAppearance(event: Event, input: HTMLInputElement): void {
    const element = (event.target as SVGImageElement);
    const attributes = (event.target as HTMLOrSVGScriptElement).dataset.svg;
    const basePath = './../../../assets/images/sprire.svg#';
    const nameOfFirstSVG = 'view';
    const nameOfSecondSVG = 'view-close';
    const svg = element.children[0].children[0] as SVGImageElement;

    switch (attributes) {
      case nameOfFirstSVG:
        svg.href.baseVal = `${basePath}${nameOfSecondSVG}`;
        element.dataset.svg = nameOfSecondSVG;
        input.setAttribute('type', 'text');
        break;
      case nameOfSecondSVG:
        svg.href.baseVal = `${basePath}${nameOfFirstSVG}`;
        element.dataset.svg = nameOfFirstSVG;
        input.setAttribute('type', 'password');
        break;
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
