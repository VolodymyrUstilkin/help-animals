export enum ESortingTypes {
  code = 'id',
  name = 'name',
  email = 'email',
  phone1 = 'phone1',
  phone2 = 'phone2',
  active = 'rabies_vaccination',
  requestsCRUD = 'complex_vaccination',
  animalsCRUD = 'animal_has_family',
  usersCRUD = 'responsible_person',
  changeDate = 'change_date'
}

export enum ESortingDirections {
  asc = 'asc',
  desc = 'desc',
}

export class Sorting {
  direction: ESortingDirections = ESortingDirections.asc;
  column: ESortingTypes = ESortingTypes.code;

  getTypes(): typeof ESortingTypes {
    return ESortingTypes;
  }

  getDirections(): typeof ESortingDirections {
    return ESortingDirections;
  }

  getQueryParams(): { [param: string]: string } {
    return {[this.column]: this.direction};
  }
}

