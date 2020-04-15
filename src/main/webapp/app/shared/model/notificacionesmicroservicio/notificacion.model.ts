import { Moment } from 'moment';

export interface INotificacion {
  id?: number;
  fecha?: Moment;
  mensaje?: string;
  fechaSend?: Moment;
  userId?: number;
}

export class Notificacion implements INotificacion {
  constructor(public id?: number, public fecha?: Moment, public mensaje?: string, public fechaSend?: Moment, public userId?: number) {}
}
