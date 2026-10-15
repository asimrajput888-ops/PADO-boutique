// lib/factory/webhook-verify.ts

import crypto from "crypto";

const WEBHOOK_SECRET = process.env.FACTORY_WEBHOOK_SECRET;

export function verifyWebhookSignature(
  rawBody: string,
  signature: string | null
): boolean {
  if (!WEBHOOK_SECRET || !signature) {
    return false;
  }

  const expectedSignature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  } catch {
    return false;
  }
}
