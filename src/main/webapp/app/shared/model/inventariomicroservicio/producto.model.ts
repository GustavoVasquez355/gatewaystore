export interface IProducto {
  id?: number;
  nombre?: string;
  precio?: number;
}

export class Producto implements IProducto {
  constructor(public id?: number, public nombre?: string, public precio?: number) {}
}
