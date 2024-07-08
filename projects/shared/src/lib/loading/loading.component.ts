import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'lib-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  constructor(protected loadingService: LoadingService) {}
  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
