import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TokenService } from './Services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'FruitShopUI';
  contentTopGap = 44;
  contentLeftGap = 10;
  isLoged = false;
  constructor(
    private df: ChangeDetectorRef,
    private tokenService: TokenService
  ) {}
  ngOnInit(): void {
    this.isLoged = this.tokenService.isLoged();
  }
  ngAfterViewInit(): void {
    let toolbarEle = document.getElementById('toolbar');
    this.contentTopGap = !this.isLoged ? 0 : toolbarEle?.offsetHeight ?? 44;
    this.df.detectChanges();
  }
}
