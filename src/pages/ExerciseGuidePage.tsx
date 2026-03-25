import { useState, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, RoundedBox, Sphere, Cylinder, Text, Environment } from "@react-three/drei";
import { Dumbbell, ArrowLeft, ChevronRight, Search, AlertTriangle, CheckCircle2 } from "lucide-react";
import * as THREE from "three";

const fadeUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };
const stagger = { animate: { transition: { staggerChildren: 0.06 } } };

interface MuscleGroup {
  id: string;
  name: string;
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  name: string;
  muscles: string[];
  cues: string[];
  mistakes: string[];
  animationType: "squat" | "press" | "curl" | "deadlift" | "plank" | "lunge";
}

const MUSCLE_GROUPS: MuscleGroup[] = [
  {
    id: "chest", name: "Chest",
    exercises: [
      { id: "bench-press", name: "Bench Press", muscles: ["Pectoralis Major", "Triceps", "Anterior Deltoid"], animationType: "press",
        cues: ["Retract shoulder blades", "Feet flat on floor", "Bar path: slight arc from chest to above shoulders", "Grip slightly wider than shoulder width"],
        mistakes: ["Flaring elbows too wide", "Bouncing bar off chest", "Lifting hips off bench", "Not locking out at top"] },
      { id: "push-up", name: "Push-Up", muscles: ["Pectoralis Major", "Triceps", "Core"], animationType: "plank",
        cues: ["Hands shoulder-width apart", "Body in straight line", "Lower until chest nearly touches floor", "Full lockout at top"],
        mistakes: ["Sagging hips", "Flaring elbows past 45°", "Incomplete range of motion", "Looking up (straining neck)"] },
    ],
  },
  {
    id: "back", name: "Back",
    exercises: [
      { id: "deadlift", name: "Deadlift", muscles: ["Erector Spinae", "Glutes", "Hamstrings", "Traps"], animationType: "deadlift",
        cues: ["Bar over mid-foot", "Hips hinge back", "Chest up, back flat", "Drive through heels", "Lock hips at top"],
        mistakes: ["Rounding lower back", "Bar drifting from body", "Jerking the bar", "Hyperextending at lockout"] },
      { id: "barbell-row", name: "Barbell Row", muscles: ["Latissimus Dorsi", "Rhomboids", "Biceps"], animationType: "deadlift",
        cues: ["Hinge to ~45° torso angle", "Pull bar to lower chest", "Squeeze shoulder blades", "Control the negative"],
        mistakes: ["Too much body english", "Pulling to belly button", "Standing too upright", "Using momentum"] },
    ],
  },
  {
    id: "legs", name: "Legs",
    exercises: [
      { id: "squat", name: "Barbell Squat", muscles: ["Quadriceps", "Glutes", "Hamstrings", "Core"], animationType: "squat",
        cues: ["Feet shoulder-width, toes slightly out", "Break at hips and knees simultaneously", "Knees track over toes", "Depth: hip crease below knee", "Drive up through mid-foot"],
        mistakes: ["Knees caving inward", "Heels rising", "Excessive forward lean", "Half-repping above parallel"] },
      { id: "lunge", name: "Walking Lunge", muscles: ["Quadriceps", "Glutes", "Hamstrings"], animationType: "lunge",
        cues: ["Long stride", "Front knee stays over ankle", "Rear knee grazes floor", "Upright torso"],
        mistakes: ["Front knee past toes", "Leaning forward", "Short steps", "Wobbling laterally"] },
    ],
  },
  {
    id: "shoulders", name: "Shoulders",
    exercises: [
      { id: "ohp", name: "Overhead Press", muscles: ["Deltoids", "Triceps", "Upper Chest"], animationType: "press",
        cues: ["Bar at collarbone", "Brace core tight", "Press straight up", "Head through at lockout"],
        mistakes: ["Excessive back arch", "Pressing in front of face", "Not locking out", "Using leg drive (strict press)"] },
    ],
  },
  {
    id: "arms", name: "Arms",
    exercises: [
      { id: "bicep-curl", name: "Bicep Curl", muscles: ["Biceps Brachii", "Brachialis"], animationType: "curl",
        cues: ["Elbows pinned to sides", "Full extension at bottom", "Squeeze at top", "Control the negative"],
        mistakes: ["Swinging body", "Moving elbows forward", "Incomplete ROM", "Going too heavy"] },
    ],
  },
];

// ─── 3D Animated Figure ────────────────────────────────────────────
function AnimatedFigure({ animationType }: { animationType: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!groupRef.current) return;
    const t = timeRef.current;

    const children = groupRef.current.children;
    // Torso = 0, Head = 1, LeftArm = 2, RightArm = 3, LeftLeg = 4, RightLeg = 5

    switch (animationType) {
      case "squat": {
        const phase = Math.sin(t * 1.5) * 0.5 + 0.5; // 0-1
        const squat = phase * 0.6;
        groupRef.current.position.y = -squat;
        if (children[4]) children[4].rotation.x = squat * 0.8;
        if (children[5]) children[5].rotation.x = squat * 0.8;
        break;
      }
      case "press": {
        const phase = Math.sin(t * 1.5) * 0.5 + 0.5;
        if (children[2]) children[2].rotation.x = -Math.PI * 0.5 - phase * 0.8;
        if (children[3]) children[3].rotation.x = -Math.PI * 0.5 - phase * 0.8;
        break;
      }
      case "curl": {
        const phase = Math.sin(t * 2) * 0.5 + 0.5;
        if (children[2]) children[2].rotation.x = -phase * 2.2;
        if (children[3]) children[3].rotation.x = -phase * 2.2;
        break;
      }
      case "deadlift": {
        const phase = Math.sin(t * 1.2) * 0.5 + 0.5;
        groupRef.current.rotation.x = phase * 0.5;
        groupRef.current.position.y = -phase * 0.3;
        break;
      }
      case "plank": {
        groupRef.current.rotation.x = Math.PI * 0.45;
        groupRef.current.position.y = -0.5;
        const breathe = Math.sin(t * 2) * 0.02;
        groupRef.current.position.y += breathe;
        break;
      }
      case "lunge": {
        const phase = Math.sin(t * 1.3) * 0.5 + 0.5;
        if (children[4]) children[4].rotation.x = phase * 1.2;
        if (children[5]) children[5].rotation.x = -phase * 0.5;
        groupRef.current.position.y = -phase * 0.4;
        break;
      }
    }
  });

  const skinColor = "#e0b090";
  const jointColor = "#c89070";

  return (
    <group ref={groupRef}>
      {/* Torso */}
      <RoundedBox args={[0.7, 1, 0.35]} radius={0.08} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={skinColor} roughness={0.6} />
      </RoundedBox>
      {/* Head */}
      <Sphere args={[0.22]} position={[0, 1.25, 0]}>
        <meshStandardMaterial color={skinColor} roughness={0.5} />
      </Sphere>
      {/* Left Arm */}
      <group position={[-0.5, 0.85, 0]}>
        <Cylinder args={[0.08, 0.07, 0.7]} position={[0, -0.35, 0]}>
          <meshStandardMaterial color={jointColor} roughness={0.6} />
        </Cylinder>
      </group>
      {/* Right Arm */}
      <group position={[0.5, 0.85, 0]}>
        <Cylinder args={[0.08, 0.07, 0.7]} position={[0, -0.35, 0]}>
          <meshStandardMaterial color={jointColor} roughness={0.6} />
        </Cylinder>
      </group>
      {/* Left Leg */}
      <group position={[-0.18, -0.05, 0]}>
        <Cylinder args={[0.1, 0.08, 0.9]} position={[0, -0.45, 0]}>
          <meshStandardMaterial color={jointColor} roughness={0.6} />
        </Cylinder>
      </group>
      {/* Right Leg */}
      <group position={[0.18, -0.05, 0]}>
        <Cylinder args={[0.1, 0.08, 0.9]} position={[0, -0.45, 0]}>
          <meshStandardMaterial color={jointColor} roughness={0.6} />
        </Cylinder>
      </group>
    </group>
  );
}

function ExerciseScene({ animationType }: { animationType: string }) {
  return (
    <Canvas camera={{ position: [0, 1, 4], fov: 40 }} style={{ background: "transparent" }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 3]} intensity={1} />
      <directionalLight position={[-2, 3, -1]} intensity={0.3} />
      <Suspense fallback={null}>
        <AnimatedFigure animationType={animationType} />
        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[6, 6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>
      </Suspense>
      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={0.5} maxPolarAngle={1.5} />
    </Canvas>
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
            <h1 className="text-lg font-display font-bold truncate">{selectedExercise.name}</h1>
          </div>
        </div>

        <motion.div {...fadeUp} className="space-y-5">
          {/* 3D viewer */}
          <div className="h-[300px] relative">
            <ExerciseScene animationType={selectedExercise.animationType} />
            <div className="absolute bottom-2 left-0 right-0 text-center">
              <p className="text-[10px] text-muted-foreground/50">Drag to rotate</p>
            </div>
          </div>

          <div className="px-4 space-y-5">
            {/* Muscle tags */}
            <div className="flex flex-wrap gap-1.5">
              {selectedExercise.muscles.map((m) => (
                <span key={m} className="px-2.5 py-1 text-[10px] uppercase tracking-wider rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  {m}
                </span>
              ))}
            </div>

            {/* Form cues */}
            <div>
              <h2 className="text-sm font-display font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Form Cues
              </h2>
              <div className="space-y-2">
                {selectedExercise.cues.map((cue, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[10px] font-mono text-emerald-400 flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-foreground/80">{cue}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Common mistakes */}
            <div>
              <h2 className="text-sm font-display font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" /> Common Mistakes
              </h2>
              <div className="space-y-2">
                {selectedExercise.mistakes.map((mistake, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/50 mt-2 flex-shrink-0" />
                    <span className="text-foreground/60">{mistake}</span>
                  </div>
                ))}
              </div>
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
            <h1 className="text-lg font-display font-bold">{selectedGroup.name} Exercises</h1>
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
                  <p className="text-[10px] text-muted-foreground mt-1">{ex.muscles.join(" · ")}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    );
  }

  // Main view — muscle groups
  const allExercises = MUSCLE_GROUPS.flatMap((g) => g.exercises.map((e) => ({ ...e, groupName: g.name })));
  const filtered = search
    ? allExercises.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()) || e.groupName.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="px-4 pt-6 pb-4">
        <motion.div {...fadeUp}>
          <div className="flex items-center gap-2 mb-1">
            <Dumbbell className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-display font-bold">Exercise Guide</h1>
          </div>
          <p className="text-xs text-muted-foreground">3D form demos with coaching cues</p>
        </motion.div>
      </div>

      {/* Search */}
      <div className="px-4 mb-5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search exercises..."
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
              <p className="text-[10px] text-muted-foreground">{ex.groupName} · {ex.muscles.join(" · ")}</p>
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
