import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCustomersChartComponent } from './top-customers-chart.component';

describe('TopCustomersChartComponent', () => {
  let component: TopCustomersChartComponent;
  let fixture: ComponentFixture<TopCustomersChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopCustomersChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopCustomersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
