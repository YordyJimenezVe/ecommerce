import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { DynamicAsideMenuConfig } from '../../configs/dynamic-aside-menu.config';
import { AsideMenuAdminGeneral } from '../../configs/nav/aside-menu-admin-general.config';

const emptyMenuConfig = {
  items: []
};

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
    // Forcing AdminGeneral for now to ensure visibility for Yordy
    // Verify the role name later. 
    // Usually super_admin or ADMINISTRADOR GENERAL
    // The previous check was: if(this.authservice.user.role.name == 'ADMINISTRADOR GENERAL')

    // Quick Fix: Just use AsideMenuAdminGeneral if user exists.
    if (this.authservice.user) {
      this.setMenu(AsideMenuAdminGeneral);
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
