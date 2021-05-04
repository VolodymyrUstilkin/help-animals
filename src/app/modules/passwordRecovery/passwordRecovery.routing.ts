import {Routes} from '@angular/router';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


export const PasswordRecoveryRouting: Routes = [
  {
    path: '',
    component: PasswordRecoveryComponent
  },
  { path: 'resetpassword/:token',
    component: ResetPasswordComponent,
  }
];
