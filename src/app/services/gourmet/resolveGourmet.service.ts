import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

import { IItem } from "src/app/shared/interfaces/item";
import { StorageGourmetService } from "./storage-gourmet.service";
import { GourmetService } from "./gourmet.service";

@Injectable({providedIn: 'root'})
export class ResolveGourmetService implements Resolve<IItem[]> {
  constructor(
    private storage: StorageGourmetService,
    private service: GourmetService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): IItem[] | Observable<IItem[]> | Promise<IItem[]> {
    const gourmet = this.service.getGourmet();

    if (gourmet.length === 0) {
      return this.storage.fetchItems();
    } else {
      return gourmet;
    }
  }
}
