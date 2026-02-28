import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Check, X } from "lucide-react";

export interface DetectedFood {
  name: string;
  serving_size: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  quantity?: number;
}

interface Props {
  foods: DetectedFood[];
  mealType: string;
  onConfirm: (foods: DetectedFood[]) => void;
  onCancel: () => void;
}

const FoodConfirmation = ({ foods: initialFoods, mealType, onConfirm, onCancel }: Props) => {
  const [foods, setFoods] = useState<DetectedFood[]>(
    initialFoods.map((f) => ({ ...f, quantity: f.quantity || 1 }))
  );

  const updateQty = (idx: number, delta: number) => {
    setFoods((prev) =>
      prev.map((f, i) =>
        i === idx ? { ...f, quantity: Math.max(0.5, (f.quantity || 1) + delta) } : f
      )
    );
  };

  const removeFood = (idx: number) => {
    setFoods((prev) => prev.filter((_, i) => i !== idx));
  };

  const totalCals = foods.reduce((s, f) => s + Math.round(f.calories * (f.quantity || 1)), 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 z-[9999] bg-background flex flex-col"
      style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <button onClick={onCancel} className="w-10 h-10 flex items-center justify-center">
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
        <h2 className="text-sm font-semibold font-body">Confirm Foods</h2>
        <div className="w-10" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {foods.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm font-body py-8">No foods detected</p>
        ) : (
          foods.map((food, idx) => {
            const q = food.quantity || 1;
            return (
              <div key={idx} className="bracket-card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground font-body">{food.name}</p>
                    <p className="text-xs text-muted-foreground font-body mt-0.5">{food.serving_size}</p>
                    <div className="flex gap-3 mt-1 text-xs font-mono text-muted-foreground">
                      <span>Protein: {Math.round(food.protein_g * q)}g</span>
                      <span>Carbs: {Math.round(food.carbs_g * q)}g</span>
                      <span>Fat: {Math.round(food.fat_g * q)}g</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold font-mono">{Math.round(food.calories * q)}</p>
                    <p className="text-[10px] text-muted-foreground">cal</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(idx, -0.5)}
                      className="w-8 h-8 rounded border border-border flex items-center justify-center text-muted-foreground active:scale-95"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium font-mono w-8 text-center">{q}</span>
                    <button
                      onClick={() => updateQty(idx, 0.5)}
                      className="w-8 h-8 rounded border border-border flex items-center justify-center text-muted-foreground active:scale-95"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                    <span className="text-xs text-muted-foreground font-body">servings</span>
                  </div>
                  <button onClick={() => removeFood(idx)} className="text-xs text-destructive font-body">
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="p-4 border-t border-border space-y-3">
        <div className="flex justify-between text-sm font-body">
          <span className="text-muted-foreground">Total</span>
          <span className="font-semibold font-mono">{totalCals} cal</span>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onConfirm(foods)}
          disabled={foods.length === 0}
          className="w-full bg-foreground text-background py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 font-body"
        >
          <Check className="w-4 h-4" /> Add All to {mealType}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FoodConfirmation;
