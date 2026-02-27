import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { LanguageService } from 'src/app/shared/services/language.service';

declare var $: any;
declare function alertDanger(message: string): any;
declare function alertSuccess(message: string): any;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string = '';
  token: string = '';
  password: any = '';
  password_confirmation: any = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      this.email = params['email'];

      if (!this.token || !this.email) {
        alertDanger(this.languageService.translate('Invalid password reset link.'));
        this.router.navigate(['/auth/login']);
      }
    });
  }

  resetPassword() {
    if (!this.password || !this.password_confirmation) {
      alertDanger(this.languageService.translate('Please fill all fields.'));
      return;
    }

    if (this.password !== this.password_confirmation) {
      alertDanger(this.languageService.translate('Passwords do not match.'));
      return;
    }

    if (this.password.length < 8) {
      alertDanger(this.languageService.translate('Password must be at least 8 characters.'));
      return;
    }

    this.isLoading = true;
    let data = {
      email: this.email,
      token: this.token,
      password: this.password,
      password_confirmation: this.password_confirmation
    };

    this.authService.resetPassword(data).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        alertSuccess(this.languageService.translate('Your password has been reset!'));
        this.router.navigate(['/auth/login']);
      },
      error: (err: any) => {
        this.isLoading = false;
        let msg = err.error?.message || this.languageService.translate('Invalid or expired token.');
        alertDanger(msg);
      }
    });
  }
}
