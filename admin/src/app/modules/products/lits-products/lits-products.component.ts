import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../_services/products.service';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from 'src/app/componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-lits-products',
  templateUrl: './lits-products.component.html',
  styleUrls: ['./lits-products.component.scss']
})
export class LitsProductsComponent implements OnInit {

  products: any = [];
  isLoading$: any = null;

  search: any = null;
  constructor(
    public toaster: Toaster,
    public _productServices: ProductsService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._productServices.isLoadingSubject;
    this.allProducts();
  }

  allProducts(page = 1) {
    let LINK = "";
    if (this.search) {
      LINK = LINK + "&search=" + this.search;
    }
    this._productServices.allProducts(page, LINK).subscribe((resp: any) => {
      console.log(resp);
      this.products = resp.products.data;
    })
  }

  reset() {
    this.search = null;
    this.allProducts();
  }
  edit(product) {

  }
  delete(product: any) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      // Logic for delete if needed
    }
  }

  changeStatus(product: any, event: any) {
    const status = event.target.value;
    let formData = new FormData();
    formData.append("state", status);
    formData.append("title", product.title);
    formData.append("categorie_id", product.categorie_id);

    this._productServices.updateProduct(product.id, formData).subscribe((resp: any) => {
      if (resp.message == 200) {
        product.state = status;
        this.toaster.open(NoticyAlertComponent, { text: `primary-'EL ESTADO DEL PRODUCTO SE ACTUALIZÓ CORRECTAMENTE.'` });
      }
    });
  }

}
