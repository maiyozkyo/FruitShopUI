import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'FruitShopUI';
  contentTopGap = 49;
  contentLeftGap = 10;
  constructor() {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    let toolbarEle = document.getElementById('toolbar');
    this.contentTopGap = (toolbarEle?.offsetHeight ?? 44) + 5;
  }
}
