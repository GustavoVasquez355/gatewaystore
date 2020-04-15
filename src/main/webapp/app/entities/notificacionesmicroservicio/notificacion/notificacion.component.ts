import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { INotificacion } from 'app/shared/model/notificacionesmicroservicio/notificacion.model';
import { NotificacionService } from './notificacion.service';
import { NotificacionDeleteDialogComponent } from './notificacion-delete-dialog.component';

@Component({
  selector: 'jhi-notificacion',
  templateUrl: './notificacion.component.html'
})
export class NotificacionComponent implements OnInit, OnDestroy {
  notificacions?: INotificacion[];
  eventSubscriber?: Subscription;

  constructor(
    protected notificacionService: NotificacionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.notificacionService.query().subscribe((res: HttpResponse<INotificacion[]>) => (this.notificacions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInNotificacions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: INotificacion): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInNotificacions(): void {
    this.eventSubscriber = this.eventManager.subscribe('notificacionListModification', () => this.loadAll());
  }

  delete(notificacion: INotificacion): void {
    const modalRef = this.modalService.open(NotificacionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.notificacion = notificacion;
  }
}
