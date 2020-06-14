import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authservices/authentication.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {
    if (authenticationService.isLoggedIn) {
      router.navigate(['/home']);
      console.log(authenticationService.isLoggedIn);
    }
    this.loginForm = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
  }

  ngOnInit() {}

  login() {
    this.authenticationService.login(this.loginForm.value.email, this.loginForm.value.password);
  }
}
