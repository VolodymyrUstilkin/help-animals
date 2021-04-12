import {IAnimalInfoGetResponse} from './ianimal-infoget-response';
import {IAnimalInfo} from './ianimal-info';
import {environment} from '../../../../../environments';

export const convertAnimalGetResponseToAnimalList = (response: IAnimalInfoGetResponse[]): IAnimalInfo[] => {
  return response.map((resp) => {
      return {
        id: resp.id,
        breed: resp.breed,
        age: resp.age,
        sex: resp.sex,
        color: resp.color,
        features: resp.features,
        imgUrl: resp.image ? environment.apiServerHost + resp.image.file.url : '/assets/images/no-photo.jpg'
      };
    }
  );
};
