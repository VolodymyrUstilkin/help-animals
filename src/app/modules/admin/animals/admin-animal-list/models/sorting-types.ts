export enum ESortingTypes {
  age = 'age',
  sterilization = 'sterilization',
  rabiesVaccination = 'rabies_vaccination',
  complexVaccination = 'complex_vaccination',
  animalHasFamily = 'animal_has_family'
}

export enum ESortingDirections {
  asc = 'asc',
  desc = 'desc',
}

export class Sorting {
  direction: ESortingDirections = ESortingDirections.asc;
  column: ESortingTypes = ESortingTypes.age;

  getTypes(): typeof ESortingTypes {
    return ESortingTypes;
  }

  getDirections(): typeof ESortingDirections {
    return ESortingDirections;
  }

  getQueryParams(): { [param: string]: string } {
    return {
      sort_column: this.column,
      sort_direction: this.direction
    };
  }
}

