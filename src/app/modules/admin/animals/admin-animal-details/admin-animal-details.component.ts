import {Component, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {UserAuthService} from '../../../../core/services/user-auth-service/user-auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IAdminAnimalDetailsPostPatchRequest} from './models/i-admin-animal-details-post-patch-request';
import {AnimalDetailsConverters} from './models/animal-details-converters';
import {IAdminAnimalDetailsGetResponse} from './models/i-admin-animal-details-get-response';
import {ADMIN_ANIMALS_URL, API_ADMIN_ANIMALS_URL} from '../models/urls';
import {IAdminAnimalDetailsRequestResponseBaseParams} from './models/i-admin-animal-details-request-response-base-params';
import {IAdminAnimalDetails} from './models/i-admin-animal-details';
import {Subscription} from 'rxjs';
import {getUrlForAdminUserDetails} from '../../users/models/urls';
// @ts-ignore
import imgCompressor from 'browser-image-compression';

class AdminAnimalDetails implements IAdminAnimalDetails {
  age = 0;
  animalHasFamily = false;
  breed = '';
  color = '';
  complexVaccination = false;
  createdAt = '';
  editedById = '';
  editedByName = '';
  features = '';
  id = '';
  imageUrl = '';
  name = '';
  rabiesVaccination = false;
  responsiblePerson = '';
  sex = '';
  showInGallery = false;
  sterilization = false;
  updatedAt = '';
}


@Component({
  selector: 'app-admin-animal-details',
  templateUrl: './admin-animal-details.component.html',
  styleUrls: ['./admin-animal-details.component.css']
})
export class AdminAnimalDetailsComponent implements OnDestroy {
  animalsChangePermission = false;

  AnimalSexTypes = {
    male: 'Котик',
    female: 'Киця',
    notUse: 'Не вказано'
  };

  adminAnimalDetails: IAdminAnimalDetails = new AdminAnimalDetails();
  formWasChanged = false;

  loadedPhotoFile?: File;
  imagePreview = '';

  form: FormGroup = this.formBuilder.group({
      id: new FormControl(''),
      name: new FormControl(''),
      age: new FormControl(0.1, [Validators.min(0.1), Validators.max(20), Validators.required]),
      breed: new FormControl('', Validators.required),
      sex: new FormControl(this.AnimalSexTypes.notUse, Validators.required),
      color: new FormControl('', Validators.required),
      features: new FormControl(''),
      responsiblePerson: new FormControl('', Validators.required),
      complexVaccination: new FormControl(false),
      rabiesVaccination: new FormControl(false),
      sterilization: new FormControl(false),
      animalHasFamily: new FormControl(false),
      showInGallery: new FormControl(false),
    }
  );

  showCreateAnimalButton = false;
  showEditAnimalButton = false;
  showPrintButton = false;
  showRollbackButton = false;
  showValidatorHelpers = false;

  userChangeSubscription: Subscription;

  constructor(private httpClient: HttpClient,
              private activatedRouter: ActivatedRoute,
              private router: Router,
              private userAuthService: UserAuthService,
              private formBuilder: FormBuilder) {
    this.getAnimal(activatedRouter.snapshot.params.id);
    this.updateButtons();

    this.userChangeSubscription = userAuthService.userUpdatedEvent
      .subscribe((user) => {
        this.animalsChangePermission = user.permissionForAddEditAndRemoveAnimals;
        this.updateButtons();
      });

    this.form.valueChanges.subscribe(() => {
      this.formWasChanged = true;
      this.updateButtons();
    });
  }

  ngOnDestroy(): void {
    this.userChangeSubscription.unsubscribe();
  }

  public getAnimal(id?: number | string): void {
    if (!id) {
      return;
    }

    this.httpClient.get<IAdminAnimalDetailsGetResponse>(`${API_ADMIN_ANIMALS_URL}/${id}`).subscribe((res) => {
      this.adminAnimalDetails = AnimalDetailsConverters.convertAnimalGetResponseToAdminAnimalDetails(res);
      this.form.setValue({
        id: this.adminAnimalDetails.id,
        name: this.adminAnimalDetails.name,
        age: this.adminAnimalDetails.age,
        breed: this.adminAnimalDetails.breed,
        sex: this.adminAnimalDetails.sex,
        color: this.adminAnimalDetails.color,
        features: this.adminAnimalDetails.features,
        responsiblePerson: this.adminAnimalDetails.responsiblePerson,
        complexVaccination: this.adminAnimalDetails.complexVaccination,
        rabiesVaccination: this.adminAnimalDetails.rabiesVaccination,
        sterilization: this.adminAnimalDetails.sterilization,
        animalHasFamily: this.adminAnimalDetails.animalHasFamily,
        showInGallery: this.adminAnimalDetails.showInGallery,
      });
      this.formWasChanged = false;
      this.updateButtons();
    }, error => {
      const errCode = error.error.error.error_code;
      const errMsg = error.error.error.message;
      switch (errCode) {
        case 404:
          console.error(`Page: "${API_ADMIN_ANIMALS_URL}/${id}" not found`);
          this.router.navigateByUrl('/404');
          break;
        default:
          console.error(`Request error: ${errMsg}`);
          alert('Сталася помилка при загрузці сторінки');
      }
    });
  }

  formReadonlyFieldCheck(): boolean {
    return !this.animalsChangePermission;
  }

  addPhoto(event: Event): void {
    const elem: HTMLInputElement = (event.target as HTMLInputElement);
    if (!elem.files) {
      return;
    }

    const rawFile = elem.files[0];

    const compressOptions = {
      maxSizeMB: 0.09,
      useWebWorker: true
    };

    try {
      imgCompressor(rawFile, compressOptions).then(async (file: File) => {
        this.imagePreview = await imgCompressor.getDataUrlFromFile(file);
        this.loadedPhotoFile = file;
        this.formWasChanged = true;
      });
    } catch (err) {
      alert('Невдалося завантажити файл: ' + err);
    }
  }

  submitEditAnimal(): void {
    if (this.form.invalid) {
      this.showValidatorHelpers = true;
      alert('У формі є помилки');
      return;
    }

    const url = `${API_ADMIN_ANIMALS_URL}/${this.form.value.id}`;
    const req: IAdminAnimalDetailsPostPatchRequest = {
      ...this.form.value as IAdminAnimalDetailsRequestResponseBaseParams,
      'image_attributes[file]': this.loadedPhotoFile || null,
    };

    const reqForm = AnimalDetailsConverters.convertAnimalPostPatchRequestToFormData(req);

    this.httpClient.patch(url, reqForm).subscribe(() => {
      this.getAnimal(this.form.value.id);
    }, error => {
      const errCode = error.error.error.error_code;
      const errMsg = error.error.error.message;
      switch (errCode) {
        case 404:
          console.error(`Page: "${url}" not found`);
          this.router.navigateByUrl('/404');
          break;
        default:
          console.error(`Request error: ${errMsg}`);
          alert('Сталася помилка при загрузці сторінки');
      }
    });
  }

  submitAddAnimal(): void {
    if (this.form.invalid) {
      this.showValidatorHelpers = true;
      alert('У формі є помилки');
      return;
    }

    const req: IAdminAnimalDetailsPostPatchRequest = {
      ...this.form.value as IAdminAnimalDetailsRequestResponseBaseParams,
      'image_attributes[file]': this.loadedPhotoFile || null,
    };

    const reqForm = AnimalDetailsConverters.convertAnimalPostPatchRequestToFormData(req);
    this.httpClient.post<{ id: string }>(API_ADMIN_ANIMALS_URL, reqForm).subscribe((res) => {
      this.router.navigateByUrl(`${ADMIN_ANIMALS_URL}/${res.id}`);
    }, error => {
      const errCode = error.error.error.error_code;
      const errMsg = error.error.error.message;
      switch (errCode) {
        case 400:
          console.error(`Request error: ${errMsg}`);
          alert('Введено не коректні дані');
          break;
        default:
          console.error(`Request error: ${errMsg}`);
          alert('Сталася помилка при відправці форми');
      }
    });
  }

  printAnimal(): void {
    AnimalDetailsConverters.convertToPdf(this.adminAnimalDetails);
  }

  updateButtons(): void {
    this.showCreateAnimalButton = !this.form.value.id && this.animalsChangePermission;
    this.showEditAnimalButton = this.form.value.id && this.animalsChangePermission;
    this.showPrintButton = this.showEditAnimalButton && !this.formWasChanged;
    this.showRollbackButton = !this.showPrintButton && !this.showCreateAnimalButton;
  }

  public getRedirectToUserDetailsLink(userId: number | string): string {
    return getUrlForAdminUserDetails(userId);
  }
}
