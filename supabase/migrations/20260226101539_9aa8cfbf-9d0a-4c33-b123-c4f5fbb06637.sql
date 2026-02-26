
-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url TEXT,
  goal TEXT CHECK (goal IN ('lose_weight', 'gain_muscle', 'maintain', 'improve_health')),
  age INTEGER,
  weight NUMERIC,
  height NUMERIC,
  sex TEXT CHECK (sex IN ('male', 'female', 'other')),
  activity_level TEXT CHECK (activity_level IN ('sedentary', 'light', 'moderate', 'active', 'very_active')),
  dietary_preferences TEXT[] DEFAULT '{}',
  calorie_goal INTEGER DEFAULT 2000,
  protein_goal INTEGER DEFAULT 150,
  carbs_goal INTEGER DEFAULT 250,
  fat_goal INTEGER DEFAULT 65,
  unit_system TEXT DEFAULT 'imperial' CHECK (unit_system IN ('imperial', 'metric')),
  onboarding_completed BOOLEAN DEFAULT false,
  is_pro BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Food log entries
CREATE TABLE public.food_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  food_name TEXT NOT NULL,
  serving_size TEXT,
  calories INTEGER DEFAULT 0,
  protein NUMERIC DEFAULT 0,
  carbs NUMERIC DEFAULT 0,
  fat NUMERIC DEFAULT 0,
  fiber NUMERIC DEFAULT 0,
  logged_at DATE DEFAULT CURRENT_DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.food_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own food logs" ON public.food_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own food logs" ON public.food_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own food logs" ON public.food_logs FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own food logs" ON public.food_logs FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_food_logs_user_date ON public.food_logs (user_id, logged_at);

-- Workout sessions
CREATE TABLE public.workout_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  workout_type TEXT NOT NULL CHECK (workout_type IN ('strength', 'cardio', 'flexibility', 'hiit', 'sport')),
  duration_minutes INTEGER,
  calories_burned INTEGER DEFAULT 0,
  notes TEXT,
  logged_at DATE DEFAULT CURRENT_DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.workout_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own workouts" ON public.workout_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own workouts" ON public.workout_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own workouts" ON public.workout_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own workouts" ON public.workout_sessions FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_workouts_user_date ON public.workout_sessions (user_id, logged_at);

-- Workout exercises (sets/reps)
CREATE TABLE public.workout_exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.workout_sessions(id) ON DELETE CASCADE NOT NULL,
  exercise_name TEXT NOT NULL,
  sets INTEGER,
  reps INTEGER,
  weight NUMERIC,
  duration_seconds INTEGER,
  distance NUMERIC,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.workout_exercises ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own exercises" ON public.workout_exercises FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.workout_sessions ws WHERE ws.id = session_id AND ws.user_id = auth.uid()));
CREATE POLICY "Users can insert own exercises" ON public.workout_exercises FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.workout_sessions ws WHERE ws.id = session_id AND ws.user_id = auth.uid()));
CREATE POLICY "Users can update own exercises" ON public.workout_exercises FOR UPDATE
  USING (EXISTS (SELECT 1 FROM public.workout_sessions ws WHERE ws.id = session_id AND ws.user_id = auth.uid()));
CREATE POLICY "Users can delete own exercises" ON public.workout_exercises FOR DELETE
  USING (EXISTS (SELECT 1 FROM public.workout_sessions ws WHERE ws.id = session_id AND ws.user_id = auth.uid()));

-- Body measurements / progress
CREATE TABLE public.body_measurements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  weight NUMERIC,
  body_fat_percent NUMERIC,
  waist NUMERIC,
  chest NUMERIC,
  arms NUMERIC,
  hips NUMERIC,
  thighs NUMERIC,
  measured_at DATE DEFAULT CURRENT_DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.body_measurements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own measurements" ON public.body_measurements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own measurements" ON public.body_measurements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own measurements" ON public.body_measurements FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own measurements" ON public.body_measurements FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_measurements_user_date ON public.body_measurements (user_id, measured_at);

-- Water intake
CREATE TABLE public.water_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount_ml INTEGER NOT NULL,
  logged_at DATE DEFAULT CURRENT_DATE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.water_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own water logs" ON public.water_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own water logs" ON public.water_logs FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own water logs" ON public.water_logs FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_water_user_date ON public.water_logs (user_id, logged_at);

-- Meal templates
CREATE TABLE public.meal_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  meal_type TEXT CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  foods JSONB NOT NULL DEFAULT '[]',
  total_calories INTEGER DEFAULT 0,
  total_protein NUMERIC DEFAULT 0,
  total_carbs NUMERIC DEFAULT 0,
  total_fat NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.meal_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own templates" ON public.meal_templates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own templates" ON public.meal_templates FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own templates" ON public.meal_templates FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own templates" ON public.meal_templates FOR DELETE USING (auth.uid() = user_id);
