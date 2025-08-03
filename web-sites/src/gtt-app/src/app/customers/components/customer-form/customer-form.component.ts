import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss',
})
export class CustomerFormComponent implements OnInit {
  public title: string = 'Nuevo Cliente';
  public customerForm!: FormGroup;

  @Input()
  public customer!: Customer;

  @Output()
  public formSubmit = new EventEmitter<Customer>();

  constructor(protected formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.internalInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['customer'] && !changes['customer'].firstChange) {
      this.prepareForm();
    }
  }

  public onSubmit(): void {
    if (this.customerForm.valid) {
      this.formSubmit.emit(this.customerForm.value);
    } else {
      this.customerForm.markAllAsTouched();
    }
  }

  private internalInit(): void {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.customerForm = this.formBuilder.group({
      id: [this.customer.id || ''],
      name: [this.customer.name || '', Validators.required],
      email: [
        this.customer.email || '',
        [Validators.email, Validators.required],
      ],
      phone: [this.customer.phone || '', Validators.required],
      address: [this.customer.address || ''],
    });
  }
}
