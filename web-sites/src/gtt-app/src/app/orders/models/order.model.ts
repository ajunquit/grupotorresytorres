import { OrderStatus } from '../../core/enums/order-status.enum';

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName?: string;
  orderDate: Date;
  deliveryDate?: Date;
  totalAmount: number;
  status: OrderStatus;
  notes?: string;
}
