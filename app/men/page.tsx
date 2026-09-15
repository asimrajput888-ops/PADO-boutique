// app/men/page.tsx

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProductsByCategory } from "@/lib/products";

export default function MenPage() {
  const products = getProductsByCategory("men");

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-neutral-900">
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase"
        >
          Gentlemen's Bespoke Atelier
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-serif mb-6"
        >
          Men's Sartorial Collection
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-neutral-600 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          Hand-cut Italian wools, precision canvas construction, and timeless tailoring built to your exact silhouette.
        </motion.p>
      </section>

      {/* Products — Suitsupply Style Large Images */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="space-y-32">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Large Product Image */}
              <Link
                href={`/men/${product.id}`}
                className={`group relative aspect-[4/5] overflow-hidden bg-neutral-100 ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
              </Link>

              {/* Product Info */}
              <div className={`max-w-md ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <motion.p
                  initial={{ opacity: 0, x: index % 2 === 1 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-amber-600 tracking-[0.3em] text-xs font-semibold mb-4 uppercase"
                >
                  {product.category} Collection
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, x: index % 2 === 1 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl md:text-4xl font-serif mb-4"
                >
                  {product.name}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, x: index % 2 === 1 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-neutral-600 leading-relaxed mb-6"
                >
                  {product.description}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: index % 2 === 1 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-2xl font-serif text-neutral-900 mb-8"
                >
                  Rs. {product.price.toLocaleString()}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex gap-4"
                >
                  <Link
                    href={`/men/${product.id}`}
                    className="bg-neutral-900 text-white px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-amber-600 transition-all duration-300"
                  >
                    Customize This Piece
                  </Link>
                  <Link
                    href={`/shop/${product.id}`}
                    className="border border-neutral-300 px-8 py-4 text-xs uppercase tracking-widest font-semibold hover:border-amber-600 hover:text-amber-600 transition-all duration-300"
                  >
                    View Details
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-neutral-900 text-white py-24 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-serif mb-6">
            Experience the Art of Bespoke
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            Book a fitting consultation with our master tailors.
          </p>
          <Link
            href="/custom"
            className="bg-amber-600 text-black px-10 py-4 text-xs uppercase tracking-widest font-semibold hover:bg-amber-500 transition-all duration-300 inline-block"
          >
            Book Consultation
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
