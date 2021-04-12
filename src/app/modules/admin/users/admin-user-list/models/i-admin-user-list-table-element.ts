import {IUserAuthPermissions} from '../../../../../core/services/user-auth-service/models/i-user-auth-permissions';

export interface IAdminUserListTableElement extends IUserAuthPermissions {
  id: string;
  name: string;
  login: string;
  phone1: string;
  phone2: string;
  email: string;
  updatedAt: string;
  createdAt: string;
  editedBy: string;
}
