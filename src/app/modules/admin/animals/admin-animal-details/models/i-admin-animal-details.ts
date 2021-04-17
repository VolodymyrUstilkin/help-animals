export interface IAdminAnimalDetails {
  id: string;
  name: string;
  breed: string;
  sex: string;
  color: string;
  features: string;
  age: number;

  imageUrl: string;

  complexVaccination: boolean;
  rabiesVaccination: boolean;
  sterilization: boolean;
  animalHasFamily: boolean;
  responsiblePerson: string;
  showInGallery: boolean;


  createdAt: string;
  updatedAt: string;
  editedById: string;
  editedByName: string;
}
