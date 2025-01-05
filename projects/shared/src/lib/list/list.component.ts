import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonData } from '../models/table/commonData.model';

@Component({
  selector: 'lib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, AfterViewInit {
  @Input() type: 'list' | 'grid' = 'list';
  @Input() data: CommonData[] = [];
  @Input() tmpl!: TemplateRef<any>;
  @Input() service: string = '';
  @Input() method: string = '';
  @Input() filter:any ;

  ngOnInit() {}
  ngAfterViewInit() {}
}
