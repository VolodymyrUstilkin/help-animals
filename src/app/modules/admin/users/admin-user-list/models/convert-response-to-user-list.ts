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
        permissionForAccessToActiveAdmin: resp.activeadmin,
        permissionForAddEditAndRemoveAnimals: resp.animals_crud,
        permissionForCreateAndCloseAnimalRequests: resp.requests_crud,

        createdAt: convertTimestampToLocalDateTime(resp.created_at),
        updatedAt: convertTimestampToLocalDateTime(resp.updated_at),
        editedBy: resp.edited_by,
      };
    }
  );
};
