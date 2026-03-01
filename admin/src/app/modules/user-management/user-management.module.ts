import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { RolesComponent } from './roles/roles.component';
import { UserManagementComponent } from './user-management.component';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [UsersComponent, RolesComponent, UserManagementComponent],
  imports: [CommonModule, UserManagementRoutingModule, FormsModule, NgbModule, NgbModalModule],
})
export class UserManagementModule { }
