import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IStock, Stock } from 'app/shared/model/inventariomicroservicio/stock.model';
import { StockService } from './stock.service';
import { IProducto } from 'app/shared/model/inventariomicroservicio/producto.model';
import { ProductoService } from 'app/entities/inventariomicroservicio/producto/producto.service';

@Component({
  selector: 'jhi-stock-update',
  templateUrl: './stock-update.component.html'
})
export class StockUpdateComponent implements OnInit {
  isSaving = false;
  productos: IProducto[] = [];

  editForm = this.fb.group({
    id: [],
    cantidad: [null, [Validators.required, Validators.min(0)]],
    producto: []
  });

  constructor(
    protected stockService: StockService,
    protected productoService: ProductoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stock }) => {
      this.updateForm(stock);

      this.productoService.query().subscribe((res: HttpResponse<IProducto[]>) => (this.productos = res.body || []));
    });
  }

  updateForm(stock: IStock): void {
    this.editForm.patchValue({
      id: stock.id,
      cantidad: stock.cantidad,
      producto: stock.producto
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stock = this.createFromForm();
    if (stock.id !== undefined) {
      this.subscribeToSaveResponse(this.stockService.update(stock));
    } else {
      this.subscribeToSaveResponse(this.stockService.create(stock));
    }
  }

  private createFromForm(): IStock {
    return {
      ...new Stock(),
      id: this.editForm.get(['id'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      producto: this.editForm.get(['producto'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStock>>): void {
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

  trackById(index: number, item: IProducto): any {
    return item.id;
  }
}
