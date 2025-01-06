import { ProductService } from './../product.service';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonData } from 'projects/shared/src/lib/models/table/commonData.model';
import { environment } from 'src/environments/environment.development';
import { FilterProduct } from '../models/product.filter.model';
import { ApiService } from 'src/app/Services/api.service';
import { PRProduct } from '../models/product.model';
import { NotifyService } from 'projects/shared/src/lib/services/notify.service';
import { ListComponent } from 'projects/shared/src/lib/list/list.component';

@Component({
  selector: 'lib-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss'],
})
export class ProductMainComponent implements OnInit, AfterViewInit {
  //#region Init Data
  //#region Root
  @ViewChild('popupContainer', { read: ViewContainerRef, static: true })
  popupContainerRef!: ViewContainerRef;
  @ViewChild('productLib') productLib!: ListComponent;
  //#endregion

  //#region Filter
  curFilter: FilterProduct = {
    IsActive: null,
  };

  lstProductStatus = [
    {
      value: null,
      text: 'Tất cả',
    },
    {
      value: true,
      text: 'Đang hoạt động',
    },
    {
      value: false,
      text: 'Ngừng hoạt động',
    },
  ];
  //#endregion

  //#region Data
  curProduct!: PRProduct;
  //#region Table
  tableRows: CommonData[] = [];
  tableDisabled: boolean = true;
  eProductService = environment.productService;
  productMethod = 'TableProducts';
  //#endregion
  //#endregion

  //#endregion

  constructor(
    private productService: ProductService,
    private df: ChangeDetectorRef,
    private notiService: NotifyService
  ) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {}

  onSelecteProductStatus(evt: any) {
    this.curFilter.IsActive = evt;
    this.productLib.reload();
  }

  onAddUpdateProduct() {
    this.productService.addUpdateProduct(this.curProduct).subscribe((res) => {
      let isNew = this.curProduct.recID == null;
      let title = (isNew ? 'Thêm mới' : 'Chỉnh sửa') + ' khách hàng';
      this.notiService.show(title, 'Thành công', 'success');
    });
  }
}
