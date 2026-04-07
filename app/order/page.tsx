import { Suspense } from "react";
import OrderForm from "@/components/OrderForm";

export const metadata = {
  title: "Order — Punch TV",
  description: "Complete your Punch TV order. Pay via Interac e-Transfer.",
};

export default function OrderPage() {
  return (
    <main style={{ minHeight: "100vh", background: "var(--background)", paddingTop: "70px" }}>
      <Suspense fallback={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
          <p style={{ color: "#6b7280" }}>Loading...</p>
        </div>
      }>
        <OrderForm />
      </Suspense>
    </main>
  );
}
