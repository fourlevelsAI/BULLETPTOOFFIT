import { motion } from "framer-motion";
import { ArrowRight, Flame, BarChart3, Dumbbell, Camera, Mic, Scan, Star, Apple, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ULogo from "@/components/ULogo";
import ThemeToggle from "@/components/ThemeToggle";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 17 } },
};

const features = [
  { step: "01", title: "Track calories, macros & more", desc: "Log even faster with barcode scan, photo AI, and voice logging.", icon: Scan },
  { step: "02", title: "Follow your progress", desc: "Build long-term habits with visual charts, streaks, and weekly insights.", icon: BarChart3 },
  { step: "03", title: "Train smarter", desc: "Log workouts, track sets & reps, and sync calories burned to your daily goals.", icon: Dumbbell },
];

const tools = [
  { icon: Scan, label: "Barcode Scan" },
  { icon: Camera, label: "Photo AI" },
  { icon: Mic, label: "Voice Log" },
  { icon: Flame, label: "Calorie Tracking" },
];

const testimonials = [
  { name: "Jason L.", text: "Helped me get moving on my goals and tracking my weight loss." },
  { name: "Dinah M.", text: "Friendly, easy-to-use app that keeps me accountable every day." },
  { name: "Rohit S.", text: "Understanding the food I eat changed everything. No fad diets needed." },
  { name: "Brooke N.", text: "I'm feeling confident and empowered with who I am." },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ULogo size={32} />
            <span className="font-heading text-lg font-bold tracking-tight">BULLETPROOFFIT</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => navigate("/auth")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
            >
              Log In
            </button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/auth")}
              className="bg-foreground text-background px-5 py-2 rounded-lg text-sm font-semibold font-body hover:opacity-90 transition-opacity"
            >
              Start Free
            </motion.button>
          </div>
        </div>
      </nav>

      {/* ═══ SECTION 1: Hero — Light ═══ */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-background">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, hsl(var(--foreground) / 0.04) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.04) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-foreground font-body mb-4">The #1 Fitness Tracking App</p>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-[5rem] lg:text-[5.5rem] font-black font-heading leading-[0.88] tracking-[-0.03em] text-foreground"
            >
              NUTRITION
              <br />
              TRACKING FOR
              <br />
              <span className="text-muted-foreground">REAL LIFE</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg font-body mt-6 max-w-md text-foreground/80">
              Make progress with the all-in-one food, exercise, and calorie tracker. Better than counting — understanding.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mt-8">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/auth")}
                className="bg-foreground text-background px-8 py-4 rounded-lg text-sm font-bold font-body flex items-center gap-2 hover:bg-background hover:text-foreground hover:ring-2 hover:ring-foreground transition-all"
              >
                START TODAY <ArrowRight className="w-4 h-4" />
              </motion.button>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
                  ))}
                </div>
                <span className="text-xs font-body font-semibold text-foreground">4.8 Rating</span>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mt-8">
              <motion.a whileTap={{ scale: 0.97 }} href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-foreground rounded-lg px-4 py-2.5 hover:bg-foreground hover:text-background transition-all">
                <Apple className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-[10px] font-body leading-none opacity-70">Download on the</p>
                  <p className="text-sm font-semibold font-body leading-tight">App Store</p>
                </div>
              </motion.a>
              <motion.a whileTap={{ scale: 0.97 }} href="https://play.google.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-foreground rounded-lg px-4 py-2.5 hover:bg-foreground hover:text-background transition-all">
                <Smartphone className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-[10px] font-body leading-none opacity-70">Get it on</p>
                  <p className="text-sm font-semibold font-body leading-tight">Google Play</p>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ═══ iPhone 16 Pro — Cleaned Up ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex justify-center"
            style={{ perspective: '1200px' }}
          >
            <div className="relative iphone-float">
              {/* Ground reflection */}
              <div
                className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-[80%] h-[50px] pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                }}
              />

              {/* Phone body — 300×620, correct iPhone 16 Pro proportions */}
              <div
                className="w-[300px] h-[620px] relative"
                style={{
                  background: 'linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 30%, #0d0d0d 50%, #1a1a1a 70%, #2a2a2a 100%)',
                  borderRadius: '54px',
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.12),
                    0 0 0 3px #3a3732,
                    0 0 0 4px rgba(255,255,255,0.06),
                    0 40px 80px rgba(0,0,0,0.5),
                    0 20px 40px rgba(0,0,0,0.35)
                  `,
                }}
              >
                {/* Titanium band texture */}
                <div
                  className="absolute inset-[2px] pointer-events-none"
                  style={{
                    borderRadius: '52px',
                    background: 'linear-gradient(135deg, #4a4540 0%, #2d2a26 25%, #1a1816 50%, #2d2a26 75%, #4a4540 100%)',
                  }}
                />

                {/* Side buttons — subtle, 3px wide */}
                <div className="absolute left-[-3px] top-[140px] w-[3px] h-[32px] rounded-l-[2px]"
                  style={{ background: '#2a2a2a' }} />
                <div className="absolute left-[-3px] top-[182px] w-[3px] h-[32px] rounded-l-[2px]"
                  style={{ background: '#2a2a2a' }} />
                <div className="absolute right-[-3px] top-[155px] w-[3px] h-[64px] rounded-r-[2px]"
                  style={{ background: '#2a2a2a' }} />

                {/* Screen */}
                <div
                  className="absolute overflow-hidden"
                  style={{
                    top: '10px', left: '10px', right: '10px', bottom: '10px',
                    borderRadius: '44px',
                    background: '#000',
                    boxShadow: 'inset 0 0 60px rgba(255,255,255,0.03)',
                  }}
                >
                  <div className="w-full h-full bg-card relative overflow-hidden">
                    {/* Dynamic Island — centered, no overlaps */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 z-20"
                      style={{
                        top: '12px',
                        width: '120px', height: '34px',
                        background: '#000',
                        borderRadius: '20px',
                        boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
                      }}
                    />

                    {/* Status bar — 54px height, no overlaps */}
                    <div className="absolute top-0 left-0 right-0 h-[54px] z-10 flex items-start px-6 pt-[16px]">
                      {/* Time — left, clear of Dynamic Island */}
                      <span className="text-[15px] font-semibold text-foreground font-body leading-none">9:41</span>
                      <div className="flex-1" />
                      {/* Right indicators — small, no overlap */}
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-[2px] items-end">
                          {[4, 6, 8, 11].map((h, i) => (
                            <div key={i} className="w-[3px] rounded-sm bg-foreground" style={{ height: `${h}px` }} />
                          ))}
                        </div>
                        <svg width="14" height="10" viewBox="0 0 14 10" className="fill-foreground">
                          <path d="M1 3.5C3.5 1 6 0 7 0s3.5 1 6 3.5L7 10 1 3.5z" />
                        </svg>
                        <div className="w-[22px] h-[10px] rounded-[2px] border border-foreground/50 relative overflow-hidden">
                          <div className="absolute inset-[1.5px] right-[4px] bg-foreground rounded-[1px]" />
                          <div className="absolute right-[-2px] top-1/2 -translate-y-1/2 w-[1.5px] h-[4px] bg-foreground/50 rounded-r-sm" />
                        </div>
                      </div>
                    </div>

                    {/* App content — starts below 54px status bar */}
                    <div className="p-4 pt-[54px] space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[9px] text-muted-foreground font-mono tracking-wider">SYS:01 DASHBOARD</p>
                          <p className="text-sm font-bold font-heading">HEY, ATHLETE</p>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] border border-border rounded px-1.5 py-0.5">
                          <Flame className="w-2.5 h-2.5" /> 7
                        </div>
                      </div>

                      {/* Calorie ring card */}
                      <div className="rounded-lg bg-card border border-border p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-[60px] h-[60px] rounded-full border-[3px] border-foreground flex items-center justify-center relative shrink-0">
                            <div className="absolute inset-0 rounded-full border-[3px] border-muted" />
                            <div className="text-center">
                              <p className="text-[12px] font-bold font-mono leading-tight">1,247</p>
                              <p className="text-[8px] text-muted-foreground">left</p>
                            </div>
                          </div>
                          <div className="flex-1 space-y-1.5 min-w-0">
                            <div className="flex justify-between text-[10px] font-body">
                              <span className="text-muted-foreground">Eaten</span>
                              <span className="font-mono font-medium">753 cal</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-body">
                              <span className="text-muted-foreground">Goal</span>
                              <span className="font-mono font-medium">2,000 cal</span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {["P", "C", "F"].map((m, i) => (
                            <div key={m}>
                              <div className="flex justify-between text-[9px] text-muted-foreground font-body">
                                <span>{m}</span>
                                <span className="font-mono">{[42, 85, 22][i]}g</span>
                              </div>
                              <div className="h-1 bg-muted rounded-full mt-0.5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${[28, 34, 33][i]}%` }}
                                  transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                                  className="h-full bg-foreground rounded-full"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Meals */}
                      <div>
                        <p className="text-[9px] text-muted-foreground font-body tracking-widest uppercase mb-1.5">Today's Meals</p>
                        {["Breakfast", "Lunch", "Dinner"].map((meal) => (
                          <div key={meal} className="rounded-lg bg-card border border-border mb-1.5 flex items-center justify-between p-2.5">
                            <div className="min-w-0">
                              <p className="text-[10px] font-medium font-body">{meal}</p>
                              <p className="text-[8px] text-muted-foreground font-body truncate">
                                {meal === "Dinner" ? "Not logged yet" : "Oatmeal, eggs…"}
                              </p>
                            </div>
                            <p className="text-[10px] font-semibold font-mono shrink-0 ml-2">
                              {meal === "Dinner" ? "—" : "430 cal"}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Home indicator */}
                    <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2">
                      <div className="w-[100px] h-[4px] rounded-full bg-foreground/20" />
                    </div>
                  </div>

                  {/* Screen glare */}
                  <div
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%)',
                      borderRadius: '44px',
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 2: How It Works — DARK ═══ */}
      <section className="py-20 px-6 bg-[#0D0D0D] text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.15em] uppercase text-white/60 font-body mb-3">How It Works</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-heading text-white">
              HIT YOUR GOALS IN 1-2-3
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((f) => (
              <motion.div
                key={f.step}
                variants={fadeUp}
                whileHover={{ y: -2 }}
                className="relative p-8 space-y-4 rounded-lg border-[1.5px] border-white/20 bg-white/5"
                style={{ boxShadow: '4px 4px 0px rgba(255,255,255,0.15)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black font-heading text-white/20">{f.step}</span>
                  <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-[#0D0D0D]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold font-heading text-white">{f.title}</h3>
                <p className="text-sm text-white/70 font-body">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 3: Logging Tools — Light ═══ */}
      <section className="py-20 px-6 bg-[#FAFAFA] dark:bg-background">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.15em] uppercase text-foreground/60 font-body mb-3">Logging Tools</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-heading text-foreground">
              LOG FASTER THAN EVER
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body mt-4 max-w-md mx-auto text-foreground/70">
              Barcode scan, AI photo recognition, voice logging, and smart search — all built in.
            </motion.p>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {tools.map((t) => (
              <motion.div
                key={t.label}
                variants={scaleIn}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="relative p-6 flex flex-col items-center gap-3 text-center cursor-pointer rounded-lg bg-card border-[1.5px] border-foreground"
                style={{ boxShadow: '4px 4px 0px hsl(var(--foreground))' }}
              >
                <div className="w-14 h-14 rounded-xl bg-foreground flex items-center justify-center">
                  <t.icon className="w-6 h-6 text-background" />
                </div>
                <span className="text-sm font-extrabold font-body text-foreground">{t.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 4: Testimonials — DARK ═══ */}
      <section className="py-20 px-6 bg-[#0D0D0D] text-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.div variants={fadeUp} className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-white text-white" />
              ))}
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-heading text-white">
              REAL RESULTS
            </motion.h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-4"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={fadeUp}
                whileHover={{ y: -2 }}
                className="p-6 rounded-lg border-[1.5px] border-white/20 bg-white/5"
                style={{ boxShadow: '4px 4px 0px rgba(255,255,255,0.1)' }}
              >
                <p className="text-sm text-white/80 font-body italic mb-3">"{t.text}"</p>
                <p className="text-xs font-bold font-body text-white">{t.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 5: CTA — DARK ═══ */}
      <section className="py-20 px-6 bg-[#0D0D0D] text-white">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <motion.div variants={fadeUp}>
            <ULogo size={80} animated className="mx-auto" />
          </motion.div>
          <motion.p variants={fadeUp} className="text-xs font-bold tracking-[0.3em] uppercase text-white/60 font-body">BULLETPROOFFIT</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-heading text-white">
            START TODAY
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/70 font-body">
            Join thousands tracking their nutrition and building healthier habits — for free.
          </motion.p>
          <motion.div variants={fadeUp}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/auth")}
              className="bg-white text-[#0D0D0D] px-10 py-4 rounded-lg text-sm font-bold font-body inline-flex items-center gap-2 hover:bg-transparent hover:text-white hover:ring-2 hover:ring-white transition-all"
            >
              CREATE FREE ACCOUNT <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
          <motion.div variants={fadeUp} className="flex justify-center items-center gap-3 pt-4">
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-white/30 rounded-lg px-4 py-2.5 hover:bg-white hover:text-[#0D0D0D] transition-all text-white">
              <Apple className="w-5 h-5" />
              <div className="text-left">
                <p className="text-[10px] font-body leading-none opacity-60">Download on the</p>
                <p className="text-sm font-semibold font-body leading-tight">App Store</p>
              </div>
            </a>
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border-2 border-white/30 rounded-lg px-4 py-2.5 hover:bg-white hover:text-[#0D0D0D] transition-all text-white">
              <Smartphone className="w-5 h-5" />
              <div className="text-left">
                <p className="text-[10px] font-body leading-none opacity-60">Get it on</p>
                <p className="text-sm font-semibold font-body leading-tight">Google Play</p>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ Footer — #000 ═══ */}
      <footer className="py-8 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ULogo size={24} />
            <span className="text-xs text-white/50 font-body">© 2026 BULLETPROOFFIT. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-white/50 hover:text-white font-body transition-colors">Privacy</a>
            <a href="#" className="text-xs text-white/50 hover:text-white font-body transition-colors">Terms</a>
            <a href="#" className="text-xs text-white/50 hover:text-white font-body transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
