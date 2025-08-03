import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Order } from '../../models/order.model';
import { OrderConfig } from '../../models/order-config.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  @Input()
  orders!: Order[];

  @Output()
  editAction = new EventEmitter<Order>();

  public config: OrderConfig = {
    title: 'Pedidos',
  };

  onEditOrder(order: Order): void {
    this.editOrder(order);
  }

  onDeleteOrder(order: Order) {
    this.orders = this.orders.filter((c) => c !== order);
  }

  private editOrder(order: Order): void {
    this.editAction.emit(order);
  }
}
