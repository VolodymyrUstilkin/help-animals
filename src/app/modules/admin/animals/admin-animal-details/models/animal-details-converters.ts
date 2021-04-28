import {IAdminAnimalDetailsPostPatchRequest} from './i-admin-animal-details-post-patch-request';
import {IAdminAnimalDetails} from './i-admin-animal-details';
import {environment} from '../../../../../../environments';
import {convertTimestampToLocalDateTime} from '../../../../shared/models/convert-timestamp-to-locale-date-time';
import {IAdminAnimalDetailsGetResponse} from './i-admin-animal-details-get-response';

export class AnimalDetailsConverters {
  public static convertAnimalPostPatchRequestToFormData(request: IAdminAnimalDetailsPostPatchRequest): FormData {
    const reqFormData = new FormData();

    // reqFormData.set('name', request.name); // todo remove
    // reqFormData.set('age', '10');
    // reqFormData.set('animal_has_family', request.animalHasFamily.toString());
    // reqFormData.set('sterilization', request.sterilization.toString());
    // reqFormData.set('show_in_gallery', request.showInGallery.toString());
    // reqFormData.set('sex', request.sex);
    // reqFormData.set('responsible_person', request.responsiblePerson);
    // reqFormData.set('rabies_vaccination', request.rabiesVaccination.toString());
    // reqFormData.set('features', request.features);
    // reqFormData.set('complex_vaccination', request.complexVaccination.toString());
    // reqFormData.set('color', request.color);
    // reqFormData.set('breed', request.breed);


    Object.entries(request).forEach(([k, v]) => {
      if (v === undefined || v === null) {
        return;
      }

      const key = camelToSnakeCaseConvertor(k);
      if (typeof v === 'string') {
        reqFormData.set(key, v);
      } else if (typeof v === 'object') {
        reqFormData.set(key, v, v.name);
      } else {
        reqFormData.set(key, v.toString());
      }
    });

    return reqFormData;
  }

  public static convertAnimalGetResponseToAdminAnimalDetails(response: IAdminAnimalDetailsGetResponse): IAdminAnimalDetails {
    // const user: {id: string; user_name: string} = JSON.parse(response.edited_by);
    const user: { id: string; user_name: string } = response.edited_by
      ? JSON.parse(response.edited_by)
      : {id: '', user_name: ''}; // response.edited_by can be null
    return {
      id: response.id,
      name: response.name,
      age: response.age,
      breed: response.breed,
      sex: response.sex,
      color: response.color,
      features: response.features,
      responsiblePerson: response.responsible_person,
      complexVaccination: response.complex_vaccination,
      rabiesVaccination: response.rabies_vaccination,
      sterilization: response.sterilization,
      animalHasFamily: response.animal_has_family,
      showInGallery: response.show_in_gallery,

      imageUrl: response.image ? environment.apiServerHost + response.image.file.url : '',
      createdAt: convertTimestampToLocalDateTime(response.created_at),
      updatedAt: convertTimestampToLocalDateTime(response.updated_at),
      editedById: user.id,
      editedByName: user.user_name,
    };
  }

  public static convertToPdf(adminAnimalDetails: IAdminAnimalDetails): void {
    const printWindow = window.open('', '', 'height=400,width=600');

    if (!printWindow) {
      return;
    }
    printWindow.document.write(convertToHtml(`id: ${adminAnimalDetails.id}`));
    printWindow.document.write(convertToHtml(`Ім'я: ${adminAnimalDetails.name}`));
    printWindow.document.write(convertToHtml(`Порода: ${adminAnimalDetails.breed}`));
    printWindow.document.write(convertToHtml(`Стать: ${adminAnimalDetails.sex}`));
    printWindow.document.write(convertToHtml(`Колір: ${adminAnimalDetails.color}`));
    printWindow.document.write(convertToHtml(`Особливості: ${adminAnimalDetails.features}`));
    printWindow.document.write(convertToHtml(`Вік: ${adminAnimalDetails.age}`));
    printWindow.document.write(convertToHtml(`Вакцинація комплексна: ${adminAnimalDetails.complexVaccination}`));
    printWindow.document.write(convertToHtml(`Вакцинація від сказу: ${adminAnimalDetails.rabiesVaccination}`));
    printWindow.document.write(convertToHtml(`Стерилізація: ${adminAnimalDetails.sterilization}`));
    printWindow.document.write(convertToHtml(`Тварина влаштована: ${adminAnimalDetails.animalHasFamily}`));
    printWindow.document.write(convertToHtml(`Відповідальна персона: ${adminAnimalDetails.responsiblePerson}`));
    printWindow.document.write(convertToHtml(`Дата додавання: ${adminAnimalDetails.createdAt}`));
    printWindow.document.write(convertToHtml(`Дата ост. змін: ${adminAnimalDetails.updatedAt}`));
    printWindow.document.write(convertToHtml(`ID користувача що змінював: ${adminAnimalDetails.editedById}`));

    printWindow.print();
    printWindow.close();
  }
}

const camelToSnakeCaseConvertor = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

const convertToHtml = (str: string): string => {
  return `<p style="font-size: 14px; color: #000; line-height: 1em">${str}</p>`;
};
