import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { LanguageService } from 'src/app/shared/services/language.service';

declare var $: any;
declare function alertDanger(message: string): any;
declare function alertSuccess(message: string): any;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = '';
  isLoading: boolean = false;

  constructor(
    public authService: AuthService,
    public languageService: LanguageService
  ) { }

  sendResetLink() {
    if (!this.email) {
      alertDanger(this.languageService.translate('Please enter your email address.'));
      return;
    }

    this.isLoading = true;
    this.authService.forgotPassword(this.email).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        alertSuccess(this.languageService.translate('We have emailed your password reset link!'));
        this.email = ''; // clear form
      },
      error: (err) => {
        this.isLoading = false;
        alertDanger(this.languageService.translate("We can't find a user with that email address."));
      }
    });
  }
}
