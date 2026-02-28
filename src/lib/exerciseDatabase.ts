export interface Exercise {
  name: string;
  muscle: string;
  category: string;
  type: "Strength" | "Cardio" | "HIIT" | "Flexibility";
  met: number;
}

export const exercises: Exercise[] = [
  // CHEST
  { name: "Bench Press", muscle: "Chest, Triceps", category: "Chest", type: "Strength", met: 5.0 },
  { name: "Incline Bench Press", muscle: "Upper Chest, Shoulders", category: "Chest", type: "Strength", met: 5.0 },
  { name: "Decline Bench Press", muscle: "Lower Chest, Triceps", category: "Chest", type: "Strength", met: 5.0 },
  { name: "Dumbbell Flyes", muscle: "Chest", category: "Chest", type: "Strength", met: 3.5 },
  { name: "Cable Crossover", muscle: "Chest", category: "Chest", type: "Strength", met: 3.5 },
  { name: "Push-ups", muscle: "Chest, Triceps, Core", category: "Chest", type: "Strength", met: 3.8 },
  { name: "Chest Dips", muscle: "Chest, Triceps", category: "Chest", type: "Strength", met: 5.0 },
  { name: "Pec Deck Machine", muscle: "Chest", category: "Chest", type: "Strength", met: 3.5 },
  { name: "Incline Dumbbell Press", muscle: "Upper Chest", category: "Chest", type: "Strength", met: 5.0 },
  { name: "Landmine Press", muscle: "Chest, Shoulders", category: "Chest", type: "Strength", met: 4.5 },

  // BACK
  { name: "Deadlift", muscle: "Back, Hamstrings", category: "Back", type: "Strength", met: 6.0 },
  { name: "Pull-ups", muscle: "Back, Biceps", category: "Back", type: "Strength", met: 8.0 },
  { name: "Chin-ups", muscle: "Back, Biceps", category: "Back", type: "Strength", met: 8.0 },
  { name: "Barbell Row", muscle: "Back, Biceps", category: "Back", type: "Strength", met: 5.0 },
  { name: "Dumbbell Row", muscle: "Back, Biceps", category: "Back", type: "Strength", met: 5.0 },
  { name: "Lat Pulldown", muscle: "Lats, Biceps", category: "Back", type: "Strength", met: 5.0 },
  { name: "Seated Cable Row", muscle: "Back, Biceps", category: "Back", type: "Strength", met: 4.5 },
  { name: "T-Bar Row", muscle: "Back", category: "Back", type: "Strength", met: 5.5 },
  { name: "Face Pulls", muscle: "Rear Delts, Traps", category: "Back", type: "Strength", met: 3.0 },
  { name: "Straight Arm Pulldown", muscle: "Lats", category: "Back", type: "Strength", met: 3.5 },
  { name: "Rack Pull", muscle: "Back, Traps", category: "Back", type: "Strength", met: 6.0 },
  { name: "Meadows Row", muscle: "Back, Lats", category: "Back", type: "Strength", met: 5.0 },
  { name: "Chest Supported Row", muscle: "Back", category: "Back", type: "Strength", met: 4.5 },

  // SHOULDERS
  { name: "Overhead Press", muscle: "Shoulders, Triceps", category: "Shoulders", type: "Strength", met: 5.0 },
  { name: "Dumbbell Shoulder Press", muscle: "Shoulders", category: "Shoulders", type: "Strength", met: 5.0 },
  { name: "Lateral Raises", muscle: "Side Delts", category: "Shoulders", type: "Strength", met: 3.0 },
  { name: "Front Raises", muscle: "Front Delts", category: "Shoulders", type: "Strength", met: 3.0 },
  { name: "Rear Delt Flyes", muscle: "Rear Delts", category: "Shoulders", type: "Strength", met: 3.0 },
  { name: "Arnold Press", muscle: "Shoulders", category: "Shoulders", type: "Strength", met: 5.0 },
  { name: "Upright Row", muscle: "Shoulders, Traps", category: "Shoulders", type: "Strength", met: 4.0 },
  { name: "Cable Lateral Raise", muscle: "Side Delts", category: "Shoulders", type: "Strength", met: 3.0 },
  { name: "Machine Shoulder Press", muscle: "Shoulders", category: "Shoulders", type: "Strength", met: 4.5 },
  { name: "Shrugs", muscle: "Traps", category: "Shoulders", type: "Strength", met: 3.5 },

  // ARMS — BICEPS
  { name: "Barbell Curl", muscle: "Biceps", category: "Arms", type: "Strength", met: 3.5 },
  { name: "Dumbbell Curl", muscle: "Biceps", category: "Arms", type: "Strength", met: 3.5 },
  { name: "Hammer Curl", muscle: "Biceps, Forearms", category: "Arms", type: "Strength", met: 3.5 },
  { name: "Preacher Curl", muscle: "Biceps", category: "Arms", type: "Strength", met: 3.5 },
  { name: "Concentration Curl", muscle: "Biceps", category: "Arms", type: "Strength", met: 3.0 },
  { name: "Cable Curl", muscle: "Biceps", category: "Arms", type: "Strength", met: 3.5 },
  { name: "Incline Dumbbell Curl", muscle: "Biceps", category: "Arms", type: "Strength", met: 3.5 },
  { name: "Spider Curl", muscle: "Biceps", category: "Arms", type: "Strength", met: 3.5 },
  { name: "Reverse Curl", muscle: "Forearms, Biceps", category: "Arms", type: "Strength", met: 3.0 },
  { name: "21s", muscle: "Biceps", category: "Arms", type: "Strength", met: 4.0 },

  // ARMS — TRICEPS
  { name: "Tricep Dips", muscle: "Triceps", category: "Arms", type: "Strength", met: 5.0 },
  { name: "Skull Crushers", muscle: "Triceps", category: "Arms", type: "Strength", met: 4.0 },
  { name: "Tricep Pushdown", muscle: "Triceps", category: "Arms", type: "Strength", met: 3.5 },
  { name: "Overhead Tricep Extension", muscle: "Triceps", category: "Arms", type: "Strength", met: 3.5 },
  { name: "Close Grip Bench", muscle: "Triceps, Chest", category: "Arms", type: "Strength", met: 5.0 },
  { name: "Diamond Push-ups", muscle: "Triceps, Chest", category: "Arms", type: "Strength", met: 4.0 },
  { name: "Tricep Kickback", muscle: "Triceps", category: "Arms", type: "Strength", met: 3.0 },
  { name: "Cable Overhead Extension", muscle: "Triceps", category: "Arms", type: "Strength", met: 3.5 },
  { name: "Tate Press", muscle: "Triceps", category: "Arms", type: "Strength", met: 3.5 },

  // LEGS
  { name: "Barbell Squat", muscle: "Quads, Glutes", category: "Legs", type: "Strength", met: 6.0 },
  { name: "Front Squat", muscle: "Quads, Core", category: "Legs", type: "Strength", met: 6.0 },
  { name: "Hack Squat", muscle: "Quads", category: "Legs", type: "Strength", met: 5.5 },
  { name: "Leg Press", muscle: "Quads, Glutes", category: "Legs", type: "Strength", met: 5.0 },
  { name: "Romanian Deadlift", muscle: "Hamstrings, Glutes", category: "Legs", type: "Strength", met: 5.5 },
  { name: "Leg Curl", muscle: "Hamstrings", category: "Legs", type: "Strength", met: 4.0 },
  { name: "Leg Extension", muscle: "Quads", category: "Legs", type: "Strength", met: 4.0 },
  { name: "Walking Lunges", muscle: "Quads, Glutes", category: "Legs", type: "Strength", met: 5.0 },
  { name: "Bulgarian Split Squat", muscle: "Quads, Glutes", category: "Legs", type: "Strength", met: 5.5 },
  { name: "Hip Thrust", muscle: "Glutes", category: "Legs", type: "Strength", met: 5.0 },
  { name: "Calf Raises", muscle: "Calves", category: "Legs", type: "Strength", met: 3.0 },
  { name: "Goblet Squat", muscle: "Quads, Glutes", category: "Legs", type: "Strength", met: 5.0 },
  { name: "Sumo Deadlift", muscle: "Glutes, Inner Thighs", category: "Legs", type: "Strength", met: 6.0 },
  { name: "Step-ups", muscle: "Quads, Glutes", category: "Legs", type: "Strength", met: 5.0 },
  { name: "Box Jumps", muscle: "Quads, Glutes, Calves", category: "Legs", type: "Strength", met: 8.0 },

  // CORE
  { name: "Plank", muscle: "Core", category: "Core", type: "Strength", met: 3.8 },
  { name: "Side Plank", muscle: "Obliques", category: "Core", type: "Strength", met: 3.5 },
  { name: "Crunches", muscle: "Abs", category: "Core", type: "Strength", met: 3.0 },
  { name: "Bicycle Crunches", muscle: "Abs, Obliques", category: "Core", type: "Strength", met: 4.0 },
  { name: "Russian Twist", muscle: "Obliques", category: "Core", type: "Strength", met: 4.0 },
  { name: "Leg Raises", muscle: "Lower Abs", category: "Core", type: "Strength", met: 3.5 },
  { name: "Ab Wheel Rollout", muscle: "Core", category: "Core", type: "Strength", met: 5.0 },
  { name: "Cable Crunch", muscle: "Abs", category: "Core", type: "Strength", met: 3.5 },
  { name: "Hanging Knee Raise", muscle: "Lower Abs", category: "Core", type: "Strength", met: 4.5 },
  { name: "Dragon Flag", muscle: "Core", category: "Core", type: "Strength", met: 5.5 },
  { name: "Dead Bug", muscle: "Core", category: "Core", type: "Strength", met: 3.0 },
  { name: "Pallof Press", muscle: "Core, Obliques", category: "Core", type: "Strength", met: 3.0 },

  // CARDIO
  { name: "Running", muscle: "Full Body", category: "Cardio", type: "Cardio", met: 9.8 },
  { name: "Cycling", muscle: "Legs", category: "Cardio", type: "Cardio", met: 7.5 },
  { name: "Rowing", muscle: "Full Body", category: "Cardio", type: "Cardio", met: 7.0 },
  { name: "Jump Rope", muscle: "Full Body", category: "Cardio", type: "Cardio", met: 12.3 },
  { name: "Stair Climber", muscle: "Legs, Glutes", category: "Cardio", type: "Cardio", met: 9.0 },
  { name: "Swimming", muscle: "Full Body", category: "Cardio", type: "Cardio", met: 8.0 },
  { name: "HIIT Sprints", muscle: "Full Body", category: "Cardio", type: "Cardio", met: 14.0 },
  { name: "Battle Ropes", muscle: "Arms, Core", category: "Cardio", type: "Cardio", met: 10.0 },
  { name: "Assault Bike", muscle: "Full Body", category: "Cardio", type: "Cardio", met: 10.5 },
  { name: "Elliptical", muscle: "Full Body", category: "Cardio", type: "Cardio", met: 5.0 },
  { name: "Walking", muscle: "Legs", category: "Cardio", type: "Cardio", met: 3.5 },
  { name: "Hiking", muscle: "Legs, Core", category: "Cardio", type: "Cardio", met: 6.0 },
  { name: "Boxing", muscle: "Full Body", category: "Cardio", type: "Cardio", met: 12.0 },

  // HIIT
  { name: "Burpees", muscle: "Full Body", category: "HIIT", type: "HIIT", met: 8.0 },
  { name: "Mountain Climbers", muscle: "Core, Shoulders", category: "HIIT", type: "HIIT", met: 8.0 },
  { name: "Jump Squats", muscle: "Quads, Glutes", category: "HIIT", type: "HIIT", met: 8.0 },
  { name: "High Knees", muscle: "Core, Quads", category: "HIIT", type: "HIIT", met: 8.0 },
  { name: "Kettlebell Swings", muscle: "Hips, Glutes, Back", category: "HIIT", type: "HIIT", met: 9.0 },
  { name: "Thrusters", muscle: "Full Body", category: "HIIT", type: "HIIT", met: 9.0 },
  { name: "Clean and Press", muscle: "Full Body", category: "HIIT", type: "HIIT", met: 9.0 },
  { name: "Wall Balls", muscle: "Full Body", category: "HIIT", type: "HIIT", met: 8.0 },
  { name: "Sled Push", muscle: "Legs, Core", category: "HIIT", type: "HIIT", met: 10.0 },
  { name: "Farmer's Walk", muscle: "Grip, Core, Traps", category: "HIIT", type: "HIIT", met: 6.0 },

  // FLEXIBILITY
  { name: "Hip Flexor Stretch", muscle: "Hip Flexors", category: "Flexibility", type: "Flexibility", met: 2.5 },
  { name: "Hamstring Stretch", muscle: "Hamstrings", category: "Flexibility", type: "Flexibility", met: 2.5 },
  { name: "Shoulder Stretch", muscle: "Shoulders", category: "Flexibility", type: "Flexibility", met: 2.5 },
  { name: "Chest Opener", muscle: "Chest, Shoulders", category: "Flexibility", type: "Flexibility", met: 2.5 },
  { name: "Pigeon Pose", muscle: "Hips, Glutes", category: "Flexibility", type: "Flexibility", met: 2.5 },
  { name: "Cat-Cow", muscle: "Spine", category: "Flexibility", type: "Flexibility", met: 2.5 },
  { name: "World's Greatest Stretch", muscle: "Full Body", category: "Flexibility", type: "Flexibility", met: 3.0 },
  { name: "Foam Rolling", muscle: "Quads, Back, IT Band", category: "Flexibility", type: "Flexibility", met: 2.5 },
  { name: "Thoracic Rotation", muscle: "Thoracic Spine", category: "Flexibility", type: "Flexibility", met: 2.5 },
  { name: "Ankle Mobility", muscle: "Ankles", category: "Flexibility", type: "Flexibility", met: 2.5 },
  { name: "Yoga Flow", muscle: "Full Body", category: "Flexibility", type: "Flexibility", met: 3.0 },
];

export const categories = [
  "All", "Chest", "Back", "Shoulders", "Arms", "Legs", "Core", "Cardio", "HIIT", "Flexibility"
];
