import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { INotificacion, Notificacion } from 'app/shared/model/notificacionesmicroservicio/notificacion.model';
import { NotificacionService } from './notificacion.service';
import { NotificacionComponent } from './notificacion.component';
import { NotificacionDetailComponent } from './notificacion-detail.component';
import { NotificacionUpdateComponent } from './notificacion-update.component';

@Injectable({ providedIn: 'root' })
export class NotificacionResolve implements Resolve<INotificacion> {
  constructor(private service: NotificacionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INotificacion> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((notificacion: HttpResponse<Notificacion>) => {
          if (notificacion.body) {
            return of(notificacion.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Notificacion());
  }
}

export const notificacionRoute: Routes = [
  {
    path: '',
    component: NotificacionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaystoreApp.notificacionesmicroservicioNotificacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: NotificacionDetailComponent,
    resolve: {
      notificacion: NotificacionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaystoreApp.notificacionesmicroservicioNotificacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: NotificacionUpdateComponent,
    resolve: {
      notificacion: NotificacionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaystoreApp.notificacionesmicroservicioNotificacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: NotificacionUpdateComponent,
    resolve: {
      notificacion: NotificacionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'gatewaystoreApp.notificacionesmicroservicioNotificacion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
