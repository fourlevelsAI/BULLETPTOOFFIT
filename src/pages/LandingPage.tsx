import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Flame, BarChart3, Dumbbell, Camera, Mic, Scan, Star, Apple, Smartphone, ChevronRight } from "lucide-react";
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

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(13,13,13,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(13,13,13,0.04) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={fadeUp}>
              <p className="code-label mb-4">The #1 Fitness Tracking App</p>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-[5rem] lg:text-[5.5rem] font-black font-heading leading-[0.88] tracking-[-0.03em]"
            >
              NUTRITION
              <br />
              TRACKING FOR
              <br />
              <span style={{ color: '#888888' }}>REAL LIFE</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-muted-foreground font-body mt-6 max-w-md">
              Make progress with the all-in-one food, exercise, and calorie tracker. Better than counting — understanding.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mt-8">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/auth")}
                className="bg-foreground text-background px-8 py-4 rounded-lg text-sm font-bold font-body flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                START TODAY <ArrowRight className="w-4 h-4" />
              </motion.button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
                  ))}
                </div>
                <span className="text-xs font-body">4.8 Rating</span>
              </div>
            </motion.div>

            {/* App Store Badges */}
            <motion.div variants={fadeUp} className="flex items-center gap-3 mt-8">
              <motion.a
                whileTap={{ scale: 0.97 }}
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-border rounded-lg px-4 py-2.5 hover:bg-accent transition-colors"
              >
                <Apple className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-[10px] text-muted-foreground font-body leading-none">Download on the</p>
                  <p className="text-sm font-semibold font-body leading-tight">App Store</p>
                </div>
              </motion.a>
              <motion.a
                whileTap={{ scale: 0.97 }}
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-border rounded-lg px-4 py-2.5 hover:bg-accent transition-colors"
              >
                <Smartphone className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-[10px] text-muted-foreground font-body leading-none">Get it on</p>
                  <p className="text-sm font-semibold font-body leading-tight">Google Play</p>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex justify-center"
          >
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="relative w-[280px]"
            >
              <div className="w-full aspect-[9/19] rounded-[2.5rem] border-2 border-border bg-card overflow-hidden"
                style={{ boxShadow: '0 25px 60px -12px rgba(0,0,0,0.35)' }}>
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-background rounded-b-2xl z-10" />
                <div className="p-4 pt-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-muted-foreground font-mono">SYS:01 DASHBOARD</p>
                      <p className="text-sm font-bold font-heading">HEY, ATHLETE</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs border border-border rounded px-2 py-1">
                      <Flame className="w-3 h-3" /> 7
                    </div>
                  </div>

                  <div className="bracket-card">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full border-[3px] border-foreground flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-[3px] border-muted" />
                        <div className="text-center">
                          <p className="text-xs font-bold font-mono">1,247</p>
                          <p className="text-[8px] text-muted-foreground">left</p>
                        </div>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex justify-between text-[10px] font-body">
                          <span className="text-muted-foreground">Eaten</span>
                          <span className="font-mono">753 cal</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-body">
                          <span className="text-muted-foreground">Goal</span>
                          <span className="font-mono">2,000 cal</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-3">
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

                  <div>
                    <p className="text-[9px] text-muted-foreground font-body tracking-widest uppercase mb-2">Today's Meals</p>
                    {["Breakfast", "Lunch"].map((meal) => (
                      <div key={meal} className="bracket-card mb-1.5 flex items-center justify-between !p-2.5">
                        <div>
                          <p className="text-[10px] font-medium font-body">{meal}</p>
                          <p className="text-[8px] text-muted-foreground font-body">Oatmeal, eggs…</p>
                        </div>
                        <p className="text-[10px] font-semibold font-mono">430 cal</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -inset-8 bg-foreground/5 rounded-[3rem] blur-3xl -z-10" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Decorative grid line */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-border" />
      </div>

      {/* How It Works */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="code-label mb-3">How It Works</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-heading">
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
                className="bracket-card !p-8 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black font-heading text-muted-foreground/30">{f.step}</span>
                  <div className="w-10 h-10 rounded-lg bg-accent border border-border flex items-center justify-center">
                    <f.icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold font-heading">{f.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-border" /></div>

      {/* Tools */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.p variants={fadeUp} className="code-label mb-3">Logging Tools</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-heading">
              LOG FASTER THAN EVER
            </motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground font-body mt-4 max-w-md mx-auto">
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
                className="bracket-card !p-6 flex flex-col items-center gap-3 text-center cursor-pointer"
              >
                <div className="w-14 h-14 rounded-xl bg-accent border border-border flex items-center justify-center">
                  <t.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold font-body">{t.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-border" /></div>

      {/* Testimonials */}
      <section className="py-20 px-6">
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
                <Star key={i} className="w-5 h-5 fill-foreground text-foreground" />
              ))}
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-heading">
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
                className="bracket-card !p-6"
              >
                <p className="text-sm text-muted-foreground font-body italic mb-3">"{t.text}"</p>
                <p className="text-xs font-semibold font-body">{t.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6"><div className="h-px bg-border" /></div>

      {/* CTA */}
      <section className="py-20 px-6">
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
          <motion.p variants={fadeUp} className="code-label tracking-[0.3em]">BULLETPROOFFIT</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-heading">
            START TODAY
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground font-body">
            Join thousands tracking their nutrition and building healthier habits — for free.
          </motion.p>
          <motion.div variants={fadeUp}>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/auth")}
              className="bg-foreground text-background px-10 py-4 rounded-lg text-sm font-bold font-body inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
            >
              CREATE FREE ACCOUNT <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
          <motion.div variants={fadeUp} className="flex justify-center items-center gap-3 pt-4">
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border border-border rounded-lg px-4 py-2.5 hover:bg-accent transition-colors">
              <Apple className="w-5 h-5" />
              <div className="text-left">
                <p className="text-[10px] text-muted-foreground font-body leading-none">Download on the</p>
                <p className="text-sm font-semibold font-body leading-tight">App Store</p>
              </div>
            </a>
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 border border-border rounded-lg px-4 py-2.5 hover:bg-accent transition-colors">
              <Smartphone className="w-5 h-5" />
              <div className="text-left">
                <p className="text-[10px] text-muted-foreground font-body leading-none">Get it on</p>
                <p className="text-sm font-semibold font-body leading-tight">Google Play</p>
              </div>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ULogo size={24} />
            <span className="text-xs text-muted-foreground font-body">© 2026 BULLETPROOFFIT. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground font-body transition-colors">Privacy</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground font-body transition-colors">Terms</a>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground font-body transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
