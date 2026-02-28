import { motion } from "framer-motion";
import { ArrowRight, Flame, BarChart3, Dumbbell, Camera, Mic, Scan, Star, Smartphone, Apple, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const logoImg = "/logo.png";

const features = [
  {
    step: "01",
    title: "Track calories, macros & more",
    desc: "Log even faster with barcode scan, photo AI, and voice logging.",
    icon: Scan,
  },
  {
    step: "02",
    title: "Follow your progress",
    desc: "Build long-term habits with visual charts, streaks, and weekly insights.",
    icon: BarChart3,
  },
  {
    step: "03",
    title: "Train smarter",
    desc: "Log workouts, track sets & reps, and sync calories burned to your daily goals.",
    icon: Dumbbell,
  },
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
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoImg} alt="BULLETPROOFFIT" className="w-8 h-auto invert" />
            <span className="font-heading text-lg font-bold tracking-tight">BULLETPROOFFIT</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/auth")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="bg-foreground text-background px-5 py-2 rounded-lg text-sm font-semibold font-body hover:opacity-90 transition-opacity"
            >
              Start Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="code-label mb-4">The #1 Fitness Tracking App</p>
            <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tight leading-[0.9]">
              NUTRITION
              <br />
              TRACKING FOR
              <br />
              <span className="text-muted-foreground">REAL LIFE</span>
            </h1>
            <p className="text-lg text-muted-foreground font-body mt-6 max-w-md">
              Make progress with the all-in-one food, exercise, and calorie tracker. Better than counting — understanding.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8">
              <button
                onClick={() => navigate("/auth")}
                className="bg-foreground text-background px-8 py-4 rounded-lg text-sm font-bold font-body flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                START TODAY <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-foreground text-foreground" />
                  ))}
                </div>
                <span className="text-xs font-body">4.8 Rating</span>
              </div>
            </div>

            {/* App Store Badges */}
            <div className="flex items-center gap-3 mt-8">
              <a
                href="https://apps.apple.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/20 rounded-lg px-4 py-2.5 hover:bg-white/5 transition-colors"
              >
                <Apple className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-[10px] text-muted-foreground font-body leading-none">Download on the</p>
                  <p className="text-sm font-semibold font-body leading-tight">App Store</p>
                </div>
              </a>
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border border-white/20 rounded-lg px-4 py-2.5 hover:bg-white/5 transition-colors"
              >
                <Smartphone className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-[10px] text-muted-foreground font-body leading-none">Get it on</p>
                  <p className="text-sm font-semibold font-body leading-tight">Google Play</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:flex justify-center"
          >
            <div className="relative w-[280px]">
              <div className="w-full aspect-[9/19] rounded-[2.5rem] border-2 border-white/20 bg-card overflow-hidden shadow-2xl">
                {/* Fake app screen */}
                <div className="p-4 pt-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-muted-foreground font-body">CODE 01: DASHBOARD</p>
                      <p className="text-sm font-bold font-heading">HEY, ATHLETE</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs border border-white/10 rounded px-2 py-1">
                      <Flame className="w-3 h-3" /> 7
                    </div>
                  </div>

                  {/* Mini calorie ring */}
                  <div className="glass-card p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full border-[3px] border-foreground flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full border-[3px] border-white/10" />
                        <div className="text-center">
                          <p className="text-xs font-bold font-heading">1,247</p>
                          <p className="text-[8px] text-muted-foreground">left</p>
                        </div>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        <div className="flex justify-between text-[10px] font-body">
                          <span className="text-muted-foreground">Eaten</span>
                          <span>753 cal</span>
                        </div>
                        <div className="flex justify-between text-[10px] font-body">
                          <span className="text-muted-foreground">Goal</span>
                          <span>2,000 cal</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-3">
                      {["P", "C", "F"].map((m, i) => (
                        <div key={m}>
                          <div className="flex justify-between text-[9px] text-muted-foreground font-body">
                            <span>{m}</span>
                            <span>{[42, 85, 22][i]}g</span>
                          </div>
                          <div className="h-1 bg-white/10 rounded-full mt-0.5">
                            <div
                              className="h-full bg-foreground rounded-full"
                              style={{ width: `${[28, 34, 33][i]}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mini meals */}
                  <div>
                    <p className="text-[9px] text-muted-foreground font-body tracking-widest uppercase mb-2">Today's Meals</p>
                    {["Breakfast", "Lunch"].map((meal) => (
                      <div key={meal} className="glass-card p-2.5 mb-1.5 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-medium font-body">{meal}</p>
                          <p className="text-[8px] text-muted-foreground font-body">Oatmeal, eggs…</p>
                        </div>
                        <p className="text-[10px] font-semibold font-body">430 cal</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Glow */}
              <div className="absolute -inset-8 bg-white/5 rounded-[3rem] blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="code-label mb-3">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-black font-heading tracking-tight">
              HIT YOUR GOALS IN 1-2-3
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black font-heading text-white/20">{f.step}</span>
                  <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <f.icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-xl font-bold font-heading">{f.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="code-label mb-3">Logging Tools</p>
            <h2 className="text-4xl md:text-5xl font-black font-heading tracking-tight">
              LOG FASTER THAN EVER
            </h2>
            <p className="text-muted-foreground font-body mt-4 max-w-md mx-auto">
              Barcode scan, AI photo recognition, voice logging, and smart search — all built in.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-6 flex flex-col items-center gap-3 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <t.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold font-body">{t.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-foreground text-foreground" />
              ))}
            </div>
            <h2 className="text-4xl md:text-5xl font-black font-heading tracking-tight">
              REAL RESULTS
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-6"
              >
                <p className="text-sm text-muted-foreground font-body italic mb-3">"{t.text}"</p>
                <p className="text-xs font-semibold font-body">{t.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center space-y-6"
        >
          <img src={logoImg} alt="BULLETPROOFFIT" className="w-16 h-auto mx-auto invert" />
          <h2 className="text-4xl md:text-5xl font-black font-heading tracking-tight">
            START TODAY
          </h2>
          <p className="text-muted-foreground font-body">
            Join thousands tracking their nutrition and building healthier habits — for free.
          </p>
          <button
            onClick={() => navigate("/auth")}
            className="bg-foreground text-background px-10 py-4 rounded-lg text-sm font-bold font-body inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            CREATE FREE ACCOUNT <ArrowRight className="w-4 h-4" />
          </button>
          <div className="flex justify-center items-center gap-3 pt-4">
            <a
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/20 rounded-lg px-4 py-2.5 hover:bg-white/5 transition-colors"
            >
              <Apple className="w-5 h-5" />
              <div className="text-left">
                <p className="text-[10px] text-muted-foreground font-body leading-none">Download on the</p>
                <p className="text-sm font-semibold font-body leading-tight">App Store</p>
              </div>
            </a>
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white/20 rounded-lg px-4 py-2.5 hover:bg-white/5 transition-colors"
            >
              <Smartphone className="w-5 h-5" />
              <div className="text-left">
                <p className="text-[10px] text-muted-foreground font-body leading-none">Get it on</p>
                <p className="text-sm font-semibold font-body leading-tight">Google Play</p>
              </div>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logoImg} alt="BULLETPROOFFIT" className="w-6 h-auto invert" />
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
