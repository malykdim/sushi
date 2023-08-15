import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, Data } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

import { GourmetService } from 'src/app/services/gourmet/gourmet.service';
import { IItem } from 'src/app/shared/interfaces/item';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  private user: Subscription | undefined;
  role = 'guest';
  added = false;
  favorite = false;

  item: IItem = {
    id: '',
    name: '',
    image: '',
    category: '',
    temperature: '',
    price: 0,
    ingredients: [],
  }

  id: number = 0;
  index: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private gourmetService: GourmetService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    /* when the component first loads: const id = this.route.snapshot.params['id']; */

    this.user = this.authService.user.subscribe(user => {
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

    this.route.params.subscribe(
      (params: Params) => {
        this.id = Number(params['id']);
        this.item = this.gourmetService.getSushi(this.id);
      }
    );
  }

  /* CHEF */
  // onEditItem() {
    //   this.router.navigate(['/menu', this.id, 'edit']);
    // }
    onDeleteItem(id: number) {
      this.gourmetService.removeSushi(this.id);
      console.log(this.gourmetService.getGourmet());
      this.router.navigate(['/menu']);
    }

    ngOnDestroy() {
      this.user?.unsubscribe();
    }


  /* CLIENT ... to be continued */
  onAddToCart(itemId: number) {
    this.added = true;
    // this.gourmetService.addToCart(this.item.ingredients);
  }

  onRemoveFromCart(itemId: number) {this.added = true}

  onMarkAsFavorite(itemId: number) {this.favorite = true}

  onUnmark() {this.favorite = false}
}
