// lib/factory/payload-builder.ts

import { FactoryOrderPayload } from "./types";

interface OrderData {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone?: string;
  shipping_address: {
    address1: string;
    address2?: string;
    city: string;
    postalCode: string;
    country: string;
  };
  measurements: Record<string, string>;
  customization: Record<string, string>;
  fabric_code?: string;
  customer_notes?: string;
}

export function buildFactoryPayload(order: OrderData): FactoryOrderPayload {
  const nameParts = order.customer_name.trim().split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || "Customer";

  const measurements = order.measurements || {};
  const customization = order.customization || {};

  const parseMeasurement = (key: string, fallback = 0): number => {
    const value = measurements[key];
    if (!value) return fallback;
    const num = parseFloat(value);
    return isNaN(num) ? fallback : num;
  };

  return {
    order_id: order.id,
    brand_label: "PADO",
    fabric_code: order.fabric_code || customization.fabric_code || "DEFAULT",
    shipping_address: {
      first_name: firstName,
      last_name: lastName,
      address_line_1: order.shipping_address.address1,
      address_line_2: order.shipping_address.address2 || "",
      city: order.shipping_address.city,
      postal_code: order.shipping_address.postalCode || "",
      country: order.shipping_address.country,
      phone: order.customer_phone || "",
      email: order.customer_email,
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
      lapel_style: (customization.lapel as any) || "notch",
      lining_code: customization.lining || "DEFAULT",
      buttons: customization.buttons || "HORN_BROWN",
      vents: (customization.vents as any) || "double",
      pocket_style: customization.pocket || "flap",
      monogram: customization.monogram || "",
    },
    notes: order.customer_notes || "",
  };
}
