import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolesService } from '../_services/roles.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  isLoading$;
  roles: any[] = [];
  permissions: any[] = [];

  activeRole: any = null;
  roleName: string = '';
  selectedPermissions: number[] = [];

  constructor(
    private rolesService: RolesService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.rolesService.isLoading$;
    this.getRoles();
  }

  getRoles() {
    this.rolesService.getRoles().subscribe((resp: any) => {
      this.roles = resp.roles;
      this.permissions = resp.permissions;
    });
  }

  openModal(content: any, role: any = null) {
    this.activeRole = role ? { ...role } : null;
    this.roleName = role ? role.name : '';
    this.selectedPermissions = role ? role.permissions.map((p: any) => p.id) : [];

    this.modalService.open(content, { centered: true, size: 'lg' });
  }

  togglePermission(permissionId: number) {
    const index = this.selectedPermissions.indexOf(permissionId);
    if (index > -1) {
      this.selectedPermissions.splice(index, 1);
    } else {
      this.selectedPermissions.push(permissionId);
    }
  }

  saveRole(modal: any) {
    if (!this.roleName.trim()) return;

    const data = {
      name: this.roleName,
      permissions: this.selectedPermissions
    };

    if (this.activeRole) {
      this.rolesService.updateRole(this.activeRole.id, data).subscribe((resp: any) => {
        modal.dismiss();
        this.getRoles();
      });
    } else {
      this.rolesService.createRole(data).subscribe((resp: any) => {
        modal.dismiss();
        this.getRoles();
      });
    }
  }

  deleteRole(role: any) {
    const confirmed = window.confirm('¿Seguro de que deseas eliminar este rol?');
    if (!confirmed) return;
    this.rolesService.deleteRole(role.id).subscribe((resp: any) => {
      this.getRoles();
    });
  }
}

