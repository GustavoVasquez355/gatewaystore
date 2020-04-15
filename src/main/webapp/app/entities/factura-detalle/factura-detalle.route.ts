import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFacturaDetalle, FacturaDetalle } from 'app/shared/model/factura-detalle.model';
import { FacturaDetalleService } from './factura-detalle.service';
import { FacturaDetalleComponent } from './factura-detalle.component';
import { FacturaDetalleDetailComponent } from './factura-detalle-detail.component';
import { FacturaDetalleUpdateComponent } from './factura-detalle-update.component';

@Injectable({ providedIn: 'root' })
export class FacturaDetalleResolve implements Resolve<IFacturaDetalle> {
  constructor(private service: FacturaDetalleService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFacturaDetalle> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((facturaDetalle: HttpResponse<FacturaDetalle>) => {
          if (facturaDetalle.body) {
            return of(facturaDetalle.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FacturaDetalle());
  }
}

export const facturaDetalleRoute: Routes = [
  {
    path: '',
    component: FacturaDetalleComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaystoreApp.facturaDetalle.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FacturaDetalleDetailComponent,
    resolve: {
      facturaDetalle: FacturaDetalleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaystoreApp.facturaDetalle.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FacturaDetalleUpdateComponent,
    resolve: {
      facturaDetalle: FacturaDetalleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaystoreApp.facturaDetalle.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FacturaDetalleUpdateComponent,
    resolve: {
      facturaDetalle: FacturaDetalleResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaystoreApp.facturaDetalle.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
