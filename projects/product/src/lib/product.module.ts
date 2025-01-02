import { NgModule } from '@angular/core';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductMainComponent } from './product-main/product-main.component';
import { SharedModule } from 'projects/shared/src/public-api';

const productRoutes: Routes = [
  {
    path: '',
    component: ProductMainComponent,
  },
];

@NgModule({
  declarations: [ProductComponent, ProductMainComponent],
  imports: [RouterModule.forChild(productRoutes), SharedModule],
  exports: [ProductComponent, ProductMainComponent],
})
export class ProductModule {}
