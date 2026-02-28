export interface FoodItem {
  name: string;
  calories: number;
  serving: string;
  protein: number;
  carbs: number;
  fat: number;
  brand?: string;
  category?: string;
}

// ═══ COMPLETE FOOD DATABASE — NO PORK ═══

export const localFoodDatabase: FoodItem[] = [
  // ── PROTEINS — MEAT ──
  { name: "Chicken Breast", calories: 165, serving: "100g", protein: 31, carbs: 0, fat: 4, category: "protein" },
  { name: "Chicken Thigh", calories: 209, serving: "100g", protein: 26, carbs: 0, fat: 11, category: "protein" },
  { name: "Chicken Leg", calories: 191, serving: "100g", protein: 27, carbs: 0, fat: 9, category: "protein" },
  { name: "Chicken Wings", calories: 203, serving: "100g", protein: 30, carbs: 0, fat: 9, category: "protein" },
  { name: "Ground Beef 90% Lean", calories: 215, serving: "100g", protein: 22, carbs: 0, fat: 13, category: "protein" },
  { name: "Beef Sirloin", calories: 207, serving: "100g", protein: 26, carbs: 0, fat: 11, category: "protein" },
  { name: "Beef Tenderloin", calories: 195, serving: "100g", protein: 27, carbs: 0, fat: 9, category: "protein" },
  { name: "Beef Mince 80/20", calories: 254, serving: "100g", protein: 17, carbs: 0, fat: 20, category: "protein" },
  { name: "Lamb Chops", calories: 294, serving: "100g", protein: 25, carbs: 0, fat: 21, category: "protein" },
  { name: "Lamb Mince", calories: 282, serving: "100g", protein: 18, carbs: 0, fat: 23, category: "protein" },
  { name: "Turkey Breast", calories: 135, serving: "100g", protein: 30, carbs: 0, fat: 1, category: "protein" },
  { name: "Turkey Mince", calories: 149, serving: "100g", protein: 19, carbs: 0, fat: 7, category: "protein" },
  { name: "Duck Breast", calories: 201, serving: "100g", protein: 28, carbs: 0, fat: 10, category: "protein" },
  { name: "Veal", calories: 172, serving: "100g", protein: 26, carbs: 0, fat: 7, category: "protein" },
  { name: "Beef Liver", calories: 135, serving: "100g", protein: 20, carbs: 4, fat: 4, category: "protein" },
  { name: "Chicken Liver", calories: 119, serving: "100g", protein: 17, carbs: 1, fat: 5, category: "protein" },
  { name: "Bison (ground)", calories: 146, serving: "100g", protein: 20, carbs: 0, fat: 7, category: "protein" },
  { name: "Venison", calories: 158, serving: "100g", protein: 30, carbs: 0, fat: 3, category: "protein" },

  // ── PROTEINS — FISH & SEAFOOD ──
  { name: "Salmon Fillet", calories: 208, serving: "100g", protein: 20, carbs: 0, fat: 13, category: "protein" },
  { name: "Tuna (canned in water)", calories: 109, serving: "100g", protein: 25, carbs: 0, fat: 1, category: "protein" },
  { name: "Tuna Steak", calories: 144, serving: "100g", protein: 30, carbs: 0, fat: 2, category: "protein" },
  { name: "Cod", calories: 82, serving: "100g", protein: 18, carbs: 0, fat: 1, category: "protein" },
  { name: "Sea Bass", calories: 97, serving: "100g", protein: 19, carbs: 0, fat: 2, category: "protein" },
  { name: "Shrimp/Prawns", calories: 99, serving: "100g", protein: 24, carbs: 0, fat: 1, category: "protein" },
  { name: "Sardines", calories: 208, serving: "100g", protein: 25, carbs: 0, fat: 11, category: "protein" },
  { name: "Mackerel", calories: 205, serving: "100g", protein: 19, carbs: 0, fat: 14, category: "protein" },
  { name: "Tilapia", calories: 96, serving: "100g", protein: 20, carbs: 0, fat: 2, category: "protein" },
  { name: "Halibut", calories: 111, serving: "100g", protein: 23, carbs: 0, fat: 2, category: "protein" },
  { name: "Haddock", calories: 90, serving: "100g", protein: 21, carbs: 0, fat: 1, category: "protein" },
  { name: "Trout", calories: 148, serving: "100g", protein: 21, carbs: 0, fat: 7, category: "protein" },
  { name: "Oysters", calories: 68, serving: "6 medium", protein: 7, carbs: 4, fat: 2, category: "protein" },
  { name: "Mussels", calories: 86, serving: "100g", protein: 12, carbs: 4, fat: 2, category: "protein" },
  { name: "Scallops", calories: 69, serving: "100g", protein: 12, carbs: 3, fat: 1, category: "protein" },
  { name: "Crab Meat", calories: 97, serving: "100g", protein: 19, carbs: 0, fat: 2, category: "protein" },
  { name: "Anchovies", calories: 131, serving: "100g", protein: 20, carbs: 0, fat: 5, category: "protein" },

  // ── PROTEINS — EGGS & DAIRY ──
  { name: "Whole Egg", calories: 72, serving: "1 large", protein: 6, carbs: 0, fat: 5, category: "protein" },
  { name: "Egg White", calories: 17, serving: "1 large", protein: 4, carbs: 0, fat: 0, category: "protein" },
  { name: "Scrambled Eggs", calories: 148, serving: "2 eggs", protein: 10, carbs: 2, fat: 11, category: "protein" },
  { name: "Boiled Eggs", calories: 143, serving: "2 large", protein: 13, carbs: 1, fat: 10, category: "protein" },
  { name: "Spinach Omelette", calories: 180, serving: "2 eggs", protein: 14, carbs: 3, fat: 12, category: "protein" },
  { name: "Greek Yogurt", calories: 100, serving: "170g", protein: 17, carbs: 6, fat: 0, category: "protein" },
  { name: "Greek Yogurt (full fat)", calories: 150, serving: "170g", protein: 14, carbs: 8, fat: 7, category: "protein" },
  { name: "Cottage Cheese", calories: 98, serving: "100g", protein: 11, carbs: 3, fat: 4, category: "protein" },
  { name: "Cottage Cheese Cup", calories: 163, serving: "1 cup", protein: 28, carbs: 6, fat: 2, category: "protein" },
  { name: "Cheddar Cheese", calories: 113, serving: "28g", protein: 7, carbs: 0, fat: 9, category: "fat" },
  { name: "Mozzarella", calories: 85, serving: "28g", protein: 6, carbs: 1, fat: 6, category: "fat" },
  { name: "Parmesan", calories: 110, serving: "28g", protein: 10, carbs: 1, fat: 7, category: "fat" },
  { name: "Feta Cheese", calories: 75, serving: "28g", protein: 4, carbs: 1, fat: 6, category: "fat" },
  { name: "String Cheese", calories: 80, serving: "1 stick", protein: 7, carbs: 1, fat: 5, category: "protein" },
  { name: "Whole Milk", calories: 149, serving: "240ml", protein: 8, carbs: 12, fat: 8, category: "protein" },
  { name: "Skimmed Milk", calories: 83, serving: "240ml", protein: 8, carbs: 12, fat: 0, category: "protein" },
  { name: "Kefir", calories: 104, serving: "1 cup", protein: 9, carbs: 12, fat: 2, category: "protein" },
  { name: "Skyr", calories: 110, serving: "150g", protein: 19, carbs: 7, fat: 0, category: "protein" },
  { name: "Whey Protein", calories: 120, serving: "1 scoop (30g)", protein: 25, carbs: 3, fat: 2, category: "protein" },
  { name: "Whey Protein Isolate", calories: 110, serving: "1 scoop (30g)", protein: 25, carbs: 1, fat: 1, category: "protein" },
  { name: "Casein Protein", calories: 120, serving: "1 scoop (33g)", protein: 24, carbs: 4, fat: 1, category: "protein" },
  { name: "Plant Protein Powder", calories: 120, serving: "1 scoop (30g)", protein: 21, carbs: 5, fat: 2, category: "protein" },
  { name: "Smoked Salmon", calories: 117, serving: "100g", protein: 18, carbs: 0, fat: 4, category: "protein" },

  // ── PROTEINS — PLANT BASED ──
  { name: "Lentils", calories: 116, serving: "100g cooked", protein: 9, carbs: 20, fat: 0, category: "protein" },
  { name: "Chickpeas", calories: 164, serving: "100g cooked", protein: 9, carbs: 27, fat: 3, category: "protein" },
  { name: "Black Beans", calories: 132, serving: "100g cooked", protein: 9, carbs: 24, fat: 1, category: "protein" },
  { name: "Kidney Beans", calories: 127, serving: "100g cooked", protein: 9, carbs: 23, fat: 0, category: "protein" },
  { name: "Navy Beans", calories: 140, serving: "100g cooked", protein: 8, carbs: 26, fat: 1, category: "protein" },
  { name: "Tofu (firm)", calories: 76, serving: "100g", protein: 8, carbs: 2, fat: 4, category: "protein" },
  { name: "Tempeh", calories: 193, serving: "100g", protein: 19, carbs: 9, fat: 11, category: "protein" },
  { name: "Edamame", calories: 121, serving: "100g", protein: 11, carbs: 10, fat: 5, category: "protein" },
  { name: "Hummus", calories: 166, serving: "100g", protein: 8, carbs: 14, fat: 10, category: "protein" },

  // ── CARBS — GRAINS ──
  { name: "White Rice", calories: 130, serving: "100g cooked", protein: 3, carbs: 28, fat: 0, category: "carb" },
  { name: "Brown Rice", calories: 111, serving: "100g cooked", protein: 3, carbs: 23, fat: 1, category: "carb" },
  { name: "Oatmeal", calories: 71, serving: "100g cooked", protein: 2, carbs: 12, fat: 1, category: "carb" },
  { name: "Overnight Oats", calories: 280, serving: "1 cup", protein: 10, carbs: 42, fat: 8, category: "carb" },
  { name: "Granola", calories: 471, serving: "100g", protein: 10, carbs: 57, fat: 20, category: "carb" },
  { name: "Whole Grain Bread", calories: 69, serving: "1 slice", protein: 4, carbs: 12, fat: 1, category: "carb" },
  { name: "Whole Grain Toast", calories: 69, serving: "1 slice", protein: 4, carbs: 12, fat: 1, category: "carb" },
  { name: "White Bread", calories: 79, serving: "1 slice", protein: 3, carbs: 15, fat: 1, category: "carb" },
  { name: "Sourdough Bread", calories: 93, serving: "1 slice", protein: 4, carbs: 18, fat: 1, category: "carb" },
  { name: "Ezekiel Bread", calories: 80, serving: "1 slice", protein: 5, carbs: 15, fat: 1, category: "carb" },
  { name: "Bagel", calories: 270, serving: "1 medium", protein: 10, carbs: 53, fat: 2, category: "carb" },
  { name: "Tortilla (flour)", calories: 146, serving: "1 large", protein: 4, carbs: 25, fat: 3, category: "carb" },
  { name: "Tortilla (corn)", calories: 52, serving: "1 medium", protein: 1, carbs: 11, fat: 1, category: "carb" },
  { name: "Pasta", calories: 131, serving: "100g cooked", protein: 5, carbs: 25, fat: 1, category: "carb" },
  { name: "Whole Wheat Pasta", calories: 124, serving: "100g cooked", protein: 5, carbs: 23, fat: 1, category: "carb" },
  { name: "Couscous", calories: 112, serving: "100g cooked", protein: 4, carbs: 23, fat: 0, category: "carb" },
  { name: "Quinoa", calories: 120, serving: "100g cooked", protein: 4, carbs: 22, fat: 2, category: "carb" },
  { name: "Buckwheat", calories: 155, serving: "1 cup cooked", protein: 6, carbs: 34, fat: 1, category: "carb" },
  { name: "Farro", calories: 170, serving: "1 cup cooked", protein: 7, carbs: 34, fat: 1, category: "carb" },
  { name: "Barley", calories: 193, serving: "1 cup cooked", protein: 4, carbs: 44, fat: 1, category: "carb" },
  { name: "Rice Cakes", calories: 35, serving: "1 cake", protein: 1, carbs: 7, fat: 0, category: "carb" },
  { name: "Croissant", calories: 231, serving: "1 medium", protein: 5, carbs: 26, fat: 12, category: "carb" },

  // ── CARBS — STARCHY VEGETABLES ──
  { name: "Sweet Potato", calories: 86, serving: "100g", protein: 2, carbs: 20, fat: 0, category: "carb" },
  { name: "White Potato", calories: 77, serving: "100g", protein: 2, carbs: 17, fat: 0, category: "carb" },
  { name: "Baked Potato", calories: 161, serving: "1 medium", protein: 4, carbs: 37, fat: 0, category: "carb" },
  { name: "Corn", calories: 86, serving: "100g", protein: 3, carbs: 19, fat: 1, category: "carb" },
  { name: "Peas", calories: 81, serving: "100g", protein: 5, carbs: 14, fat: 0, category: "carb" },
  { name: "Butternut Squash", calories: 45, serving: "100g", protein: 1, carbs: 12, fat: 0, category: "carb" },
  { name: "Parsnip", calories: 75, serving: "100g", protein: 2, carbs: 18, fat: 0, category: "carb" },
  { name: "Plantain", calories: 122, serving: "1 medium", protein: 1, carbs: 32, fat: 0, category: "carb" },

  // ── VEGETABLES — NON STARCHY ──
  { name: "Broccoli", calories: 34, serving: "100g", protein: 3, carbs: 7, fat: 0, category: "vegetable" },
  { name: "Spinach", calories: 23, serving: "100g", protein: 3, carbs: 4, fat: 0, category: "vegetable" },
  { name: "Kale", calories: 49, serving: "100g", protein: 4, carbs: 9, fat: 1, category: "vegetable" },
  { name: "Cucumber", calories: 15, serving: "100g", protein: 1, carbs: 4, fat: 0, category: "vegetable" },
  { name: "Tomato", calories: 18, serving: "100g", protein: 1, carbs: 4, fat: 0, category: "vegetable" },
  { name: "Bell Pepper", calories: 31, serving: "100g", protein: 1, carbs: 6, fat: 0, category: "vegetable" },
  { name: "Stuffed Bell Peppers", calories: 180, serving: "1 pepper", protein: 12, carbs: 18, fat: 7, category: "vegetable" },
  { name: "Lettuce", calories: 15, serving: "100g", protein: 1, carbs: 3, fat: 0, category: "vegetable" },
  { name: "Celery", calories: 16, serving: "100g", protein: 1, carbs: 3, fat: 0, category: "vegetable" },
  { name: "Asparagus", calories: 20, serving: "100g", protein: 2, carbs: 4, fat: 0, category: "vegetable" },
  { name: "Zucchini", calories: 17, serving: "100g", protein: 1, carbs: 3, fat: 0, category: "vegetable" },
  { name: "Mushrooms", calories: 22, serving: "100g", protein: 3, carbs: 3, fat: 0, category: "vegetable" },
  { name: "Cauliflower", calories: 25, serving: "100g", protein: 2, carbs: 5, fat: 0, category: "vegetable" },
  { name: "Green Beans", calories: 31, serving: "100g", protein: 2, carbs: 7, fat: 0, category: "vegetable" },
  { name: "Cabbage", calories: 25, serving: "100g", protein: 1, carbs: 6, fat: 0, category: "vegetable" },
  { name: "Onion", calories: 40, serving: "100g", protein: 1, carbs: 9, fat: 0, category: "vegetable" },
  { name: "Garlic", calories: 4, serving: "1 clove", protein: 0, carbs: 1, fat: 0, category: "vegetable" },
  { name: "Carrot", calories: 41, serving: "100g", protein: 1, carbs: 10, fat: 0, category: "vegetable" },
  { name: "Beetroot", calories: 43, serving: "100g", protein: 2, carbs: 10, fat: 0, category: "vegetable" },
  { name: "Avocado", calories: 160, serving: "½ avocado", protein: 2, carbs: 9, fat: 15, category: "fat" },
  { name: "Avocado Toast", calories: 280, serving: "1 slice", protein: 7, carbs: 26, fat: 18, category: "fat" },
  { name: "Artichoke", calories: 47, serving: "100g", protein: 3, carbs: 11, fat: 0, category: "vegetable" },
  { name: "Eggplant", calories: 20, serving: "100g", protein: 1, carbs: 5, fat: 0, category: "vegetable" },
  { name: "Brussels Sprouts", calories: 43, serving: "100g", protein: 3, carbs: 9, fat: 0, category: "vegetable" },
  { name: "Swiss Chard", calories: 19, serving: "100g", protein: 2, carbs: 4, fat: 0, category: "vegetable" },
  { name: "Bok Choy", calories: 13, serving: "100g", protein: 2, carbs: 2, fat: 0, category: "vegetable" },
  { name: "Arugula", calories: 25, serving: "100g", protein: 3, carbs: 4, fat: 1, category: "vegetable" },
  { name: "Mixed Greens Salad", calories: 20, serving: "1 cup", protein: 2, carbs: 3, fat: 0, category: "vegetable" },
  { name: "Grilled Vegetables", calories: 80, serving: "100g", protein: 2, carbs: 10, fat: 3, category: "vegetable" },
  { name: "Kimchi", calories: 23, serving: "100g", protein: 2, carbs: 4, fat: 1, category: "vegetable" },
  { name: "Sauerkraut", calories: 19, serving: "100g", protein: 1, carbs: 4, fat: 0, category: "vegetable" },
  { name: "Seaweed (nori)", calories: 10, serving: "1 sheet", protein: 1, carbs: 1, fat: 0, category: "vegetable" },

  // ── FRUITS ──
  { name: "Apple", calories: 95, serving: "1 medium", protein: 0, carbs: 25, fat: 0, category: "fruit" },
  { name: "Banana", calories: 105, serving: "1 medium", protein: 1, carbs: 27, fat: 0, category: "fruit" },
  { name: "Orange", calories: 62, serving: "1 medium", protein: 1, carbs: 15, fat: 0, category: "fruit" },
  { name: "Strawberries", calories: 32, serving: "100g", protein: 1, carbs: 8, fat: 0, category: "fruit" },
  { name: "Blueberries", calories: 57, serving: "100g", protein: 1, carbs: 14, fat: 0, category: "fruit" },
  { name: "Raspberries", calories: 52, serving: "100g", protein: 1, carbs: 12, fat: 1, category: "fruit" },
  { name: "Mixed Berries", calories: 50, serving: "100g", protein: 1, carbs: 12, fat: 0, category: "fruit" },
  { name: "Blackberries", calories: 43, serving: "100g", protein: 1, carbs: 10, fat: 0, category: "fruit" },
  { name: "Mango", calories: 60, serving: "100g", protein: 1, carbs: 15, fat: 0, category: "fruit" },
  { name: "Pineapple", calories: 50, serving: "100g", protein: 1, carbs: 13, fat: 0, category: "fruit" },
  { name: "Watermelon", calories: 30, serving: "100g", protein: 1, carbs: 8, fat: 0, category: "fruit" },
  { name: "Grapes", calories: 69, serving: "100g", protein: 1, carbs: 18, fat: 0, category: "fruit" },
  { name: "Pear", calories: 101, serving: "1 medium", protein: 1, carbs: 27, fat: 0, category: "fruit" },
  { name: "Peach", calories: 59, serving: "1 medium", protein: 1, carbs: 14, fat: 0, category: "fruit" },
  { name: "Kiwi", calories: 42, serving: "1 medium", protein: 1, carbs: 10, fat: 0, category: "fruit" },
  { name: "Pomegranate", calories: 83, serving: "100g", protein: 2, carbs: 19, fat: 1, category: "fruit" },
  { name: "Dates", calories: 80, serving: "3 pieces", protein: 1, carbs: 21, fat: 0, category: "fruit" },
  { name: "Grapefruit", calories: 52, serving: "½ medium", protein: 1, carbs: 13, fat: 0, category: "fruit" },
  { name: "Cherries", calories: 63, serving: "100g", protein: 1, carbs: 16, fat: 0, category: "fruit" },
  { name: "Plum", calories: 30, serving: "1 medium", protein: 0, carbs: 8, fat: 0, category: "fruit" },
  { name: "Fig (fresh)", calories: 37, serving: "1 medium", protein: 0, carbs: 10, fat: 0, category: "fruit" },
  { name: "Lemon Juice", calories: 3, serving: "1 tbsp", protein: 0, carbs: 1, fat: 0, category: "fruit" },
  { name: "Fruit Salad", calories: 80, serving: "1 cup", protein: 1, carbs: 20, fat: 0, category: "fruit" },

  // ── FATS — HEALTHY ──
  { name: "Almonds", calories: 164, serving: "28g", protein: 6, carbs: 6, fat: 14, category: "fat" },
  { name: "Walnuts", calories: 185, serving: "28g", protein: 4, carbs: 4, fat: 18, category: "fat" },
  { name: "Cashews", calories: 157, serving: "28g", protein: 5, carbs: 9, fat: 12, category: "fat" },
  { name: "Pistachios", calories: 159, serving: "28g", protein: 6, carbs: 8, fat: 13, category: "fat" },
  { name: "Peanuts", calories: 166, serving: "28g", protein: 8, carbs: 5, fat: 14, category: "fat" },
  { name: "Peanut Butter", calories: 190, serving: "2 tbsp", protein: 8, carbs: 6, fat: 16, category: "fat" },
  { name: "Almond Butter", calories: 196, serving: "2 tbsp", protein: 7, carbs: 6, fat: 18, category: "fat" },
  { name: "Celery & Almond Butter", calories: 210, serving: "1 serving", protein: 8, carbs: 9, fat: 18, category: "fat" },
  { name: "Macadamia Nuts", calories: 204, serving: "28g", protein: 2, carbs: 4, fat: 22, category: "fat" },
  { name: "Brazil Nuts", calories: 186, serving: "28g", protein: 4, carbs: 3, fat: 19, category: "fat" },
  { name: "Pecans", calories: 196, serving: "28g", protein: 3, carbs: 4, fat: 20, category: "fat" },
  { name: "Trail Mix", calories: 175, serving: "¼ cup", protein: 5, carbs: 15, fat: 11, category: "fat" },
  { name: "Olive Oil", calories: 119, serving: "1 tbsp", protein: 0, carbs: 0, fat: 14, category: "fat" },
  { name: "Coconut Oil", calories: 121, serving: "1 tbsp", protein: 0, carbs: 0, fat: 14, category: "fat" },
  { name: "Ghee", calories: 112, serving: "1 tbsp", protein: 0, carbs: 0, fat: 13, category: "fat" },
  { name: "Chia Seeds", calories: 138, serving: "2 tbsp", protein: 5, carbs: 12, fat: 9, category: "fat" },
  { name: "Chia Pudding", calories: 200, serving: "1 cup", protein: 6, carbs: 22, fat: 10, category: "fat" },
  { name: "Flaxseeds", calories: 110, serving: "2 tbsp", protein: 4, carbs: 6, fat: 9, category: "fat" },
  { name: "Hemp Seeds", calories: 166, serving: "28g", protein: 9, carbs: 3, fat: 14, category: "fat" },
  { name: "Sunflower Seeds", calories: 165, serving: "28g", protein: 5, carbs: 7, fat: 14, category: "fat" },
  { name: "Pumpkin Seeds", calories: 151, serving: "28g", protein: 7, carbs: 5, fat: 13, category: "fat" },
  { name: "Tahini", calories: 89, serving: "1 tbsp", protein: 3, carbs: 3, fat: 8, category: "fat" },
  { name: "Olives", calories: 36, serving: "10 olives", protein: 0, carbs: 2, fat: 3, category: "fat" },
  { name: "Dark Chocolate (85%)", calories: 170, serving: "28g", protein: 2, carbs: 13, fat: 12, category: "fat" },

  // ── PREPARED / COMBO FOODS ──
  { name: "Protein Shake", calories: 200, serving: "1 shake", protein: 25, carbs: 8, fat: 3, category: "protein" },
  { name: "Protein Bar", calories: 230, serving: "1 bar", protein: 20, carbs: 24, fat: 8, category: "protein" },
  { name: "Quinoa Salad", calories: 220, serving: "1 cup", protein: 8, carbs: 34, fat: 6, category: "carb" },
  { name: "Lentil Soup", calories: 180, serving: "1 cup", protein: 12, carbs: 26, fat: 3, category: "protein" },
  { name: "Tuna Salad", calories: 190, serving: "1 cup", protein: 22, carbs: 6, fat: 9, category: "protein" },
  { name: "Caesar Salad", calories: 200, serving: "1 bowl", protein: 10, carbs: 12, fat: 14, category: "vegetable" },
  { name: "Chicken Wrap", calories: 350, serving: "1 wrap", protein: 28, carbs: 30, fat: 12, category: "protein" },
  { name: "Turkey Sandwich", calories: 310, serving: "1 sandwich", protein: 24, carbs: 32, fat: 10, category: "protein" },
  { name: "Hummus & Veggies", calories: 180, serving: "1 serving", protein: 6, carbs: 18, fat: 10, category: "vegetable" },
  { name: "Beef Stir Fry", calories: 280, serving: "1 cup", protein: 22, carbs: 16, fat: 14, category: "protein" },
  { name: "Black Bean Bowl", calories: 320, serving: "1 bowl", protein: 15, carbs: 48, fat: 6, category: "protein" },
  { name: "Vegetable Soup", calories: 100, serving: "1 cup", protein: 4, carbs: 16, fat: 2, category: "vegetable" },
  { name: "Falafel", calories: 330, serving: "4 pieces", protein: 13, carbs: 32, fat: 18, category: "protein" },
  { name: "Pasta Salad", calories: 250, serving: "1 cup", protein: 8, carbs: 35, fat: 9, category: "carb" },
  { name: "Chickpea Curry", calories: 300, serving: "1 cup", protein: 12, carbs: 38, fat: 12, category: "protein" },
  { name: "Turkey Meatballs", calories: 200, serving: "4 meatballs", protein: 22, carbs: 8, fat: 9, category: "protein" },
  { name: "Shrimp Stir Fry", calories: 220, serving: "1 cup", protein: 24, carbs: 14, fat: 8, category: "protein" },
  { name: "Baked Cod", calories: 120, serving: "150g", protein: 26, carbs: 2, fat: 1, category: "protein" },
  { name: "Beef Burger (no bun)", calories: 280, serving: "1 patty", protein: 24, carbs: 0, fat: 20, category: "protein" },
  { name: "Chicken Curry", calories: 300, serving: "1 cup", protein: 25, carbs: 16, fat: 15, category: "protein" },
  { name: "Beef Stew", calories: 250, serving: "1 cup", protein: 20, carbs: 22, fat: 10, category: "protein" },
  { name: "Baked Chicken", calories: 190, serving: "150g", protein: 38, carbs: 0, fat: 5, category: "protein" },
  { name: "Grilled Sea Bass", calories: 145, serving: "150g", protein: 29, carbs: 0, fat: 3, category: "protein" },
  { name: "Lamb Kebab", calories: 280, serving: "2 skewers", protein: 22, carbs: 4, fat: 20, category: "protein" },
  { name: "Chicken Shawarma", calories: 320, serving: "1 serving", protein: 28, carbs: 18, fat: 15, category: "protein" },
  { name: "Prawn Stir Fry", calories: 200, serving: "1 cup", protein: 22, carbs: 12, fat: 7, category: "protein" },

  // ── BEVERAGES ──
  { name: "Black Coffee", calories: 2, serving: "1 cup", protein: 0, carbs: 0, fat: 0, category: "other" },
  { name: "Green Tea", calories: 2, serving: "1 cup", protein: 0, carbs: 0, fat: 0, category: "other" },
  { name: "Matcha Latte", calories: 70, serving: "1 cup", protein: 3, carbs: 10, fat: 2, category: "other" },
  { name: "Bone Broth", calories: 40, serving: "1 cup", protein: 9, carbs: 1, fat: 0, category: "protein" },
  { name: "Coconut Water", calories: 46, serving: "1 cup", protein: 2, carbs: 9, fat: 0, category: "other" },
  { name: "Almond Milk", calories: 30, serving: "1 cup", protein: 1, carbs: 1, fat: 3, category: "other" },
  { name: "Oat Milk", calories: 120, serving: "1 cup", protein: 3, carbs: 16, fat: 5, category: "other" },
  { name: "Orange Juice", calories: 110, serving: "1 cup", protein: 2, carbs: 26, fat: 0, category: "fruit" },
  { name: "Kombucha", calories: 30, serving: "8 oz", protein: 0, carbs: 7, fat: 0, category: "other" },
  { name: "Miso Soup", calories: 40, serving: "1 cup", protein: 3, carbs: 5, fat: 1, category: "other" },

  // ── SNACKS & EXTRAS ──
  { name: "Honey", calories: 64, serving: "1 tbsp", protein: 0, carbs: 17, fat: 0, category: "carb" },
  { name: "Maple Syrup", calories: 52, serving: "1 tbsp", protein: 0, carbs: 13, fat: 0, category: "carb" },
  { name: "Popcorn (plain)", calories: 31, serving: "1 cup", protein: 1, carbs: 6, fat: 0, category: "carb" },
  { name: "Beef Jerky", calories: 80, serving: "28g", protein: 13, carbs: 3, fat: 1, category: "protein" },
  { name: "Rice Pudding", calories: 130, serving: "½ cup", protein: 3, carbs: 22, fat: 3, category: "carb" },
  { name: "Pickles", calories: 5, serving: "1 spear", protein: 0, carbs: 1, fat: 0, category: "other" },

  // ── SUPPLEMENTS ──
  { name: "Creatine Monohydrate", calories: 0, serving: "5g", protein: 0, carbs: 0, fat: 0, category: "other" },
  { name: "Pre-Workout", calories: 15, serving: "1 scoop", protein: 0, carbs: 3, fat: 0, category: "other" },
  { name: "BCAA", calories: 20, serving: "1 scoop", protein: 5, carbs: 0, fat: 0, category: "other" },
  { name: "Fish Oil", calories: 10, serving: "1 softgel", protein: 0, carbs: 0, fat: 1, category: "other" },
  { name: "Electrolyte Drink", calories: 20, serving: "1 serving", protein: 0, carbs: 5, fat: 0, category: "other" },
  { name: "Mass Gainer Shake", calories: 650, serving: "1 serving", protein: 32, carbs: 110, fat: 8, category: "protein" },
  { name: "Energy Gel", calories: 100, serving: "1 packet", protein: 0, carbs: 25, fat: 0, category: "carb" },
  { name: "Tart Cherry Juice", calories: 119, serving: "8 oz", protein: 1, carbs: 28, fat: 0, category: "fruit" },
  { name: "Apple Cider Vinegar", calories: 3, serving: "1 tbsp", protein: 0, carbs: 0, fat: 0, category: "other" },
  { name: "MCT Oil", calories: 115, serving: "1 tbsp", protein: 0, carbs: 0, fat: 14, category: "fat" },
  { name: "Vitamin D", calories: 0, serving: "1 tablet", protein: 0, carbs: 0, fat: 0, category: "other" },
  { name: "Magnesium", calories: 0, serving: "1 tablet", protein: 0, carbs: 0, fat: 0, category: "other" },
  { name: "Multivitamin", calories: 0, serving: "1 tablet", protein: 0, carbs: 0, fat: 0, category: "other" },
];

// ═══ PORK DETECTION for AI/Barcode ═══
const PORK_KEYWORDS = [
  "pork", "bacon", "ham", "sausage", "pepperoni", "salami",
  "prosciutto", "lard", "pancetta", "chorizo", "bratwurst",
  "hot dog", "frankfurter", "mortadella", "guanciale", "coppa",
];

export function isPorkProduct(name: string): boolean {
  const lower = name.toLowerCase();
  return PORK_KEYWORDS.some((kw) => lower.includes(kw));
}

// ═══ MEAL-SPECIFIC SUGGESTIONS ═══
const breakfastNames = [
  "Oatmeal", "Scrambled Eggs", "Greek Yogurt", "Banana", "Whole Grain Toast",
  "Avocado", "Mixed Berries", "Protein Shake", "Cottage Cheese", "Apple",
  "Almond Butter", "Granola", "Whole Milk", "Orange Juice", "Boiled Eggs",
  "Smoked Salmon", "Spinach Omelette", "Overnight Oats", "Chia Pudding", "Fruit Salad",
];

const lunchNames = [
  "Chicken Breast", "Brown Rice", "Quinoa Salad", "Sweet Potato", "Lentil Soup",
  "Tuna Salad", "Caesar Salad", "Chicken Wrap", "Turkey Sandwich", "Mixed Greens Salad",
  "Hummus & Veggies", "Beef Stir Fry", "Salmon Fillet", "Black Bean Bowl",
  "Vegetable Soup", "Grilled Vegetables", "Falafel", "Pasta Salad", "Chickpea Curry", "Couscous",
];

const dinnerNames = [
  "Salmon Fillet", "Chicken Breast", "Beef Tenderloin", "Lamb Chops", "Turkey Meatballs",
  "Shrimp Stir Fry", "Baked Cod", "Chicken Thigh", "Beef Burger (no bun)", "Tuna Steak",
  "Chicken Curry", "Beef Stew", "Stuffed Bell Peppers", "Baked Chicken",
  "Grilled Sea Bass", "Lamb Kebab", "Beef Mince 80/20", "Chicken Shawarma", "Prawn Stir Fry", "Duck Breast",
];

const snackNames = [
  "Almonds", "Protein Bar", "Greek Yogurt", "Apple", "Banana",
  "Peanut Butter", "Rice Cakes", "Protein Shake", "Boiled Eggs", "Walnuts",
  "Cashews", "Mixed Berries", "Dates", "Dark Chocolate (85%)", "Hummus",
  "String Cheese", "Trail Mix", "Celery & Almond Butter", "Edamame", "Cottage Cheese Cup",
];

function getFoodsForNames(names: string[]): FoodItem[] {
  return names
    .map((n) => localFoodDatabase.find((f) => f.name === n))
    .filter((f): f is FoodItem => !!f);
}

export function getMealSuggestions(mealType: string): FoodItem[] {
  switch (mealType) {
    case "Breakfast": return getFoodsForNames(breakfastNames);
    case "Lunch": return getFoodsForNames(lunchNames);
    case "Dinner": return getFoodsForNames(dinnerNames);
    case "Snack": return getFoodsForNames(snackNames);
    default: return localFoodDatabase.slice(0, 20);
  }
}

// ═══ GOAL-BASED GUIDANCE ═══
export interface MealGuidance {
  calRange: string;
  tip: string;
}

export function getMealGuidance(goal: string | null, mealType: string): MealGuidance {
  const g = (goal || "maintain").toLowerCase().replace(/\s+/g, "_");

  const guidance: Record<string, Record<string, MealGuidance>> = {
    lose_fat: {
      Breakfast: { calRange: "400–450 cal · 35g+ protein", tip: "High protein start → reduces hunger all day" },
      Lunch: { calRange: "450–500 cal · Lean protein + veg", tip: "Avoid heavy carbs at midday" },
      Dinner: { calRange: "400–450 cal · Protein + greens", tip: "Minimal carbs after 6pm" },
      Snack: { calRange: "100–150 cal · Protein-focused", tip: "Greek yogurt or a handful of nuts" },
    },
    build_muscle: {
      Breakfast: { calRange: "500–600 cal · 40g+ protein", tip: "Oats + eggs = perfect muscle fuel" },
      Lunch: { calRange: "600–700 cal · Protein + carbs", tip: "Biggest meal of your day" },
      Dinner: { calRange: "500–600 cal · Slow protein", tip: "Cottage cheese or salmon ideal" },
      Snack: { calRange: "200–300 cal · 25g+ protein", tip: "Protein shake or nuts" },
    },
    improve_endurance: {
      Breakfast: { calRange: "500–600 cal · Carb-focused", tip: "Oats, fruit, toast = training fuel" },
      Lunch: { calRange: "600–650 cal · Carbs + protein", tip: "Pasta, rice or sweet potato based" },
      Dinner: { calRange: "500–550 cal · Carb reload", tip: "Replenish glycogen stores" },
      Snack: { calRange: "200–250 cal · Quick carbs", tip: "Banana + sports drink" },
    },
    maintain: {
      Breakfast: { calRange: "400–500 cal · Balanced", tip: "Protein + healthy fats + carbs" },
      Lunch: { calRange: "500–550 cal · Balanced plate", tip: "Protein, carbs, and veg" },
      Dinner: { calRange: "450–500 cal · Light but filling", tip: "Protein + vegetables" },
      Snack: { calRange: "150–200 cal · Light", tip: "Fruit + nut butter" },
    },
  };

  const goalGuidance = guidance[g] || guidance.maintain;
  return goalGuidance[mealType] || goalGuidance.Lunch;
}

// ═══ OPEN FOOD FACTS API ═══
export async function searchOpenFoodFacts(query: string): Promise<FoodItem[]> {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&json=1&page_size=15`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.products || [])
      .filter((p: any) => p.product_name && p.nutriments)
      .filter((p: any) => !isPorkProduct(p.product_name || ""))
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
    const name = p.product_name || "Unknown Product";
    if (isPorkProduct(name)) return null; // pork blocked
    return {
      name,
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
