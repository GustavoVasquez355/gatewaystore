import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFacturaDetalle } from 'app/shared/model/factura-detalle.model';
import { FacturaDetalleService } from './factura-detalle.service';

@Component({
  templateUrl: './factura-detalle-delete-dialog.component.html'
})
export class FacturaDetalleDeleteDialogComponent {
  facturaDetalle?: IFacturaDetalle;

  constructor(
    protected facturaDetalleService: FacturaDetalleService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.facturaDetalleService.delete(id).subscribe(() => {
      this.eventManager.broadcast('facturaDetalleListModification');
      this.activeModal.close();
    });
  }
}
