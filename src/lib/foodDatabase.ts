export interface FoodItem {
  name: string;
  calories: number;
  serving: string;
  protein: number;
  carbs: number;
  fat: number;
  brand?: string;
}

export const localFoodDatabase: FoodItem[] = [
  { name: "Oatmeal", calories: 150, serving: "1 cup (240g)", protein: 5, carbs: 27, fat: 3 },
  { name: "Banana", calories: 105, serving: "1 medium", protein: 1, carbs: 27, fat: 0 },
  { name: "Grilled Chicken Breast", calories: 165, serving: "100g", protein: 31, carbs: 0, fat: 4 },
  { name: "Brown Rice", calories: 216, serving: "1 cup cooked", protein: 5, carbs: 45, fat: 2 },
  { name: "Greek Yogurt", calories: 100, serving: "170g", protein: 17, carbs: 6, fat: 1 },
  { name: "Almond Butter", calories: 98, serving: "1 tbsp", protein: 3, carbs: 3, fat: 9 },
  { name: "Mixed Berries", calories: 70, serving: "1 cup", protein: 1, carbs: 17, fat: 0 },
  { name: "Quinoa", calories: 222, serving: "1 cup cooked", protein: 8, carbs: 39, fat: 4 },
  { name: "Avocado Toast", calories: 280, serving: "1 slice", protein: 7, carbs: 26, fat: 18 },
  { name: "Protein Shake", calories: 200, serving: "1 scoop + water", protein: 25, carbs: 8, fat: 3 },
  { name: "Salmon Fillet", calories: 208, serving: "100g", protein: 20, carbs: 0, fat: 13 },
  { name: "Eggs (2 large)", calories: 143, serving: "2 large", protein: 13, carbs: 1, fat: 10 },
  { name: "Sweet Potato", calories: 103, serving: "1 medium", protein: 2, carbs: 24, fat: 0 },
  { name: "Broccoli", calories: 55, serving: "1 cup", protein: 4, carbs: 11, fat: 1 },
  { name: "Whole Wheat Bread", calories: 69, serving: "1 slice", protein: 4, carbs: 12, fat: 1 },
  { name: "Turkey Breast", calories: 135, serving: "100g", protein: 30, carbs: 0, fat: 1 },
  { name: "Cottage Cheese", calories: 206, serving: "1 cup", protein: 28, carbs: 6, fat: 9 },
  { name: "Apple", calories: 95, serving: "1 medium", protein: 0, carbs: 25, fat: 0 },
  { name: "Peanut Butter", calories: 94, serving: "1 tbsp", protein: 4, carbs: 3, fat: 8 },
  { name: "Rice Cakes", calories: 35, serving: "1 cake", protein: 1, carbs: 7, fat: 0 },
  { name: "Pasta (cooked)", calories: 220, serving: "1 cup", protein: 8, carbs: 43, fat: 1 },
  { name: "Whole Milk", calories: 149, serving: "1 cup", protein: 8, carbs: 12, fat: 8 },
  { name: "Almonds", calories: 164, serving: "1 oz (28g)", protein: 6, carbs: 6, fat: 14 },
  { name: "Avocado", calories: 240, serving: "1 whole", protein: 3, carbs: 13, fat: 22 },
  { name: "White Rice", calories: 206, serving: "1 cup cooked", protein: 4, carbs: 45, fat: 0 },
  { name: "Tuna (canned)", calories: 120, serving: "1 can (142g)", protein: 27, carbs: 0, fat: 1 },
  { name: "Steak (sirloin)", calories: 207, serving: "100g", protein: 26, carbs: 0, fat: 11 },
  { name: "Olive Oil", calories: 119, serving: "1 tbsp", protein: 0, carbs: 0, fat: 14 },
  { name: "Egg White", calories: 17, serving: "1 large", protein: 4, carbs: 0, fat: 0 },
  { name: "Blueberries", calories: 85, serving: "1 cup", protein: 1, carbs: 21, fat: 0 },
  { name: "Orange", calories: 62, serving: "1 medium", protein: 1, carbs: 15, fat: 0 },
  { name: "Spinach", calories: 7, serving: "1 cup raw", protein: 1, carbs: 1, fat: 0 },
  { name: "Chicken Thigh", calories: 209, serving: "100g", protein: 26, carbs: 0, fat: 11 },
  { name: "Shrimp", calories: 84, serving: "100g", protein: 20, carbs: 0, fat: 0 },
  { name: "Cheese (cheddar)", calories: 113, serving: "1 oz (28g)", protein: 7, carbs: 0, fat: 9 },
  { name: "Granola", calories: 210, serving: "½ cup", protein: 5, carbs: 34, fat: 7 },
  { name: "Honey", calories: 64, serving: "1 tbsp", protein: 0, carbs: 17, fat: 0 },
  { name: "Black Beans", calories: 227, serving: "1 cup cooked", protein: 15, carbs: 41, fat: 1 },
  { name: "Lentils", calories: 230, serving: "1 cup cooked", protein: 18, carbs: 40, fat: 1 },
  { name: "Tofu", calories: 144, serving: "½ block (200g)", protein: 15, carbs: 3, fat: 9 },
  { name: "Bacon", calories: 43, serving: "1 slice", protein: 3, carbs: 0, fat: 3 },
  { name: "Bagel", calories: 270, serving: "1 medium", protein: 10, carbs: 53, fat: 2 },
  { name: "Croissant", calories: 231, serving: "1 medium", protein: 5, carbs: 26, fat: 12 },
  { name: "Tortilla (flour)", calories: 146, serving: "1 large", protein: 4, carbs: 25, fat: 3 },
  { name: "Hummus", calories: 70, serving: "2 tbsp", protein: 2, carbs: 6, fat: 5 },
  { name: "Dark Chocolate", calories: 170, serving: "1 oz (28g)", protein: 2, carbs: 13, fat: 12 },
  { name: "Popcorn (plain)", calories: 31, serving: "1 cup", protein: 1, carbs: 6, fat: 0 },
  { name: "Strawberries", calories: 49, serving: "1 cup", protein: 1, carbs: 12, fat: 0 },
  { name: "Ground Beef (93%)", calories: 164, serving: "100g", protein: 22, carbs: 0, fat: 8 },
  { name: "Pork Chop", calories: 231, serving: "100g", protein: 26, carbs: 0, fat: 13 },
];

export async function searchOpenFoodFacts(query: string): Promise<FoodItem[]> {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=15`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.products || [])
      .filter((p: any) => p.product_name && p.nutriments)
      .slice(0, 15)
      .map((p: any) => ({
        name: p.product_name,
        brand: p.brands || undefined,
        calories: Math.round(p.nutriments["energy-kcal_100g"] || p.nutriments["energy-kcal"] || 0),
        serving: p.serving_size || "100g",
        protein: Math.round(p.nutriments.proteins_100g || 0),
        carbs: Math.round(p.nutriments.carbohydrates_100g || 0),
        fat: Math.round(p.nutriments.fat_100g || 0),
      }));
  } catch {
    return [];
  }
}

export async function lookupBarcode(barcode: string): Promise<FoodItem | null> {
  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status !== 1 || !data.product) return null;
    const p = data.product;
    return {
      name: p.product_name || "Unknown Product",
      brand: p.brands || undefined,
      calories: Math.round(p.nutriments?.["energy-kcal_100g"] || 0),
      serving: p.serving_size || "100g",
      protein: Math.round(p.nutriments?.proteins_100g || 0),
      carbs: Math.round(p.nutriments?.carbohydrates_100g || 0),
      fat: Math.round(p.nutriments?.fat_100g || 0),
    };
  } catch {
    return null;
  }
}
