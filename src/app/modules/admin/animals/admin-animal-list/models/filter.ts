export interface IFilter {
  ageMin: string;
  ageMax: string;
  responsiblePerson: string;
  sterilization: boolean;
  rabiesVaccination: boolean;
  complexVaccination: boolean;
  animalHasFamily: boolean;
}

export class Filter implements IFilter {
  showFilter = false;
  ageMin = '';
  ageMax = '';
  responsiblePerson = '';
  sterilization = false;
  rabiesVaccination = false;
  complexVaccination = false;
  animalHasFamily = false;

  getQueryParams(): { [param: string]: string } {
    return {
      filter_age_min: this.ageMin,
      filter_age_max: this.ageMax,
      filter_responsible_person: this.responsiblePerson,
      filter_sterilization: this.sterilization.toString(),
      filter_rabies_vaccination: this.rabiesVaccination.toString(),
      filter_complex_vaccination: this.complexVaccination.toString(),
      filter_animal_has_family: this.animalHasFamily.toString(),
    };
  }
}
