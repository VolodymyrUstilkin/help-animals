enum EBooleanTypes {
  notUse = '',
  true = 'true',
  false = 'false'
}

interface IFilterRequest {
  filter_age_min: string;
  filter_age_max: string;
  filter_responsible_person: string;
  filter_features: string;
  filter_sterilization: EBooleanTypes;
  filter_rabies_vaccination: EBooleanTypes;
  filter_complex_vaccination: EBooleanTypes;
  filter_animal_has_family: EBooleanTypes;
}

interface IGetQueryParams {
  getQueryParams(): { [param: string]: string };
}

export class Filter implements IGetQueryParams {
  showFilter = false;

  ageMin = '';
  ageMax = '';
  responsiblePerson = '';
  features = '';
  sterilization: EBooleanTypes = EBooleanTypes.notUse;
  rabiesVaccination = EBooleanTypes.notUse;
  complexVaccination = EBooleanTypes.notUse;
  animalHasFamily = EBooleanTypes.notUse;



  getQueryParams(): { [param: string]: string } {
    const ret: IFilterRequest = {
      filter_age_min: this.ageMin,
      filter_age_max: this.ageMax,
      filter_responsible_person: this.responsiblePerson,
      filter_features: this.features,
      filter_sterilization: this.sterilization,
      filter_rabies_vaccination: this.rabiesVaccination,
      filter_complex_vaccination: this.complexVaccination,
      filter_animal_has_family: this.animalHasFamily,
    };

    return ret as unknown as { [param: string]: string };
  }

  changeShowFilter(): void {
    this.showFilter = !this.showFilter;
  }

  getBooleanTypes(): typeof EBooleanTypes {
    return EBooleanTypes;
  }
}
