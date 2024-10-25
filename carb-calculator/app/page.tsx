"use client";

import { Calculator } from "@/components/calculator";
import { db } from "@/lib/db";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Carbohydrate Calculator</h1>
          <p className="text-muted-foreground">
            Select meals and enter their weights to calculate total carbohydrates.
          </p>
        </div>

        <Calculator initialMeals={db.meals.list()} />
      </div>
    </main>
  );
}