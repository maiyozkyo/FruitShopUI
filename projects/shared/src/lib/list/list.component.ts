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
  @Input() method: string = '';
  @Input() filter: any;
  @Input() pageSize = 20;
  @Input() width = 100;
  @Input() height = 100;
  @Input() disabled: boolean = true;
  @Input() lstNotIn: any[] = [];
  @Input() saveMethod = '';
  @Input() removeMethod = '';
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
    if (this.service && this.method) {
      this.shareService
        .getDataPaging(
          this.service,
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
        });
    } else this.loading = false;
  }

  reload() {
    this.loadData();
  }

  onPageChange(event: any) {
    this.curPage = event;
    this.loadData();
  }
  //#endregion
  onEditClick(item: any) {}

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
