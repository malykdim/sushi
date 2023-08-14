import { Ingredient } from "src/app/shared/interfaces/ingredient.model";

export class Data {
  gourmet = [
    {
      name: 'Wakame-Maki',
      image: '/assets/images/wakame-maki.jpg',
      category: 'maki',
      temperature: 'cold',
      price: 3.60,
      ingredients: [
        new Ingredient('rice', '25g'),
        new Ingredient('salmon', '15g'),
        new Ingredient('cheese', '10g'),
        new Ingredient('seaweed', 'roll'),
      ]
    },
    {
        name: 'Zushi-maki',
        image: '/assets/images/zushi-maki.jpg',
        category: 'maki',
        temperature: 'cold',
        price: 3.40,
        ingredients: [
          new Ingredient('rice', '30g'),
          new Ingredient('avocado', '20g'),
          new Ingredient('cheese', '10g'),
          new Ingredient('nori', 'roll'),
        ]
    },
    {
        name: 'Ura-Maki',
        image: '/assets/images/ura-maki.jpg',
        category: 'maki',
        temperature: 'cold',
        price: 4.20,
        ingredients: [
          new Ingredient('rice', '30g'),
          new Ingredient('salmon', '20g'),
          new Ingredient('cheese', '10g'),
          new Ingredient('nori', 'roll'),
        ]
    },
    {
        name: 'Ika-Nigiri',
        image: '/assets/images/ika-nigiri.jpg',
        category: 'nigiri',
        temperature: 'cold',
        price: 3.50,
        ingredients: [
          new Ingredient('rice', '30g'),
          new Ingredient('squid', 'slice 15g'),
        ]
    },
    {
        name: 'Sashimi-Maki',
        image: '/assets/images/sashimi-maki.jpg',
        category: 'maki',
        temperature: 'cold',
        price: 4.60,
        ingredients: [
          new Ingredient('rice', '30g'),
          new Ingredient('yellowtail', '10g'),
          new Ingredient('cucumber', '10g'),
          new Ingredient('nori', 'roll'),
        ]
    },
    {
        name: 'Hamachi-Nigiri',
        image: '/assets/images/hamachi-nigiri.jpg',
        category: 'nigiri',
        temperature: 'cold',
        price: 4.70,
        ingredients: [
          new Ingredient('rice', '30g'),
          new Ingredient('mackerel', '30g'),
          new Ingredient('onion', '5g'),
        ]
    },
    {
        name: 'Ebi-Nigiri',
        image: '/assets/images/ebi-nigiri.jpg',
        category: 'nigiri',
        temperature: 'cold',
        price: 4.80,
        ingredients: [
          new Ingredient('rice', '30g'),
          new Ingredient('shrimp', '30g'),
        ]
    },
    {
        name: 'Tako-Nigiri',
        image: '/assets/images/tako-nigiri.jpg',
        category: 'nigiri',
        temperature: 'cold',
        price: 4.80,
        ingredients: [
          new Ingredient('rice', '30g'),
          new Ingredient('octopus', '30g'),
          new Ingredient('nori', 'roll'),
        ]
    },
    // {
    //     name: 'Hotate-Nigiri',
    //     image: '../../../../assets/images/hotate-nigiri.jpg',
    //     category: 'nigiri',
    //     temperature: 'cold',
    //     price: 3.95,
    //     ingredients: [
    //       new Ingredient('rice', '30g'),
    //       new Ingredient('scallops', '2 pieces'),
    //       new Ingredient('fish eggs', 'some'),
    //     ]
    // },
];
}
