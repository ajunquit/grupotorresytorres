import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { CustomerListComponent } from '../../components/customer-list/customer-list.component';
import { Customer } from '../../models/customer.model';
import { ModalAction } from '../../../shared/enums/modal-action.enum';

@Component({
  selector: 'app-customer-container',
  standalone: true,
  imports: [CustomerListComponent, CustomerFormComponent, ModalComponent],
  templateUrl: './customer-container.component.html',
  styleUrl: './customer-container.component.scss',
})
export class CustomerContainerComponent implements OnInit {
  public customers: Customer[] = [];

  ngOnInit(): void {
    this.internalinit();
  }

  private internalinit(): void {
    this.customers = this.getCustomers();
  }

  private getCustomers(): Customer[] {
    // Datos quemados por ahora
    return [
      {
        id: '',
        name: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '0987654321',
      },
      {
        id: '',
        name: 'Ana García',
        email: 'ana@example.com',
        phone: '0912345678',
      },
      {
        id: '',
        name: 'Carlos Torres',
        email: 'carlos@example.com',
        phone: '0954321890',
      },
    ];
  }

  @ViewChild(CustomerFormComponent)
  customerFormComponent!: CustomerFormComponent;

  public title: string = 'Gestion de Clientes';
  public isModalOpen: boolean = false;
  public currentCustomer: Customer = this.emptyCustomer();
  public isNewCustomer: boolean = false;

  public onNewCustomer(): void {
    this.currentCustomer = this.emptyCustomer();
    this.isModalOpen = true;
    this.isNewCustomer = true;
  }

  public handleModalAction(modalAction: ModalAction): void {
    if (modalAction === ModalAction.Save) {
      this.submitForm();
    }
    if (modalAction === ModalAction.Cancel) {
      this.closeModal();
    }
  }

  private submitForm(): void {
    this.customerFormComponent.onSubmit();
  }

  public handleFormSubmit(customer: Customer) {
    if (customer) {
      console.log(customer);
      this.closeModal();
      this.currentCustomer = this.emptyCustomer();
    }
  }

  private emptyCustomer(): Customer {
    return {
      id: '',
      name: '',
      email: '',
      phone: '',
      address: '',
    };
  }

  closeModal() {
    this.isModalOpen = false;
    this.isNewCustomer = false;
  }
}
