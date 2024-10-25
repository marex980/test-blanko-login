"use client";

import { useState, useEffect } from "react";
import { Calculator } from "@/components/calculator";
import { db } from "@/lib/db";

export default function Home() {
  const [meals, setMeals] = useState(db.meals.list());

  // Refresh meals list when component mounts
  useEffect(() => {
    setMeals(db.meals.list());
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Carbohydrate Calculator</h1>
          <p className="text-muted-foreground">
            Select meals and enter their weights to calculate total carbohydrates.
          </p>
        </div>

        <Calculator meals={meals} />
      </div>
    </main>
  );
}