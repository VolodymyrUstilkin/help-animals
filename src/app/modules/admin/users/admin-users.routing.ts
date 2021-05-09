import {Routes} from '@angular/router';
import {AdminUserListComponent} from './admin-user-list/admin-user-list.component';
import {AdminUserDetailsComponent} from './admin-user-details/admin-user-details.component';

export const AdminUsersRouting: Routes = [
  // {
  //   path: 'list',
  //   component: AdminUserListComponent,
  // },
  // {
  //   path: 'add',
  //   component: AdminUserDetailsComponent,
  // },
  {
    path: ':id/details',
    component: AdminUserDetailsComponent,
  },
  // {
  //   path: '',
  //   redirectTo: 'list'
  // }
];
