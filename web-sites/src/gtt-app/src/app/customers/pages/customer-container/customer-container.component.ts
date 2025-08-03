import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ModalAction } from '../../../shared/enums/modal-action.enum';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { CustomerListComponent } from '../../components/customer-list/customer-list.component';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';
import { MOCK_CUSTOMERS } from '../../models/customer-data-mock';

@Component({
  selector: 'app-customer-container',
  standalone: true,
  imports: [
    CustomerListComponent,
    CustomerFormComponent,
    ModalComponent,
    HttpClientModule,
  ],
  templateUrl: './customer-container.component.html',
  styleUrl: './customer-container.component.scss',
})
export class CustomerContainerComponent implements OnInit {
  @ViewChild(CustomerFormComponent)
  customerFormComponent!: CustomerFormComponent;

  public title: string = 'Gestión de Clientes';
  public isModalOpen: boolean = false;
  public isNewCustomer: boolean = false;
  public currentCustomer: Customer = this.emptyCustomer();
  public customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.internalinit();
  }

  private internalinit(): void {
    this.customers = this.getCustomers();
  }

  private getCustomers(): Customer[] {
    return MOCK_CUSTOMERS;
  }

  public onNewCustomer(): void {
    this.currentCustomer = this.emptyCustomer();
    this.showModal(true);
    this.isNewCustomer = true;
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
    this.customerFormComponent.onSubmit();
  }

  public handleSaveAction(customer: Customer): void {
    if (!customer) return;

    if (this.isNewCustomer) {
      this.handleCreateCustomer(customer);
    } else if (customer.id) {
      this.handleUpdateCustomer(customer);
    }
  }

  private handleCreateCustomer(customer: Customer): void {
    this.customerService.create(customer).subscribe({
      next: () => this.onCustomerActionSuccess(true),
      error: (err) => this.handleError(err, 'create'),
    });
  }

  private handleUpdateCustomer(customer: Customer): void {
    if (!customer.id) return;

    this.customerService.update(customer.id, customer).subscribe({
      next: () => this.onCustomerActionSuccess(false),
      error: (err) => this.handleError(err, 'update'),
    });
  }

  private onCustomerActionSuccess(isNew: boolean): void {
    this.loadCustomers();
    if (isNew) {
      this.resetCustomerForm();
    }
  }

  private resetCustomerForm(): void {
    this.showModal(false);
    this.currentCustomer = this.emptyCustomer();
  }

  private handleError(error: any, action: string): void {
    console.error(`Error al ${action} cliente`, error);
  }

  public handleEditAction(customer: Customer) {
    this.isNewCustomer = false;
    this.currentCustomer = customer;
    this.showModal(true);
  }

  private loadCustomers() {
    this.customerService.getAll().subscribe({
      next: (data) => (this.customers = data),
      error: (err) => console.error('Error al cargar clientes', err),
    });
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

  private showModal(flag: boolean) {
    this.isModalOpen = flag;
  }
}
