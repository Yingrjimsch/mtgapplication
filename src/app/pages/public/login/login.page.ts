import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authservices/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
  }

  ngOnInit() {}

  login() {
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password);
  }

  logout() {
    this.authenticationService.logout();
  }
}
