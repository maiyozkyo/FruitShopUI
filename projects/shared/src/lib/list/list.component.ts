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
@Component({
  selector: 'lib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
  //#region Init Data
  //#region List
  @Input() type: 'list' | 'grid' = 'list';
  @Input() data: any[] = [];
  @Input() fg!: FormGroup;
  @Input() objFields: CommonData[] = [];
  @Input() controls: ControlItem[] = [];
  @Input() itemTmpl!: TemplateRef<any>;
  @Input() service: string = '';
  @Input() assembly: string = '';
  @Input() method: string = '';
  @Input() filter: any;
  @Input() pageSize = 20;
  @Input() width = 100;
  @Input() height = 100;
  @Input() disabled: boolean = true;
  @Input() lstNotIn: any[] = [];
  curPage = 1;
  loading = false;
  request = '';
  total = 0;
  @Output() dataChange = new EventEmitter();
  //#endregion

  //#region Popup
  @Input() popupWidth = 550;
  @Input() popupHeight = 500;
  @Input() showPopup = false;
  @Input() showRemovePopup = false;
  @Input() saveMethod = '';
  @Input() allowAddEdit = true;
  @Input() removeMethod = '';
  @Input() allowRemove = true;
  //#endregion

  //#region Private properties
  protected titleField: CommonData | undefined;
  protected coverField: CommonData | undefined;
  protected avatarField!: CommonData | undefined;
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
  }

  ngAfterViewInit() {
    this.setListHeight();
    this.loadData();
  }

  //#region Get List
  private loadData() {
    this.loading = true;
    if (this.service && this.assembly && this.method) {
      this.shareService
        .getDataPaging(
          this.service,
          this.assembly,
          this.method,
          this.curPage,
          this.pageSize,
          this.request,
          this.lstNotIn,
          this.filter
        )
        .subscribe((res: TableData) => {
          console.log('res', res);
          this.total = res.total;
          this.data = res.data;
          this.loading = false;
          this.dataChange.emit(this.data);
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
    this.showPopup = true;
    this.df.detectChanges();
  }

  onRemoveClick(item: any) {
    console.log('remove', item);
    this.curSelected = item;
    if (this.service && this.assembly && this.removeMethod) {
      this.shareService
        .post(this.service, this.assembly, this.removeMethod, item.recID)
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
    if (this.service && this.assembly && this.saveMethod) {
      this.loading = true;
      let clone = { ...item };
      clone.recID = null;
      this.shareService
        .post(this.service, this.assembly, this.saveMethod, clone)
        .subscribe((res) => {
          this.notiService.show('Sao chép', 'Thành công', 'success');
          this.loading = false;
          this.reload();
        });
    }
  }

  onConfirm(evt: any) {}
  //#endregion

  private setListHeight() {
    if (this.listInfo.nativeElement.children.length > 0) {
      let parent = this.listInfo.nativeElement.parentElement as HTMLElement;
      let lChild = this.listInfo.nativeElement.lastChild as HTMLElement;
      this.listMaxHeight = (parent.offsetHeight - lChild.offsetHeight) * 0.9;
    } else {
      this.listMaxHeight = 100;
    }
    this.df.detectChanges();
  }
}
