import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {TokenStorageService} from '../auth/token-storage.service';
import {AuthLoginInfo} from '../auth/login-info';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

//  form: any = {};
  isLoggedIn = false;
  errorMessage = '';
  role = '';
  private loginInfo: AuthLoginInfo | undefined;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getAuthorities();
    }
  }

  onSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.form.value.username,
      this.form.value.password
    );

    console.log(this.form.value.username)

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.role);

        this.isLoggedIn = true;
        this.role = this.tokenStorage.getAuthorities();
        this.errorMessage = '';
        this.reloadPage();
      },
      error => {
        // this.errorMessage = error.error.message;
        this.errorMessage = "Invalid username or password";
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

}
