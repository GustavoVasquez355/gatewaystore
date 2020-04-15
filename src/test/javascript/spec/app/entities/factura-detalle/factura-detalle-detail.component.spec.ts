import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaystoreTestModule } from '../../../test.module';
import { FacturaDetalleDetailComponent } from 'app/entities/factura-detalle/factura-detalle-detail.component';
import { FacturaDetalle } from 'app/shared/model/factura-detalle.model';

describe('Component Tests', () => {
  describe('FacturaDetalle Management Detail Component', () => {
    let comp: FacturaDetalleDetailComponent;
    let fixture: ComponentFixture<FacturaDetalleDetailComponent>;
    const route = ({ data: of({ facturaDetalle: new FacturaDetalle(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaystoreTestModule],
        declarations: [FacturaDetalleDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(FacturaDetalleDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(FacturaDetalleDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load facturaDetalle on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.facturaDetalle).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
