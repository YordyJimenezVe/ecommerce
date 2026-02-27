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
      const userRole = this.authservice.user.role;
      let isSuperAdmin = false;

      // Case 1: Role is a String
      if (typeof userRole === 'string') {
        if (userRole.trim().toUpperCase() === 'ADMINISTRADOR GENERAL') {
          isSuperAdmin = true;
        }
      }
      // Case 2: Role is an Object
      else if (typeof userRole === 'object' && userRole !== null) {
        const roleName = userRole.name ? userRole.name.trim().toUpperCase() : '';
        if (userRole.id === 1 || roleName === 'ADMINISTRADOR GENERAL') {
          isSuperAdmin = true;
        }
      }

      if (isSuperAdmin) {
        this.setMenu(AsideMenuAdminGeneral);
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
