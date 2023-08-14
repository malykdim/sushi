import { Ingredient } from "./ingredient.model";

export class Item {
  constructor(
    public name: string,
    public image: string,
    public category: string,
    public temperature: string,
    public price: number,
    public ingredients?: Ingredient[],
    public id?: string,
  ) {}
}
