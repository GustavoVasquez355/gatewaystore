import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFacturaDetalle, FacturaDetalle } from 'app/shared/model/factura-detalle.model';
import { FacturaDetalleService } from './factura-detalle.service';

@Component({
  selector: 'jhi-factura-detalle-update',
  templateUrl: './factura-detalle-update.component.html'
})
export class FacturaDetalleUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    productoId: [],
    cantidad: [],
    precioUnictario: []
  });

  constructor(protected facturaDetalleService: FacturaDetalleService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ facturaDetalle }) => {
      this.updateForm(facturaDetalle);
    });
  }

  updateForm(facturaDetalle: IFacturaDetalle): void {
    this.editForm.patchValue({
      id: facturaDetalle.id,
      productoId: facturaDetalle.productoId,
      cantidad: facturaDetalle.cantidad,
      precioUnictario: facturaDetalle.precioUnictario
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const facturaDetalle = this.createFromForm();
    if (facturaDetalle.id !== undefined) {
      this.subscribeToSaveResponse(this.facturaDetalleService.update(facturaDetalle));
    } else {
      this.subscribeToSaveResponse(this.facturaDetalleService.create(facturaDetalle));
    }
  }

  private createFromForm(): IFacturaDetalle {
    return {
      ...new FacturaDetalle(),
      id: this.editForm.get(['id'])!.value,
      productoId: this.editForm.get(['productoId'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      precioUnictario: this.editForm.get(['precioUnictario'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacturaDetalle>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
