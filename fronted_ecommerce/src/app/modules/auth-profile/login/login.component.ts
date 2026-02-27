import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: any = null;
  password: any = null;

  requires2FA: boolean = false;
  tempToken: string = '';
  verificationCode: string = '';
  isVerifying: boolean = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {
    if (this.authService.user && this.authService.token) {
      this.router.navigate(["/"]);
    }
  }

  login() {
    if (!this.email || !this.password) {
      alert("NECESITAS COLOCAR UN EMAIL Y UNA CONTRASEÑA");
      return;
    }
    this.authService.login(this.email, this.password).subscribe((resp: any) => {
      console.log(resp);
      if (resp && resp.requires_2fa) {
        this.requires2FA = true;
        this.tempToken = resp.temp_token;
        return;
      }

      if (!resp.error && resp) {
        //  TODO SALIO BIEN Y VOLVER AL HOME CON USUARIO AUTENTICADO
        document.location.reload();
      } else {
        if (resp.error.error == 'Unauthorized' || resp.error.message == 'Unauthenticated.') {
          alert("EL USUARIO O CONTRASEÑA INGRESADO SON INCORRECTOS");
          return;
        }
      }
    })
  }

  verify2FA() {
    if (!this.verificationCode || this.verificationCode.length !== 6) {
      alert("COLOCA EL CÓDIGO DE 6 DÍGITOS");
      return;
    }
    this.isVerifying = true;
    this.authService.verify2FALogin(this.tempToken, this.verificationCode).subscribe((resp: any) => {
      this.isVerifying = false;
      if (!resp.error && resp === true) {
        document.location.reload();
      } else {
        alert("CÓDIGO DE VERIFICACIÓN INVÁLIDO");
      }
    });
  }

  signInWithGoogle(): void {
    // @ts-ignore
    const client = google.accounts.oauth2.initTokenClient({
      client_id: '761767689930-67q3eeo3vv7aj3q2dsroo9r697pud2pr.apps.googleusercontent.com',
      scope: 'profile email',
      callback: (response: any) => {
        if (response.access_token) {
          console.log('Access Token:', response.access_token);
          // Obtener datos del usuario con el token
          this.getUserProfile(response.access_token);
        }
      },
    });
    client.requestAccessToken();
  }

  getUserProfile(accessToken: string) {
    // @ts-ignore
    fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(userInfo => {
        console.log('User Profile:', userInfo);

        let data = {
          email: userInfo.email,
          name: userInfo.given_name,
          surname: userInfo.family_name,
          img: userInfo.picture,
        }

        this.authService.login_social(data).subscribe((resp: any) => {
          console.log(resp);
          if (resp) {
            document.location.reload();
          }
        })
      })
      .catch(error => console.error('Error fetching user profile:', error));
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((user) => {
      console.log(user);

      let data = {
        email: user.email,
        name: user.firstName,
        surname: user.lastName,
        img: user.photoUrl,
      }

      this.authService.login_social(data).subscribe((resp: any) => {
        console.log(resp);
        if (resp) {
          document.location.reload();
        }
      })
    });
  }
}
