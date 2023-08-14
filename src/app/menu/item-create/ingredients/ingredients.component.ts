import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { GourmetService } from 'src/app/services/gourmet/gourmet.service';
import { Ingredient } from '../../../shared/interfaces/ingredient.model';
import { Item } from 'src/app/shared/interfaces/item.model';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit, OnDestroy {
  @Input() item: Item;

  ingredients: Ingredient[] = [];
  private ingsChangedSub: Subscription = new Subscription;

  constructor(private gourmetService: GourmetService) {}

  ngOnInit(): void {
    this.ingredients = this.gourmetService.getIngredients();
    this.ingsChangedSub = this.gourmetService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

  }

  onAddIngredient(ingForm: NgForm) {
    const value = ingForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.gourmetService.addIngredient(newIngredient);
    ingForm.reset();
  }

  onEditIng( index: number, ingForm: NgForm) {
    const value = ingForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    this.gourmetService.startedEditing.next(index);
    this.gourmetService.updateIngredient(index, newIngredient);
  }

  // on button click => emit the changes (push ingredients to array)
  onEmitIngredients(ingForm: NgForm) {
    // emit ingredients array
    // return a copy of the array
    // console.log('local ingredients' + this.ingredients);
    // this.gourmetService.compileIngredients(this.item.ingredients);
    // const fromService = this.gourmetService.getIngredients();
  }

  // onDeleteIngredient(i) {}

  ngOnDestroy(): void {
    this.ingsChangedSub.unsubscribe();
  }
}
