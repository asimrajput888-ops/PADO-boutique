import type { FulfillmentAdapter, OrderRecord, SubmissionResult } from "./types";
import { cjAdapter } from "./adapters/cj";
import { bespokeAdapter } from "./adapters/bespoke";

const ADAPTERS: Record<string, FulfillmentAdapter> = {
  standard: cjAdapter,
  custom: bespokeAdapter,
};

export async function routeOrder(order: OrderRecord): Promise<SubmissionResult> {
  const adapter = ADAPTERS[order.fit_type];
  
  if (!adapter) {
    return { success: false, error: `No adapter found for fit_type: ${order.fit_type}` };
  }
  
  return adapter.submitOrder(order);
}
