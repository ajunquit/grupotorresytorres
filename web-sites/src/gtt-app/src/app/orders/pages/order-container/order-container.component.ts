import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderStatus } from '../../../core/enums/order-status.enum';
import { ModalAction } from '../../../shared/enums/modal-action.enum';
import { OrderFormComponent } from '../../components/order-form/order-form.component';
import { OrderListComponent } from '../../components/order-list/order-list.component';
import { MOCK_ORDERS } from '../../models/order-data-mock';
import { Order } from '../../models/order.model';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-container',
  standalone: true,
  imports: [
    OrderListComponent,
    OrderFormComponent,
    ModalComponent,
    HttpClientModule,
  ],
  templateUrl: './order-container.component.html',
  styleUrl: './order-container.component.scss',
})
export class OrderContainerComponent implements OnInit {
  @ViewChild(OrderFormComponent)
  orderFormComponent!: OrderFormComponent;

  public title: string = 'Gestión de Ordenes';
  public isModalOpen: boolean = false;
  public isNewOrder: boolean = false;
  public currentOrder: Order = this.emptyOrder();
  public orders!: Order[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.internalInit();
  }

  private internalInit(): void {
    this.loadOrders();
  }

  private loadOrders() {
    this.orderService.getAll().subscribe({
      next: (data) => (this.orders = data),
      error: (err) => console.error('Error al cargar ordenes', err),
    });
  }

  private getOrders(): Order[] {
    return MOCK_ORDERS || [];
  }

  public onNewOrder(): void {
    this.currentOrder = this.emptyOrder();
    this.showModal(true);
    this.isNewOrder = true;
  }

  public handleModalAction(modalAction: ModalAction): void {
    if (modalAction === ModalAction.Save) {
      this.submitForm();
    }
    if (modalAction === ModalAction.Cancel) {
      this.showModal(false);
    }
  }

  private submitForm(): void {
    this.orderFormComponent.onSubmit();
  }

  public handleSaveAction(order: Order): void {
    if (!order) return;

    if (this.isNewOrder) {
      this.handleCreateOrder(order);
    } else if (order.id) {
      this.handleUpdateOrder(order);
    }

    this.showModal(false);
  }

  private handleCreateOrder(customer: Order): void {
    this.orderService.create(customer).subscribe({
      next: () => this.onCustomerActionSuccess(true),
      error: (err) => this.handleError(err, 'create'),
    });
  }

  private handleUpdateOrder(customer: Order): void {
    if (!customer.id) return;

    this.orderService.update(customer.id, customer).subscribe({
      next: () => this.onCustomerActionSuccess(false),
      error: (err) => this.handleError(err, 'update'),
    });
  }

  private onCustomerActionSuccess(isNew: boolean): void {
    this.loadOrders();
    if (isNew) {
      this.resetOrderForm();
    }
  }

  private resetOrderForm(): void {
    this.showModal(false);
    this.currentOrder = this.emptyOrder();
  }

  private handleError(error: any, action: string): void {
    console.error(`Error al ${action} cliente`, error);
  }

  public handleEditAction(order: Order) {
    this.isNewOrder = false;
    this.currentOrder = order;
    this.showModal(true);
  }

  public handleDeleteAction(order: Order) {
    this.orderService.delete(order.id).subscribe({
      next: () => this.loadOrders(),
      error: (err) => this.handleError(err, 'Delete'),
    });
  }

  private emptyOrder(): Order {
    return {
      id: '00000000-0000-0000-0000-000000000000',
      customerId: '',
      orderDate: new Date(),
      orderNumber: '',
      status: OrderStatus.Pendiente,
      totalAmount: 0,
    };
  }

  private showModal(flag: boolean) {
    this.isModalOpen = flag;
  }
}
