import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('form') form!: HTMLFormElement;


  resetPasswordForm: FormGroup = this.formBuilder.group({
    password: ['', [Validators.required]],
    repeatPassword: ['', [Validators.required]],
  });


  private subscription: Subscription = new Subscription();
  private statePassword = '';
  private stateRepeatPassword = '';
  public message = '';

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
    ) {}

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
        console.log('valid');
        this.resetForm();
      } else if (this.validField() && !this.exactDataField()) {
          this.message = 'Паролi не спiвпадають спробуйте ще раз!';
          console.log(this.message);
      }
    }));

  }

  private validField(): boolean {
    return this.resetPasswordForm.controls.password.valid && this.resetPasswordForm.controls.repeatPassword.valid;
  }

  private exactDataField(): boolean {
    return this.resetPasswordForm.controls.password.value === this.resetPasswordForm.controls.repeatPassword.value;
  }

  public submit(event: Event): void {
    console.log(event);

  }

  private resetForm(): void {
    this.resetPasswordForm.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
