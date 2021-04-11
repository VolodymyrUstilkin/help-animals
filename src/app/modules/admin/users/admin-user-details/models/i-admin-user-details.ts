import {IUserAuthPermissions} from '../../../../shared/services/user-auth-service/models/i-user-auth-permissions';

export interface IAdminUserDetails extends IUserAuthPermissions {
  id: string;
  login: string;
  name: string;
  phone1: string;
  phone2: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  editedBy: string;
}
