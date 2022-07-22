import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnoutChartComponent } from './doughnout-chart.component';

describe('DoughnoutChartComponent', () => {
  let component: DoughnoutChartComponent;
  let fixture: ComponentFixture<DoughnoutChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoughnoutChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnoutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
