import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Calendar, Target, Flame, Dumbbell, Scale, Plus } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";

const ProgressPage = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const [weightData, setWeightData] = useState<{ date: string; weight: number }[]>([]);
  const [newWeight, setNewWeight] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("body_measurements")
        .select("measured_at, weight")
        .eq("user_id", user.id)
        .not("weight", "is", null)
        .order("measured_at", { ascending: true })
        .limit(30);
      if (data) {
        setWeightData(
          data.map((d) => ({
            date: new Date(d.measured_at).toLocaleDateString("en", { month: "short", day: "numeric" }),
            weight: Number(d.weight),
          }))
        );
      }
    };
    fetch();
  }, [user]);

  const logWeight = async () => {
    if (!user || !newWeight) return;
    const w = parseFloat(newWeight);
    if (isNaN(w) || w <= 0 || w > 500) {
      toast.error("Enter a valid weight");
      return;
    }
    setSaving(true);
    const today = new Date().toISOString().split("T")[0];
    const { error } = await supabase.from("body_measurements").insert({
      user_id: user.id,
      weight: w,
      measured_at: today,
    });
    if (!error) {
      setWeightData((prev) => [...prev, { date: new Date().toLocaleDateString("en", { month: "short", day: "numeric" }), weight: w }]);
      await updateProfile({ weight: w } as any);
      toast.success("Weight logged!");
      setNewWeight("");
    } else {
      toast.error("Failed to save weight");
    }
    setSaving(false);
  };

  const tooltipStyle = {
    backgroundColor: "hsl(0, 0%, 10%)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    color: "hsl(0, 0%, 95%)",
    fontSize: "12px",
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-lg mx-auto px-4 pt-12 pb-4 space-y-6">
      <div>
        <p className="section-label mb-1">Code 04: Analytics</p>
        <h1 className="text-2xl font-bold text-foreground">Progress</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">Your fitness journey at a glance</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Current Weight", value: profile?.weight ? `${profile.weight} kg` : "—", icon: Scale },
          { label: "Calorie Goal", value: `${profile?.calorie_goal || 2000} cal`, icon: Target },
          { label: "Goal", value: profile?.goal?.replace("_", " ") || "—", icon: Flame },
          { label: "Activity", value: profile?.activity_level?.replace("_", " ") || "—", icon: Dumbbell },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-foreground" />
                <span className="text-xs text-muted-foreground font-body">{stat.label}</span>
              </div>
              <span className="text-lg font-bold text-foreground font-heading capitalize">{stat.value}</span>
            </div>
          );
        })}
      </div>

      {/* Log Weight */}
      <div className="glass-card p-4 space-y-3">
        <h2 className="section-label">Log Weight</h2>
        <div className="flex gap-2">
          <input type="number" inputMode="decimal" placeholder="e.g. 75" value={newWeight} onChange={(e) => setNewWeight(e.target.value)}
            className="flex-1 bg-card border border-white/10 rounded-lg px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground font-body" />
          <button onClick={logWeight} disabled={saving}
            className="bg-foreground text-background px-4 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50 font-body">
            {saving ? "..." : "Log"}
          </button>
        </div>
      </div>

      {/* Weight Chart */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-4">
        <h2 className="section-label mb-4">Weight Trend</h2>
        {weightData.length === 0 ? (
          <div className="h-[180px] flex items-center justify-center">
            <p className="text-muted-foreground text-sm font-body">No weight data yet. Log your first weigh-in above.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weightData}>
              <defs>
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(0, 0%, 100%)" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="hsl(0, 0%, 100%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" tick={{ fill: "hsl(0, 0%, 54%)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={["auto", "auto"]} tick={{ fill: "hsl(0, 0%, 54%)", fontSize: 11 }} axisLine={false} tickLine={false} width={35} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="weight" stroke="hsl(0, 0%, 100%)" fill="url(#weightGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ProgressPage;
