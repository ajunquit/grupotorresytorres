import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss',
})
export class DashboardCardComponent {
  @Input() label!: string;
  @Input() value!: number;
  @Input() icon!: string;
}
