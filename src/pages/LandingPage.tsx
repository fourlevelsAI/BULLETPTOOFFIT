import { motion } from "framer-motion";
import { ArrowRight, Flame, BarChart3, Dumbbell, Camera, Mic, Scan, Apple, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ULogo from "@/components/ULogo";
// ThemeToggle removed from landing nav

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 20 } },
};

const features = [
  { step: "01", title: "Track calories, macros & more", desc: "Log faster with barcode scan, photo AI, and voice logging.", icon: Scan },
  { step: "02", title: "Follow your progress", desc: "Build habits with visual charts, streaks, and weekly insights.", icon: BarChart3 },
  { step: "03", title: "Train smarter", desc: "Log workouts, track sets & reps, and sync calories burned.", icon: Dumbbell },
];

const tools = [
  { icon: Scan, label: "Barcode Scan" },
  { icon: Camera, label: "Photo AI" },
  { icon: Mic, label: "Voice Log" },
  { icon: Flame, label: "Calorie Track" },
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
    <div className="min-h-screen bg-[#080808] text-[#E8E8E8] overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(255,255,255,0.08)]" style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <ULogo size={32} className="text-white" />
            <span className="font-display text-xs sm:text-sm font-bold tracking-wider text-white truncate">BULLETPROOFFIT</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button onClick={() => navigate("/pricing")} className="text-xs sm:text-sm text-[#C0C0C0] hover:text-white transition-colors font-body hidden sm:block">
              Pricing
            </button>
            <button onClick={() => navigate("/auth")} className="text-xs sm:text-sm text-[#C0C0C0] hover:text-white transition-colors font-body hidden sm:block">
              Log In
            </button>
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/auth")}
              className="bg-[#E8E8E8] text-[#080808] px-4 sm:px-5 py-2 rounded-[4px] text-xs sm:text-sm font-semibold font-body hover:bg-transparent hover:text-[#E8E8E8] hover:ring-1 hover:ring-[#808080] transition-all">
              Start Free
            </motion.button>
          </div>
        </div>
      </nav>

      {/* ═══ HERO — #080808 with scanlines ═══ */}
      <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden scanlines">
        {/* Grid overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(to right, rgba(192,192,192,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(192,192,192,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp}>
              <p className="mb-4 uppercase" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', letterSpacing: '0.2em', color: '#808080' }}>SYS:00 — INIT SEQUENCE</p>
            </motion.div>
            <motion.h1 variants={fadeUp}
              className="text-5xl md:text-[5rem] lg:text-[5.5rem] font-black font-display leading-[0.88] tracking-[-0.02em]"
              style={{ textShadow: '0 0 40px rgba(255,255,255,0.1)' }}>
              <span className="text-white font-black" style={{ opacity: 1 }}>NUTRITION</span>
              <br />
              <span className="text-white font-black" style={{ opacity: 1 }}>TRACKING</span>
              <br />
              <span className="text-white" style={{ opacity: 1 }}>FOR REAL</span>{" "}
              <span style={{ background: 'linear-gradient(135deg, #FFFFFF, #A0A0A0)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>LIFE</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body mt-6 max-w-md" style={{ color: '#C0C0C0', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Make progress with the all-in-one food, exercise, and calorie tracker. Better than counting — understanding.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mt-8">
              <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/auth")}
                className="bg-[#E8E8E8] text-[#080808] px-8 py-4 rounded-[4px] text-sm font-bold font-body flex items-center gap-2 hover:bg-transparent hover:text-[#E8E8E8] hover:ring-1 hover:ring-[#808080] transition-all">
                START TODAY <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-3 mt-8">
              <motion.a whileTap={{ scale: 0.97 }} href="#" className="flex items-center gap-2 border border-[rgba(192,192,192,0.2)] rounded-[4px] px-4 py-2.5 hover:bg-[#E8E8E8] hover:text-[#080808] transition-all">
                <Apple className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-[10px] font-body leading-none opacity-50">Download on the</p>
                  <p className="text-sm font-semibold font-body leading-tight">App Store</p>
                </div>
              </motion.a>
              <motion.a whileTap={{ scale: 0.97 }} href="#" className="flex items-center gap-2 border border-[rgba(192,192,192,0.2)] rounded-[4px] px-4 py-2.5 hover:bg-[#E8E8E8] hover:text-[#080808] transition-all">
                <Smartphone className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-[10px] font-body leading-none opacity-50">Get it on</p>
                  <p className="text-sm font-semibold font-body leading-tight">Google Play</p>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ═══ iPhone 16 Pro Mockup ═══ */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex justify-center"
            style={{ perspective: '1200px' }}
          >
            <div className="relative iphone-float">
              {/* Shadow */}
              <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-[80%] h-[50px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at center, rgba(192,192,192,0.1) 0%, transparent 70%)', filter: 'blur(14px)' }} />

              {/* Phone body */}
              <div className="w-[300px] h-[620px] relative" style={{
                background: 'linear-gradient(145deg, #3a3a3a 0%, #1a1a1a 30%, #0d0d0d 50%, #1a1a1a 70%, #3a3a3a 100%)',
                borderRadius: '54px',
                boxShadow: `0 0 0 1px rgba(192,192,192,0.1), 0 0 0 3px #2a2a2a, 0 40px 80px rgba(0,0,0,0.6)`,
              }}>
                {/* Side buttons */}
                <div className="absolute left-[-3px] top-[140px] w-[3px] h-[32px] rounded-l-[2px]" style={{ background: '#2a2a2a' }} />
                <div className="absolute left-[-3px] top-[182px] w-[3px] h-[32px] rounded-l-[2px]" style={{ background: '#2a2a2a' }} />
                <div className="absolute right-[-3px] top-[155px] w-[3px] h-[64px] rounded-r-[2px]" style={{ background: '#2a2a2a' }} />

                {/* Screen */}
                <div className="absolute overflow-hidden" style={{
                  top: '10px', left: '10px', right: '10px', bottom: '10px',
                  borderRadius: '44px', background: '#000',
                }}>
                  <div className="w-full h-full relative overflow-hidden" style={{ backgroundColor: '#111111' }}>
                    {/* Dynamic Island */}
                    <div className="absolute left-1/2 -translate-x-1/2 z-20" style={{
                      top: '12px', width: '120px', height: '34px', background: '#000', borderRadius: '20px',
                    }} />
                    {/* Status bar */}
                    <div className="absolute top-0 left-0 right-0 h-[54px] z-10 flex items-start px-6 pt-[16px]">
                      <span className="text-[15px] font-semibold text-[#E8E8E8] font-body leading-none">9:41</span>
                      <div className="flex-1" />
                      <div className="flex items-center gap-1.5">
                        <div className="flex gap-[2px] items-end">
                          {[4, 6, 8, 11].map((h, i) => <div key={i} className="w-[3px] rounded-sm bg-[#E8E8E8]" style={{ height: `${h}px` }} />)}
                        </div>
                        <div className="w-[22px] h-[10px] rounded-[2px] border border-[#E8E8E8]/50 relative overflow-hidden">
                          <div className="absolute inset-[1.5px] right-[4px] bg-[#E8E8E8] rounded-[1px]" />
                        </div>
                      </div>
                    </div>

                    {/* App content */}
                    <div className="p-4 pt-[54px] space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[9px] text-[#606060] font-mono tracking-wider">SYS:01 DASHBOARD</p>
                          <p className="text-sm font-bold font-display text-[#E8E8E8] tracking-wide">HEY, ATHLETE</p>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] border border-[rgba(192,192,192,0.12)] rounded px-1.5 py-0.5 text-[#A0A0A0]">
                          <Flame className="w-2.5 h-2.5" /> 7
                        </div>
                      </div>

                      {/* Calorie ring */}
                      <div className="rounded-[4px] bg-[#0A0A0A] border border-[rgba(192,192,192,0.12)] p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center relative shrink-0">
                            <svg viewBox="0 0 60 60" className="w-full h-full -rotate-90">
                              <defs>
                                <linearGradient id="silverGrad" x1="0" y1="0" x2="1" y2="1">
                                  <stop offset="0%" stopColor="#404040" />
                                  <stop offset="50%" stopColor="#C0C0C0" />
                                  <stop offset="100%" stopColor="#E8E8E8" />
                                </linearGradient>
                              </defs>
                              <circle cx="30" cy="30" r="26" fill="none" stroke="#1A1A1A" strokeWidth="3" />
                              <circle cx="30" cy="30" r="26" fill="none" stroke="url(#silverGrad)" strokeWidth="3"
                                strokeDasharray={`${0.62 * 163.36} ${163.36}`} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <p className="text-[12px] font-bold font-mono leading-tight text-[#E8E8E8]">1,247</p>
                              <p className="text-[8px] text-[#606060]">left</p>
                            </div>
                          </div>
                          <div className="flex-1 space-y-1.5 min-w-0">
                            <div className="flex justify-between text-[10px] font-body">
                              <span className="text-[#808080]">Eaten</span>
                              <span className="font-mono font-medium text-[#E8E8E8]">753 cal</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-body">
                              <span className="text-[#808080]">Goal</span>
                              <span className="font-mono font-medium text-[#E8E8E8]">2,000 cal</span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {["P", "C", "F"].map((m, i) => (
                            <div key={m}>
                              <div className="flex justify-between text-[9px] text-[#808080] font-body">
                                <span>{m}</span>
                                <span className="font-mono text-[#A0A0A0]">{[42, 85, 22][i]}g</span>
                              </div>
                              <div className="h-1 bg-[#1A1A1A] rounded-full mt-0.5">
                                <motion.div initial={{ width: 0 }} animate={{ width: `${[28, 34, 33][i]}%` }}
                                  transition={{ delay: 0.8 + i * 0.1, duration: 0.6 }}
                                  className="h-full chrome-bar rounded-full" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Meals */}
                      <div>
                        <p className="text-[9px] text-[#606060] font-body tracking-widest uppercase mb-1.5">Today's Meals</p>
                        {["Breakfast", "Lunch"].map((meal) => (
                          <div key={meal} className="rounded-[4px] bg-[#0A0A0A] border border-[rgba(192,192,192,0.1)] mb-1.5 flex items-center justify-between p-2.5">
                            <div className="min-w-0">
                              <p className="text-[10px] font-medium font-body text-[#D0D0D0]">{meal}</p>
                              <p className="text-[8px] text-[#606060] font-body truncate">Oatmeal, eggs…</p>
                            </div>
                            <p className="text-[10px] font-semibold font-mono shrink-0 ml-2 text-[#E8E8E8]">430 cal</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Home indicator */}
                    <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2">
                      <div className="w-[100px] h-[4px] rounded-full bg-[#E8E8E8]/20" />
                    </div>
                  </div>

                  {/* Screen glare */}
                  <div className="absolute inset-0 pointer-events-none z-10" style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 40%)',
                    borderRadius: '44px',
                  }} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 2: How It Works — #0F0F0F elevated ═══ */}
      <section className="py-20 px-6 bg-[#0F0F0F] border-y border-[rgba(192,192,192,0.06)]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
            <motion.p variants={fadeUp} className="code-label text-[#606060] mb-3">SYS:01 — PROTOCOL</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-display text-white" style={{ textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>
              HIT YOUR GOALS
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">
            {features.map((f) => (
              <motion.div key={f.step} variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 60px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-[#E8E8E8] text-[#080808] rounded-[4px] p-8 space-y-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black font-display text-[#C0C0C0]">{f.step}</span>
                  <div className="w-10 h-10 rounded-[4px] bg-[#080808] flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-[#E8E8E8]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold font-heading text-[#111111]">{f.title}</h3>
                <p className="text-sm text-[#555555] font-body">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 3: Logging Tools — #080808 ═══ */}
      <section className="py-20 px-6 bg-[#080808]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.p variants={fadeUp} className="code-label text-[#606060] mb-3">SYS:02 — TOOLS</motion.p>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-display text-white" style={{ textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>
              LOG FASTER
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body mt-4 max-w-md mx-auto text-[#808080]">
              Barcode scan, AI photo recognition, voice logging, and smart search — all built in.
            </motion.p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((t, i) => (
              <motion.div key={t.label} variants={scaleIn}
                whileHover={{ y: -6, scale: 1.03, boxShadow: '0 20px 60px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-[#E8E8E8] text-[#080808] rounded-[4px] p-6 flex flex-col items-center gap-3 text-center cursor-pointer">
                <motion.div animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 3, delay: i * 0.3 }}
                  className="w-14 h-14 rounded-[4px] bg-[#080808] flex items-center justify-center">
                  <t.icon className="w-6 h-6 text-[#E8E8E8]" />
                </motion.div>
                <span className="text-sm font-bold font-body text-[#111111]">{t.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 4: Testimonials — #0F0F0F ═══ */}
      <section className="py-20 px-6 bg-[#0F0F0F] border-y border-[rgba(192,192,192,0.06)]">
        <div className="max-w-6xl mx-auto">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center mb-12">
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-display text-white" style={{ textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>
              REAL RESULTS
            </motion.h2>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-2 gap-4">
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp}
                whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 60px rgba(255,255,255,0.08), 0 0 0 1px rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="bg-[#E8E8E8] text-[#080808] rounded-[4px] p-6 cursor-pointer">
                <p className="text-sm text-[#444444] font-body italic mb-3">"{t.text}"</p>
                <p className="text-xs font-bold font-body text-[#111111]">{t.name}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ SECTION 5: CTA — #080808 ═══ */}
      <section className="py-20 px-6 bg-[#080808]">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-2xl mx-auto text-center space-y-6">
          <motion.div variants={fadeUp}>
            <ULogo size={64} className="mx-auto text-white" />
          </motion.div>
          <motion.p variants={fadeUp} className="code-label text-[#606060] tracking-[0.3em]">BULLETPROOFFIT</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black font-display text-white" style={{ textShadow: '0 0 30px rgba(255,255,255,0.15)' }}>
            START TODAY
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[#808080] font-body">
            Join thousands tracking their nutrition and building healthier habits — for free.
          </motion.p>
          <motion.div variants={fadeUp}>
            <motion.button whileTap={{ scale: 0.97 }} onClick={() => navigate("/auth")}
              className="bg-[#E8E8E8] text-[#080808] px-10 py-4 rounded-[4px] text-sm font-bold font-body inline-flex items-center gap-2 hover:bg-transparent hover:text-[#E8E8E8] hover:ring-1 hover:ring-[#808080] transition-all">
              CREATE FREE ACCOUNT <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
          <motion.div variants={fadeUp} className="flex justify-center items-center gap-3 pt-4">
            <a href="#" className="flex items-center gap-2 border border-[rgba(192,192,192,0.2)] rounded-[4px] px-4 py-2.5 hover:bg-[#E8E8E8] hover:text-[#080808] transition-all">
              <Apple className="w-5 h-5" /><div className="text-left"><p className="text-[10px] font-body leading-none opacity-50">Download on the</p><p className="text-sm font-semibold font-body leading-tight">App Store</p></div>
            </a>
            <a href="#" className="flex items-center gap-2 border border-[rgba(192,192,192,0.2)] rounded-[4px] px-4 py-2.5 hover:bg-[#E8E8E8] hover:text-[#080808] transition-all">
              <Smartphone className="w-5 h-5" /><div className="text-left"><p className="text-[10px] font-body leading-none opacity-50">Get it on</p><p className="text-sm font-semibold font-body leading-tight">Google Play</p></div>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ Footer — #000 ═══ */}
      <footer className="py-8 px-6 bg-black border-t border-[rgba(192,192,192,0.06)]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ULogo size={24} className="text-[#606060]" />
            <span className="text-xs text-[#606060] font-body">© 2026 BULLETPROOFFIT. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-[#606060] hover:text-[#E8E8E8] font-body transition-colors">Privacy</a>
            <a href="#" className="text-xs text-[#606060] hover:text-[#E8E8E8] font-body transition-colors">Terms</a>
            <a href="#" className="text-xs text-[#606060] hover:text-[#E8E8E8] font-body transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
