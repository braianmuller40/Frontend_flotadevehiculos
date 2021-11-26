import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAutoComponent } from './info-auto.component';

describe('InfoAutoComponent', () => {
  let component: InfoAutoComponent;
  let fixture: ComponentFixture<InfoAutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAutoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
