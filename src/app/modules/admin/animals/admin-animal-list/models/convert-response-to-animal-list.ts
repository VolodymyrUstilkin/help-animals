import {IAdminAnimalListGetResponseElement} from './i-admin-animal-list-get-response';
import {IAdminAnimalListTableElement} from './i-admin-animal-list-table-element';

export const convertResponseToAnimalList = (response: IAdminAnimalListGetResponseElement[]): IAdminAnimalListTableElement[] => {
  return response.map((resp) => {
      return {
        id: resp.id,
        complexVaccination: resp.complex_vaccination,
        rabiesVaccination: resp.rabies_vaccination,
        sterilization: resp.sterilization,
        animalHasFamily: resp.animal_has_family,
        responsiblePerson: resp.responsible_person,
        age: resp.age
      };
    }
  );
};
