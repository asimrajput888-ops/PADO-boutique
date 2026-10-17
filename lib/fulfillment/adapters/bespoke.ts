import type { FulfillmentAdapter, OrderRecord, SubmissionResult } from "../types";

export const bespokeAdapter: FulfillmentAdapter = {
  async submitOrder(order: OrderRecord): Promise<SubmissionResult> {
    // Filhaal koi API call nahi, bas success return karo.
    // Order Supabase mein save ho chuka hoga. Aap isko admin panel se export kar sakte hain.
    return {
      success: true,
      supplier_order_id: `BESPOKE-${order.order_number}`,
    };
  },
};
