import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAgendamientoComponent } from './nuevo-agendamiento.component';

describe('NuevoAgendamientoComponent', () => {
  let component: NuevoAgendamientoComponent;
  let fixture: ComponentFixture<NuevoAgendamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoAgendamientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAgendamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
