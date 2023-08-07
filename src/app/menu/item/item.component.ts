import { Component, Input } from '@angular/core';

import { IItem } from 'src/app/shared/interfaces/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input('singleItem') item!: IItem;
  @Input() index: number = 0;

}
