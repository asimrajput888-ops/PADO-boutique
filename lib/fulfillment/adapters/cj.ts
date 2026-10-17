import type { FulfillmentAdapter, OrderRecord, SubmissionResult } from "../types";

export const cjAdapter: FulfillmentAdapter = {
  async submitOrder(order: OrderRecord): Promise<SubmissionResult> {
    try {
      // Yahan CJ ki real API aayegi. Filhaal hum mock kar rahe hain.
      // const res = await fetch(`${process.env.CJ_BASE_URL}/shopping/order/createOrder`, ...)
      
      console.log("Mock: Sending order to CJ Dropshipping...", order.order_number);

      // Mock Success Response
      return {
        success: true,
        supplier_order_id: `CJ-${Date.now()}`,
      };
    } catch (err: any) {
      return {
        success: false,
        error: err.message || "CJ submission failed",
      };
    }
  },
};
