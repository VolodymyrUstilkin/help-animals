import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {UserAuthService} from '../../../modules/shared/services/user-auth-service/user-auth.service';
import {Subscription} from 'rxjs';

const BASE_URL = '/';

export interface INavMenuItem {
  text: string;
  url: string;
}

class NavMenuItem implements INavMenuItem {
  constructor(public text: string, public url: string) {
  }
}

@Component({
  selector: 'app-nav-menu-new',
  templateUrl: './nav-menu-new.component.html',
  styleUrls: ['./nav-menu-new.component.css']
})
export class NavMenuNewComponent implements OnDestroy {
  publicMenuItems: INavMenuItem[] = [];
  adminMenuItems: INavMenuItem[] = [];

  @Input() menuFlowRow = false;

  subscription: Subscription;

  constructor(private userAuthService: UserAuthService) {

    this.subscription = userAuthService.userUpdatedEvent.subscribe(() => {
      this.fillPublicMenuItems();
      this.fillAdminMenuItems();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fillPublicMenuItems(): void {
    this.publicMenuItems = [];
    this.publicMenuItems.push(new NavMenuItem('Переглянути тваринок', BASE_URL + 'animals'));
    this.publicMenuItems.push(new NavMenuItem('Про нас', BASE_URL + 'about'));
    this.publicMenuItems.push(new NavMenuItem('Допомогти котикам', BASE_URL + 'donate'));
    this.publicMenuItems.push(
      this.userAuthService.isAuthorized()
        ? new NavMenuItem('Вихід', BASE_URL + 'login')
        : new NavMenuItem('Вхід', BASE_URL + 'login')
    );
  }

  fillAdminMenuItems(): void {
    this.adminMenuItems = [];
    const user = this.userAuthService.getUser();
    if (!user.isActive) {
      return;
    }

    if (user.permissionForCreateAndCloseAnimalRequests) {
      this.adminMenuItems.push(new NavMenuItem('Повідомлення про знайдену тварину', BASE_URL + '/admin/animals/find-requests'));
    }
    if (user.permissionForCreateAndCloseAnimalRequests) {
      this.adminMenuItems.push(new NavMenuItem('Керування обліком тварин', BASE_URL + '/admin/animals/list'));
    }
    if (user.permissionForAccessToActiveAdmin) {
      this.adminMenuItems.push(new NavMenuItem('Керування користувачами', BASE_URL + '/admin/users'));
    }
  }
}
