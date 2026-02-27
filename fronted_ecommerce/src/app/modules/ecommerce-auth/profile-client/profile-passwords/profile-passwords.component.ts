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
  is2FAEnabled: boolean = false;

  // 2FA Fields
  qrCodeSvg: string | null = null;
  secretKey: string | null = null;
  verificationCode: string = '';
  isGenerating2FA: boolean = false;

  constructor(
    public _profileHomeService: ProfileClientService,
  ) { }

  ngOnInit(): void {
    // Check if user has 2FA enabled
    let user = this._profileHomeService._authServices.user;
    if (user && user.two_factor_confirmed_at) {
      this.is2FAEnabled = true;
    }
  }

  toggle2FA() {
    if (!this.is2FAEnabled) {
      // User wants to enable it: generate secret and QR code
      this.isGenerating2FA = true;
      this._profileHomeService.generate2FA().subscribe((resp: any) => {
        if (resp.secret) {
          this.qrCodeSvg = resp.qr_code_svg;
          this.secretKey = resp.secret;
        }
      }, error => {
        alertDanger("Error generating 2FA secret.");
        this.isGenerating2FA = false;
      });
    } else {
      // User wants to disable it
      if (confirm("Are you sure you want to disable Two-Factor Authentication?")) {
        this._profileHomeService.disable2FA().subscribe((resp: any) => {
          alertSuccess("2FA Disabled successfully.");
          this.is2FAEnabled = false;
          this.isGenerating2FA = false;
          this.qrCodeSvg = null;

          // Update user object
          let user = this._profileHomeService._authServices.user;
          user.two_factor_confirmed_at = null;
          localStorage.setItem('user', JSON.stringify(user));
        }, error => {
          alertDanger("Error disabling 2FA.");
        });
      }
    }
  }

  verifyAndEnable2FA() {
    if (!this.verificationCode || this.verificationCode.length !== 6) {
      alertDanger("Please enter a valid 6-digit code.");
      return;
    }

    this._profileHomeService.enable2FA(this.verificationCode).subscribe((resp: any) => {
      alertSuccess("Two-Factor Authentication Enabled Successfully!");
      this.is2FAEnabled = true;
      this.isGenerating2FA = false;
      this.qrCodeSvg = null;
      this.verificationCode = '';

      // Update user object mentally
      let user = this._profileHomeService._authServices.user;
      user.two_factor_confirmed_at = new Date().toISOString();
      localStorage.setItem('user', JSON.stringify(user));

      if (resp.recovery_codes) {
        // You might want to show this in the UI, but for now we just log it
        console.log("Save these recovery codes securely!", resp.recovery_codes);
        alertSuccess("Please save your recovery codes safely.");
      }
    }, error => {
      alertDanger("Invalid Verification Code.");
    });
  }

  cancel2FASetup() {
    this.isGenerating2FA = false;
    this.qrCodeSvg = null;
    this.verificationCode = '';
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
