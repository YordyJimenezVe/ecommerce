import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth-profile/_services/auth.service';
import { CartShopsService } from 'src/app/modules/home/_services/cart-shops.service';
import { HomeService } from 'src/app/modules/home/_services/home.service';
import { LanguageService } from '../services/language.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  user: any = null;
  listCarts: any = [];

  listWish: any = [];

  TotalPrice: any = 0;

  search_product: any = null;

  source: any;
  @ViewChild("filter") filter?: ElementRef;
  sugerencias: any = [];
  categories: any = [];

  currentLang: string = 'es';
  currentLangName: string = 'Spanish';
  isLangMenuOpen: boolean = false;

  currentTheme: string = 'default';
  currentThemeName: string = 'Default';
  isThemeMenuOpen: boolean = false;

  isCartMenuOpen: boolean = false;
  isAccountMenuOpen: boolean = false;
  isAlertMenuOpen: boolean = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    public _cartService: CartShopsService,
    public _homeService: HomeService,
    public languageService: LanguageService,
    public themeService: ThemeService,
    private eRef: ElementRef
  ) { }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isLangMenuOpen = false;
      this.isThemeMenuOpen = false;
      this.isCartMenuOpen = false;
      this.isAccountMenuOpen = false;
      this.isAlertMenuOpen = false;
    }
  }

  ngOnInit(): void {
    this.user = this.authService.user;
    console.log(this.user);
    if (this.user) {
      this._cartService.listCartShop().subscribe((resp: any) => {
        resp.carts.data.forEach((element: any) => {
          this._cartService.changeCart(element);
        });;
      })
      this._cartService.listWish().subscribe((resp: any) => {
        resp.wishlists.forEach((element: any) => {
          this._cartService.changeWish(element);
        });;
      })
    }
    this._homeService.configInitialFilter().subscribe((resp: any) => {
      this.categories = resp.categories;
    })
    this._cartService.currentDataCart$.subscribe((resp: any) => {
      this.listCarts = resp;
      this.TotalPrice = this.listCarts.reduce((sum: any, item: any) => sum + item.total, 0);
    })
    this._cartService.currentDataWish$.subscribe((resp: any) => {
      this.listWish = resp;
    })

    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.currentLangName = lang === 'es' ? 'Spanish' : 'English';
    });
  }

  ngAfterViewInit(): void {
    this.source = fromEvent(this.filter?.nativeElement, "keyup");
    this.source.pipe(debounceTime(500)).subscribe((c: any) => {
      let data = {
        search_product: this.search_product,
      }
      if (this.search_product.length > 1) {
        this._homeService.listProducts(data).subscribe((resp: any) => {
          this.sugerencias = resp.products;
        })
      }
    })
  }

  searchForEnter() {
    this.router.navigateByUrl("lista-de-productos-totales?search_product=" + this.search_product);
  }
  removeItem(cart: any) {
    this._cartService.deleteCartShop(cart.id).subscribe();
    this._cartService.removeItemCart(cart);
  }
  isRouterActive() {
    return this.router.url == "" || this.router.url == "/" ? true : false;
  }
  logout() {
    this.authService.logout();
  }

  toggleLangMenu() {
    this.isLangMenuOpen = !this.isLangMenuOpen;
  }

  changeLanguage(lang: string) {
    this.languageService.changeLanguage(lang);
    this.isLangMenuOpen = false;
  }

  toggleThemeMenu() {
    this.isThemeMenuOpen = !this.isThemeMenuOpen;
  }

  changeTheme(theme: string) {
    this.currentTheme = theme;
    this.themeService.setTheme(theme);
    this.isThemeMenuOpen = false;

    const themeNames: any = {
      'default': 'Predeterminado',
      'dark': 'Oscuro',
      'red': 'Rojo',
      'blue': 'Azul',
      'green': 'Verde',
      'white': 'Blanco (Modo Oscuro)'
    };
    this.currentThemeName = themeNames[theme] || 'Default';
  }

  toggleCartMenu(event: Event) {
    event.stopPropagation();
    this.isCartMenuOpen = !this.isCartMenuOpen;
    this.isAccountMenuOpen = false;
    this.isAlertMenuOpen = false;
    this.isLangMenuOpen = false;
    this.isThemeMenuOpen = false;
  }

  toggleAccountMenu(event: Event) {
    event.stopPropagation();
    this.isAccountMenuOpen = !this.isAccountMenuOpen;
    this.isCartMenuOpen = false;
    this.isAlertMenuOpen = false;
    this.isLangMenuOpen = false;
    this.isThemeMenuOpen = false;
  }

  toggleAlertMenu(event: Event) {
    event.stopPropagation();
    this.isAlertMenuOpen = !this.isAlertMenuOpen;
    this.isCartMenuOpen = false;
    this.isAccountMenuOpen = false;
    this.isLangMenuOpen = false;
    this.isThemeMenuOpen = false;
  }
}
