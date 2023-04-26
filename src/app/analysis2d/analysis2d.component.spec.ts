import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Analysis2dComponent } from './analysis2d.component';

describe('Analysis2dComponent', () => {
  let component: Analysis2dComponent;
  let fixture: ComponentFixture<Analysis2dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ Analysis2dComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Analysis2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
