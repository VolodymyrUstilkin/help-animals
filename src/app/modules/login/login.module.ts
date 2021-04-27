import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {LoginRouting} from './login.routing';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { CheckboxComponent } from 'src/app/core/components/checkbox/checkbox.component';


@NgModule({
  declarations: [LoginComponent, CheckboxComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRouting),
    ReactiveFormsModule
  ]
})
export class LoginModule {
}
