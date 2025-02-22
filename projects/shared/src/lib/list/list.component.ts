import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { CommonData } from '../models/table/commonData.model';
import { TableData } from '../models/table/tableData.model';
import { SharedService } from '../shared.service';
import { FormGroup } from '@angular/forms';
import { ControlItem } from '../models/form/control-item.model';
import { NotifyService } from '../services/notify.service';
import { PopupOption } from '../models/popup/popup-option.model';
import { ListOption } from '../models/list/list-option.model';
import { evaluate } from 'mathjs';
@Component({
  selector: 'lib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
  //#region Init Data
  //#region List
  @Input() lstOption: ListOption = new ListOption();
  @Input() data: any[] = [];
  totalData: any[] = [];
  chosenItems: any[] = [];
  @Input() fg!: FormGroup;
  @Input() objFields: CommonData[] = [];
  @Input() controls: ControlItem[] = [];
  @Input() itemTmpl!: TemplateRef<any>;
  @Input() filter: any;
  @Input() disabled: boolean = true;
  @Input() lstNotIn: any[] = [];
  curPage = 1;
  loading = false;
  request = '';
  total = 0;
  @Output() dataChange = new EventEmitter();
  //#endregion

  //#region Popup
  @Input() popupOptions: PopupOption = new PopupOption();
  @Input() popRemoveConfirmOption!: PopupOption;
  //#endregion

  //#region Private properties
  protected titleField: CommonData | undefined;
  protected coverField: CommonData | undefined;
  protected avatarField!: CommonData | undefined;
  protected autoCalFields!: CommonData[];
  protected listMaxHeight = 1;
  @ViewChild('listInfo') listInfo!: ElementRef<HTMLElement>;
  protected curSelected: any;
  //#endregion
  //#endregion

  constructor(
    private df: ChangeDetectorRef,
    private notiService: NotifyService,
    private shareService: SharedService
  ) {}

  ngOnInit() {
    this.titleField = this.objFields.find((x) => x.type === 'title');
    this.coverField = this.objFields.find((x) => x.type === 'cover');
    this.avatarField = this.objFields.find((x) => x.type === 'avatar');
    this.objFields = this.objFields.filter(
      (x) =>
        x != this.titleField && x != this.coverField && x != this.avatarField
    );
    if (
      this.popupOptions.allowRemove &&
      this.popupOptions.isConfirmRemove &&
      !this.popRemoveConfirmOption
    ) {
      this.popRemoveConfirmOption = new PopupOption();
      this.popRemoveConfirmOption.width = 300;
      this.popRemoveConfirmOption.height = 100;
      this.popRemoveConfirmOption.confirmText = 'Xóa';
      this.popRemoveConfirmOption.isRemove = true;
    }

    this.autoCalFields = this.objFields.filter((field) => field.autoCalculate);
  }

  ngAfterViewInit() {
    this.setListHeight();
    this.loadData();
  }

  //#region Get List
  private loadData() {
    this.loading = true;
    if (
      this.lstOption.service &&
      this.lstOption.assembly &&
      this.lstOption.method
    ) {
      this.shareService
        .getDataPaging(
          this.lstOption.service,
          this.lstOption.assembly,
          this.lstOption.method,
          this.curPage,
          this.lstOption.pageSize,
          this.request,
          this.lstNotIn,
          this.filter
        )
        .subscribe((res: TableData) => {
          this.total = res.total;
          this.data = res.data;
          this.setDefaultValue();
          if (!this.lstOption.isPaging) {
            this.totalData.push(...this.data);
            this.dataChange.emit(this.totalData);
          } else this.dataChange.emit(this.data);
          this.loading = false;
          this.df.detectChanges();
        });
    } else this.loading = false;
    this.df.detectChanges();
  }

  reload() {
    this.loadData();
  }

  onPageChange(event: any) {
    this.curPage = event;
    this.loadData();
  }
  //#endregion

  //#region Item Actions
  onEditClick(item: any) {
    this.curSelected = item;
    this.popupOptions.showPopup = true;
    this.df.detectChanges();
  }

  onRemoveClick(item: any) {
    this.curSelected = item;
    if (this.popupOptions.isConfirmRemove) {
      this.popupOptions.showRemovePopup = true;
      this.df.detectChanges();
    } else {
      this.onRemoveConfirm();
    }
  }

  onRemoveConfirm() {
    if (
      this.lstOption.service &&
      this.lstOption.assembly &&
      this.popupOptions.removeMethod
    ) {
      this.shareService
        .post(
          this.lstOption.service,
          this.lstOption.assembly,
          this.popupOptions.removeMethod,
          this.curSelected.recID
        )
        .subscribe((res) => {
          if (res) {
            this.notiService.show('Xóa sản phẩm', 'Thành công', 'success');
            this.loading = false;
            this.reload();
          }
        });
    }
  }

  onCopyClick(item: any) {
    let clone = { ...item };
    clone.recID = null;
    this.onAddUpdate(clone, true);
  }

  onAddUpdate(evt: any, isCopy = false) {
    if (
      this.lstOption.service &&
      this.lstOption.assembly &&
      this.popupOptions.saveMethod
    ) {
      this.loading = true;
      this.shareService
        .post(
          this.lstOption.service,
          this.lstOption.assembly,
          this.popupOptions.saveMethod,
          evt
        )
        .subscribe((res) => {
          if (isCopy)
            this.notiService.show('Sao chép', 'Thành công', 'success');
          else this.notiService.show('Chỉnh sửa', 'Thành công', 'success');
          this.loading = false;
          this.reload();
        });
    }
  }

  onClickItem(item: any, evt: any) {
    let target = evt.target as HTMLElement;
    if (
      this.popupOptions.allowChoose &&
      !target.classList.contains('input-value')
    ) {
      this.setItemChoose(item, null);
    }
  }

  protected setItemChoose(item: any, evt?: any) {
    if (evt == null) item['isChosen'] = !item['isChosen'];
    else item['isChosen'] = evt.target.value > 0;

    item['border'] = item['isChosen'] ? '1px solid green' : '';
    if (item['isChosen']) this.chosenItems.push(item);
    else
      this.chosenItems = this.chosenItems.filter((x) => x.recID != item.recID);
  }

  inputChange(evt: any, control: CommonData, item: any) {
    this.autoCalFields
      .filter((field) => field.expression?.includes(control.field))
      .forEach((field) => {
        if (field.expression)
          item[field.field] = evaluate(field.expression, { item: item });
      });
  }
  //#endregion

  private setListHeight() {
    if (this.listInfo.nativeElement.children.length > 0) {
      let parent = this.listInfo.nativeElement.parentElement as HTMLElement;
      while (parent.offsetHeight <= 0 && parent)
        parent = parent.parentNode as HTMLElement;
      let lChild = this.listInfo.nativeElement.lastChild as HTMLElement;
      this.listMaxHeight = (parent.offsetHeight - lChild.offsetHeight) * 0.8;
    } else {
      this.listMaxHeight = 100;
    }
    this.df.detectChanges();
  }

  private setDefaultValue() {
    this.objFields.forEach((objF) => {
      this.data.forEach((item) => {
        if (!item[objF.field]) {
          switch (objF.type) {
            case 'checkbox':
            case 'select': {
              item[objF.field] = false;
              break;
            }
            case 'number': {
              item[objF.field] = 0;
              break;
            }
            case 'text': {
              item[objF.field] = '';
              break;
            }
            default: {
              break;
            }
          }
        }
      });
    });
  }
}
