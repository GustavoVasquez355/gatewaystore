import { IProducto } from 'app/shared/model/inventariomicroservicio/producto.model';

export interface IStock {
  id?: number;
  cantidad?: number;
  producto?: IProducto;
}

export class Stock implements IStock {
  constructor(public id?: number, public cantidad?: number, public producto?: IProducto) {}
}
