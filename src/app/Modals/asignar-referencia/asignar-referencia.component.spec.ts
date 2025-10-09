import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarReferenciaComponent } from './asignar-referencia.component';

describe('AsignarReferenciaComponent', () => {
  let component: AsignarReferenciaComponent;
  let fixture: ComponentFixture<AsignarReferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignarReferenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
