import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { GourmetService } from 'src/app/services/gourmet/gourmet.service';
import { Ingredient } from 'src/app/shared/interfaces/ingredient.model';
import { Item } from 'src/app/shared/interfaces/item.model';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {
  id: number = 0;
  editForm!: FormGroup;

  sub: Subscription = new Subscription;
  itemIngredients: Ingredient = {name: '', amount: ''};

  constructor(
    private gourmetService: GourmetService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.initForm();
    });

    this.sub = this.gourmetService.startedEditing.subscribe(
      (index: number) => {
        this.id = index;
        this.itemIngredients = this.gourmetService.getIngredient(index);
      }
    );
  }

  private initForm() {

    let itemName = '';
    let itemImage = '';
    let itemCategory = '';
    let itemTemperature = '';
    let itemPrice = 0;
    let itemIngredients = new FormArray([]);

    const item = this.gourmetService.getSushi(this.id);

    itemName = item.name;
    itemImage = item.image;
    itemCategory = item.category;
    itemTemperature = item.temperature;
    itemPrice = item.price;
    if (item['ingredients']) {
      for (let ing of item.ingredients) {
        itemIngredients.push(
          new FormGroup({
            'name': new FormControl(ing.name, Validators.required),
            'amount': new FormControl(ing.amount, [Validators.required])
          })
        )
      }
    }

    this.editForm = new FormGroup({
      'name': new FormControl(itemName, Validators.required),
      'image': new FormControl(itemImage, Validators.required),
      'category': new FormControl(itemCategory, Validators.required),
      'temperature': new FormControl(itemTemperature, Validators.required),
      'price': new FormControl(itemPrice, [Validators.required, Validators.pattern(/[1-9][0-9]*(?:\/[1-9][0-9])*/g)]),
      'ingredients': itemIngredients
    });
  }

  get controls() { // 9
    return (<FormArray>this.editForm.get('ingredients')).controls;
    // return (this.editForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    // const newIngredient = new Ingredient(ingName, ingAmount);

    // this.gourmetService.addIngredient(newIngredient);

    (<FormArray>this.editForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, Validators.required)
      })
    );
  }

  onEditIngredient(index: number, newIngredient: Ingredient) {
    this.gourmetService.updateIngredient(index, newIngredient);
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.editForm.get('ingredients')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onSubmit() {
    this.gourmetService.editSushi(this.id, this.editForm.value);
    console.log(this.gourmetService.getGourmet());
    this.onCancel();
  }
}
