import { Suspense } from "react";
import { ProposalApp } from "@/components/ProposalApp";

function LoadingFallback() {
  return (
    <div className="intro-bg flex min-h-dvh flex-1 items-center justify-center">
      <p className="text-sm text-[#5f6368]">Loading...</p>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ProposalApp />
    </Suspense>
  );
}
