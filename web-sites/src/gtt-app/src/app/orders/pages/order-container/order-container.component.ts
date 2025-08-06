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

    console.log(order);
    if (this.isNewOrder) {
      //this.handleCreateOrder(customer);
    } else if (order.id) {
      //this.handleUpdateCustomer(customer);
    }
  }

  public handleEditAction(order: Order) {
    this.isNewOrder = false;
    this.currentOrder = order;
    this.showModal(true);
  }

  private emptyOrder(): Order {
    return {
      id: '',
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
