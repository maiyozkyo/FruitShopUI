import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  registerForm!: FormGroup;

  isLogin = true;
  constructor() {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.maxLength(11),
      ]),
      password: new FormControl('', [Validators.required]),
    });

    this.registerForm = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
        Validators.maxLength(11),
      ]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  login() {
    console.log('login', this.loginForm);
  }

  register() {
    this.isLogin = false;
    console.log('registerForm', this.registerForm);
  }
}
