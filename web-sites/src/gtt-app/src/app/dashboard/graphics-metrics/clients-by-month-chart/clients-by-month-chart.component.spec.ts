import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsByMonthChartComponent } from './clients-by-month-chart.component';

describe('ClientsByMonthChartComponent', () => {
  let component: ClientsByMonthChartComponent;
  let fixture: ComponentFixture<ClientsByMonthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsByMonthChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientsByMonthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
