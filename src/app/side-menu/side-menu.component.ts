import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { User } from 'projects/shared/src/lib/models/user.model';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { TokenService } from '../Services/token.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, AfterViewInit {
  @ViewChild('toolbar', { read: ElementRef }) toolbar!: ElementRef;
  isLogin: boolean = false;
  sideMenuOpenState = true;
  isMobile: boolean = false;
  topGap: number = 0;
  user: User | undefined;
  constructor(
    protected tokenService: TokenService,
    private apiService: ApiService,
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private df: ChangeDetectorRef
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.isMobile = state.matches;
        this.sideMenuOpenState = !state.matches;
      });

    this.user = tokenService.getAuth();
    if (this.user) {
      // this.user.avatar = 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp';
    }
  }

  ngOnInit() {}
  ngAfterViewInit() {
    this.topGap = this.toolbar?.nativeElement.offsetHeight ?? 0;
    this.df.detectChanges();
  }

  openSideMenu(): boolean {
    this.sideMenuOpenState = !this.sideMenuOpenState;
    return this.sideMenuOpenState;
  }

  logout() {
    this.apiService.post('User', 'LogoutAsync', []).subscribe((res) => {
      if (res) {
        this.tokenService.logOut();
        this.router.navigate(['/user/login']);
      }
    });
  }

  navClick(sidenav: MatSidenav) {
    if (this.isMobile) {
      sidenav.toggle();
    }
  }
}
