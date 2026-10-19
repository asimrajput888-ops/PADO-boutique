// lib/fulfillment/adapters/cj.ts

import type { FulfillmentAdapter, OrderRecord, SubmissionResult } from "../types";

export const cjAdapter: FulfillmentAdapter = {
  async submitOrder(order: OrderRecord): Promise<SubmissionResult> {
    try {
      const apiKey = process.env.CJ_API_KEY;
      if (!apiKey) throw new Error("CJ_API_KEY is missing");

      // 1. Get Access Token
      const authRes = await fetch("https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken", {
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ apiKey }),
      });
      const authData = await authRes.json();
      if (!authData.result) throw new Error("CJ Authentication failed");
      const token = authData.data.accessToken;

      // 2. Prepare Order Data
      // Humara order object data nikaal rahe hain
      const address = order.shipping_address || {};
      
      // Agar aapne frontend se cj_vid bheja hai, toh wo yahan hoga (hum isko webhook se pass karenge)
      // Filhaal hum maan rahe hain ke metadata mein cj_vid aayega, warna fallback
      const productVid = (order as any).cj_vid || "YAHAN_CJ_VID_DALEIN"; // Fallback
      
      const payload = {
        orderNumber: order.order_number,
        shippingCustomerName: order.customer_name,
        shippingPhone: order.customer_phone || "0000000000",
        shippingCountryCode: address.country || "US", // CJ needs ISO code, we'll map it later
        shippingProvince: address.state || "N/A",
        shippingCity: address.city || "N/A",
        shippingAddress: address.address1 || "N/A",
        shippingZip: address.postalCode || "00000",
        remark: order.notes || "PADO Boutique Order",
        products: [
          {
            vid: productVid, // Exact CJ Variant ID
            quantity: 1,
          }
        ]
      };

      // 3. Send Order to CJ
      const orderRes = await fetch("https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrderV2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "CJ-Access-Token": token,
        },
        body: JSON.stringify(payload),
      });

      const orderData = await orderRes.json();

      if (!orderData.result) {
        return { success: false, error: orderData.message || "CJ Order creation failed" };
      }

      return {
        success: true,
        supplier_order_id: orderData.data.orderId, // CJ ka Order ID
      };

    } catch (error: any) {
      console.error("CJ Adapter Error:", error);
      return { success: false, error: error.message };
    }
  },
};
