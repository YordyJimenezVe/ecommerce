import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { DynamicAsideMenuConfig } from '../../configs/dynamic-aside-menu.config';
import { AsideMenuAdminGeneral } from '../../configs/nav/aside-menu-admin-general.config';

const emptyMenuConfig = {
  items: []
};

import { AsideMenuSuperAdmin } from '../../configs/nav/aside-menu-super-admin.config';
import { AsideMenuCompanyAdmin } from '../../configs/nav/aside-menu-company-admin.config';

@Injectable({
  providedIn: 'root'
})
export class DynamicAsideMenuService {
  private menuConfigSubject = new BehaviorSubject<any>(emptyMenuConfig);
  menuConfig$: Observable<any>;
  constructor(private authservice: AuthService,) {
    this.menuConfig$ = this.menuConfigSubject.asObservable();
    this.loadMenu();
  }

  // Here you able to load your menu from server/data-base/localStorage
  // Default => from DynamicAsideMenuConfig
  private loadMenu() {
    if (this.authservice.user) {
      const roleName = this.authservice.user.role.name ? this.authservice.user.role.name.toUpperCase() : '';
      // Check for ID 1 or name 'ADMINISTRADOR GENERAL'
      if (this.authservice.user.role.id === 1 || roleName === 'ADMINISTRADOR GENERAL') {
        this.setMenu(AsideMenuSuperAdmin);
      } else {
        this.setMenu(AsideMenuCompanyAdmin);
      }
    } else {
      this.setMenu([]);
    }
  }

  private setMenu(menuConfig) {
    this.menuConfigSubject.next(menuConfig);
  }

  private getMenu(): any {
    return this.menuConfigSubject.value;
  }
}
