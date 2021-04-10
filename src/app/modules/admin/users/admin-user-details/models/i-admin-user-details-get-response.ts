export interface IAdminUserDetailsGetResponse {
  id: string;
  login: string;
  name: string;
  phone1: string;
  phone2: string;
  email: string;

  is_active: boolean;
  permission_for_access_to_active_admin: boolean;
  permission_for_add_edit_and_remove_animals: boolean;
  permission_for_create_and_close_animal_requests: boolean;

  created_at: string;
  updated_at: string;
  edited_by: string;
}
