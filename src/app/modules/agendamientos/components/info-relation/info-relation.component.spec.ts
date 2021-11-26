import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRelationComponent } from './info-relation.component';

describe('InfoRelationComponent', () => {
  let component: InfoRelationComponent;
  let fixture: ComponentFixture<InfoRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoRelationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
