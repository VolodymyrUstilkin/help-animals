import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PasswordRecoveryRouting } from './passwordRecovery.routing';

import { ReactiveFormsModule } from '@angular/forms';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [PasswordRecoveryComponent, ResetPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PasswordRecoveryRouting),
    ReactiveFormsModule
  ],
})
export class PasswordrecoveryModule { }
