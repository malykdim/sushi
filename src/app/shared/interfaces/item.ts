import { IUser } from './user';

export interface IItem {
  id?: string;
  name: string;
  image: string;
  category: string;
  ingredients: string[];
  temperature: string;
  price: number;
  // _chefId?: IUser;
  // __v?: number;
}
