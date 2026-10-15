// lib/factory/client.ts

import { FactoryOrderPayload, FactoryOrderResponse } from "./types";

const FACTORY_BASE_URL = process.env.FACTORY_BASE_URL;
const FACTORY_API_KEY = process.env.FACTORY_API_KEY;

export async function submitOrderToFactory(
  payload: FactoryOrderPayload
): Promise<FactoryOrderResponse> {
  if (!FACTORY_BASE_URL || !FACTORY_API_KEY) {
    throw new Error("Factory API credentials not configured");
  }

  const response = await fetch(`${FACTORY_BASE_URL}/v1/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": FACTORY_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Factory API error (${response.status}): ${errorText}`);
  }

  return response.json();
}
