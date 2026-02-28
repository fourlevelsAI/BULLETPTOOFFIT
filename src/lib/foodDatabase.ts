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
  // ═══ PROTEINS — Muscle, Recovery, Strength ═══
  { name: "Grilled Chicken Breast", calories: 165, serving: "100g", protein: 31, carbs: 0, fat: 4 },
  { name: "Chicken Thigh", calories: 209, serving: "100g", protein: 26, carbs: 0, fat: 11 },
  { name: "Turkey Breast", calories: 135, serving: "100g", protein: 30, carbs: 0, fat: 1 },
  { name: "Ground Turkey", calories: 170, serving: "100g", protein: 21, carbs: 0, fat: 9 },
  { name: "Steak (sirloin)", calories: 207, serving: "100g", protein: 26, carbs: 0, fat: 11 },
  { name: "Steak (ribeye)", calories: 291, serving: "100g", protein: 24, carbs: 0, fat: 21 },
  { name: "Ground Beef (93%)", calories: 164, serving: "100g", protein: 22, carbs: 0, fat: 8 },
  { name: "Ground Beef (80%)", calories: 254, serving: "100g", protein: 17, carbs: 0, fat: 20 },
  { name: "Pork Chop", calories: 231, serving: "100g", protein: 26, carbs: 0, fat: 13 },
  { name: "Pork Tenderloin", calories: 143, serving: "100g", protein: 26, carbs: 0, fat: 4 },
  { name: "Lamb (leg)", calories: 243, serving: "100g", protein: 25, carbs: 0, fat: 15 },
  { name: "Bison (ground)", calories: 146, serving: "100g", protein: 20, carbs: 0, fat: 7 },
  { name: "Venison", calories: 158, serving: "100g", protein: 30, carbs: 0, fat: 3 },
  { name: "Bacon", calories: 43, serving: "1 slice", protein: 3, carbs: 0, fat: 3 },
  { name: "Beef Liver", calories: 135, serving: "100g", protein: 20, carbs: 4, fat: 4 },
  { name: "Chicken Liver", calories: 119, serving: "100g", protein: 17, carbs: 1, fat: 5 },

  // ═══ FISH & SEAFOOD — Omega-3, Brain, Joint Health ═══
  { name: "Salmon Fillet", calories: 208, serving: "100g", protein: 20, carbs: 0, fat: 13 },
  { name: "Tuna (canned)", calories: 120, serving: "1 can (142g)", protein: 27, carbs: 0, fat: 1 },
  { name: "Tuna Steak", calories: 144, serving: "100g", protein: 30, carbs: 0, fat: 1 },
  { name: "Shrimp", calories: 84, serving: "100g", protein: 20, carbs: 0, fat: 0 },
  { name: "Sardines (canned)", calories: 208, serving: "1 can (92g)", protein: 23, carbs: 0, fat: 11 },
  { name: "Mackerel", calories: 205, serving: "100g", protein: 19, carbs: 0, fat: 14 },
  { name: "Cod", calories: 82, serving: "100g", protein: 18, carbs: 0, fat: 1 },
  { name: "Tilapia", calories: 96, serving: "100g", protein: 20, carbs: 0, fat: 2 },
  { name: "Trout", calories: 148, serving: "100g", protein: 21, carbs: 0, fat: 7 },
  { name: "Oysters", calories: 68, serving: "6 medium", protein: 7, carbs: 4, fat: 2 },
  { name: "Mussels", calories: 86, serving: "100g", protein: 12, carbs: 4, fat: 2 },
  { name: "Scallops", calories: 69, serving: "100g", protein: 12, carbs: 3, fat: 1 },
  { name: "Crab Meat", calories: 97, serving: "100g", protein: 19, carbs: 0, fat: 2 },
  { name: "Anchovies", calories: 131, serving: "100g", protein: 20, carbs: 0, fat: 5 },

  // ═══ EGGS & DAIRY — Complete Amino Acids, Calcium, Bones ═══
  { name: "Eggs (2 large)", calories: 143, serving: "2 large", protein: 13, carbs: 1, fat: 10 },
  { name: "Egg White", calories: 17, serving: "1 large", protein: 4, carbs: 0, fat: 0 },
  { name: "Greek Yogurt", calories: 100, serving: "170g", protein: 17, carbs: 6, fat: 1 },
  { name: "Greek Yogurt (full fat)", calories: 150, serving: "170g", protein: 14, carbs: 8, fat: 7 },
  { name: "Cottage Cheese", calories: 206, serving: "1 cup", protein: 28, carbs: 6, fat: 9 },
  { name: "Whole Milk", calories: 149, serving: "1 cup", protein: 8, carbs: 12, fat: 8 },
  { name: "Skim Milk", calories: 83, serving: "1 cup", protein: 8, carbs: 12, fat: 0 },
  { name: "Cheese (cheddar)", calories: 113, serving: "1 oz (28g)", protein: 7, carbs: 0, fat: 9 },
  { name: "Mozzarella", calories: 85, serving: "1 oz (28g)", protein: 6, carbs: 1, fat: 6 },
  { name: "Parmesan", calories: 110, serving: "1 oz (28g)", protein: 10, carbs: 1, fat: 7 },
  { name: "Feta Cheese", calories: 75, serving: "1 oz (28g)", protein: 4, carbs: 1, fat: 6 },
  { name: "Kefir", calories: 104, serving: "1 cup", protein: 9, carbs: 12, fat: 2 },
  { name: "Skyr", calories: 110, serving: "150g", protein: 19, carbs: 7, fat: 0 },

  // ═══ GRAINS & COMPLEX CARBS — Energy, Endurance ═══
  { name: "Oatmeal", calories: 150, serving: "1 cup (240g)", protein: 5, carbs: 27, fat: 3 },
  { name: "Brown Rice", calories: 216, serving: "1 cup cooked", protein: 5, carbs: 45, fat: 2 },
  { name: "White Rice", calories: 206, serving: "1 cup cooked", protein: 4, carbs: 45, fat: 0 },
  { name: "Quinoa", calories: 222, serving: "1 cup cooked", protein: 8, carbs: 39, fat: 4 },
  { name: "Pasta (cooked)", calories: 220, serving: "1 cup", protein: 8, carbs: 43, fat: 1 },
  { name: "Whole Wheat Bread", calories: 69, serving: "1 slice", protein: 4, carbs: 12, fat: 1 },
  { name: "Sourdough Bread", calories: 93, serving: "1 slice", protein: 4, carbs: 18, fat: 1 },
  { name: "Ezekiel Bread", calories: 80, serving: "1 slice", protein: 5, carbs: 15, fat: 1 },
  { name: "Bagel", calories: 270, serving: "1 medium", protein: 10, carbs: 53, fat: 2 },
  { name: "Tortilla (flour)", calories: 146, serving: "1 large", protein: 4, carbs: 25, fat: 3 },
  { name: "Tortilla (corn)", calories: 52, serving: "1 medium", protein: 1, carbs: 11, fat: 1 },
  { name: "Croissant", calories: 231, serving: "1 medium", protein: 5, carbs: 26, fat: 12 },
  { name: "Couscous", calories: 176, serving: "1 cup cooked", protein: 6, carbs: 36, fat: 0 },
  { name: "Buckwheat", calories: 155, serving: "1 cup cooked", protein: 6, carbs: 34, fat: 1 },
  { name: "Farro", calories: 170, serving: "1 cup cooked", protein: 7, carbs: 34, fat: 1 },
  { name: "Barley", calories: 193, serving: "1 cup cooked", protein: 4, carbs: 44, fat: 1 },
  { name: "Rice Cakes", calories: 35, serving: "1 cake", protein: 1, carbs: 7, fat: 0 },
  { name: "Granola", calories: 210, serving: "½ cup", protein: 5, carbs: 34, fat: 7 },

  // ═══ STARCHY VEGETABLES — Glycogen, Recovery ═══
  { name: "Sweet Potato", calories: 103, serving: "1 medium", protein: 2, carbs: 24, fat: 0 },
  { name: "Baked Potato", calories: 161, serving: "1 medium", protein: 4, carbs: 37, fat: 0 },
  { name: "Butternut Squash", calories: 63, serving: "1 cup cubed", protein: 1, carbs: 16, fat: 0 },
  { name: "Corn", calories: 96, serving: "1 ear", protein: 3, carbs: 21, fat: 1 },
  { name: "Green Peas", calories: 118, serving: "1 cup", protein: 8, carbs: 21, fat: 1 },
  { name: "Plantain", calories: 122, serving: "1 medium", protein: 1, carbs: 32, fat: 0 },

  // ═══ VEGETABLES — Vitamins, Minerals, Anti-inflammatory ═══
  { name: "Broccoli", calories: 55, serving: "1 cup", protein: 4, carbs: 11, fat: 1 },
  { name: "Spinach", calories: 7, serving: "1 cup raw", protein: 1, carbs: 1, fat: 0 },
  { name: "Kale", calories: 33, serving: "1 cup chopped", protein: 2, carbs: 6, fat: 1 },
  { name: "Brussels Sprouts", calories: 56, serving: "1 cup", protein: 4, carbs: 11, fat: 1 },
  { name: "Asparagus", calories: 27, serving: "1 cup", protein: 3, carbs: 5, fat: 0 },
  { name: "Cauliflower", calories: 27, serving: "1 cup", protein: 2, carbs: 5, fat: 0 },
  { name: "Bell Pepper (red)", calories: 31, serving: "1 medium", protein: 1, carbs: 6, fat: 0 },
  { name: "Tomato", calories: 22, serving: "1 medium", protein: 1, carbs: 5, fat: 0 },
  { name: "Carrots", calories: 52, serving: "1 cup", protein: 1, carbs: 12, fat: 0 },
  { name: "Zucchini", calories: 17, serving: "1 cup sliced", protein: 1, carbs: 3, fat: 0 },
  { name: "Cucumber", calories: 16, serving: "1 cup", protein: 1, carbs: 4, fat: 0 },
  { name: "Green Beans", calories: 31, serving: "1 cup", protein: 2, carbs: 7, fat: 0 },
  { name: "Mushrooms", calories: 15, serving: "1 cup", protein: 2, carbs: 2, fat: 0 },
  { name: "Onion", calories: 44, serving: "1 medium", protein: 1, carbs: 10, fat: 0 },
  { name: "Garlic", calories: 4, serving: "1 clove", protein: 0, carbs: 1, fat: 0 },
  { name: "Beets", calories: 58, serving: "1 cup", protein: 2, carbs: 13, fat: 0 },
  { name: "Celery", calories: 14, serving: "1 cup", protein: 1, carbs: 3, fat: 0 },
  { name: "Cabbage", calories: 22, serving: "1 cup shredded", protein: 1, carbs: 5, fat: 0 },
  { name: "Artichoke", calories: 60, serving: "1 medium", protein: 4, carbs: 13, fat: 0 },
  { name: "Eggplant", calories: 20, serving: "1 cup", protein: 1, carbs: 5, fat: 0 },
  { name: "Swiss Chard", calories: 7, serving: "1 cup raw", protein: 1, carbs: 1, fat: 0 },
  { name: "Bok Choy", calories: 9, serving: "1 cup", protein: 1, carbs: 2, fat: 0 },
  { name: "Watercress", calories: 4, serving: "1 cup", protein: 1, carbs: 0, fat: 0 },
  { name: "Arugula", calories: 5, serving: "1 cup", protein: 1, carbs: 1, fat: 0 },
  { name: "Edamame", calories: 188, serving: "1 cup", protein: 18, carbs: 14, fat: 8 },
  { name: "Kimchi", calories: 23, serving: "1 cup", protein: 2, carbs: 4, fat: 1 },
  { name: "Sauerkraut", calories: 27, serving: "1 cup", protein: 1, carbs: 6, fat: 0 },
  { name: "Seaweed (nori)", calories: 10, serving: "1 sheet", protein: 1, carbs: 1, fat: 0 },

  // ═══ FRUITS — Antioxidants, Vitamin C, Recovery ═══
  { name: "Banana", calories: 105, serving: "1 medium", protein: 1, carbs: 27, fat: 0 },
  { name: "Apple", calories: 95, serving: "1 medium", protein: 0, carbs: 25, fat: 0 },
  { name: "Orange", calories: 62, serving: "1 medium", protein: 1, carbs: 15, fat: 0 },
  { name: "Blueberries", calories: 85, serving: "1 cup", protein: 1, carbs: 21, fat: 0 },
  { name: "Strawberries", calories: 49, serving: "1 cup", protein: 1, carbs: 12, fat: 0 },
  { name: "Mixed Berries", calories: 70, serving: "1 cup", protein: 1, carbs: 17, fat: 0 },
  { name: "Raspberries", calories: 64, serving: "1 cup", protein: 1, carbs: 15, fat: 1 },
  { name: "Blackberries", calories: 62, serving: "1 cup", protein: 2, carbs: 14, fat: 1 },
  { name: "Mango", calories: 99, serving: "1 cup", protein: 1, carbs: 25, fat: 1 },
  { name: "Pineapple", calories: 82, serving: "1 cup", protein: 1, carbs: 22, fat: 0 },
  { name: "Watermelon", calories: 46, serving: "1 cup", protein: 1, carbs: 12, fat: 0 },
  { name: "Grapes", calories: 62, serving: "1 cup", protein: 1, carbs: 16, fat: 0 },
  { name: "Kiwi", calories: 42, serving: "1 medium", protein: 1, carbs: 10, fat: 0 },
  { name: "Pomegranate Seeds", calories: 72, serving: "½ cup", protein: 1, carbs: 16, fat: 1 },
  { name: "Grapefruit", calories: 52, serving: "½ medium", protein: 1, carbs: 13, fat: 0 },
  { name: "Cherries", calories: 87, serving: "1 cup", protein: 1, carbs: 22, fat: 0 },
  { name: "Tart Cherry Juice", calories: 119, serving: "8 oz", protein: 1, carbs: 28, fat: 0 },
  { name: "Dates", calories: 66, serving: "1 date", protein: 0, carbs: 18, fat: 0 },
  { name: "Dried Figs", calories: 47, serving: "1 fig", protein: 1, carbs: 12, fat: 0 },
  { name: "Prunes", calories: 23, serving: "1 prune", protein: 0, carbs: 6, fat: 0 },

  // ═══ NUTS & SEEDS — Healthy Fats, Magnesium, Recovery ═══
  { name: "Almonds", calories: 164, serving: "1 oz (28g)", protein: 6, carbs: 6, fat: 14 },
  { name: "Walnuts", calories: 185, serving: "1 oz (28g)", protein: 4, carbs: 4, fat: 18 },
  { name: "Cashews", calories: 157, serving: "1 oz (28g)", protein: 5, carbs: 9, fat: 12 },
  { name: "Pistachios", calories: 159, serving: "1 oz (28g)", protein: 6, carbs: 8, fat: 13 },
  { name: "Macadamia Nuts", calories: 204, serving: "1 oz (28g)", protein: 2, carbs: 4, fat: 22 },
  { name: "Brazil Nuts", calories: 186, serving: "1 oz (28g)", protein: 4, carbs: 3, fat: 19 },
  { name: "Pecans", calories: 196, serving: "1 oz (28g)", protein: 3, carbs: 4, fat: 20 },
  { name: "Pumpkin Seeds", calories: 151, serving: "1 oz (28g)", protein: 7, carbs: 5, fat: 13 },
  { name: "Sunflower Seeds", calories: 165, serving: "1 oz (28g)", protein: 6, carbs: 7, fat: 14 },
  { name: "Chia Seeds", calories: 137, serving: "1 oz (28g)", protein: 4, carbs: 12, fat: 9 },
  { name: "Flax Seeds", calories: 150, serving: "1 oz (28g)", protein: 5, carbs: 8, fat: 12 },
  { name: "Hemp Seeds", calories: 166, serving: "1 oz (28g)", protein: 9, carbs: 3, fat: 14 },
  { name: "Peanut Butter", calories: 94, serving: "1 tbsp", protein: 4, carbs: 3, fat: 8 },
  { name: "Almond Butter", calories: 98, serving: "1 tbsp", protein: 3, carbs: 3, fat: 9 },
  { name: "Tahini", calories: 89, serving: "1 tbsp", protein: 3, carbs: 3, fat: 8 },

  // ═══ LEGUMES — Plant Protein, Fiber, Iron ═══
  { name: "Black Beans", calories: 227, serving: "1 cup cooked", protein: 15, carbs: 41, fat: 1 },
  { name: "Lentils", calories: 230, serving: "1 cup cooked", protein: 18, carbs: 40, fat: 1 },
  { name: "Chickpeas", calories: 269, serving: "1 cup cooked", protein: 15, carbs: 45, fat: 4 },
  { name: "Kidney Beans", calories: 225, serving: "1 cup cooked", protein: 15, carbs: 40, fat: 1 },
  { name: "Navy Beans", calories: 255, serving: "1 cup cooked", protein: 15, carbs: 47, fat: 1 },
  { name: "Tofu", calories: 144, serving: "½ block (200g)", protein: 15, carbs: 3, fat: 9 },
  { name: "Tempeh", calories: 195, serving: "100g", protein: 20, carbs: 8, fat: 11 },
  { name: "Hummus", calories: 70, serving: "2 tbsp", protein: 2, carbs: 6, fat: 5 },

  // ═══ HEALTHY FATS — Hormones, Brain, Joints ═══
  { name: "Avocado", calories: 240, serving: "1 whole", protein: 3, carbs: 13, fat: 22 },
  { name: "Avocado Toast", calories: 280, serving: "1 slice", protein: 7, carbs: 26, fat: 18 },
  { name: "Olive Oil", calories: 119, serving: "1 tbsp", protein: 0, carbs: 0, fat: 14 },
  { name: "Coconut Oil", calories: 121, serving: "1 tbsp", protein: 0, carbs: 0, fat: 14 },
  { name: "Ghee", calories: 112, serving: "1 tbsp", protein: 0, carbs: 0, fat: 13 },
  { name: "MCT Oil", calories: 115, serving: "1 tbsp", protein: 0, carbs: 0, fat: 14 },
  { name: "Fish Oil Supplement", calories: 25, serving: "1 tsp", protein: 0, carbs: 0, fat: 3 },
  { name: "Olives", calories: 36, serving: "10 olives", protein: 0, carbs: 2, fat: 3 },

  // ═══ SUPPLEMENTS & TRAINING FOODS ═══
  { name: "Protein Shake", calories: 200, serving: "1 scoop + water", protein: 25, carbs: 8, fat: 3 },
  { name: "Whey Protein Isolate", calories: 110, serving: "1 scoop (30g)", protein: 25, carbs: 1, fat: 0 },
  { name: "Casein Protein", calories: 120, serving: "1 scoop (33g)", protein: 24, carbs: 3, fat: 1 },
  { name: "Plant Protein Powder", calories: 120, serving: "1 scoop (30g)", protein: 21, carbs: 5, fat: 2 },
  { name: "Creatine (5g)", calories: 0, serving: "1 tsp (5g)", protein: 0, carbs: 0, fat: 0 },
  { name: "BCAA Drink", calories: 10, serving: "1 serving", protein: 0, carbs: 2, fat: 0 },
  { name: "Pre-Workout Drink", calories: 10, serving: "1 scoop", protein: 0, carbs: 3, fat: 0 },
  { name: "Mass Gainer Shake", calories: 650, serving: "1 serving", protein: 32, carbs: 110, fat: 8 },
  { name: "Protein Bar", calories: 230, serving: "1 bar", protein: 20, carbs: 24, fat: 8 },
  { name: "Energy Gel", calories: 100, serving: "1 packet", protein: 0, carbs: 25, fat: 0 },
  { name: "Electrolyte Drink", calories: 20, serving: "1 serving", protein: 0, carbs: 5, fat: 0 },

  // ═══ FERMENTED & GUT HEALTH ═══
  { name: "Kombucha", calories: 30, serving: "8 oz", protein: 0, carbs: 7, fat: 0 },
  { name: "Miso Soup", calories: 40, serving: "1 cup", protein: 3, carbs: 5, fat: 1 },
  { name: "Pickles", calories: 5, serving: "1 spear", protein: 0, carbs: 1, fat: 0 },
  { name: "Apple Cider Vinegar", calories: 3, serving: "1 tbsp", protein: 0, carbs: 0, fat: 0 },

  // ═══ BEVERAGES & EXTRAS ═══
  { name: "Black Coffee", calories: 2, serving: "1 cup", protein: 0, carbs: 0, fat: 0 },
  { name: "Green Tea", calories: 2, serving: "1 cup", protein: 0, carbs: 0, fat: 0 },
  { name: "Matcha Latte", calories: 70, serving: "1 cup", protein: 3, carbs: 10, fat: 2 },
  { name: "Bone Broth", calories: 40, serving: "1 cup", protein: 9, carbs: 1, fat: 0 },
  { name: "Coconut Water", calories: 46, serving: "1 cup", protein: 2, carbs: 9, fat: 0 },
  { name: "Almond Milk (unsweetened)", calories: 30, serving: "1 cup", protein: 1, carbs: 1, fat: 3 },
  { name: "Oat Milk", calories: 120, serving: "1 cup", protein: 3, carbs: 16, fat: 5 },

  // ═══ SNACKS & QUICK ENERGY ═══
  { name: "Dark Chocolate", calories: 170, serving: "1 oz (28g)", protein: 2, carbs: 13, fat: 12 },
  { name: "Honey", calories: 64, serving: "1 tbsp", protein: 0, carbs: 17, fat: 0 },
  { name: "Maple Syrup", calories: 52, serving: "1 tbsp", protein: 0, carbs: 13, fat: 0 },
  { name: "Popcorn (plain)", calories: 31, serving: "1 cup", protein: 1, carbs: 6, fat: 0 },
  { name: "Trail Mix", calories: 175, serving: "¼ cup", protein: 5, carbs: 15, fat: 11 },
  { name: "Beef Jerky", calories: 80, serving: "1 oz (28g)", protein: 13, carbs: 3, fat: 1 },
  { name: "Rice Pudding", calories: 130, serving: "½ cup", protein: 3, carbs: 22, fat: 3 },
  { name: "Overnight Oats", calories: 280, serving: "1 cup", protein: 10, carbs: 42, fat: 8 },
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
