import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from 'rxjs';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { GourmetService } from './gourmet.service';
import { IItem } from 'src/app/shared/interfaces/item';
import { Data } from 'src/assets/gourmet-data-backup';

import { environment } from 'src/environments/environment';
const apiURL = environment.apiURL;


@Injectable({ providedIn: 'root' })
export class StorageGourmetService {
  error = new Subject<string>();

  constructor(
    private http: HttpClient,
    private gourmetService: GourmetService,
    private authService: AuthService,
    private backupData: Data
  ) { }

  // used in Landing OnInit
  storeItems() {
    // add a click listener in the component in which you want to use this method
    // (to override all the items in the gourmet array on the BE)
    const gourmet = this.backupData.gourmet;

    this.http
      .put(
        ( apiURL + '/gourmet.json' ),
        gourmet
      )
      .subscribe( response => {
        console.log(response);
      });
  }

  // used in Landing,
  fetchItems() {

    return this.http
        .get<IItem[]>(
          (apiURL + '/gourmet.json')
        )
        .pipe(
          map(items => {
            return items.map(item => {
              return {
                ...item,
                ingredients: item.ingredients ? item.ingredients : []
              };
            })
          }),
          tap(items => {
            this.gourmetService.setGourmet(items);
          })
        );

      // .subscribe(items => {
      //   // forward the received DB data to gourmetService
      //   this.gourmetService.setGourmet(items);
      // })
  }

  // Chef CRUD
  addItem(item: IItem) {
    return this.http.post(
        (apiURL + '/gourmet.json' ),
        item
    );
  }

  delItem(itemId: string) {
    // return this.http.delete(itemId);
  }
}
