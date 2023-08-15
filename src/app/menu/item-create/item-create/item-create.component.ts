import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { GourmetService } from 'src/app/services/gourmet/gourmet.service';
import { Ingredient } from '../../../shared/interfaces/ingredient.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-create',
  templateUrl: './item-create.component.html',
  styleUrls: ['./item-create.component.scss']
})
export class ItemCreateComponent implements OnInit {
  @ViewChild('createForm') createForm: NgForm;
  ingredients = [];
  ingredientsSub: Subscription;
  isCreateMode = true;
  defaultCategroy = 'other'; // prepopulate any input with [ngModel]="prop"
  tempRadio = ['hot', 'cold'];
  // ingredients = ['rice', 'fish', 'berries', 'cucumber'];
  // ingredients: [
  //   new Ingredient('rice', '20g'),
  //   new Ingredient('fish', '1 piece'),
  //   new Ingredient('fish eggs','5')
  // ];

  constructor(
    private gourmetService: GourmetService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // this.ingredients = this.gourmetService.getIngredients();
    this.ingredientsSub = this.gourmetService.ingredientsChanged.subscribe(
      ingredients => {
        this.ingredients = ingredients;
      }
    );
  }

  onCancel() {
    this.createForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onSubmit(form: NgForm) {
    let ingredients = this.ingredients;
    const item = {
      ...form.value,
      ingredients
    }
    this.gourmetService.addSushi(item);
    this.createForm.reset();
    console.log(this.gourmetService.getGourmet());
    this.router.navigate(['/menu']);
  }

  ngOnDestroy() {
    this.ingredientsSub.unsubscribe();
  }
}
