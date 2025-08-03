import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { ModalAction } from '../../../shared/enums/modal-action.enum';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { CustomerListComponent } from '../../components/customer-list/customer-list.component';
import { Customer } from '../../models/customer.model';
import { CustomerService } from '../../services/customer.service';

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
  public customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

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

  public handleSaveAction(customer: Customer) {
    if (customer && this.isNewCustomer) {
      this.customerService.create(customer).subscribe({
        next: () => {
          this.loadCustomers();
          this.showModal(false);
          this.currentCustomer = this.emptyCustomer();
        },
        error: (err) => console.error('Error al crear cliente ', err),
      });
    }
  }

  public handleEditAction(customer: Customer) {
    if (customer && customer.id && !this.isNewCustomer) {
      this.customerService.update(customer.id, customer).subscribe({
        next: () => {
          this.loadCustomers();
          this.isNewCustomer = false;
          this.currentCustomer = customer;
          this.showModal(true);
        },
        error: (err) => console.error('Error al editar ', err),
      });
    }
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
