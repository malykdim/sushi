import { IUser } from './user';
import { Item } from './item.model';
import { Ingredient } from './ingredient.model';

export interface IItem {
  name: string;
  image: string;
  category: string;
  temperature: string;
  price: number;
  ingredients?: Ingredient[];
  id?: string;
  // _chefId?: IUser;
  // __v?: number;
}
