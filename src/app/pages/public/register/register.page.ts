import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authservices/authentication.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/dbservices/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  registerForm: FormGroup;
  constructor(formBuilder: FormBuilder, private userService: UserService, private authenticationService: AuthenticationService, private router: Router) {
    if (authenticationService.isLoggedIn) {
    router.navigate(['/home']);
    }
    this.registerForm = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6), Validators.required]]
    });
  }

  ngOnInit() {

  }

  register() {
    this.userService.addUser(this.registerForm.value.email, this.registerForm.value.password);
  }

  showLoginPage() {
    return this.router.navigate(['/login']);
  }
}
