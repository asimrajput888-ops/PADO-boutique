    // 🔥 NAYA CODE: Metadata se order details nikaalein
    const meta = session.metadata || {};
    const orderData = {
      customer_name: meta.customer_name,
      customer_email: meta.customer_email,
      customer_phone: meta.customer_phone,
      customer_country: meta.customer_country,
      shipping_address: JSON.parse(meta.shipping_address || "{}"),
      fit_type: meta.fit_type,
      standard_size: meta.standard_size,
      model_id: meta.model_id,
      model_name: meta.model_name,
      category: meta.category,
      product_type: meta.product_type,
      total_price: Number(meta.total_price),
      currency: meta.currency,
      notes: meta.notes,
      // measurements: JSON.parse(meta.measurements || "{}"),
    };
