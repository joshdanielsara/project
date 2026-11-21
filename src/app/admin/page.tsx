import { Suspense } from "react";
import { AdminPanel } from "@/components/admin/AdminPanel";

export const metadata = {
  title: "Admin · Email Recipients",
  description: "Configure notification emails for the proposal site.",
};

export default function AdminPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-dvh items-center justify-center bg-[#f7f4ef] text-sm text-[#6f675e]">
          Loading admin...
        </div>
      }
    >
      <AdminPanel />
    </Suspense>
  );
}
