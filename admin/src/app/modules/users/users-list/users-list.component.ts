import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersComponent } from '../components/add-users/add-users.component';
import { DeleteUserComponent } from '../components/delete-user/delete-user.component';
import { EditUsersComponent } from '../components/edit-users/edit-users.component';
import { UsersService } from '../_services/users.service';
import { AuthService } from '../../auth';
import { URL_BACKEND } from 'src/app/config/config';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  isLoading$;
  isLoading = false;

  totalPages = 1;
  currentPage = 1;

  state: any = '';
  search: any = '';
  category: any = '';

  users: any = [];
  companies: any = [];
  company_id: any = '';
  isSuperAdmin = false;
  URL_BACKEND: any = URL_BACKEND;

  constructor(
    public fb: FormBuilder,
    public _userService: UsersService,
    public modelService: NgbModal,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._userService.isLoading$;
    const user = this.authService.user;
    const roleId = user?.role_id;
    let roleName = '';

    if (user?.role) {
      if (typeof user.role === 'string') {
        roleName = user.role.toUpperCase();
      } else if (user.role.name) {
        roleName = user.role.name.toUpperCase();
      }
    }

    console.log("DEBUG: Current User", user);
    console.log("DEBUG: Role ID", roleId);
    console.log("DEBUG: Role Name", roleName);

    this.isSuperAdmin = roleId == 1 || roleId == '1' || roleName === 'ADMINISTRADOR GENERAL';

    if (this.isSuperAdmin) {
      this.category = 'megarys';
      this._userService.getCompanies().subscribe((resp: any) => {
        this.companies = resp.companies;
        console.log("DEBUG: Companies loaded", this.companies);
        this.companies.forEach(c => {
          console.log(`DEBUG: Company ${c.name} logo path: ${c.logo}`);
          console.log(`DEBUG: Constructed URL: ${this.getLogoUrl(c.logo)}`);
        });
      });
    }
    this.allUsers();
  }

  getLogoUrl(logo: string) {
    if (!logo) return null;
    const base = this.URL_BACKEND.endsWith('/') ? this.URL_BACKEND : this.URL_BACKEND + '/';
    // Remove leading slash if any
    const cleanLogo = logo.startsWith('/') ? logo.substring(1) : logo;
    return base + 'storage/' + cleanLogo;
  }

  handleImageError(event: any, comp: any) {
    console.error(`ERROR: Failed to load logo for ${comp.name} at ${event.target.src}`);
    comp.logo_error = true;
  }

  allUsers(page = 1) {
    this._userService.allUsers(page, this.state, this.search, this.category, this.company_id).subscribe((resp: any) => {
      this.users = resp.users.data;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  changeCategory(val) {
    this.category = val;
    this.company_id = '';
    this.allUsers();
  }

  selectCompany(id) {
    this.category = 'companies';
    this.company_id = id;
    this.allUsers();
  }

  reset() {
    this.state = '';
    this.search = '';
    this.company_id = '';
    this.allUsers();
  }
  addUser() {
    const modalRef = this.modelService.open(AddUsersComponent, { centered: true, size: 'md' });
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
    modalRef.componentInstance.usersE.subscribe((resp: any) => {
      console.log(resp);
      resp.state = 1;
      this.users.unshift(resp);
    })
  }

  editUser(user) {
    const modalRef = this.modelService.open(EditUsersComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.user_selected = user;
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
    modalRef.componentInstance.usersE.subscribe((resp: any) => {
      console.log(resp);
      let INDEX = this.users.findIndex(user => user.id == resp.id);
      this.users[INDEX] = resp;
    })
  }

  delete(user) {
    const modalRef = this.modelService.open(DeleteUserComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.user_selected = user;
    modalRef.result.then(
      () => {

      },
      () => {

      }
    )
    modalRef.componentInstance.usersE.subscribe((resp: any) => {
      console.log(resp);
      let INDEX = this.users.findIndex(user => user.id == resp.id);
      this.users.splice(INDEX, 1);
    })
  }

  toggleBlock(user: any) {
    const newState = user.state == 1 ? 2 : 1;
    let data = {
      state: newState
    };
    this._userService.update(user.id, data).subscribe((resp: any) => {
      user.state = newState;
    });
  }


  loadPage(index) {
    this.allUsers(index);
  }
}
