import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewaystoreTestModule } from '../../../../test.module';
import { ProductoDetailComponent } from 'app/entities/inventariomicroservicio/producto/producto-detail.component';
import { Producto } from 'app/shared/model/inventariomicroservicio/producto.model';

describe('Component Tests', () => {
  describe('Producto Management Detail Component', () => {
    let comp: ProductoDetailComponent;
    let fixture: ComponentFixture<ProductoDetailComponent>;
    const route = ({ data: of({ producto: new Producto(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewaystoreTestModule],
        declarations: [ProductoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load producto on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.producto).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
