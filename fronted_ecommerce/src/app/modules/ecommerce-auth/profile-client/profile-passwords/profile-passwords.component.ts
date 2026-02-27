import { Component, OnInit } from '@angular/core';
import { ProfileClientService } from '../../_services/profile-client.service';

declare function alertDanger([]): any;
declare function alertSuccess([]): any;
@Component({
  selector: 'app-profile-passwords',
  templateUrl: './profile-passwords.component.html',
  styleUrls: ['./profile-passwords.component.css']
})
export class ProfilePasswordsComponent implements OnInit {

  current_password: any = null;
  new_password: any = null;
  repeat_password: any = null;
  is2FAEnabled: boolean = false; // Mock state

  constructor(
    public _profileHomeService: ProfileClientService,
  ) { }

  ngOnInit(): void {
  }

  toggle2FA() {
    this.is2FAEnabled = !this.is2FAEnabled;
    if (this.is2FAEnabled) {
      alertSuccess("2FA enabled successfully.");
    } else {
      alertSuccess("2FA disabled.");
    }
  }

  save() {
    if (this.new_password != this.repeat_password) {
      alertDanger("LAS NUEVAS CONTRASEÑAS DEBEN SER IGUALES / PASSWORDS MUST MATCH");
      return;
    }
    let data = {
      current_password: this.current_password,
      password: this.new_password,
    }
    this._profileHomeService.updateProfile(data).subscribe((resp: any) => {
      console.log(resp);
      if (resp.message == 403) {
        alertDanger(resp.message_text);
        return;
      }
      alertSuccess("CONTRASEÑA ACTUALIZADA / PASSWORD UPDATED SUCCESSFULLY");
    })
  }
}
