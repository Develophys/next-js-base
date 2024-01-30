export interface IProducts {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface IPagedProducts {
  total: number;
  products: IProducts[];
}