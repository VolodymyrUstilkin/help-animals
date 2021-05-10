import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { fromEvent, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PasswordRecoveryService } from 'src/app/core/services/password-recovery/password-recovery.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('form') form!: HTMLFormElement;

  public responseFromServer = '';
  private subscription: Subscription = new Subscription();
  public emailControl!: FormControl;
  private stateEmail = '';

  constructor(private passwordRecoveryService: PasswordRecoveryService) {}

  ngOnInit(): void {
    this.emailControl = new FormControl(this.stateEmail, [Validators.required, Validators.email]);

    this.subscription.add(this.emailControl.statusChanges.subscribe((status) => {
      if (status === 'VALID') {
        this.stateEmail = this.emailControl.value;
      }
    }));
  }

  ngAfterViewInit(): void {
    this.subscription.add(fromEvent<Event>(this.form.nativeElement, 'submit').subscribe((e) => {
      e.preventDefault();

      if (this.emailControl.valid) {
        this.passwordRecoveryService.forogotPassword(this.stateEmail).pipe(
          catchError((error) => {
            this.responseFromServer = 'error';
            return throwError(error);
          })
        ).subscribe(() => {
          this.responseFromServer = 'success';
        });
        this.resetForm();
      }
    }));
  }

  private resetForm(): void {
    this.emailControl.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
