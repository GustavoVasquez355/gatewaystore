import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFacturaDetalle } from 'app/shared/model/factura-detalle.model';

type EntityResponseType = HttpResponse<IFacturaDetalle>;
type EntityArrayResponseType = HttpResponse<IFacturaDetalle[]>;

@Injectable({ providedIn: 'root' })
export class FacturaDetalleService {
  public resourceUrl = SERVER_API_URL + 'api/factura-detalles';

  constructor(protected http: HttpClient) {}

  create(facturaDetalle: IFacturaDetalle): Observable<EntityResponseType> {
    return this.http.post<IFacturaDetalle>(this.resourceUrl, facturaDetalle, { observe: 'response' });
  }

  update(facturaDetalle: IFacturaDetalle): Observable<EntityResponseType> {
    return this.http.put<IFacturaDetalle>(this.resourceUrl, facturaDetalle, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFacturaDetalle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFacturaDetalle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
