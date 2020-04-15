import { IUser } from 'app/core/user/user.model';

export interface IUsuario {
  id?: number;
  nombre?: string;
  apellido?: string;
  direccion?: string;
  user?: IUser;
}

export class Usuario implements IUsuario {
  constructor(public id?: number, public nombre?: string, public apellido?: string, public direccion?: string, public user?: IUser) {}
}
