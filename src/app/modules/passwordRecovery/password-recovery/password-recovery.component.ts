import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('form') form!: HTMLFormElement;


  public responseFromServer = false;
  public successMessage = false;
  private subscription: Subscription = new Subscription();
  public emailControl!: FormControl;
  private stateEmail = '';

  constructor(private httpClient: HttpClient) {}

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
        // this.httpClient.post()
        console.log('valid');
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
