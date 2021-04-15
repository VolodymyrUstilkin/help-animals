export interface IAdminUserListGetResponseElement {
  id: string;
  login: string;
  name: string;
  phone1: string;
  phone2: string;
  email: string;

  is_active: boolean;
  activeadmin: boolean;
  animals_crud: boolean;
  requests_crud: boolean;

  created_at: string;
  updated_at: string;
  edited_by: string;
}
