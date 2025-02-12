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
import { environment } from 'src/environments/environment.development';
import { FilterProduct } from '../models/product.filter.model';
import { PRProduct } from '../models/product.model';
import { NotifyService } from 'projects/shared/src/lib/services/notify.service';
import { ListComponent } from 'projects/shared/src/lib/list/list.component';
import { FormGroup, Validators } from '@angular/forms';
import { ControlItem } from 'projects/shared/src/lib/models/form/control-item.model';
import { FormService } from 'projects/shared/src/lib/form/form.service';
import { CommonData } from 'projects/shared/src/lib/models/table/commonData.model';

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
    IsActive: true,
    ProductName: '',
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
  productFG!: FormGroup;
  productControls!: ControlItem[];
  productFields!: CommonData[];
  showPopProduct = false;
  //#region Table
  eProductService = environment.productService;
  eProductAssemble = environment.productAssembly;
  productMethod = 'TableProducts';
  saveProductMethod = 'AddUpdateAsync';
  removeProductMethod = 'RemoveProductAsync';
  //#endregion
  //#endregion

  //#endregion

  constructor(
    private productService: ProductService,
    private notiService: NotifyService,
    private formService: FormService,
    private df: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.productControls = [
      {
        controlName: 'code',
        title: 'Mã hàng hóa',
        value: '',
        validators: [Validators.required],
        disabledOnEdit: true,
      },
      {
        controlName: 'name',
        title: 'Tên hàng hóa',
        value: '',
        validators: [Validators.required],
      },
      {
        controlName: 'price',
        type: 'number',
        title: 'Đơn giá',
        value: 0,
      },
      {
        controlName: 'isActive',
        title: 'Hoạt động',
        value: true,
        type: 'switch',
      },
      {
        controlName: 'img',
        title: 'Hình ảnh',
        value: '',
        type: 'upload',
      },
    ];

    this.productFields = [
      {
        field: 'name',
        title: 'Tên hàng hóa',
        type: 'title',
      },
      {
        field: 'img',
        title: '',
        type: 'cover',
      },
    ];
    this.productFG = this.formService.genFromControls(this.productControls);
  }
  ngAfterViewInit(): void {}

  onSelecteProductStatus(evt: any) {
    this.curFilter.IsActive = evt;
    this.productLib.reload();
  }

  onAddUpdateProduct(prod: PRProduct) {
    if (this.curProduct) {
      this.productService.addUpdateProduct(prod).subscribe((res) => {
        let isNew = this.curProduct.recID == null;
        let title = (isNew ? 'Thêm mới' : 'Chỉnh sửa') + ' hàng hóa';
        this.notiService.show(title, 'Thành công', 'success');
        this.showPopProduct = false;
        this.productLib.reload();
      });
    }
  }

  showPopup(product: PRProduct | null) {
    if (!product) this.curProduct = new PRProduct();
    this.showPopProduct = true;
  }
}
