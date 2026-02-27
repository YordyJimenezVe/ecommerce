import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CartShopsService } from '../../home/_services/cart-shops.service';
import { CulqiService } from '../_services/culqi.service';
import { SalesService } from '../_services/sales.service';

declare var paypal: any;
declare function alertDanger([]): any;
declare function alertSuccess([]): any;
declare function methodPayment(): any;
@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement?: ElementRef;

  full_name: any = null;
  full_surname: any = null;
  company_name: any = null;
  county_region: any = null;
  direccion: any = null;
  city: any = null;
  zip_code: any = null;
  phone: any = null;
  email: any = null;

  listCarts: any = [];
  TotalPrice: any = 0;
  ConversationDolar: any = 3.8;

  listAdrees: any = [];
  address_selected: any = null;
  status_view: Boolean = false;

  card_number: any = null;
  cvv: any = null;
  date_expiration: any = null;
  user: any = null;

  proof_file: any = null;
  constructor(
    public _cartService: CartShopsService,
    public _saleService: SalesService,
    public _culqiService: CulqiService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this._cartService.ToDolar().subscribe((resp: any) => {
      console.log(resp);
      this.ConversationDolar = resp.Cotizacion[0].Venta;
    })
    this._cartService.currentDataCart$.subscribe((resp: any) => {
      console.log(resp);
      this.listCarts = resp;
      this.TotalPrice = this.listCarts.reduce((sum: any, item: any) => sum + item.total, 0);

      if (this.listCarts.length > 0) {
        let company_id = this.listCarts[0].product.company_id;
        if (company_id) {
          this._saleService.getPaymentConfigs(company_id).subscribe((configsResp: any) => {
            let configs = configsResp.configs;
            let paypalConfig = configs.find((c: any) => c.method_type === 'PAYPAL');
            if (paypalConfig && paypalConfig.configuration) {
              let parsed = typeof paypalConfig.configuration === 'string' ? JSON.parse(paypalConfig.configuration) : paypalConfig.configuration;
              let clientId = parsed.client_id || parsed.public_key;
              this.loadPaypalScript(clientId);
            }
          });
        }
      }
    })
    this.user = this._cartService._authServices.user;
    this._saleService.listAddressUser().subscribe((resp: any) => {
      console.log(resp);
      methodPayment();
      this.listAdrees = resp.address;
      this.status_view = this.listAdrees.length == 0 ? true : false;
    })

  }

  loadPaypalScript(clientId: string) {
    if (document.getElementById('paypal-sdk-script')) {
      // Already loaded
      this.initPaypalButtons();
      return;
    }
    const script = document.createElement('script');
    script.id = 'paypal-sdk-script';
    // Dynamically inject the client ID
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&currency=USD`;
    script.onload = () => {
      this.initPaypalButtons();
    };
    document.body.appendChild(script);
  }

  initPaypalButtons() {
    paypal.Buttons({
      style: {
        color: "gold",
        shape: "rect",
        layout: "vertical"
      },
      createOrder: (data: any, actions: any) => {
        if (this.TotalPrice == 0) {
          alertDanger("EL TOTAL DE LA VENTA DEBE SER MAYOR A 0");
          return false;
        }
        if (this.listCarts.length == 0) {
          alertDanger("EL CARRITO DE COMPRAS ESTA VACIO");
          return false;
        }
        if (!this.address_selected) {
          alertDanger("NECESITAS SELECCIONAR UNA DIRECCIÓN");
          return false;
        }

        const createOrderPayload = {
          purchase_units: [
            {
              amount: {
                description: "COMPRAR POR EL ECOMMERCE",
                value: (this.TotalPrice / this.ConversationDolar).toFixed(2)
              }
            }
          ]
        };

        return actions.order.create(createOrderPayload);
      },
      onApprove: async (data: any, actions: any) => {
        let Order = await actions.order.capture();
        console.log(Order);
        let dataSale = {
          sale: {
            user_id: this.user.id,
            method_payment: 'PAYPAL',
            currency_total: 'PEN',
            currency_payment: 'USD',
            total: (this.TotalPrice / this.ConversationDolar).toFixed(2),
            price_dolar: this.ConversationDolar,
            n_transaccion: Order.purchase_units[0].payments.captures[0].id,
          },
          sale_address: {
            full_name: this.address_selected.full_name,
            full_surname: this.address_selected.full_surname,
            company_name: this.address_selected.company_name,
            county_region: this.address_selected.county_region,
            direccion: this.address_selected.direccion,
            city: this.address_selected.city,
            zip_code: this.address_selected.zip_code,
            phone: this.address_selected.phone,
            email: this.address_selected.email,
          },
        }
        this._saleService.storeSale(dataSale).subscribe((resp: any) => {
          console.log(resp);
          alertSuccess(resp.message_text);
          this.router.navigateByUrl("/perfil-del-cliente?selected_menu=4");
        })
      },
      onError: (err: any) => {
        console.error('An error prevented the buyer from checking out with PayPal');
      }
    }).render(this.paypalElement?.nativeElement);
  }
  selectAddress(addrr: any) {
    this.address_selected = addrr;
    this.full_name = addrr.full_name;
    this.full_surname = addrr.full_surname;
    this.company_name = addrr.company_name;
    this.county_region = addrr.county_region;
    this.direccion = addrr.direccion;
    this.city = addrr.city;
    this.zip_code = addrr.zip_code;
    this.phone = addrr.phone;
    this.email = addrr.email;
  }
  resetAddress() {
    this.address_selected = null;
    this.full_name = null;
    this.full_surname = null;
    this.company_name = null;
    this.county_region = null;
    this.direccion = null;
    this.city = null;
    this.zip_code = null;
    this.phone = null;
    this.email = null;
  }
  changeStatus() {
    this.status_view = !this.status_view;
  }
  save() {
    if (!this.full_name || !this.full_surname) {
      alertDanger("NECESITAS INGRESAR EL NOMBRE Y APELLIDO DEL QUE RECIBE EL PAQUE O ENTREGA");
      return;
    }
    if (!this.county_region) {
      alertDanger("NECESITAS INGRESAR EL PAIS O REGION");
      return;
    }
    if (!this.direccion) {
      alertDanger("NECESITAS INGRESAR LA DIRECCIÓN DE ENTREGA");
      return;
    }
    if (!this.city || !this.zip_code) {
      alertDanger("NECESITAS INGRESAR LA CIUDAD Y CODIGO POSTAL");
      return;
    }
    if (!this.phone || !this.email) {
      alertDanger("NECESITAS INGRESAR EL TELEFONO Y EL CORREO ELECTRONICO");
      return;
    }

    if (this.address_selected) {
      this.updateAddress();
    } else {
      this.addAddress();
    }
  }

  addAddress() {
    let data = {
      full_name: this.full_name,
      full_surname: this.full_surname,
      company_name: this.company_name,
      county_region: this.county_region,
      direccion: this.direccion,
      city: this.city,
      zip_code: this.zip_code,
      phone: this.phone,
      email: this.email,
    }
    this._saleService.addAddressUser(data).subscribe((resp: any) => {
      console.log(resp);
      this.selectAddress(resp.address);
      this.listAdrees.unshift(resp.address);
      alertSuccess("LA DIRECCIÓN SE HA REGISTRADO CORRECTAMENTE");
    })
  }

  updateAddress() {
    let data = {
      full_name: this.full_name,
      full_surname: this.full_surname,
      company_name: this.company_name,
      county_region: this.county_region,
      direccion: this.direccion,
      city: this.city,
      zip_code: this.zip_code,
      phone: this.phone,
      email: this.email,
    }
    this._saleService.updateAddressUser(this.address_selected.id, data).subscribe((resp: any) => {
      console.log(resp);
      let INDEX = this.listAdrees.findIndex((item: any) => item.id == resp.address.id);
      this.listAdrees[INDEX] = resp.address;
      alertSuccess("LA DIRECCIÓN HA REGISTRADO CAMBIOS CORRECTAMENTE");
    })
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.proof_file = event.target.files[0];
    }
  }

  PROCESS_PAYMENT_MANUAL(method: string) {
    if (this.TotalPrice == 0) {
      alertDanger("EL TOTAL DE LA VENTA DEBE SER MAYOR A 0");
      return;
    }
    if (this.listCarts.length == 0) {
      alertDanger("EL CARRITO DE COMPRAS ESTA VACIO");
      return;
    }
    if (!this.address_selected) {
      alertDanger("NECESITAS SELECCIONAR UNA DIRECCIÓN");
      return;
    }
    if (!this.proof_file) {
      alertDanger("NECESITAS SUBIR EL COMPROBANTE DE PAGO");
      return;
    }

    let dataSale = {
      sale: {
        user_id: this.user.id,
        method_payment: method,
        currency_total: 'PEN',
        currency_payment: 'PEN',
        total: this.TotalPrice,
        price_dolar: 0,
        n_transaccion: 'MANUAL', // Will be updated by backend or just placeholder
      },
      sale_address: {
        full_name: this.address_selected.full_name,
        full_surname: this.address_selected.full_surname,
        company_name: this.address_selected.company_name,
        county_region: this.address_selected.county_region,
        direccion: this.address_selected.direccion,
        city: this.address_selected.city,
        zip_code: this.address_selected.zip_code,
        phone: this.address_selected.phone,
        email: this.address_selected.email,
      },
    }

    let formData = new FormData();
    formData.append("sale", JSON.stringify(dataSale.sale));
    formData.append("sale_address", JSON.stringify(dataSale.sale_address));
    formData.append("payment_proof", this.proof_file);

    this._saleService.storeSale(formData).subscribe((resp: any) => {
      console.log(resp);
      alertSuccess(resp.message_text);
      this.router.navigateByUrl("/perfil-del-cliente?selected_menu=4");
    })
  }

  PROCESS_PAYMENT() {
    if (this.TotalPrice == 0) {
      alertDanger("EL TOTAL DE LA VENTA DEBE SER MAYOR A 0");
      return;
    }
    if (this.listCarts.length == 0) {
      alertDanger("EL CARRITO DE COMPRAS ESTA VACIO");
      return;
    }
    if (!this.card_number) {
      alertDanger("NECESITAS COLOCAR EL NUMERO DE LA TARJETA");
      return;
    }
    if (!this.date_expiration) {
      alertDanger("NECESITAS COLOCAR LA FECHA DE EXPIRACION DE LA TARJETA");
      return;
    }
    if (!this.cvv) {
      alertDanger("NECESITAS COLOCAR EL CVV DE LA TARJETA");
      return;
    }
    if (!this.address_selected) {
      alertDanger("NECESITAS SELECCIONAR UNA DIRECCIÓN");
      return;
    }
    // 25/24
    let SLIT_DATE = this.date_expiration.split("/");//[25,24]
    let expiration_month = SLIT_DATE[0];
    let expiration_year = SLIT_DATE[1];
    let data = {
      card_number: this.card_number,
      cvv: this.cvv,
      expiration_month: expiration_month,
      expiration_year: expiration_year,
      email: "stackdevelopers29@gmail.com",
    };
    // 1000
    this._culqiService.GETTOKENCULQI(data).subscribe((resp: any) => {
      console.log(resp);
      let dataT = {
        source_id: resp.id,
        email: "stackdevelopers29@gmail.com",
        currency_code: 'PEN',
        amount: parseInt(this.TotalPrice.toString() + "00"),
      }
      this._culqiService.SENDDATATOCULQI(dataT).subscribe((respT: any) => {
        console.log(respT);
        //respT.id
        let dataSale = {
          sale: {
            user_id: this.user.id,
            method_payment: 'CULQI',
            currency_total: 'PEN',
            currency_payment: 'PEN',
            total: this.TotalPrice,
            price_dolar: 0,
            n_transaccion: respT.id,
          },
          sale_address: {
            full_name: this.address_selected.full_name,
            full_surname: this.address_selected.full_surname,
            company_name: this.address_selected.company_name,
            county_region: this.address_selected.county_region,
            direccion: this.address_selected.direccion,
            city: this.address_selected.city,
            zip_code: this.address_selected.zip_code,
            phone: this.address_selected.phone,
            email: this.address_selected.email,
          },
        }
        this._saleService.storeSale(dataSale).subscribe((resp: any) => {
          console.log(resp);
          alertSuccess(resp.message_text);
          this.router.navigateByUrl("/perfil-del-cliente?selected_menu=4");
        })
      })
    })
  }
}
