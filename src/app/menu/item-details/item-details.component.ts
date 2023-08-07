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
  added = true;
  favorite = true;

  item: IItem = {
    id: '',
    name: '',
    image: '',
    category: '',
    ingredients: [],
    temperature: '',
    price: 1
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

    })
    // this.route.data
    //   .subscribe(
    //     (data: Data) => {
    //       console.log(data);
    //     }
    //   );
    // const id = this.route.snapshot.params['id']; // when we first load the component
    console.log(this.route); // {"id": "undefined"}
    this.route.params.subscribe(
      (params: Params) => {
        this.id = Number(params['id']);
        console.log(this.id); // NaN
        this.item = this.gourmetService.getSushi(this.id);
        console.log(this.item); // undefined
      }
    );
  }

  /* CLIENT */
  onAddToCart(itemId: number) {this.added = true}

  onRemoveFromCart(itemId: number) {this.added = true}

  onMarkAsFavorite(itemId: number) {this.favorite = true}

  onUnmark() {this.favorite = false}

  /* CHEF */
  onDeleteItem(itemId: string | undefined) {
    // call storage to send request
  }

  ngOnDestroy() {
    this.user?.unsubscribe();
  }

}
