import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersStatusChartComponent } from './orders-status-chart.component';

describe('OrdersStatusChartComponent', () => {
  let component: OrdersStatusChartComponent;
  let fixture: ComponentFixture<OrdersStatusChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersStatusChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersStatusChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
