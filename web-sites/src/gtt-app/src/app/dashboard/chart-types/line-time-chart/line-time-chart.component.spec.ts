import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineTimeChartComponent } from './line-time-chart.component';

describe('LineTimeChartComponent', () => {
  let component: LineTimeChartComponent;
  let fixture: ComponentFixture<LineTimeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineTimeChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineTimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
