export interface IUser {
  _id: string;
  email: string;
  hashedPassword: string;
  role: string;

  /*
  userInfo: {
    username: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
  }
  */

  /*
  userOrder: {
    items: [{
      itemName: string;
      itemCount: number;
      itemPrice: number;
    }]
    orderedAt: string;
    paied: boolean;
    delivered: boolean;

  }
  */

  // favorites: IItem[];
  // discount: number;

  // created_at: string;
  // updatedAt: string;
  // __v: number;
}
