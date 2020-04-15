import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { INotificacion } from 'app/shared/model/notificacionesmicroservicio/notificacion.model';
import { NotificacionService } from './notificacion.service';

@Component({
  templateUrl: './notificacion-delete-dialog.component.html'
})
export class NotificacionDeleteDialogComponent {
  notificacion?: INotificacion;

  constructor(
    protected notificacionService: NotificacionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.notificacionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('notificacionListModification');
      this.activeModal.close();
    });
  }
}
