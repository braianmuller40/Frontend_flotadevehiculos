import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoAutoComponent } from './nuevo-auto.component';

describe('NuevoAutoComponent', () => {
  let component: NuevoAutoComponent;
  let fixture: ComponentFixture<NuevoAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoAutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
