import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFacturaDetalle } from 'app/shared/model/factura-detalle.model';
import { FacturaDetalleService } from './factura-detalle.service';
import { FacturaDetalleDeleteDialogComponent } from './factura-detalle-delete-dialog.component';

@Component({
  selector: 'jhi-factura-detalle',
  templateUrl: './factura-detalle.component.html'
})
export class FacturaDetalleComponent implements OnInit, OnDestroy {
  facturaDetalles?: IFacturaDetalle[];
  eventSubscriber?: Subscription;

  constructor(
    protected facturaDetalleService: FacturaDetalleService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.facturaDetalleService.query().subscribe((res: HttpResponse<IFacturaDetalle[]>) => (this.facturaDetalles = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFacturaDetalles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFacturaDetalle): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFacturaDetalles(): void {
    this.eventSubscriber = this.eventManager.subscribe('facturaDetalleListModification', () => this.loadAll());
  }

  delete(facturaDetalle: IFacturaDetalle): void {
    const modalRef = this.modalService.open(FacturaDetalleDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.facturaDetalle = facturaDetalle;
  }
}
