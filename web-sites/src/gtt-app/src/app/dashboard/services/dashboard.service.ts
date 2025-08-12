import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartPropertiesResponse } from '../models/chart-properties-response.model';
import { DashboardCounter } from '../models/counter.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly baseUrl = 'https://localhost:44377/api/dashboard';

  constructor(private http: HttpClient) {}

  getCounters(): Observable<DashboardCounter> {
    return this.http.get<DashboardCounter>(`${this.baseUrl}/counters`);
  }

  getNewClientsByLastMonths(
    lastMonths: number
  ): Observable<ChartPropertiesResponse> {
    const params = new HttpParams().set('lastMonths', lastMonths);
    return this.http.get<ChartPropertiesResponse>(
      `${this.baseUrl}/new-clients-by-last-x-months`,
      { params }
    );
  }
}
