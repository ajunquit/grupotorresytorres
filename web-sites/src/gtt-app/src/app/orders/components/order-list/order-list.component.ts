import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Order } from '../../models/order.model';
import { OrderConfig } from '../../models/order-config.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent implements OnInit, OnDestroy {
  @Input()
  orders!: Order[];

  @Output()
  editAction = new EventEmitter<Order>();

  public config: OrderConfig = {
    title: 'Pedidos',
  };

  public searchControl: FormControl = new FormControl('');
  public filteredOrders: Order[] = [];

  private subscription?: Subscription;

  ngOnInit(): void {
    this.internalInit();
  }

  // mata la subscription
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public internalInit(): void {
    this.setupEvents();
    this.filteredOrders = this.orders;
  }

  public setupEvents(): void {
    this.listenInput();
  }

  public listenInput(): void {
    this.subscription = this.searchControl.valueChanges.subscribe((value) => {
      this.applyFilter(value || '');
    });
  }

  public applyFilter(value: string): void {
    const text = value.toLowerCase().trim();

    this.filteredOrders = this.orders.filter((order) => {
      const orderNumber = order.orderNumber?.toString() ?? '';
      const customer = order.customerName?.toLowerCase() ?? '';
      const date = new Date(order.orderDate).toISOString().split('T')[0];
      const status = order.status?.toLowerCase() ?? '';

      return (
        orderNumber.includes(text) ||
        customer.includes(text) ||
        date.includes(text) ||
        status.includes(text)
      );
    });
  }

  public onEditOrder(order: Order): void {
    this.editOrder(order);
  }

  public onDeleteOrder(order: Order) {
    this.orders = this.orders.filter((c) => c !== order);
  }

  private editOrder(order: Order): void {
    this.editAction.emit(order);
  }
}
