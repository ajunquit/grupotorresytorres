import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent {
  @Input()
  customers!: Customer[];

  @Output()
  editAction = new EventEmitter<Customer>();

  @Output()
  deleteAction = new EventEmitter<Customer>();

  public title: string = 'Clientes';

  onEditCustomer(customer: Customer): void {
    this.editCustomer(customer);
  }

  onDeleteCustomer(customer: Customer) {
    this.deleteCustomer(customer);
  }

  private deleteCustomer(customer: Customer) {
    this.deleteAction.emit(customer);
  }

  private editCustomer(customer: Customer): void {
    this.editAction.emit(customer);
  }
}
