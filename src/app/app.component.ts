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
  contentTopGap = 44;
  contentLeftGap = 10;
  constructor(private df: ChangeDetectorRef) {}
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    let toolbarEle = document.getElementById('toolbar');
    console.log(toolbarEle);

    this.contentTopGap = toolbarEle?.offsetHeight ?? 44;
    this.df.detectChanges();
  }
}
