import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LandingProductDetailComponent } from './landing-product-detail/landing-product-detail.component';
import { HomeInitialComponent } from './home-initial/home-initial.component';
import { ListsFilterProductsComponent } from './lists-filter-products/lists-filter-products.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FaqComponent } from './faq/faq.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    LandingProductDetailComponent,
    HomeInitialComponent,
    HomeInitialComponent,
    ListsFilterProductsComponent,
    AboutUsComponent,
    TermsConditionsComponent,
    PrivacyPolicyComponent,
    FaqComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,

    //
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ]
})
export class HomeModule { }
