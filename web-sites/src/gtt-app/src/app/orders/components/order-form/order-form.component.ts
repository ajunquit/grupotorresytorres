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
import { MOCK_ORDER_STATUS_OPTIONS } from '../../models/order-data-mock';
import { CustomerService } from '../../../customers/services/customer.service';

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
  public customers: Customer[] = [];

  @Input()
  public order!: Order;

  @Output()
  public formSubmit = new EventEmitter<Order>();

  constructor(
    protected formBuilder: FormBuilder,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.internalInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order'] && !changes['order'].firstChange) {
      this.prepareForm();
      this.patchForm(this.order);
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
    this.loadCustomers();
  }

  private loadCustomers() {
    this.customerService.getAll().subscribe({
      next: (data) => (this.customers = data),
      error: (err) => console.error('Error al cargar clientes', err),
    });
  }

  private prepareForm(): void {
    this.orderForm = this.formBuilder.group({
      id: [this.order.id || ''],
      orderNumber: [this.order.orderNumber || '', Validators.required],
      customerId: [this.order.customerId || '', Validators.required],
      customerName: [this.order.customerName || ''],
      orderDate: [this.order.orderDate || '', Validators.required],
      deliveryDate: [this.order.deliveryDate || ''],
      totalAmount: [this.order.totalAmount || '', Validators.required],
      status: [this.order.status || '', Validators.required],
      notes: [this.order.notes || ''],
    });
  }

  private formatDate(date: Date | undefined): string | null {
    if (!date) return null;

    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString().split('T')[0];
  }

  private patchForm(order: Order) {
    this.orderForm.patchValue({
      orderNumber: order.orderNumber,
      customerId: order.customerId,
      orderDate: this.formatDate(order.orderDate),
      deliveryDate: this.formatDate(order.deliveryDate),
      totalAmount: order.totalAmount,
      status: order.status,
      notes: order.notes,
    });
  }
}
