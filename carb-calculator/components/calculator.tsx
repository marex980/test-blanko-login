"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import type { Meal } from "@/lib/db";

type SelectedMeal = {
  meal: Meal;
  weight: number;
  carbs: number;
};

export function Calculator({ initialMeals }: { initialMeals: Meal[] }) {
  const [selectedMeals, setSelectedMeals] = useState<SelectedMeal[]>([]);
  const [meals] = useState(initialMeals);

  // Sort meals alphabetically by name
  const sortedMeals = [...meals].sort((a, b) => a.name.localeCompare(b.name));

  const addMealToCalculation = (mealId: string) => {
    const meal = meals.find((m) => m.id === mealId);
    if (meal) {
      setSelectedMeals([...selectedMeals, { meal, weight: 100, carbs: meal.carbsPer100g }]);
    }
  };

  const updateWeight = (index: number, weight: number) => {
    const updated = [...selectedMeals];
    updated[index].weight = weight;
    updated[index].carbs = (weight / 100) * updated[index].meal.carbsPer100g;
    setSelectedMeals(updated);
  };

  const removeMeal = (index: number) => {
    setSelectedMeals(selectedMeals.filter((_, i) => i !== index));
  };

  const totalCarbs = selectedMeals.reduce((sum, item) => sum + item.carbs, 0);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <Select onValueChange={addMealToCalculation}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select a meal" />
              </SelectTrigger>
              <SelectContent>
                {sortedMeals.map((meal) => (
                  <SelectItem key={meal.id} value={meal.id}>
                    {meal.name} ({meal.carbsPer100g}g carbs/100g)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedMeals.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="flex-1">
                <p className="font-medium">{item.meal.name}</p>
                <p className="text-sm text-muted-foreground">
                  {item.meal.carbsPer100g}g carbs/100g
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={item.weight}
                  onChange={(e) => updateWeight(index, parseFloat(e.target.value) || 0)}
                  className="w-24"
                />
                <span className="text-sm">g</span>
                <span className="w-20 text-right">{item.carbs.toFixed(1)}g carbs</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMeal(index)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {selectedMeals.length > 0 && (
            <div className="mt-4 flex justify-end border-t pt-4">
              <p className="text-lg font-semibold">
                Total Carbs: {totalCarbs.toFixed(1)}g
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}