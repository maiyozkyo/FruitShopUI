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
@Component({
  selector: 'lib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
  @Input() type: 'list' | 'grid' = 'list';
  @Input() data: any[] = [];
  @Input() controls: CommonData[] = [];
  @Input() itemTmpl!: TemplateRef<any>;
  @Input() service: string = '';
  @Input() method: string = '';
  @Input() filter: any;
  @Input() pageSize = 20;
  @Input() width = 100;
  @Input() height = 100;
  @Input() lstNotIn: any[] = [];
  @Input() disabled: boolean = true;

  @Output() save = new EventEmitter<any>();
  @Output() dataChange = new EventEmitter<any>();

  curPage = 1;
  loading = false;
  request = '';
  total = 0;

  //#region Private properties
  protected titleControl: CommonData | undefined;
  protected coverControl: CommonData | undefined;
  protected avatarControl!: CommonData | undefined;
  protected listMaxHeight = 1;
  @ViewChild('listInfo') listInfo!: ElementRef<HTMLElement>;
  //#endregion

  constructor(
    private df: ChangeDetectorRef,
    private shareService: SharedService
  ) {}

  ngOnInit() {
    this.titleControl = this.controls.find((x) => x.type === 'title');
    this.coverControl = this.controls.find((x) => x.type === 'cover');
    this.avatarControl = this.controls.find((x) => x.type === 'avatar');
    this.controls = this.controls.filter(
      (x) =>
        x != this.titleControl &&
        x != this.coverControl &&
        x != this.avatarControl
    );
  }

  ngAfterViewInit() {
    this.setListHeight();
    this.loadData();
  }

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

  private setListHeight() {
    if (this.listInfo.nativeElement.children.length > 0) {
      let parent = this.listInfo.nativeElement.parentElement as HTMLElement;
      let lChild = this.listInfo.nativeElement.lastChild as HTMLElement;
      this.listMaxHeight = (parent.offsetHeight - lChild.offsetHeight) * 0.9;
    } else {
      this.listMaxHeight = 100;
    }
    // this.listMaxHeight = 600;
    console.log('listMaxHeight', this.listMaxHeight);

    this.df.detectChanges();
  }
}
