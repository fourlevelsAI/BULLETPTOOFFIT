import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, ArrowLeft, ChevronRight, Search, AlertTriangle, CheckCircle2, RotateCcw, Filter } from "lucide-react";
import { exercises as exerciseDb, categories } from "@/lib/exerciseDatabase";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };
const stagger = { animate: { transition: { staggerChildren: 0.04 } } };

interface ExerciseGuide {
  phases: { label: string; description: string }[];
  cues: string[];
  mistakes: string[];
}

// ─── Detailed guides for key exercises ──────────────────────────────
const DETAILED_GUIDES: Record<string, ExerciseGuide> = {
  "Bench Press": {
    phases: [
      { label: "Setup", description: "Lie flat, feet planted, shoulder blades retracted and squeezed together. Grip bar slightly wider than shoulder width." },
      { label: "Unrack", description: "Lock arms, move bar over mid-chest. Elbows at ~45° angle from torso." },
      { label: "Lower", description: "Inhale. Lower bar slowly to nipple line. Keep forearms vertical. Touch chest lightly." },
      { label: "Press", description: "Exhale and drive bar up in a slight arc toward rack position. Lock out arms fully." },
    ],
    cues: ["Retract & depress shoulder blades throughout", "Maintain slight natural arch in lower back", "Drive feet into floor for leg drive", "Bar path: slight diagonal arc, not straight vertical", "Wrists stacked over elbows at bottom"],
    mistakes: ["Flaring elbows to 90° — shoulder impingement risk", "Bouncing bar off chest", "Lifting hips off bench", "Partial reps — not touching chest or not locking out", "Thumbless grip — bar can slip"],
  },
  "Incline Bench Press": {
    phases: [
      { label: "Setup", description: "Set bench to 30-45°. Retract shoulder blades. Grip slightly wider than shoulder width." },
      { label: "Lower", description: "Bring bar to upper chest/collarbone area. Elbows at ~45° from torso." },
      { label: "Press", description: "Drive bar up and slightly back. Lock out over upper chest, not over face." },
    ],
    cues: ["Angle between 30-45° targets upper chest best", "Touch point is higher than flat bench — upper chest area", "Keep shoulder blades pinched the entire set", "Don't let the incline turn it into a shoulder press"],
    mistakes: ["Bench angle too steep (60°+) — becomes a shoulder press", "Flaring elbows wide", "Arching excessively to flatten the angle", "Bar path drifting over face instead of upper chest"],
  },
  "Decline Bench Press": {
    phases: [
      { label: "Setup", description: "Set bench to 15-30° decline. Lock feet under pads. Retract shoulder blades." },
      { label: "Lower", description: "Lower bar to lower chest/sternum area. Elbows at ~45°." },
      { label: "Press", description: "Drive bar up. Range of motion is shorter than flat bench." },
    ],
    cues: ["Moderate decline only — 15-30° is sufficient", "Touch point is lower on chest than flat bench", "Reduced shoulder stress compared to flat/incline"],
    mistakes: ["Too steep a decline — blood rushes to head", "Not securing feet properly", "Using same touch point as flat bench"],
  },
  "Dumbbell Flyes": {
    phases: [
      { label: "Setup", description: "Lie flat, dumbbells above chest, palms facing each other. Slight bend in elbows — lock this angle." },
      { label: "Open", description: "Lower arms in a wide arc until you feel a deep chest stretch. Elbows stay slightly bent." },
      { label: "Squeeze", description: "Bring dumbbells back together in the same arc. Squeeze chest hard at the top." },
    ],
    cues: ["Think 'hugging a barrel' — same elbow angle throughout", "Lower until upper arms are parallel with floor", "Control the stretch — don't drop into the bottom", "Squeeze chest, not hands, at the top"],
    mistakes: ["Straightening arms — turns it into a press", "Going too deep — shoulder joint stress", "Bending elbows more on the way up — becomes a press"],
  },
  "Push-ups": {
    phases: [
      { label: "Start", description: "Hands slightly wider than shoulders. Body in straight line head to heels. Core braced tight." },
      { label: "Lower", description: "Bend elbows to ~45° from body. Lower until chest is 1-2 inches from floor." },
      { label: "Push", description: "Press through palms. Fully extend arms. Squeeze chest at top." },
    ],
    cues: ["Hands under shoulders, fingers spread for stability", "Screw hands outward for external rotation", "Squeeze glutes to prevent hip sag", "Full range of motion every rep"],
    mistakes: ["Sagging hips — weak core", "Flaring elbows to 90°", "Snake-like motion — hips before chest", "Incomplete range of motion"],
  },
  "Deadlift": {
    phases: [
      { label: "Setup", description: "Bar over mid-foot. Feet hip-width. Hinge at hips, grip just outside knees. Shins touch bar." },
      { label: "Brace", description: "Big breath into belly. Chest up, lats engaged. Back flat — neutral spine." },
      { label: "Pull", description: "Push floor away with legs. Bar drags up shins. Hips and shoulders rise at same rate." },
      { label: "Lockout", description: "Stand tall. Hips fully extended, glutes squeezed. Don't hyperextend." },
      { label: "Lower", description: "Hinge hips back first, then bend knees once bar passes them. Controlled descent." },
    ],
    cues: ["Bar stays in contact with legs throughout", "Push the floor away rather than pulling the bar up", "Engage lats — squeeze oranges in armpits", "Neutral spine always — no rounding", "Mixed or hook grip for heavy sets"],
    mistakes: ["Rounding lower back — #1 injury risk", "Jerking the bar — bicep tears risk", "Hips shooting up first", "Bar drifting from body", "Hyperextending at lockout"],
  },
  "Pull-ups": {
    phases: [
      { label: "Hang", description: "Full dead hang, shoulder-width overhand grip. Shoulders engaged (not shrugged to ears)." },
      { label: "Pull", description: "Drive elbows DOWN and BACK. Lead with chest toward the bar." },
      { label: "Top", description: "Chin clears bar. Squeeze lats hard. Chest close to bar." },
      { label: "Lower", description: "Control the descent — full extension at bottom. Don't just drop." },
    ],
    cues: ["Initiate by depressing shoulder blades — pull shoulders away from ears", "Think 'elbows to hips' not 'chin over bar'", "Slight lean back to engage lats fully", "Full dead hang at bottom — no half reps"],
    mistakes: ["Kipping/swinging — removes lat engagement", "Half reps — not going to full extension", "Chin jutting forward instead of chest up", "Using only arms — lats should do the work"],
  },
  "Barbell Row": {
    phases: [
      { label: "Setup", description: "Hinge at hips to ~45° angle. Knees slightly bent. Grip bar shoulder-width." },
      { label: "Pull", description: "Drive elbows back and up. Pull bar to lower chest. Squeeze shoulder blades." },
      { label: "Squeeze", description: "Hold peak contraction for 1 second. Feel rhomboids and lats." },
      { label: "Lower", description: "Control the negative — 2-3 seconds down. Full arm extension." },
    ],
    cues: ["Think 'elbows to ceiling' not 'hands to chest'", "Maintain rigid torso angle — no standing up", "Initiate with back muscles, biceps finish", "Brace core to protect lower back"],
    mistakes: ["Using body english/momentum", "Torso rising with each rep — too heavy", "Pulling too low (belly button)", "Shrugging shoulders up"],
  },
  "Barbell Squat": {
    phases: [
      { label: "Setup", description: "Bar on upper traps. Feet shoulder-width, toes 15-30° out." },
      { label: "Unrack", description: "Brace core. Step back 2-3 steps. Set stance. Final brace." },
      { label: "Descend", description: "Break at hips AND knees simultaneously. Knees track over toes." },
      { label: "Bottom", description: "Hip crease below knee (parallel or below). Weight on mid-foot." },
      { label: "Drive", description: "Push through mid-foot. Hips and shoulders rise together." },
    ],
    cues: ["Screw feet into floor for knee stability", "Big belly breath, brace like taking a punch", "Knees push out over pinky toes", "Weight on mid-foot — not toes or heels", "Neutral neck — eyes forward or slightly down"],
    mistakes: ["Knees caving inward — ACL risk", "Good morning squat (hips rise, chest drops)", "Heels rising — mobility issue", "Half-squatting above parallel", "Butt wink at bottom"],
  },
  "Front Squat": {
    phases: [
      { label: "Setup", description: "Bar on front delts in clean grip or cross-arm grip. Elbows high. Feet shoulder-width." },
      { label: "Descend", description: "Sit straight down between hips. Keep torso very upright — more than back squat." },
      { label: "Bottom", description: "Full depth while maintaining upright torso. Elbows stay HIGH." },
      { label: "Drive", description: "Drive up leading with elbows. Keep chest proud." },
    ],
    cues: ["Elbows up throughout — if they drop, bar rolls forward", "More upright torso than back squat", "Requires good thoracic mobility and wrist flexibility", "Core works harder than back squat"],
    mistakes: ["Elbows dropping — bar falls forward", "Rounding upper back", "Leaning forward excessively", "Grip too tight — fingertip control is fine"],
  },
  "Romanian Deadlift": {
    phases: [
      { label: "Start", description: "Stand tall with bar at hips. Slight knee bend — lock this angle throughout." },
      { label: "Hinge", description: "Push hips BACK. Bar slides down thighs. Back stays flat." },
      { label: "Stretch", description: "Lower until deep hamstring stretch — typically mid-shin. Don't round to go lower." },
      { label: "Return", description: "Drive hips forward. Squeeze glutes hard at top." },
    ],
    cues: ["Hip hinge, not a squat — minimal knee bend", "Bar stays glued to legs throughout", "Feel the hamstring stretch — that's the target", "Initiate with hips going backward"],
    mistakes: ["Bending knees too much — becomes a squat", "Rounding lower back", "Bar drifting from legs", "Going beyond your flexibility"],
  },
  "Overhead Press": {
    phases: [
      { label: "Setup", description: "Bar at collarbone, just outside shoulders. Elbows slightly in front of bar." },
      { label: "Brace", description: "Deep breath. Squeeze glutes. Brace abs hard." },
      { label: "Press", description: "Press straight up. Move head back to clear chin, then push head through." },
      { label: "Lockout", description: "Full arm extension. Bar over mid-foot. Slight shrug at top." },
    ],
    cues: ["Bar path as vertical as possible", "Move head around the bar, not bar around head", "Squeeze glutes to prevent back arch", "Lock out completely"],
    mistakes: ["Excessive back lean — becomes incline press", "Pressing in front of face", "Flared rib cage — core not braced", "Using leg drive on strict press"],
  },
  "Lateral Raises": {
    phases: [
      { label: "Start", description: "Stand tall, dumbbells at sides. Slight bend in elbows." },
      { label: "Raise", description: "Lift arms out to sides until parallel with floor. Lead with elbows, not hands." },
      { label: "Top", description: "Pinkies slightly higher than thumbs (pour water). Hold 1 second." },
      { label: "Lower", description: "Control the negative. Don't just drop the weight." },
    ],
    cues: ["Lead with elbows — imagine pouring water from a pitcher", "Slight forward lean targets lateral delts better", "Don't go above shoulder height — traps take over", "Light weight, high reps — this is an isolation exercise"],
    mistakes: ["Using momentum/swinging — too heavy", "Shrugging shoulders up — traps dominate", "Arms going too high", "Going too heavy — form breaks immediately"],
  },
  "Barbell Curl": {
    phases: [
      { label: "Start", description: "Shoulder-width underhand grip. Arms fully extended. Elbows pinned to sides." },
      { label: "Curl", description: "Flex at elbows only. Curl bar in an arc toward shoulders." },
      { label: "Squeeze", description: "Peak contraction at top. Squeeze biceps hard for 1 second." },
      { label: "Lower", description: "Slow eccentric — 3 seconds down. Full extension at bottom." },
    ],
    cues: ["Elbows glued to sides", "Control the negative — where growth happens", "Wrists stay neutral", "Stand against wall to prevent swaying"],
    mistakes: ["Swinging body for momentum", "Elbows drifting forward", "Half reps — no full extension", "Going too heavy for an isolation exercise"],
  },
  "Skull Crushers": {
    phases: [
      { label: "Setup", description: "Lie flat, arms extended holding bar/dumbbells above forehead. Upper arms perpendicular to floor." },
      { label: "Lower", description: "Bend only at elbows. Lower weight toward forehead or just behind head." },
      { label: "Extend", description: "Drive back up using triceps only. Lock out at top." },
    ],
    cues: ["Upper arms stay vertical — don't let elbows flare", "Lower to forehead or slightly behind head for full stretch", "Keep tension in triceps throughout", "Use EZ bar to reduce wrist strain"],
    mistakes: ["Elbows flaring out wide", "Moving upper arms (turns into a pullover)", "Going too heavy — dropping weight on face", "Rushing reps — control is key"],
  },
  "Leg Press": {
    phases: [
      { label: "Setup", description: "Feet shoulder-width on platform, mid-height. Back flat against pad." },
      { label: "Lower", description: "Unlock safeties. Bend knees toward chest. Go to 90° or slightly deeper." },
      { label: "Press", description: "Drive through mid-foot. Don't lock knees fully at top." },
    ],
    cues: ["Foot placement changes emphasis — high=glutes, low=quads", "Keep lower back pressed into pad", "Don't lock out knees completely", "Control the negative — don't let the sled drop"],
    mistakes: ["Knees caving inward", "Lower back rounding off pad", "Locking knees at full extension", "Going too deep — back rounds off pad", "Bouncing at the bottom"],
  },
  "Hip Thrust": {
    phases: [
      { label: "Setup", description: "Upper back on bench, feet flat hip-width, bar across hip crease with pad." },
      { label: "Drive", description: "Push through heels. Squeeze glutes to lift hips until torso is parallel to floor." },
      { label: "Top", description: "Full hip extension. Hard glute squeeze. Chin stays tucked — look forward, not up." },
      { label: "Lower", description: "Control the descent. Feel the glute stretch at bottom." },
    ],
    cues: ["Drive through heels — not toes", "Posterior pelvic tilt at the top — tuck pelvis", "Chin to chest — prevents back hyperextension", "Feet far enough out that shins are vertical at top"],
    mistakes: ["Hyperextending lower back instead of squeezing glutes", "Pushing through toes — shifts to quads", "Looking up at ceiling — neck strain", "Feet too close — quads take over"],
  },
  "Plank": {
    phases: [
      { label: "Setup", description: "Forearms on floor, elbows under shoulders. Rise onto forearms and toes." },
      { label: "Align", description: "Straight line head to heels. Neutral neck. Tuck pelvis slightly." },
      { label: "Brace", description: "Contract abs like bracing for a punch. Squeeze glutes. Push forearms into floor." },
      { label: "Hold", description: "Breathe steadily. Quality over duration." },
    ],
    cues: ["Posterior pelvic tilt — tuck tailbone", "Push floor away with forearms", "Squeeze glutes — prevents hip sag", "30-second perfect plank > 3-minute sloppy one"],
    mistakes: ["Hips sagging", "Pike position (hips too high)", "Looking up — neck strain", "Holding breath"],
  },
  "Burpees": {
    phases: [
      { label: "Stand", description: "Feet hip-width, standing tall." },
      { label: "Drop", description: "Squat down, place hands on floor. Jump feet back to plank position." },
      { label: "Push-up", description: "Perform a full push-up. Chest touches floor." },
      { label: "Jump", description: "Jump feet forward to hands. Explode up into a jump with arms overhead." },
    ],
    cues: ["Land softly on each jump", "Full push-up at bottom — chest to floor", "Explosive hip extension on the jump", "Pace yourself — quality reps matter"],
    mistakes: ["Worming instead of proper push-up", "Not full extension on jump", "Landing with stiff legs", "Sacrificing form for speed"],
  },
  "Kettlebell Swings": {
    phases: [
      { label: "Setup", description: "Feet wider than shoulders. Kettlebell arm's length in front. Hinge to grab it." },
      { label: "Hike", description: "Hike bell back between legs like hiking a football. Maintain flat back." },
      { label: "Drive", description: "Explosively extend hips. Arms are just ropes — power comes from hips." },
      { label: "Float", description: "Bell floats to chest/eye height. Arms straight. Then let gravity return it." },
    ],
    cues: ["This is a HIP HINGE — not a squat or arm lift", "Power comes 100% from hip extension", "Arms are passive — they just hold the bell", "Squeeze glutes hard at the top like you're standing for a photo"],
    mistakes: ["Squatting instead of hinging", "Using arms to lift the bell", "Rounding lower back on the backswing", "Going too high — eye level is sufficient"],
  },
  "Walking Lunges": {
    phases: [
      { label: "Step", description: "Take a long stride forward. Land heel first." },
      { label: "Lower", description: "Drop rear knee toward floor. Front shin stays vertical. Torso upright." },
      { label: "Drive", description: "Push through front heel to step forward into next rep." },
    ],
    cues: ["Long stride — short steps stress knees", "Front knee stays over ankle, not past toes", "Rear knee grazes floor", "Upright torso throughout"],
    mistakes: ["Front knee past toes", "Leaning forward", "Short steps", "Wobbling laterally — engage core"],
  },
  "Bulgarian Split Squat": {
    phases: [
      { label: "Setup", description: "Rear foot on bench, laces down. Front foot 2-3 feet in front of bench." },
      { label: "Lower", description: "Drop straight down. Front shin stays vertical. Rear knee toward floor." },
      { label: "Drive", description: "Push through front heel. Squeeze front glute at top." },
    ],
    cues: ["Front shin vertical at bottom — adjust foot distance", "Most weight on front leg — rear leg is for balance", "Slight forward lean engages glutes more", "Start with bodyweight to find the right distance"],
    mistakes: ["Front foot too close to bench — knee goes past toes", "Rear foot too high on bench — hip flexor strain", "Relying too much on rear leg for push", "Not going deep enough"],
  },
  "Lat Pulldown": {
    phases: [
      { label: "Setup", description: "Grip wider than shoulders. Sit with thighs under pads. Lean back slightly." },
      { label: "Pull", description: "Drive elbows DOWN toward back pockets. Pull bar to upper chest." },
      { label: "Squeeze", description: "Squeeze lats at bottom. Hold 1 second." },
      { label: "Return", description: "Control the bar back up. Full stretch at top." },
    ],
    cues: ["Think 'elbows to hips' not 'hands to chest'", "Slight lean back — don't rock excessively", "Full stretch at top — let lats lengthen", "Grip width: slightly wider than shoulders"],
    mistakes: ["Pulling behind neck — shoulder impingement", "Using momentum/rocking", "Gripping too wide — reduces range of motion", "Not going to full extension at top"],
  },
  "Dumbbell Row": {
    phases: [
      { label: "Setup", description: "One hand and knee on bench. Opposite foot on floor. Back flat, parallel to ground." },
      { label: "Pull", description: "Drive elbow up and back. Pull dumbbell toward hip." },
      { label: "Squeeze", description: "Squeeze shoulder blade toward spine at top. Hold 1 second." },
      { label: "Lower", description: "Full extension at bottom. Feel the lat stretch." },
    ],
    cues: ["Row to hip, not to chest — engages lats more", "Keep hips square — don't rotate torso", "Full range of motion — stretch at bottom, squeeze at top", "Initiate with back, not bicep"],
    mistakes: ["Rotating torso to get the weight up", "Pulling to chest instead of hip", "Not going to full extension", "Using too much bicep"],
  },
  "Tricep Pushdown": {
    phases: [
      { label: "Setup", description: "Stand facing cable machine. Elbows pinned at sides. Grip bar/rope at chest height." },
      { label: "Push", description: "Extend elbows, pushing weight down. Only forearms move." },
      { label: "Squeeze", description: "Lock out at bottom. Squeeze triceps hard." },
      { label: "Return", description: "Slow return to chest height. Don't let elbows drift forward." },
    ],
    cues: ["Elbows GLUED to sides — they don't move", "Full lockout at bottom for peak contraction", "Lean slightly forward for better angle", "Control the negative"],
    mistakes: ["Elbows moving — using shoulders", "Leaning too far forward — using body weight", "Partial reps — not locking out", "Going too heavy — body compensates"],
  },
  "Cable Crossover": {
    phases: [
      { label: "Setup", description: "Set pulleys above head height. Step forward into split stance. Arms out wide." },
      { label: "Bring Together", description: "Sweep arms down and together in a hugging arc. Slight elbow bend throughout." },
      { label: "Squeeze", description: "Hands meet or cross at belly button height. Squeeze chest hard." },
      { label: "Return", description: "Control the stretch back. Feel chest opening." },
    ],
    cues: ["Pulley height changes emphasis — high=lower chest, low=upper chest", "Maintain same elbow bend throughout", "Step through to get a full stretch", "Squeeze hard at the contraction point"],
    mistakes: ["Straightening arms — turns into a different exercise", "Leaning too far forward", "Not enough range of motion", "Going too heavy — losing the squeeze"],
  },
};

// ─── Auto-generate basic guide for exercises without detailed ones ──
function generateBasicGuide(name: string, muscle: string, type: string): ExerciseGuide {
  if (type === "Cardio") {
    return {
      phases: [
        { label: "Warm Up", description: `Start at low intensity for 3-5 minutes. Gradually increase pace.` },
        { label: "Working Set", description: `Maintain target heart rate zone (60-85% max). Focus on form and breathing rhythm.` },
        { label: "Cool Down", description: `Gradually reduce intensity over 3-5 minutes. Allow heart rate to normalize.` },
      ],
      cues: ["Maintain steady breathing rhythm", "Keep posture upright — don't slouch", "Stay in target heart rate zone", "Hydrate consistently"],
      mistakes: ["Starting too fast — leads to early burnout", "Poor posture — reduces efficiency and causes strain", "Ignoring warm-up — injury risk increases", "Not cooling down — affects recovery"],
    };
  }

  if (type === "Flexibility") {
    return {
      phases: [
        { label: "Position", description: `Get into the stretch position slowly and with control. Target: ${muscle}.` },
        { label: "Hold", description: `Hold for 20-30 seconds. Breathe deeply and relax into the stretch.` },
        { label: "Deepen", description: `On each exhale, try to deepen the stretch slightly. Never force past discomfort.` },
      ],
      cues: ["Breathe deeply — exhale to deepen the stretch", "Never bounce — hold steady", "Mild discomfort is OK, sharp pain is not", "Hold 20-30 seconds minimum per stretch"],
      mistakes: ["Bouncing in the stretch — causes muscle tightening", "Holding breath — prevents muscle relaxation", "Forcing past pain — risk of muscle tears", "Rushing through — stretching requires patience"],
    };
  }

  if (type === "HIIT") {
    return {
      phases: [
        { label: "Setup", description: `Starting position. Brace core, maintain good posture. Target muscles: ${muscle}.` },
        { label: "Execute", description: `Perform the movement with explosive power. Full range of motion on every rep.` },
        { label: "Reset", description: `Return to start position with control. Brief pause, then repeat.` },
      ],
      cues: ["Explosive power on concentric phase", "Land softly to protect joints", "Maintain core bracing throughout", "Quality reps > fast reps — don't sacrifice form for speed"],
      mistakes: ["Sacrificing form for speed", "Not using full range of motion", "Landing with stiff joints — absorb impact", "Going to failure on every set — leads to breakdown"],
    };
  }

  // Strength default
  return {
    phases: [
      { label: "Setup", description: `Get into position targeting ${muscle}. Establish stable base and proper alignment.` },
      { label: "Execute", description: `Perform the movement with control. Focus on the target muscle: ${muscle}.` },
      { label: "Control", description: `Return to start position under control. Maintain tension on the working muscle.` },
    ],
    cues: ["Control the weight through full range of motion", `Focus on feeling ${muscle} working`, "Maintain proper breathing — exhale on exertion", "Keep core braced for stability"],
    mistakes: ["Using momentum instead of muscle contraction", "Partial range of motion", "Going too heavy — sacrificing form", "Rushing reps — time under tension matters"],
  };
}

function getGuide(name: string, muscle: string, type: string): ExerciseGuide {
  return DETAILED_GUIDES[name] || generateBasicGuide(name, muscle, type);
}

// ─── Exercise Illustration (Phase Breakdown) ────────────────────────
function ExercisePhases({ guide }: { guide: ExerciseGuide }) {
  const [phase, setPhase] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
        {guide.phases.map((p, i) => (
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

      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-2xl p-5"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-display font-black text-white/80">{phase + 1}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-sm text-white mb-1">{guide.phases[phase].label}</p>
              <p className="text-sm text-foreground/70 leading-relaxed">{guide.phases[phase].description}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {guide.phases.map((_, i) => (
            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === phase ? "w-6 bg-white" : i < phase ? "w-2 bg-white/40" : "w-2 bg-white/10"}`} />
          ))}
        </div>
        <button onClick={() => setPhase((p) => (p + 1) % guide.phases.length)} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-white transition-colors">
          <RotateCcw className="w-3.5 h-3.5" /> Next
        </button>
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────
const ExerciseGuidePage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedExName, setSelectedExName] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const selectedEx = useMemo(() => {
    if (!selectedExName) return null;
    return exerciseDb.find((e) => e.name === selectedExName) || null;
  }, [selectedExName]);

  const filteredExercises = useMemo(() => {
    if (search) {
      return exerciseDb.filter((e) =>
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.muscle.toLowerCase().includes(search.toLowerCase()) ||
        e.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory && selectedCategory !== "All") {
      return exerciseDb.filter((e) => e.category === selectedCategory);
    }
    return [];
  }, [search, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    exerciseDb.forEach((e) => { counts[e.category] = (counts[e.category] || 0) + 1; });
    return counts;
  }, []);

  // Exercise detail view
  if (selectedEx) {
    const guide = getGuide(selectedEx.name, selectedEx.muscle, selectedEx.type);
    const hasDetailed = !!DETAILED_GUIDES[selectedEx.name];

    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-lg border-b border-[rgba(192,192,192,0.08)]">
          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => setSelectedExName(null)} className="p-2 -ml-2 rounded-lg hover:bg-white/5">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="min-w-0">
              <h1 className="text-lg font-display font-bold truncate">{selectedEx.name}</h1>
              <p className="text-[10px] text-muted-foreground">{selectedEx.category} — {selectedEx.type}</p>
            </div>
            {hasDetailed && (
              <span className="ml-auto px-2 py-0.5 text-[9px] uppercase tracking-wider rounded bg-white/10 border border-white/10 text-white/50 flex-shrink-0">
                Detailed
              </span>
            )}
          </div>
        </div>

        <motion.div {...fadeUp} className="px-4 py-4 space-y-6">
          {/* Muscle tags */}
          <div className="flex flex-wrap gap-1.5">
            {selectedEx.muscle.split(", ").map((m) => (
              <span key={m} className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                {m}
              </span>
            ))}
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-full bg-white/5 border border-white/10 text-muted-foreground">
              MET: {selectedEx.met}
            </span>
          </div>

          {/* Movement breakdown */}
          <div>
            <h2 className="text-xs font-display font-bold uppercase tracking-widest mb-3 text-muted-foreground">Movement Breakdown</h2>
            <ExercisePhases guide={guide} />
          </div>

          {/* Form cues */}
          <div>
            <h2 className="text-xs font-display font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" /> Key Cues
            </h2>
            <div className="space-y-2">
              {guide.cues.map((cue, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-3 bg-emerald-500/[0.04] border border-emerald-500/10 rounded-xl p-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-[10px] font-mono text-emerald-400 flex-shrink-0 mt-0.5">{i + 1}</span>
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
            <div className="space-y-2">
              {guide.mistakes.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                  className="flex items-start gap-3 bg-red-500/[0.04] border border-red-500/10 rounded-xl p-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 mt-2 flex-shrink-0" />
                  <span className="text-sm text-foreground/60 leading-relaxed">{m}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Category exercises list
  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-lg border-b border-[rgba(192,192,192,0.08)]">
          <div className="flex items-center gap-3 px-4 py-3">
            <button onClick={() => setSelectedCategory(null)} className="p-2 -ml-2 rounded-lg hover:bg-white/5">
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
            <h1 className="text-lg font-display font-bold">{selectedCategory}</h1>
            <span className="text-xs text-muted-foreground ml-auto">{filteredExercises.length} exercises</span>
          </div>
        </div>

        <motion.div className="px-4 py-4 space-y-2" variants={stagger} initial="initial" animate="animate">
          {filteredExercises.map((ex) => (
            <motion.button key={ex.name} variants={fadeUp} whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedExName(ex.name)}
              className="w-full text-left rounded-xl border border-[rgba(192,192,192,0.08)] bg-[rgba(192,192,192,0.03)] hover:bg-white/5 p-3.5 transition-colors">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-display font-bold text-sm truncate">{ex.name}</p>
                    {DETAILED_GUIDES[ex.name] && (
                      <span className="px-1.5 py-0.5 text-[8px] uppercase tracking-wider rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex-shrink-0">
                        Detailed
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{ex.muscle}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    );
  }

  // Search results
  const searchResults = search ? filteredExercises : [];

  // Main view
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 pt-6 pb-4">
        <motion.div {...fadeUp}>
          <div className="flex items-center gap-2 mb-1">
            <Dumbbell className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-display font-bold">Exercise Guide</h1>
          </div>
          <p className="text-xs text-muted-foreground">{exerciseDb.length} exercises with form breakdowns and coaching cues</p>
        </motion.div>
      </div>

      {/* Search */}
      <div className="px-4 mb-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search exercises, muscles..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[rgba(192,192,192,0.04)] border border-[rgba(192,192,192,0.08)] text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-white/20" />
        </div>
      </div>

      {/* Search results */}
      {search && (
        <motion.div className="px-4 space-y-2 mb-6" variants={stagger} initial="initial" animate="animate">
          {searchResults.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No exercises found</p>}
          {searchResults.map((ex) => (
            <motion.button key={ex.name} variants={fadeUp} whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedExName(ex.name)}
              className="w-full text-left rounded-xl border border-[rgba(192,192,192,0.08)] bg-[rgba(192,192,192,0.03)] hover:bg-white/5 p-3 transition-colors">
              <div className="flex items-center gap-2">
                <p className="font-display font-bold text-sm">{ex.name}</p>
                {DETAILED_GUIDES[ex.name] && (
                  <span className="px-1.5 py-0.5 text-[8px] uppercase tracking-wider rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Detailed</span>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground">{ex.category} — {ex.muscle}</p>
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Category grid */}
      {!search && (
        <motion.div className="px-4 grid grid-cols-2 gap-2.5" variants={stagger} initial="initial" animate="animate">
          {categories.filter((c) => c !== "All").map((cat) => (
            <motion.button key={cat} variants={fadeUp} whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedCategory(cat)}
              className="rounded-xl border border-[rgba(192,192,192,0.08)] bg-[rgba(192,192,192,0.03)] hover:bg-white/5 p-5 text-left transition-colors">
              <p className="font-display font-bold text-sm">{cat}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{categoryCounts[cat] || 0} exercises</p>
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default ExerciseGuidePage;
