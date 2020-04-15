import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUsuario } from 'app/shared/model/usuario.model';
import { UsuarioService } from './usuario.service';
import { UsuarioDeleteDialogComponent } from './usuario-delete-dialog.component';

@Component({
  selector: 'jhi-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit, OnDestroy {
  usuarios?: IUsuario[];
  eventSubscriber?: Subscription;

  constructor(protected usuarioService: UsuarioService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.usuarioService.query().subscribe((res: HttpResponse<IUsuario[]>) => (this.usuarios = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInUsuarios();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IUsuario): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInUsuarios(): void {
    this.eventSubscriber = this.eventManager.subscribe('usuarioListModification', () => this.loadAll());
  }

  delete(usuario: IUsuario): void {
    const modalRef = this.modalService.open(UsuarioDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.usuario = usuario;
  }
}
