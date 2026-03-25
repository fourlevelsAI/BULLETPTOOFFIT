import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, ArrowLeft, ChevronRight, Search, AlertTriangle, CheckCircle2, RotateCcw } from "lucide-react";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };
const stagger = { animate: { transition: { staggerChildren: 0.06 } } };

interface Exercise {
  id: string;
  name: string;
  muscles: string[];
  primaryMuscle: string;
  cues: string[];
  mistakes: string[];
  phases: { label: string; description: string }[];
}

interface MuscleGroup {
  id: string;
  name: string;
  emoji: string;
  exercises: Exercise[];
}

const MUSCLE_GROUPS: MuscleGroup[] = [
  {
    id: "chest", name: "Chest", emoji: "🫁",
    exercises: [
      {
        id: "bench-press", name: "Bench Press", primaryMuscle: "Chest",
        muscles: ["Pectoralis Major", "Triceps", "Anterior Deltoid"],
        phases: [
          { label: "Setup", description: "Lie flat, feet planted, shoulder blades retracted and squeezed together. Grip bar slightly wider than shoulder width." },
          { label: "Unrack", description: "Lock arms, move bar over mid-chest. Elbows at ~45° angle from torso — NOT flared at 90°." },
          { label: "Lower", description: "Inhale. Lower bar slowly to nipple line. Keep forearms vertical. Touch chest lightly — no bouncing." },
          { label: "Press", description: "Exhale and drive bar up in a slight arc toward the rack position. Lock out arms fully at top." },
        ],
        cues: ["Retract & depress shoulder blades — keep them pinched throughout", "Maintain slight arch in lower back (natural spine position)", "Drive feet into floor for leg drive", "Bar path: slight diagonal arc, not straight vertical", "Wrists stacked over elbows at bottom position"],
        mistakes: ["Flaring elbows to 90° — causes shoulder impingement", "Bouncing bar off chest — removes tension, risks injury", "Lifting hips off bench — reduces chest activation", "Partial reps — not touching chest or not locking out", "Thumbless/suicide grip — bar can slip and fall on you"],
      },
      {
        id: "push-up", name: "Push-Up", primaryMuscle: "Chest",
        muscles: ["Pectoralis Major", "Triceps", "Anterior Deltoid", "Core"],
        phases: [
          { label: "Start", description: "Hands slightly wider than shoulders. Body forms a straight line from head to heels. Core braced tight." },
          { label: "Lower", description: "Bend elbows to ~45° from body (not flared). Lower until chest is 1-2 inches from floor." },
          { label: "Bottom", description: "Pause briefly. Chest, not belly, should be closest to the ground. Maintain rigid plank." },
          { label: "Push", description: "Press through palms. Fully extend arms. Squeeze chest at the top." },
        ],
        cues: ["Hands under shoulders, fingers spread for stability", "Screw hands outward to create external rotation torque", "Squeeze glutes to prevent hip sag", "Look at floor ~6 inches ahead, not straight down", "Full range of motion every rep"],
        mistakes: ["Sagging hips — means weak core, reduce reps instead", "Flaring elbows to 90° — shoulder impingement risk", "Snake-like motion (hips before chest) — break form", "Head dropping — strains cervical spine", "Incomplete range of motion — half reps don't count"],
      },
    ],
  },
  {
    id: "back", name: "Back", emoji: "🦴",
    exercises: [
      {
        id: "deadlift", name: "Conventional Deadlift", primaryMuscle: "Back",
        muscles: ["Erector Spinae", "Glutes", "Hamstrings", "Traps", "Lats", "Core"],
        phases: [
          { label: "Setup", description: "Bar over mid-foot. Feet hip-width. Hinge at hips, grip just outside knees. Shins touch bar." },
          { label: "Brace", description: "Big breath into belly. Chest up, lats engaged (protect armpits). Back flat — neutral spine." },
          { label: "Pull", description: "Push floor away with legs. Bar drags up shins. Hips and shoulders rise at same rate." },
          { label: "Lockout", description: "Stand tall. Hips fully extended, glutes squeezed. Shoulders back — don't hyperextend." },
          { label: "Lower", description: "Hinge hips back first, then bend knees once bar passes them. Controlled descent." },
        ],
        cues: ["Bar stays in contact with legs throughout — if it drifts forward, reset", "Push the floor away rather than pulling the bar up", "Engage lats by imagining squeezing oranges in armpits", "Neutral spine always — no rounding upper OR lower back", "Mixed grip or hook grip for heavy sets, double overhand for warmups"],
        mistakes: ["Rounding lower back — #1 injury risk, use lighter weight", "Jerking the bar — causes bicep tears and back strain", "Hips shooting up first — turns it into a stiff-leg deadlift", "Bar drifting away from body — massive lower back stress", "Hyperextending at lockout — lean back = compressed discs"],
      },
      {
        id: "barbell-row", name: "Barbell Row", primaryMuscle: "Back",
        muscles: ["Latissimus Dorsi", "Rhomboids", "Rear Deltoids", "Biceps"],
        phases: [
          { label: "Setup", description: "Hinge at hips to ~45° angle. Knees slightly bent. Grip bar shoulder-width, arms hanging straight." },
          { label: "Pull", description: "Drive elbows back and up. Pull bar to lower chest/upper abdomen. Squeeze shoulder blades." },
          { label: "Squeeze", description: "Hold peak contraction for 1 second. Feel rhomboids and lats contracting." },
          { label: "Lower", description: "Control the negative — 2-3 seconds down. Full arm extension at bottom." },
        ],
        cues: ["Think 'elbows to ceiling' not 'hands to chest'", "Maintain rigid torso angle — no standing up during the row", "Initiate with back muscles, biceps finish the movement", "Wrists stay neutral — don't curl the bar", "Brace core hard to protect lower back in hinged position"],
        mistakes: ["Using body english/momentum — reduce weight", "Torso rising with each rep — means too heavy", "Pulling to belly button (too low) — reduces lat activation", "Shrugging shoulders up — traps take over from lats", "Wrist curling the bar — causes forearm fatigue"],
      },
    ],
  },
  {
    id: "legs", name: "Legs", emoji: "🦵",
    exercises: [
      {
        id: "squat", name: "Barbell Back Squat", primaryMuscle: "Legs",
        muscles: ["Quadriceps", "Glutes", "Hamstrings", "Core", "Erectors"],
        phases: [
          { label: "Setup", description: "Bar on upper traps (high bar) or rear delts (low bar). Feet shoulder-width, toes 15-30° out." },
          { label: "Unrack", description: "Brace core. Step back — 2-3 steps max. Set stance. One final big brace." },
          { label: "Descend", description: "Break at hips AND knees simultaneously. Knees track over toes. Keep chest up." },
          { label: "Bottom", description: "Hip crease below top of knee (parallel or below). Weight on mid-foot. Maintain back tightness." },
          { label: "Drive Up", description: "Push through mid-foot. Hips and shoulders rise together. Exhale through sticking point." },
        ],
        cues: ["Screw feet into floor — creates external rotation and knee stability", "Big belly breath, brace core like taking a punch", "Knees push OUT over pinky toes, never cave inward", "Weight balanced on mid-foot — not toes, not heels", "Eyes forward or slightly down — neutral neck"],
        mistakes: ["Knees caving inward (valgus) — MCL/ACL risk, use lighter weight", "Good morning squat (hips rise, chest drops) — quad weakness", "Heels rising off floor — mobility issue, elevate heels or work on ankle flexibility", "Half-squatting (above parallel) — missing glute and hamstring activation", "Butt wink at bottom — hamstring tightness or going too deep for mobility"],
      },
      {
        id: "rdl", name: "Romanian Deadlift", primaryMuscle: "Legs",
        muscles: ["Hamstrings", "Glutes", "Erector Spinae"],
        phases: [
          { label: "Start", description: "Stand tall with bar at hip level, shoulder-width grip. Slight knee bend — lock this angle." },
          { label: "Hinge", description: "Push hips BACK like closing a car door with your butt. Bar slides down thighs. Back stays flat." },
          { label: "Stretch", description: "Lower until you feel a deep hamstring stretch — typically mid-shin. Don't round to go lower." },
          { label: "Return", description: "Drive hips forward. Squeeze glutes hard at top. Don't lean back." },
        ],
        cues: ["This is a HIP HINGE not a squat — minimal knee bend", "Bar stays glued to legs throughout the movement", "Feel the stretch in hamstrings — that's the target", "Initiate with hips going backward, not bending forward", "Maintain proud chest and packed neck throughout"],
        mistakes: ["Bending knees too much — turns into a squat/deadlift hybrid", "Rounding lower back — lose the hip hinge, reset", "Bar drifting away from legs — lower back takes the load", "Going too low beyond flexibility — quality over depth", "Using too much weight — this is a stretch-focused movement"],
      },
    ],
  },
  {
    id: "shoulders", name: "Shoulders", emoji: "💪",
    exercises: [
      {
        id: "ohp", name: "Overhead Press", primaryMuscle: "Shoulders",
        muscles: ["Anterior Deltoid", "Lateral Deltoid", "Triceps", "Upper Chest", "Core"],
        phases: [
          { label: "Setup", description: "Bar at collarbone level, just outside shoulders. Elbows slightly in front of bar. Feet hip-width." },
          { label: "Brace", description: "Deep breath. Squeeze glutes. Brace abs. Create a solid base." },
          { label: "Press", description: "Press bar straight up. Move head back slightly to clear chin, then push head THROUGH once bar passes." },
          { label: "Lockout", description: "Full arm extension. Bar directly over mid-foot. Shrug slightly at the top for full range." },
          { label: "Lower", description: "Control back to collarbone. Re-brace before next rep." },
        ],
        cues: ["Bar path should be as vertical as possible — straight line from side view", "Move your head around the bar, not the bar around your head", "Squeeze glutes hard to prevent excessive lower back arch", "Grip width: forearms vertical at the bottom position", "Lock out completely — partial reps don't build overhead strength"],
        mistakes: ["Excessive back lean — turns it into an incline press, strains spine", "Pressing in front of face (curved bar path) — inefficient, shoulder stress", "Soft lockout — missing tricep and stabilizer development", "Flared rib cage — means core isn't braced, lower back at risk", "Using leg drive on strict press — that's a push press (different exercise)"],
      },
    ],
  },
  {
    id: "arms", name: "Arms", emoji: "🦾",
    exercises: [
      {
        id: "bicep-curl", name: "Barbell Curl", primaryMuscle: "Arms",
        muscles: ["Biceps Brachii", "Brachialis", "Brachioradialis"],
        phases: [
          { label: "Start", description: "Stand tall, shoulder-width underhand grip. Arms fully extended. Elbows pinned to sides." },
          { label: "Curl", description: "Flex at elbows only. Curl bar in an arc toward shoulders. Keep upper arms stationary." },
          { label: "Squeeze", description: "Peak contraction at top. Squeeze biceps hard for 1 second. Don't swing shoulders forward." },
          { label: "Lower", description: "Slow eccentric — 3 seconds down. Full extension at bottom. Don't let arms go limp." },
        ],
        cues: ["Elbows glued to your sides — imagine holding books under your armpits", "Control the negative (lowering) — this is where muscle grows", "Wrists stay neutral/slightly extended — don't curl your wrists", "Stand against a wall if you find yourself swaying", "Squeeze at the top — don't just move weight through space"],
        mistakes: ["Swinging body for momentum — ego lifting, drop the weight", "Elbows drifting forward — front delts take over", "Half reps (no full extension) — limiting bicep stretch and growth", "Going too heavy — curls are an isolation exercise, feel > weight", "Speed repping — time under tension matters more than reps"],
      },
    ],
  },
  {
    id: "core", name: "Core", emoji: "🎯",
    exercises: [
      {
        id: "plank", name: "Plank", primaryMuscle: "Core",
        muscles: ["Rectus Abdominis", "Transverse Abdominis", "Obliques", "Erectors"],
        phases: [
          { label: "Setup", description: "Forearms on floor, elbows under shoulders. Feet hip-width apart. Rise onto forearms and toes." },
          { label: "Align", description: "Straight line from head to heels. Neutral neck (look at floor between hands). Tuck pelvis slightly." },
          { label: "Brace", description: "Contract abs as if bracing for a punch. Squeeze glutes. Push forearms into floor." },
          { label: "Hold", description: "Breathe steadily — don't hold breath. Maintain position. Quality > duration." },
        ],
        cues: ["Posterior pelvic tilt — tuck tailbone to eliminate lower back arch", "Actively push floor away with forearms — engages serratus anterior", "Squeeze glutes — prevents hip sag and engages posterior chain", "Breathe normally — holding breath raises blood pressure unnecessarily", "A 30-second perfect plank beats a 3-minute sloppy one"],
        mistakes: ["Hips sagging — core has disengaged, reset or take a break", "Pike position (hips too high) — makes it easier, not harder", "Looking up/forward — cervical spine strain", "Holding breath — breathe steadily through the hold", "Excessive duration with poor form — stop when form breaks"],
      },
    ],
  },
];

// ─── Animated Exercise Illustration ─────────────────────────────────
function ExerciseIllustration({ exercise }: { exercise: Exercise }) {
  const [phase, setPhase] = useState(0);

  return (
    <div className="space-y-4">
      {/* Phase selector */}
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
        {exercise.phases.map((p, i) => (
          <button
            key={i}
            onClick={() => setPhase(i)}
            className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-body font-medium transition-all ${
              phase === i
                ? "bg-white text-black"
                : "bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Phase visualization */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-start gap-4">
            {/* Phase number */}
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-display font-black text-white/80">{phase + 1}</span>
            </div>
            {/* Phase content */}
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-sm text-white mb-1">{exercise.phases[phase].label}</p>
              <p className="text-sm text-foreground/70 leading-relaxed">{exercise.phases[phase].description}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Auto-play controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {exercise.phases.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === phase ? "w-6 bg-white" : i < phase ? "w-2 bg-white/40" : "w-2 bg-white/10"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setPhase((p) => (p + 1) % exercise.phases.length)}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Next Phase
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────
const ExerciseGuidePage = () => {
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [search, setSearch] = useState("");

  // Exercise detail view
  if (selectedExercise) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-lg border-b border-[rgba(192,192,192,0.08)]">
          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => setSelectedExercise(null)} className="p-2 -ml-2 rounded-lg hover:bg-white/5">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="min-w-0">
              <h1 className="text-lg font-display font-bold truncate">{selectedExercise.name}</h1>
              <p className="text-[10px] text-muted-foreground">{selectedExercise.primaryMuscle}</p>
            </div>
          </div>
        </div>

        <motion.div {...fadeUp} className="px-4 py-4 space-y-6">
          {/* Muscle tags */}
          <div className="flex flex-wrap gap-1.5">
            {selectedExercise.muscles.map((m) => (
              <span key={m} className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                {m}
              </span>
            ))}
          </div>

          {/* Movement breakdown */}
          <div>
            <h2 className="text-xs font-display font-bold uppercase tracking-widest mb-3 text-muted-foreground">
              Movement Breakdown
            </h2>
            <ExerciseIllustration exercise={selectedExercise} />
          </div>

          {/* Form cues */}
          <div>
            <h2 className="text-xs font-display font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> Key Cues
            </h2>
            <div className="space-y-2.5">
              {selectedExercise.cues.map((cue, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 bg-emerald-500/[0.04] border border-emerald-500/10 rounded-xl p-3"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px] font-mono text-emerald-400 flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground/80 leading-relaxed">{cue}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Common mistakes */}
          <div>
            <h2 className="text-xs font-display font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-red-400">
              <AlertTriangle className="w-4 h-4" /> Common Mistakes
            </h2>
            <div className="space-y-2.5">
              {selectedExercise.mistakes.map((mistake, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3 bg-red-500/[0.04] border border-red-500/10 rounded-xl p-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground/60 leading-relaxed">{mistake}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Group exercises view
  if (selectedGroup) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-lg border-b border-[rgba(192,192,192,0.08)]">
          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => setSelectedGroup(null)} className="p-2 -ml-2 rounded-lg hover:bg-white/5">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <h1 className="text-lg font-display font-bold">{selectedGroup.emoji} {selectedGroup.name}</h1>
          </div>
        </div>

        <motion.div className="px-4 py-4 space-y-2.5" variants={stagger} initial="initial" animate="animate">
          {selectedGroup.exercises.map((ex) => (
            <motion.button
              key={ex.id}
              variants={fadeUp}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedExercise(ex)}
              className="w-full text-left rounded-xl border border-[rgba(192,192,192,0.08)] bg-[rgba(192,192,192,0.03)] hover:bg-white/5 p-4 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display font-bold text-sm">{ex.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{ex.muscles.slice(0, 3).join(" · ")}</p>
                  <p className="text-[10px] text-white/30 mt-0.5">{ex.phases.length} phases · {ex.cues.length} cues</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    );
  }

  // Main view — muscle groups + search
  const allExercises = MUSCLE_GROUPS.flatMap((g) => g.exercises.map((e) => ({ ...e, groupName: g.name, groupEmoji: g.emoji })));
  const filtered = search
    ? allExercises.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()) || e.groupName.toLowerCase().includes(search.toLowerCase()) || e.muscles.some(m => m.toLowerCase().includes(search.toLowerCase())))
    : [];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 pt-6 pb-4">
        <motion.div {...fadeUp}>
          <div className="flex items-center gap-2 mb-1">
            <Dumbbell className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-display font-bold">Exercise Guide</h1>
          </div>
          <p className="text-xs text-muted-foreground">Step-by-step form breakdowns with coaching cues</p>
        </motion.div>
      </div>

      {/* Search */}
      <div className="px-4 mb-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search exercises or muscles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[rgba(192,192,192,0.04)] border border-[rgba(192,192,192,0.08)] text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-white/20"
          />
        </div>
      </div>

      {/* Search results */}
      {search && (
        <motion.div className="px-4 space-y-2 mb-6" variants={stagger} initial="initial" animate="animate">
          {filtered.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">No exercises found</p>
          )}
          {filtered.map((ex) => (
            <motion.button
              key={ex.id}
              variants={fadeUp}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedExercise(ex)}
              className="w-full text-left rounded-xl border border-[rgba(192,192,192,0.08)] bg-[rgba(192,192,192,0.03)] hover:bg-white/5 p-3 transition-colors"
            >
              <p className="font-display font-bold text-sm">{ex.name}</p>
              <p className="text-[10px] text-muted-foreground">{ex.groupEmoji} {ex.groupName} · {ex.muscles.slice(0, 2).join(" · ")}</p>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Muscle groups grid */}
      {!search && (
        <motion.div className="px-4 grid grid-cols-2 gap-2.5" variants={stagger} initial="initial" animate="animate">
          {MUSCLE_GROUPS.map((group) => (
            <motion.button
              key={group.id}
              variants={fadeUp}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedGroup(group)}
              className="rounded-xl border border-[rgba(192,192,192,0.08)] bg-[rgba(192,192,192,0.03)] hover:bg-white/5 p-5 text-left transition-colors"
            >
              <span className="text-2xl mb-2 block">{group.emoji}</span>
              <p className="font-display font-bold text-sm">{group.name}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{group.exercises.length} exercises</p>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ExerciseGuidePage;
