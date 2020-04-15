import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewaystoreTestModule } from '../../../test.module';
import { FacturaDetalleComponent } from 'app/entities/factura-detalle/factura-detalle.component';
import { FacturaDetalleService } from 'app/entities/factura-detalle/factura-detalle.service';
import { FacturaDetalle } from 'app/shared/model/factura-detalle.model';

describe('Component Tests', () => {
  describe('FacturaDetalle Management Component', () => {
    let comp: FacturaDetalleComponent;
    let fixture: ComponentFixture<FacturaDetalleComponent>;
    let service: FacturaDetalleService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaystoreTestModule],
        declarations: [FacturaDetalleComponent]
      })
        .overrideTemplate(FacturaDetalleComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacturaDetalleComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacturaDetalleService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new FacturaDetalle(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.facturaDetalles && comp.facturaDetalles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
