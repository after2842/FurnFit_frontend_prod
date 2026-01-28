import React from "react";
import { LoadingState } from "@/components/Loading";
export default function AdvocatesPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
          Advocates Page
          <img
            src="https://www.ikea.com/sa/en/images/products/roenninge-chair-birch__0642047_pe700849_s5.jpg?f=u"
            alt="no"
          />
        </h1>
      </main>
    </div>
  );
}
