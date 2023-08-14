import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IItem } from 'src/app/shared/interfaces/item';
import { Ingredient } from 'src/app/shared/interfaces/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class GourmetService {
  private gourmet: IItem[] = [];
  gourmetChanged = new Subject<IItem[]>();

  private ingredients: Ingredient[] = [];
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  error = new Subject<string>();

  constructor(  ) { }

  /* GOURMET */
  setGourmet(sushies: IItem[]) {
    // overwrite the gourmet with the DB data
    this.gourmet = sushies;
    this.reloadGourmet();
  }

  getGourmet() {
    return this.gourmet.slice();
  }

  private reloadGourmet() {
    this.gourmetChanged.next(this.gourmet.slice());
    console.log(this.gourmet);
  }

  /* SINGLE ITEM */
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

  /* INGREDIENTS */
  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ing: Ingredient) {
    this.ingredients.push(ing);
    this.emitIngredients();
  }

  updateIngredient(index: number, newIng: Ingredient) {
    this.ingredients[index] = newIng;
    this.emitIngredients();
  }

  compileIngredients(ingArr: Ingredient[]) {
    this.ingredients.push(...ingArr);
    this.emitIngredients();
  }

  private emitIngredients() {
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /* CLIENT (outsource to dedicated service) */
  addToCart() {
    //  TODO
  }
}
