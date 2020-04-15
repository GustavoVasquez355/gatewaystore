import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { INotificacion, Notificacion } from 'app/shared/model/notificacionesmicroservicio/notificacion.model';
import { NotificacionService } from './notificacion.service';

@Component({
  selector: 'jhi-notificacion-update',
  templateUrl: './notificacion-update.component.html'
})
export class NotificacionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    fecha: [null, [Validators.required]],
    mensaje: [],
    fechaSend: [null, [Validators.required]],
    userId: []
  });

  constructor(protected notificacionService: NotificacionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ notificacion }) => {
      if (!notificacion.id) {
        const today = moment().startOf('day');
        notificacion.fecha = today;
        notificacion.fechaSend = today;
      }

      this.updateForm(notificacion);
    });
  }

  updateForm(notificacion: INotificacion): void {
    this.editForm.patchValue({
      id: notificacion.id,
      fecha: notificacion.fecha ? notificacion.fecha.format(DATE_TIME_FORMAT) : null,
      mensaje: notificacion.mensaje,
      fechaSend: notificacion.fechaSend ? notificacion.fechaSend.format(DATE_TIME_FORMAT) : null,
      userId: notificacion.userId
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const notificacion = this.createFromForm();
    if (notificacion.id !== undefined) {
      this.subscribeToSaveResponse(this.notificacionService.update(notificacion));
    } else {
      this.subscribeToSaveResponse(this.notificacionService.create(notificacion));
    }
  }

  private createFromForm(): INotificacion {
    return {
      ...new Notificacion(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? moment(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      mensaje: this.editForm.get(['mensaje'])!.value,
      fechaSend: this.editForm.get(['fechaSend'])!.value ? moment(this.editForm.get(['fechaSend'])!.value, DATE_TIME_FORMAT) : undefined,
      userId: this.editForm.get(['userId'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<INotificacion>>): void {
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
