"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PlusCircle } from "lucide-react";
import type { Meal } from "@/lib/db";

export function MealForm({ onAddMeal }: { onAddMeal: (meal: Omit<Meal, "id">) => void }) {
  const [name, setName] = useState("");
  const [carbsPer100g, setCarbsPer100g] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && carbsPer100g) {
      onAddMeal({
        name,
        carbsPer100g: parseFloat(carbsPer100g),
      });
      setName("");
      setCarbsPer100g("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Add New Meal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Meal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Meal Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Brown Rice"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="carbs">Carbohydrates per 100g</Label>
            <Input
              id="carbs"
              type="number"
              step="0.1"
              value={carbsPer100g}
              onChange={(e) => setCarbsPer100g(e.target.value)}
              placeholder="e.g., 28.2"
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Meal</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}