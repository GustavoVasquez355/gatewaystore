import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewaystoreTestModule } from '../../../test.module';
import { FacturaComponent } from 'app/entities/factura/factura.component';
import { FacturaService } from 'app/entities/factura/factura.service';
import { Factura } from 'app/shared/model/factura.model';

describe('Component Tests', () => {
  describe('Factura Management Component', () => {
    let comp: FacturaComponent;
    let fixture: ComponentFixture<FacturaComponent>;
    let service: FacturaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaystoreTestModule],
        declarations: [FacturaComponent]
      })
        .overrideTemplate(FacturaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(FacturaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(FacturaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Factura(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.facturas && comp.facturas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
