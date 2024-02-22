import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { passwordMatchingValidatior } from './password.validator';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { NotifyService } from 'projects/shared/src/lib/notify.service';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  isLogin = true;
  constructor(
    private userServices: UserService,
    private df: ChangeDetectorRef,
    private authService: AuthService,
    private notiService: NotifyService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.maxLength(11),
      ]),
      password: new FormControl('', [Validators.required]),
    });

    this.registerForm = new FormGroup(
      {
        userName: new FormControl('', [
          Validators.required,
          Validators.maxLength(11),
        ]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: passwordMatchingValidatior }
    );
  }

  activeLoginForm() {
    this.isLogin = true;
  }
  login() {
    if (this.loginForm.valid) {
      let userName = this.loginForm.controls['userName'].value;
      let password = this.loginForm.controls['password'].value;
      this.userServices.login(userName, password).subscribe((res: any) => {
        if (res) {
          this.authService.setAuth(res);
          this.router.navigate(['/order']);
        } else {
          this.notiService.show(
            'Đăng nhập',
            'Đăng nhập thất bại',
            'error',
            5000
          );
        }
      });
    }
  }

  activeRegisterForm() {
    this.isLogin = false;
  }
  register() {
    if (this.registerForm.valid) {
      let userName = this.registerForm.controls['userName'].value;
      let password = this.registerForm.controls['password'].value;
      this.userServices.register(userName, password).subscribe((res) => {
        this.isLogin = true;
      });
    }
  }
}
