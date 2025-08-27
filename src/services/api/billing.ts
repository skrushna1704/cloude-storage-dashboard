import { API_BASE_URL } from './constants';

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
  invoiceNumber: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'bank';
  last4: string;
  brand: string;
  expiryDate: string;
  isDefault: boolean;
}

export interface BillingData {
  invoices: Invoice[];
  paymentMethods: PaymentMethod[];
  currentMonth: number;
  previousMonth: number;
  trend: number;
  totalStorage: number;
  storageLimit: number;
  upcomingPayment: number;
  dueDate: string;
}

export interface CreatePaymentMethodRequest {
  type: 'card' | 'bank';
  last4: string;
  brand: string;
  expiryDate: string;
  isDefault?: boolean;
}

export const fetchBillingData = async (): Promise<BillingData> => {
  const response = await fetch(`${API_BASE_URL}/billing`);
  if (!response.ok) {
    throw new Error('Failed to fetch billing data');
  }
  return response.json();
};

export const fetchInvoices = async (): Promise<Invoice[]> => {
  const response = await fetch(`${API_BASE_URL}/billing/invoices`);
  if (!response.ok) {
    throw new Error('Failed to fetch invoices');
  }
  return response.json();
};

export const fetchPaymentMethods = async (): Promise<PaymentMethod[]> => {
  const response = await fetch(`${API_BASE_URL}/billing/payment-methods`);
  if (!response.ok) {
    throw new Error('Failed to fetch payment methods');
  }
  return response.json();
};

export const createPaymentMethod = async (paymentData: CreatePaymentMethodRequest): Promise<PaymentMethod> => {
  const response = await fetch(`${API_BASE_URL}/billing/payment-methods`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create payment method');
  }
  return response.json();
};
