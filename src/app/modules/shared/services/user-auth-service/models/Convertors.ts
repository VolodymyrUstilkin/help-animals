import {IUserAuthResponse} from './IUserAuthResponse';
import {IUserAuth} from '../user-auth.service';

export class Convertors {
  public static convertUserAuthResponseToUserAuth(response: IUserAuthResponse): IUserAuth {
    return {
      id: response.id,
      isActive: response.is_active,
      permissionForAccessToActiveAdmin: response.activeadmin,
      permissionForAddEditAndRemoveAnimals: response.animals_crud,
      permissionForCreateAndCloseAnimalRequests: response.requests_crud
    };
  }
}
