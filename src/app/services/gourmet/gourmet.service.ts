import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IItem } from 'src/app/shared/interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class GourmetService {
  private gourmet: IItem[] = [];
  gourmetChanged = new Subject<IItem[]>();
  itemSelected = new Subject<IItem[]>();

  error = new Subject<string>();

  constructor(  ) { }

  setGourmet(sushies: IItem[]) {
    // overwrite the gourmet with the DB data
    this.gourmet = sushies;
    this.reloadGourmet();
  }

  getGourmet() {
    return this.gourmet.slice();
  }

  getSushi(id: number) {
    return this.gourmet[id];
  }

  addSushi(item: IItem) {
    this.gourmet.push(item);
    this.reloadGourmet();
  }

  editSushi(id: any, newItem: IItem) {
    this.gourmet[id] = newItem;
    this.reloadGourmet();
  }

  removeSushi(id: any) {
    this.gourmet.splice(id, 1);
    this.reloadGourmet();
  }

  private reloadGourmet() {
    this.gourmetChanged.next(this.gourmet.slice());
  }
}
