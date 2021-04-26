enum EBooleanTypes {
  notUse = '',
  true = 'true',
  false = 'false'
}

export class Filter {
  ageMin: string | number = '';
  ageMax: string | number = '';
  responsiblePerson = '';
  features = '';
  sterilization: EBooleanTypes = EBooleanTypes.notUse;
  rabiesVaccination = EBooleanTypes.notUse;
  complexVaccination = EBooleanTypes.notUse;
  animalHasFamily = EBooleanTypes.notUse;

  constructor(public showFilter = false) {
  }

  getQueryParams(): { [param: string]: string | Array<string> } {

    const ret: { [k: string]: string | Array<string> } = {};

    const ageMin = typeof this.ageMin === 'string' ? this.ageMin : this.ageMin.toString();
    const ageMax = typeof this.ageMax === 'string' ? this.ageMax : this.ageMax.toString();
    if (ageMin || ageMax) {
      ret.age = [ageMin, ageMax];
    }
    if (this.features) {
      ret.features = this.features;
    }
    if (this.responsiblePerson) {
      ret.responsible_person = this.responsiblePerson;
    }
    if (this.sterilization) {
      ret.sterilization = this.sterilization;
    }
    if (this.rabiesVaccination) {
      ret.rabies_vaccination = this.rabiesVaccination;
    }
    if (this.complexVaccination) {
      ret.complex_vaccination = this.complexVaccination;
    }
    if (this.animalHasFamily) {
      ret.animal_has_family = this.animalHasFamily;
    }

    return ret;
  }

  changeShowFilter(): void {
    this.showFilter = !this.showFilter;
  }

  getBooleanTypes(): typeof EBooleanTypes {
    return EBooleanTypes;
  }
}
