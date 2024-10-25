import { z } from "zod";

export const MealSchema = z.object({
  id: z.string(),
  name: z.string(),
  carbsPer100g: z.number().min(0),
});

export type Meal = z.infer<typeof MealSchema>;

// Initial database
const defaultMeals: Meal[] = [
  { id: "1", name: "Beli pirinac", carbsPer100g: 28.2 },
  { id: "2", name: "Krompir", carbsPer100g: 20.1 },
  { id: "3", name: "Integralni hleb - parce", carbsPer100g: 49.4 },
  { id: "4", name: "Pasta", carbsPer100g: 25.1 },
  { id: "5", name: "Jabuka", carbsPer100g: 13.8 },
];

export const db = {
  meals: {
    list: () => [...defaultMeals],
  },
};