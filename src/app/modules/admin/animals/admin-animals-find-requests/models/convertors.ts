import {IAdminOpenedAnimalFindRequestGetResponse} from './i-admin-opened-animal-find-request-get-response';
import {IAdminOpenedAnimalFindRequest} from './i-admin-opened-animal-find-request';
import {convertTimestampToLocalDateTime} from '../../../../shared/models/convert-timestamp-to-locale-date-time';
import {IAdminClosedAnimalFindRequestGetResponse} from './i-admin-closed-animal-find-request-get-response';
import {IAdminClosedAnimalFindRequest} from './i-admin-closed-animal-find-request';

export class Convertors {
  static convertOpenedAnimalFindRequestGetResponseToOpenedAnimalFindRequest(
    response: IAdminOpenedAnimalFindRequestGetResponse[]
  ): IAdminOpenedAnimalFindRequest[] {
    return response.map((res) => {
      return {
        id: res.id,
        address: res.address,
        userCreatedId: res.user_created_id,
        openedDate: convertTimestampToLocalDateTime(res.opened_date),
      };
    });
  }

  static convertClosedAnimalFindRequestGetResponseToClosedAnimalFindRequest(
    response: IAdminClosedAnimalFindRequestGetResponse[]
  ): IAdminClosedAnimalFindRequest[] {
    return response.map((res) => {
      return {
        id: res.id,
        address: res.address,
        userCreatedId: res.user_created_id,
        userClosedId: res.user_created_id,
        openedDate: convertTimestampToLocalDateTime(res.opened_date),
        closedDate: convertTimestampToLocalDateTime(res.closed_date),
      };
    });
  }
}
