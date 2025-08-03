import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  @Input()
  customers!: Customer[];
  modalTitle = '';
  selectedCustomer!: Customer;
  isModalOpen = false;

  ngOnInit() {}

  onEditCustomer(customer: Customer): void {
    this.selectedCustomer = { ...customer };
    this.modalTitle = 'Editar Cliente';
    this.isModalOpen = true;
  }

  onDeleteCustomer(customer: Customer) {
    this.customers = this.customers.filter((c) => c !== customer);
  }

  onSaveCustomer(customer: Customer): void {
    const index = this.customers.findIndex((c) => c.email === customer.email);
    if (index !== -1) {
      this.customers[index] = customer;
    } else {
      this.customers.push(customer);
    }
    // this.closeModal();
  }
}
