import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageDeliveryTimeChartComponent } from './average-delivery-time-chart.component';

describe('AverageDeliveryTimeChartComponent', () => {
  let component: AverageDeliveryTimeChartComponent;
  let fixture: ComponentFixture<AverageDeliveryTimeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageDeliveryTimeChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AverageDeliveryTimeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
