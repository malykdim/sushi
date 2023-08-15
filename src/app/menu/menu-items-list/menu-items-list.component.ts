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
  gourmet: IItem[] = [];
  private gourmetChangedSubscription: Subscription = new Subscription;

  @Input() id: number = 0;

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
      });
      this.gourmet = this.gourmetService.getGourmet(); //
      // this.storage.fetchItems().subscribe();
      this.loadGourmet();
    }

    loadGourmet() {
      this.gourmet = this.gourmetService.getGourmet();
      this.gourmetChangedSubscription = this.gourmetService.gourmetChanged
      .subscribe(
        (items: IItem[]) => {
          this.gourmet = items;
          console.log(this.gourmet);
        }
      );
  }

  ngOnDestroy() {
    this.gourmetChangedSubscription.unsubscribe();
  }
}
