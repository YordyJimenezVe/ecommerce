import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth-profile/_services/auth.guard';
import { CheckoutPaymentComponent } from './checkout-payment/checkout-payment.component';
import { EcommerceAuthComponent } from './ecommerce-auth.component';
import { ProfileClientHomeComponent } from './profile-client/profile-client-home/profile-client-home.component';
import { ShoppingCartsComponent } from './shopping-carts/shopping-carts.component';

const routes: Routes = [{
  path: '',
  component: EcommerceAuthComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'carrito-de-compra',
      component: ShoppingCartsComponent,
    },
    {
      path: 'proceso-de-pago',
      component: CheckoutPaymentComponent,
    },
    {
      path: 'perfil-del-cliente',
      component: ProfileClientHomeComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EcommerceAuthRoutingModule { }
