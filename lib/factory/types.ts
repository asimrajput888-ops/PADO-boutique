// lib/factory/types.ts

export interface FactoryOrderPayload {
  order_id: string;
  brand_label: "PADO";
  fabric_code: string;
  shipping_address: {
    first_name: string;
    last_name: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    postal_code: string;
    country: string;
    phone?: string;
    email: string;
  };
  measurements: {
    chest: number;
    waist: number;
    shoulders: number;
    sleeve_length: number;
    jacket_length: number;
    pants_inseam: number;
    bicep?: number;
    neck?: number;
    seat?: number;
    thigh?: number;
    knee?: number;
    leg_opening?: number;
  };
  customization: {
    lapel_style: "notch" | "peak" | "shawl";
    lining_code: string;
    buttons: string;
    vents: "single" | "double" | "none";
    pocket_style?: string;
    monogram?: string;
  };
  notes?: string;
}

export interface FactoryOrderResponse {
  supplier_order_id: string;
  status: "accepted" | "pending" | "rejected";
  message?: string;
}

export type FactoryOrderStatus =
  | "IN_PRODUCTION"
  | "DISPATCHED"
  | "CANCELLED";

export interface FactoryWebhookPayload {
  event: FactoryOrderStatus;
  supplier_order_id: string;
  order_id: string;
  timestamp: string;
  data: {
    courier_name?: string;
    tracking_number?: string;
    estimated_delivery?: string;
    notes?: string;
  };
}
