import {environment} from '../../../../../environments';

export const API_ADMIN_USERS_URL = environment.apiUrl + '/users';
export const ADMIN_USERS_URL = '/admin/users';

export const getUrlForAdminUserDetails = (id: number | string) => {
  return `${ADMIN_USERS_URL}/${id}/details`;
};
