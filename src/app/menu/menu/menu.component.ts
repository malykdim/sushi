import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';
import { IUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  title = 'Gourmet';

  constructor(
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    let user = this.authService.user;
    console.log(user);
    // this.authService.getCurrentUser(id);
  }

  ngOnDestroy(): void {
    // this.userSub.unsubscribe();
  }
}
