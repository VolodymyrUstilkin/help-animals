enum EBooleanTypes {
  notUse = '',
  true = 'true',
  false = 'false'
}

export class Filter {
  name = '';
  email = '';
  phone = '';
  active: EBooleanTypes = EBooleanTypes.notUse;
  requestsCRUD = EBooleanTypes.notUse;
  animalsCRUD = EBooleanTypes.notUse;
  usersCRUD = EBooleanTypes.notUse;

  constructor(public showFilter = false) {
  }

  getQueryParams(): { [param: string]: string | Array<string> } {
    const ret: { [k: string]: string } = {};
    if (this.name) {
      ret.name = this.name;
    }
    if (this.email) {
      ret.email = this.email;
    }
    if (this.phone) {
      ret.phone = this.phone;
    }
    if (this.active) {
      ret.active = this.active;
    }
    if (this.requestsCRUD) {
      ret.requestsCRUD = this.requestsCRUD;
    }
    if (this.animalsCRUD) {
      ret.animals_crud = this.animalsCRUD;
    }
    if (this.usersCRUD) {
      ret.users_crud = this.usersCRUD;
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
