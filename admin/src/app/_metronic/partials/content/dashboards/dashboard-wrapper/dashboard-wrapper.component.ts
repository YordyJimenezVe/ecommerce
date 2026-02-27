import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../../core';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
})
export class DashboardWrapperComponent implements OnInit {
  demo: any;
  role: string = '';

  constructor(private layout: LayoutService, private authService: AuthService) { }

  ngOnInit(): void {
    this.demo = this.layout.getProp('demo');

    if (this.authService.user) {
      const userRole = this.authService.user.role;
      let roleName = '';
      if (typeof userRole === 'string') {
        roleName = userRole.trim().toUpperCase();
      } else if (typeof userRole === 'object' && userRole !== null) {
        if (userRole.id === 1) roleName = 'ADMINISTRADOR GENERAL';
        else if (userRole.id === 4) roleName = 'ANALISTA';
        else if (userRole.id === 5) roleName = 'VENDEDOR / STAFF';
        else roleName = userRole.name ? userRole.name.trim().toUpperCase() : '';
      }
      this.role = roleName;
    }
  }
}
