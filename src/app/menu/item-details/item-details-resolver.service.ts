import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError } from "rxjs";

import { StorageGourmetService } from "src/app/services/gourmet/storage-gourmet.service";
import { GourmetService } from "src/app/services/gourmet/gourmet.service";
import { IItem } from "src/app/shared/interfaces/item";

@Injectable({ providedIn: 'root' })
export class ItemDetailsResolverService implements Resolve<IItem[]> {

  constructor(
    private storageGourmet: StorageGourmetService,
    private gourmetService: GourmetService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IItem[]> | Promise<IItem[]> | IItem[] {
    const gourmet = this.gourmetService.getGourmet();
    if (gourmet.length === 0) {
      return this.storageGourmet.fetchItems();
    } else {
      return gourmet;
    }
  }
}
