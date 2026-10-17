export type FulfillmentType = "standard" | "custom";

export interface OrderRecord {
  id: string;
  order_number: string;
  fit_type: FulfillmentType;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_country: string;
  shipping_address: any;
  model_id: string;
  model_name: string;
  total_price: number;
  currency: string;
  standard_size?: string | null;
  measurements?: Record<string, any> | null;
  notes?: string | null;
}

export interface SubmissionResult {
  success: boolean;
  supplier_order_id?: string;
  error?: string;
}

export interface FulfillmentAdapter {
  submitOrder(order: OrderRecord): Promise<SubmissionResult>;
}
