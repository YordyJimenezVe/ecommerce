import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { SocialAuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: any = null;
  surname: any = null;
  email: any = null;
  password: any = null;
  repit_password: any = null;
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

  registro() {
    if (!this.surname || !this.name || !this.email || !this.password || !this.repit_password) {
      alert("NECESITAS DIGITAR TODOS LOS CAMPOS PARA EL REGISTRO");
      return;
    }
    if (this.password != this.repit_password) {
      alert("NECESITAS DIGITAR IGUAL LAS CONTRASEÑAS");
      return;
    }
    let data = {
      name: this.name,
      surname: this.surname,
      email: this.email,
      password: this.password,
      type_user: 1,
    };
    this.authService.registro(data).subscribe((resp: any) => {
      console.log(resp);
      this.router.navigate(["auth/login"]);
    })
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
        // Aquí tienes los datos del usuario (email, name, picture, etc.)
        // Puedes enviarlos a tu backend para registrarlo
        let data = {
          email: userInfo.email,
          name: userInfo.given_name,
          surname: userInfo.family_name,
          img: userInfo.picture,
        }

        this.authService.login_social(data).subscribe((resp: any) => {
          console.log(resp);
          if (resp) {
            this.router.navigate(["/"]);
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
          this.router.navigate(["/"]);
        }
      })
    });
  }
}
