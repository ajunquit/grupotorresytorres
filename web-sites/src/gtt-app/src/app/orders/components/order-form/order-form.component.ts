import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Order } from '../../models/order.model';
import { Customer } from '../../../customers/models/customer.model';
import { MOCK_CUSTOMERS } from '../../../customers/models/customer-data-mock';
import { MOCK_ORDER_STATUS_OPTIONS } from '../../models/order-data-mock';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.scss',
})
export class OrderFormComponent {
  public title: string = 'Nuevo Pedido';
  public orderForm!: FormGroup;
  public orderStatusOptions = MOCK_ORDER_STATUS_OPTIONS;
  public customers: Customer[] = MOCK_CUSTOMERS;

  @Input()
  public order!: Order;

  @Output()
  public formSubmit = new EventEmitter<Order>();

  constructor(protected formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.internalInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order'] && !changes['order'].firstChange) {
      this.prepareForm();
    }
  }

  public onSubmit(): void {
    if (this.orderForm.valid) {
      this.formSubmit.emit(this.orderForm.value);
    } else {
      this.orderForm.markAllAsTouched();
    }
  }

  private internalInit(): void {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.orderForm = this.formBuilder.group({
      id: [this.order.id || ''],
      orderNumber: [this.order.orderNumber || '', Validators.required],
      customerId: [this.order.customerId || '', Validators.required],
      customerName: [this.order.customerName || ''],
      orderDate: [this.order.orderDate || ''],
      deliveryDate: [this.order.deliveryDate || ''],
      totalAmount: [this.order.totalAmount || ''],
      status: [this.order.status || ''],
      notes: [this.order.orderDate || ''],
    });
  }
}
