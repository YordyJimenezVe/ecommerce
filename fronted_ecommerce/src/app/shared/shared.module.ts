import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CDetailProductComponent } from './c-detail-product/c-detail-product.component';
import { TranslatePipe } from './pipes/translate.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CDetailProductComponent,
    TranslatePipe
  ],
  imports: [
    CommonModule,
    //
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CDetailProductComponent,
    TranslatePipe
  ]
})
export class SharedModule { }
