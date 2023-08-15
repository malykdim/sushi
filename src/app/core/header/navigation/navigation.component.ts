import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageGourmetService } from 'src/app/services/gourmet/storage-gourmet.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  private user: Subscription | undefined;
  isAuthenticated = false;
  role = 'guest';

  title: string = 'sushi bar';
  showMenu: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storage: StorageGourmetService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.user.subscribe(user => {
      this.isAuthenticated = !user ? false : true; // !!user
      if (user) {
        switch (user.role) {
          case 'admin': this.role = 'admin'; break;
          case 'chef': this.role = 'chef'; break;
          default: this.role = 'client';
        }
      } else {
        this.role = 'guest';
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.role = 'guest';
  }


  public toggleMenu(event: MouseEvent): void {
    event.preventDefault();
    this.showMenu = !this.showMenu;
  }


  onSaveToDB() {
    // save subscription and unsub!
    this.storage.storeItems();
    // .subscribe(items => {
      //   // forward the received DB data to gourmetService
      //   this.gourmetService.setGourmet(items);
      // })
    console.log('storage.storeItems() called');
  }


  public navigate(path: string): void {
    this.router.navigate([path]);
  }

  ngOnDestroy(): void {
    this.user?.unsubscribe();
  }

}
