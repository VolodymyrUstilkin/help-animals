import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {AdminUserDetailsComponent} from './admin-user-details/admin-user-details.component';
import {AdminUsersRouting} from './admin-users.routing';


@NgModule({
  declarations: [AdminUserDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminUsersRouting),
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ]
})
export class AdminUsersModule {
}
