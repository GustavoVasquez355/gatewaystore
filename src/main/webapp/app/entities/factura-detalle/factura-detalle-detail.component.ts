import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFacturaDetalle } from 'app/shared/model/factura-detalle.model';

@Component({
  selector: 'jhi-factura-detalle-detail',
  templateUrl: './factura-detalle-detail.component.html'
})
export class FacturaDetalleDetailComponent implements OnInit {
  facturaDetalle: IFacturaDetalle | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facturaDetalle }) => (this.facturaDetalle = facturaDetalle));
  }

  previousState(): void {
    window.history.back();
  }
}
