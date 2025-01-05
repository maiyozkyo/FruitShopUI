import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment.development';
import { PRProduct } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly service = environment.productService;

  constructor(private apiService: ApiService) { }
addUpdateProduct(product: PRProduct) {
    return this.apiService.post(this.service, 'AddUpdateAsync', [product]);
  }

}
