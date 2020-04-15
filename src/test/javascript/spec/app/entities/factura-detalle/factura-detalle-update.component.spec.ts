import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewaystoreTestModule } from '../../../test.module';
import { FacturaDetalleUpdateComponent } from 'app/entities/factura-detalle/factura-detalle-update.component';
import { FacturaDetalleService } from 'app/entities/factura-detalle/factura-detalle.service';
import { FacturaDetalle } from 'app/shared/model/factura-detalle.model';

describe('Component Tests', () => {
  describe('FacturaDetalle Management Update Component', () => {
    let comp: FacturaDetalleUpdateComponent;
    let fixture: ComponentFixture<FacturaDetalleUpdateComponent>;
    let service: FacturaDetalleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaystoreTestModule],
        declarations: [FacturaDetalleUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(FacturaDetalleUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacturaDetalleUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacturaDetalleService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new FacturaDetalle(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new FacturaDetalle();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
