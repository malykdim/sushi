import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Subject } from 'rxjs';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { GourmetService } from './gourmet.service';
import { IItem } from 'src/app/shared/interfaces/item';

import { environment } from 'src/environments/environment';
const apiURL = environment.apiURL;


@Injectable({ providedIn: 'root' })
export class StorageGourmetService {
  error = new Subject<string>();

  constructor(
    private http: HttpClient,
    private gourmetService: GourmetService,
    private authService: AuthService,
  ) { }

  storeItems() {
    const gourmet = this.gourmetService.getGourmet();

    this.http
      .put(
        ( apiURL + '/gourmet.json' ),
        gourmet
      )
      .subscribe( response => {
        console.log(response);
      });
  }

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
  }
}
