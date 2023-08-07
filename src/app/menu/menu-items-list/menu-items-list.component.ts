import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { GourmetService } from 'src/app/services/gourmet/gourmet.service';
import { StorageGourmetService } from 'src/app/services/gourmet/storage-gourmet.service';

import { IItem } from 'src/app/shared/interfaces/item';

@Component({
  selector: 'app-menu-items-list',
  templateUrl: './menu-items-list.component.html',
  styleUrls: ['./menu-items-list.component.scss']
})
export class MenuItemsListComponent implements OnInit, OnDestroy {
  @Input() id: number = 0;
  gourmet: IItem[] = [];
  private gourmetChangedSubscription: Subscription = new Subscription;
  selected: any = {};


  constructor(
    private gourmetService: GourmetService,
    private storage: StorageGourmetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.gourmetChangedSubscription = this.gourmetService.gourmetChanged.subscribe(
      (items: IItem[]) => {
        this.gourmet = items;
      }
    )
    this.storage.fetchItems().subscribe();
    this.loadGourmet();
  }

  loadGourmet() {
    this.gourmet = this.gourmetService.getGourmet();
    this.gourmetChangedSubscription = this.gourmetService.gourmetChanged
      .subscribe(
        (items: IItem[]) => {
          this.gourmet = items;
        }
      );
  }

  onItemSelected() {
    // identify the item
    console.log(this.id);
  }

  ngOnDestroy() {
    this.gourmetChangedSubscription.unsubscribe();
  }
}
