import { IFactura } from 'app/shared/model/factura.model';

export interface ICliente {
  id?: number;
  nombre?: string;
  apellido?: string;
  identificacion?: string;
  factura?: IFactura;
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public nombre?: string,
    public apellido?: string,
    public identificacion?: string,
    public factura?: IFactura
  ) {}
}
