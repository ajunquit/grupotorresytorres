import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashboardCounter } from '../models/counter.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly baseUrl = 'https://localhost:44377/api/dashboard';

  constructor(private http: HttpClient) {}

  getCounters(): Observable<DashboardCounter> {
    return this.http.get<DashboardCounter>(`${this.baseUrl}/counters`);
  }
}
