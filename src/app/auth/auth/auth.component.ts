import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthResponseData } from 'src/app/shared/interfaces/authResponseData';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string | null = null;
  loadedRoute = this.router.url;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.loadedRoute === '/user/signup') {
      this.isLoginMode = false;
    } else if (this.loadedRoute === '/user/login') {
      this.isLoginMode = true;
    }
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let user: Observable<AuthResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      user = this.authService.login(email, password);
    } else {
      user = this.authService.signup(email, password);
    }

    user.subscribe(
      responseData => {
        console.log(responseData);
        console.log(user);
        this.isLoading = false;
        this.router.navigate(['/menu']);
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
