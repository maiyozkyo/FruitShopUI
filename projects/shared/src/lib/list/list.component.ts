import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { CommonData } from '../models/table/commonData.model';
import { ApiService } from 'src/app/Services/api.service';
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
  @Input() itemTmpl!: TemplateRef<any>;
  @Input() service: string = '';
  @Input() method: string = '';
  @Input() filter: any;
  @Input() pageSize = 20;
  @Input() lstNotIn: any[] = [];

  @Output() save = new EventEmitter<any>();
  @Output() dataChange = new EventEmitter<any>();

  curPage = 1;
  loading = false;
  request = '';
  total = 0;

  constructor(
    private df: ChangeDetectorRef,
    private shareService: SharedService
  ) {}

  ngOnInit() {}
  ngAfterViewInit() {
    this.loadData();
  }

  private loadData() {
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
    console.log(event);
  }
}
