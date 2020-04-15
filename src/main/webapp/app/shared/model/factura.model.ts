import { Moment } from 'moment';
import { ICliente } from 'app/shared/model/cliente.model';

export interface IFactura {
  id?: number;
  fecha?: Moment;
  valor?: number;
  fachaPago?: Moment;
  clientes?: ICliente[];
}

export class Factura implements IFactura {
  constructor(public id?: number, public fecha?: Moment, public valor?: number, public fachaPago?: Moment, public clientes?: ICliente[]) {}
}
