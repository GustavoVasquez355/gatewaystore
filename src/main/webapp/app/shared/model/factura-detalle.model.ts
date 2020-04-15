export interface IFacturaDetalle {
  id?: number;
  productoId?: number;
  cantidad?: number;
  precioUnictario?: number;
}

export class FacturaDetalle implements IFacturaDetalle {
  constructor(public id?: number, public productoId?: number, public cantidad?: number, public precioUnictario?: number) {}
}
