// lib/factory/payload-builder.ts

import { FactoryOrderPayload } from "./types";

interface OrderData {
  id: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  customer_country?: string;
  shipping_address?: any;
  measurements?: Record<string, string>;
  customization?: Record<string, string>;
  fabric_code?: string;
  fabric_name?: string;
  customer_notes?: string;
  // Customization flat fields
  lapel?: string;
  buttons?: string;
  vent?: string;
  lining?: string;
  collar?: string;
  pocket?: string;
  fit?: string;
  trouser?: string;
  vest?: string;
  sleeve?: string;
}

export function buildFactoryPayload(order: OrderData): FactoryOrderPayload {
  const nameParts = (order.customer_name || "Guest Customer").trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || "Customer";

  const measurements = order.measurements || {};
  const customization = order.customization || {};

  // Shipping: prefer nested JSON, else use country
  const shipping = order.shipping_address || {};

  const parseMeasurement = (key: string, fallback = 0): number => {
    const value = measurements[key];
    if (!value) return fallback;
    const num = parseFloat(String(value));
    return isNaN(num) ? fallback : num;
  };

  return {
    order_id: String(order.id),
    brand_label: "PADO",
    fabric_code: order.fabric_code || customization.fabric_code || "DEFAULT",
    shipping_address: {
      first_name: firstName,
      last_name: lastName,
      address_line_1: shipping.address1 || shipping.address_line_1 || "",
      address_line_2: shipping.address2 || shipping.address_line_2 || "",
      city: shipping.city || "",
      postal_code: shipping.postalCode || shipping.postal_code || "",
      country: shipping.country || order.customer_country || "",
      phone: order.customer_phone || "",
      email: order.customer_email || "",
    },
    measurements: {
      chest: parseMeasurement("chest"),
      waist: parseMeasurement("waist"),
      shoulders: parseMeasurement("shoulder") || parseMeasurement("shoulders"),
      sleeve_length: parseMeasurement("sleeve"),
      jacket_length: parseMeasurement("jacketLength"),
      pants_inseam: parseMeasurement("pantsLength") || parseMeasurement("inseam"),
      bicep: parseMeasurement("bicep"),
      neck: parseMeasurement("neck"),
      seat: parseMeasurement("seat"),
      thigh: parseMeasurement("thigh"),
      knee: parseMeasurement("knee"),
      leg_opening: parseMeasurement("legOpening"),
    },
    customization: {
      lapel_style: (customization.lapel || order.lapel || "notch") as any,
      lining_code: customization.lining || order.lining || "DEFAULT",
      buttons: customization.buttons || order.buttons || "HORN_BROWN",
      vents: (customization.vents || order.vent || "double") as any,
      pocket_style: customization.pocket || order.pocket || "flap",
      monogram: customization.monogram || "",
    },
    notes: order.customer_notes || "",
  };
}
