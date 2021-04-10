import {IAdminUserListGetResponseElement} from './i-admin-user-list-get-response-element';
import {IAdminUserListTableElement} from './i-admin-user-list-table-element';
import {convertTimestampToLocalDateTime} from '../../../../shared/models/convert-timestamp-to-locale-date-time';

export const convertResponseToUserList = (response: IAdminUserListGetResponseElement[]): IAdminUserListTableElement[] => {
  return response.map((resp) => {
      return {
        id: resp.id.toString(),
        login: resp.login,
        name: resp.name,
        phone1: resp.phone1,
        phone2: resp.phone2,
        email: resp.email,

        isActive: resp.is_active,
        permissionForAccessToActiveAdmin: resp.permission_for_access_to_active_admin,
        permissionForAddEditAndRemoveAnimals: resp.permission_for_add_edit_and_remove_animals,
        permissionForCreateAndCloseAnimalRequests: resp.permission_for_create_and_close_animal_requests,

        createdAt: convertTimestampToLocalDateTime(resp.created_at),
        updatedAt: convertTimestampToLocalDateTime(resp.updated_at),
        editedBy: resp.edited_by,
      };
    }
  );
};
