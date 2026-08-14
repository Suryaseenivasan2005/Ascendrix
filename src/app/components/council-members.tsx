import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  Shield,
  Award,
  Scroll,
  Layers,
  Palette,
  Trophy,
  Activity,
  Search,
  Sparkles,
  Users,
  UserCheck,
  Coins,
  Flag,
  Calendar,
} from "lucide-react";

export type Batch = "2025-2026" | "2026-2027";

// ══════════════════════════════════════════════════════════════════════════════
// 2025 – 2026 DATA  (previous student council)
// ══════════════════════════════════════════════════════════════════════════════
const officeBearers2025: { name: string; role: string; dept?: string; team?: string }[] = [
  { name: "Pushpavel K",          role: "President" },
  { name: "Jiji Dharshini G",     role: "Vice-President" },
  { name: "Gokul R",              role: "General Secretary" },
  { name: "Nivetha Lakshmi V",    role: "General Secretary" },
  { name: "Roshini P",            role: "Joint Secretary" },
  { name: "Mehul Kumar C.B",      role: "Cultural Secretary" },
  { name: "Nabila S",             role: "Cultural Secretary" },
  { name: "Mithilesh K",          role: "Cultural Secretary" },
  { name: "Shalini N",            role: "Cultural Secretary" },
  { name: "Delwin D",             role: "Sports Secretary" },
  { name: "Ashlin Jeba Reeja J",  role: "Sports Secretary" },
  { name: "Venkatesh N",          role: "Joint-Sports Secretary" },
  { name: "Ranjika B",            role: "Joint-Sports Secretary" },
];

const executiveMembers2025: { name: string; role: string; dept?: string; team?: string }[] = [
  { name: "Haris M",             role: "Executive Member" },
  { name: "Dharun S",            role: "Executive Member" },
  { name: "Nithish Kumar V",     role: "Executive Member" },
  { name: "Krithisha E V",       role: "Executive Member" },
  { name: "Ajay V",              role: "Executive Member" },
  { name: "Iniyavan M",          role: "Executive Member" },
  { name: "Lokesh S",            role: "Executive Member" },
  { name: "Vasanthan N",         role: "Executive Member" },
  { name: "Arjun P",             role: "Executive Member" },
  { name: "Praveen N",           role: "Executive Member" },
  { name: "Kathiraven V",        role: "Executive Member" },
  { name: "Ranjit Kumar P",      role: "Executive Member" },
  { name: "Senthamizh Selvan K", role: "Executive Member" },
  { name: "Santhiya R",          role: "Executive Member" },
  { name: "Archana B",           role: "Executive Member" },
  { name: "Shrilekha S",         role: "Executive Member" },
  { name: "Adithya B",           role: "Executive Member" },
  { name: "Varshitha S",         role: "Executive Member" },
  { name: "Sakthi Narayanan K",  role: "Executive Member" },
  { name: "Senbaga S",           role: "Executive Member" },
  { name: "Gunal S",             role: "Executive Member" },
];

const jointMembers2025: { name: string; role: string; dept?: string; team?: string }[] = [
  { name: "Neha K",              role: "Joint Member" },
  { name: "Bhavani U",           role: "Joint Member" },
  { name: "Yoshethaa A",         role: "Joint Member" },
  { name: "Sanjana Sree M",      role: "Joint Member" },
  { name: "Gomathi E S",         role: "Joint Member" },
  { name: "Yokesh B K",          role: "Joint Member" },
  { name: "Sri Sadha S",         role: "Joint Member" },
  { name: "Naveen R P",          role: "Joint Member" },
  { name: "Keerthikanthan G K",  role: "Joint Member" },
  { name: "Praveen Karthik R",   role: "Joint Member" },
  { name: "Selva Maruthi P",     role: "Joint Member" },
  { name: "Hellen Arsha D",      role: "Joint Member" },
  { name: "Harish Pavan A",      role: "Joint Member" },
  { name: "Ayushyaman Kumar",    role: "Joint Member" },
  { name: "Neha R",              role: "Joint Member" },
  { name: "Dhiya R",             role: "Joint Member" },
];

// ══════════════════════════════════════════════════════════════════════════════
// 2026 – 2027 DATA  (current student council)
// ══════════════════════════════════════════════════════════════════════════════
const officeBearers2026: { name: string; role: string; dept?: string; team?: string }[] = [
  { name: "Dharun S",          role: "President",                dept: "AI&DS",    team: "OVERVIEW" },
  { name: "Ranjika B",         role: "Vice President",           dept: "CSE",      team: "OVERVIEW" },
  { name: "Praveen Karthik R", role: "General Secretary",        dept: "AI&DS",    team: "OVERVIEW" },
  { name: "Gomathi E S",       role: "Joint Secretary",          dept: "ECE",      team: "MEDIA" },
  { name: "Gokul R",           role: "Cultural Secretary",       dept: "IT",       team: "OVERVIEW" },
  { name: "Roshni P",          role: "Cultural Secretary",       dept: "ECE",      team: "STAGE & RECEPTION" },
  { name: "Ranjith Kumar P",   role: "Cultural Secretary",       dept: "ECE",      team: "MEDIA" },
  { name: "Yoshetha A",        role: "Cultural Secretary",       dept: "IT",       team: "MC" },
  { name: "Bharathi Mohan M",  role: "Treasurer",                dept: "CSE",      team: "DEC - OVERVIEW" },
  { name: "Nithyashree T",     role: "Treasurer",                dept: "ECE",      team: "EO - OVERVIEW" },
  { name: "Jaasmine R",        role: "Club Head",                dept: "CSE",      team: "CLUB & MC" },
  { name: "Sharath S",         role: "Club Head",                dept: "IT",       team: "CLUB & TECHNICAL" },
  { name: "Kishore S",         role: "Sports Secretary (Men)",   dept: "CSE - B",  team: "SPORTS" },
  { name: "Puspalatha G",      role: "Sports Secretary (Women)", dept: "CSE - B",  team: "SPORTS" },
];

const executiveMembers2026: { name: string; role: string; dept?: string; team?: string }[] = [
  { name: "Dhiya R",            role: "Executive Member", dept: "AERO",           team: "ORGANIZING" },
  { name: "Saranya Sri Valli D",role: "Executive Member", dept: "AI&DS",          team: "DECORATION" },
  { name: "Deepak K",           role: "Executive Member", dept: "AI&DS",          team: "TECHNICAL" },
  { name: "Abinaya Shree C",    role: "Executive Member", dept: "CSE - A",        team: "ORGANIZING" },
  { name: "Thilak Kumar J",     role: "Executive Member", dept: "CSE - B",        team: "TECHNICAL" },
  { name: "Yazhini N",          role: "Executive Member", dept: "CSE - B",        team: "MC" },
  { name: "Nithyasree A",       role: "Executive Member", dept: "CSE - B",        team: "ORGANIZING" },
  { name: "Perarasu S",         role: "Executive Member", dept: "CYBER SECURITY", team: "ORGANIZING" },
  { name: "Pushpa V",           role: "Executive Member", dept: "CYBER SECURITY", team: "ORGANIZING" },
  { name: "Salman Faris A",     role: "Executive Member", dept: "ECE",            team: "DECORATION" },
  { name: "Naveen R P",         role: "Executive Member", dept: "ECE",            team: "DECORATION" },
  { name: "Bharath Raj R",      role: "Executive Member", dept: "IT",             team: "ORGANIZING" },
  { name: "Senthamih Selvan K", role: "Executive Member", dept: "IT",             team: "MEDIA" },
  { name: "Bhavani U",          role: "Executive Member", dept: "MECH",           team: "DECORATION" },
  { name: "Tharun Raj H",       role: "Executive Member", dept: "MECH",           team: "DECORATION" },
  { name: "Sakthi Narayana K",  role: "Executive Member", dept: "AERO",           team: "ORGANIZING" },
  { name: "Janani S",           role: "Executive Member", dept: "AI&DS",          team: "ORGANIZING" },
  { name: "Shrilekha S",        role: "Executive Member", dept: "IT",             team: "ORGANIZING" },
  { name: "Dhanushia K",        role: "Executive Member", dept: "MBA",            team: "ORGANIZING" },
  { name: "Varshitha S",        role: "Executive Member", dept: "MBA",            team: "ORGANIZING" },
  { name: "Kathiravan L",       role: "Executive Member", dept: "AERO",           team: "DECORATION" },
  { name: "Abdul Afsar M",      role: "Executive Member", dept: "AI&DS",          team: "MEDIA" },
  { name: "Santosh N",          role: "Executive Member", dept: "AI&DS",          team: "MEDIA" },
  { name: "Swathi K",           role: "Executive Member", dept: "AI&DS",          team: "ORGANIZING" },
  { name: "Krishnaraja D",      role: "Executive Member", dept: "CSE - A",        team: "DECORATION" },
  { name: "Deva Dharshini R",   role: "Executive Member", dept: "CSE - A",        team: "ORGANIZING" },
  { name: "Nitish S",           role: "Executive Member", dept: "CSE - B",        team: "DECORATION" },
  { name: "Yhamini M",          role: "Executive Member", dept: "CSE - B",        team: "DECORATION" },
  { name: "Prince Immanuel M",  role: "Executive Member", dept: "CYBER SECURITY", team: "MEDIA" },
  { name: "Vinotha M",          role: "Executive Member", dept: "CYBER SECURITY", team: "DECORATION" },
  { name: "Lok Bharath R",      role: "Executive Member", dept: "CYBER SECURITY", team: "MEDIA" },
  { name: "Baskaran R",         role: "Executive Member", dept: "ECE",            team: "DECORATION" },
  { name: "Charumathi T K",     role: "Executive Member", dept: "ECE",            team: "MC" },
  { name: "Jegadeeswari A",     role: "Executive Member", dept: "IT",             team: "ORGANIZING" },
  { name: "Varshan A",          role: "Executive Member", dept: "IT",             team: "MEDIA" },
  { name: "Yoga Prajeeth S",    role: "Executive Member", dept: "MECH",           team: "ORGANIZING" },
];

// ══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════════════
const getInitials = (name: string) => {
  const parts = name.split(" ").filter((p) => p.length > 0);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return "AM";
};

const getRoleGradient = (role: string) => {
  const r = role.toLowerCase();
  if (r === "president") return "from-[#D4AF37] via-[#FFD700] to-[#AA7C11] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]";
  if (r === "vice president" || r === "vice-president") return "from-[#D4AF37]/80 via-yellow-200 to-[#AA7C11]/80 text-black shadow-[0_0_15px_rgba(212,175,55,0.25)]";
  if (r.includes("general secretary")) return "from-[#7A0019] via-rose-600 to-[#4D000F] text-white shadow-[0_0_15px_rgba(122,0,25,0.3)]";
  if (r.includes("joint secretary") && !r.includes("joint-sports")) return "from-[#7A0019]/70 via-rose-500 to-[#4D000F]/70 text-white shadow-[0_0_10px_rgba(122,0,25,0.2)]";
  if (r.includes("cultural secretary")) return "from-violet-600 via-purple-500 to-indigo-700 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]";
  if (r.includes("sports secretary")) return "from-emerald-600 via-teal-500 to-cyan-700 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]";
  if (r.includes("joint-sports")) return "from-teal-600 via-emerald-500 to-green-700 text-white shadow-[0_0_10px_rgba(20,184,166,0.2)]";
  if (r.includes("treasurer")) return "from-amber-600 via-orange-500 to-red-700 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]";
  if (r.includes("club head")) return "from-fuchsia-600 via-pink-500 to-rose-700 text-white shadow-[0_0_15px_rgba(217,70,239,0.3)]";
  if (r.includes("executive")) return "from-blue-600 via-cyan-500 to-indigo-700 text-white";
  if (r.includes("joint member")) return "from-slate-600 via-zinc-500 to-slate-700 text-white";
  return "from-slate-600 via-zinc-700 to-neutral-800 text-gray-200";
};

const getRoleIcon = (role: string) => {
  const r = role.toLowerCase();
  if (r === "president") return <Shield className="w-5 h-5 text-[#D4AF37]" />;
  if (r === "vice president" || r === "vice-president") return <Award className="w-5 h-5 text-amber-300" />;
  if (r.includes("general secretary")) return <Scroll className="w-5 h-5 text-rose-400" />;
  if (r.includes("joint secretary") && !r.includes("joint-sports")) return <Layers className="w-5 h-5 text-pink-400" />;
  if (r.includes("cultural")) return <Palette className="w-5 h-5 text-purple-400" />;
  if (r.includes("sports secretary")) return <Trophy className="w-5 h-5 text-emerald-400" />;
  if (r.includes("joint-sports")) return <Activity className="w-5 h-5 text-teal-400" />;
  if (r.includes("treasurer")) return <Coins className="w-5 h-5 text-orange-400" />;
  if (r.includes("club head")) return <Flag className="w-5 h-5 text-pink-400" />;
  return <UserCheck className="w-5 h-5 text-cyan-400" />;
};

// ══════════════════════════════════════════════════════════════════════════════
// COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
interface CouncilMembersProps {
  selectedBatch: Batch;
  onBatchChange: (batch: Batch) => void;
}

export function CouncilMembers({ selectedBatch, onBatchChange }: CouncilMembersProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"executive" | "joint">("executive");

  // Pick data for selected batch
  const officeBearers  = selectedBatch === "2025-2026" ? officeBearers2025  : officeBearers2026;
  const executiveMembers = selectedBatch === "2025-2026" ? executiveMembers2025 : executiveMembers2026;
  const jointMembers   = selectedBatch === "2025-2026" ? jointMembers2025   : [];

  // Tier boundaries
  // 2025-2026: tier2 = indices 2–4 (3 members), 2026-2027: tier2 = indices 2–3 (2 members)
  const tier2End   = selectedBatch === "2025-2026" ? 5 : 4;
  const tier2Count = tier2End - 2;

  // Search
  const filterFn = (m: { name: string; role: string; dept?: string; team?: string }) =>
    [m.name, m.role, m.dept ?? "", m.team ?? ""].some((v) =>
      v.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredOffice    = officeBearers.filter(filterFn);
  const filteredExecutive = executiveMembers.filter(filterFn);
  const filteredJoint     = jointMembers.filter(filterFn);
  const isSearching = searchTerm.trim().length > 0;
  const hasResults  = filteredOffice.length > 0 || filteredExecutive.length > 0 || filteredJoint.length > 0;

  // ── Member Card ────────────────────────────────────────────────────────────
  const MemberCard = ({
    member,
    index,
    showGroup = false,
  }: {
    member: { name: string; role: string; dept?: string; team?: string };
    index: number;
    showGroup?: boolean;
  }) => {
    const initials  = getInitials(member.name);
    const grad      = getRoleGradient(member.role);
    const icon      = getRoleIcon(member.role);
    const isTarget  = member.name === "Tharun Raj H";
    const [isCracked, setIsCracked] = useState(false);

    const handleClick = () => {
      if (isTarget && !isCracked) {
        setIsCracked(true);
        setTimeout(() => setIsCracked(false), 3000);
      }
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isCracked ? { x: [-4, 4, -4, 4, 0], opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={isCracked ? { duration: 0.3 } : { delay: Math.min(index * 0.05, 0.4) }}
        whileHover={isCracked ? undefined : { y: -6, scale: 1.02 }}
        className={`group relative ${isTarget ? "cursor-pointer" : ""}`}
        onClick={handleClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/15 to-[#7A0019]/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div
          className={`relative backdrop-blur-xl bg-white/5 border rounded-2xl p-5 transition-all duration-300 flex items-center gap-4 overflow-hidden ${
            isCracked ? "border-white/40 bg-white/10" : "border-white/10 hover:border-[#D4AF37]/40"
          }`}
        >
          {/* Glass Crack Overlay */}
          <AnimatePresence>
            {isCracked && (
              <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.6 } }}
                className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center backdrop-blur-sm"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full opacity-80 drop-shadow-md" preserveAspectRatio="none">
                  <path
                    d="M50,50 L20,0 M50,50 L80,0 M50,50 L100,30 M50,50 L100,70 M50,50 L70,100 M50,50 L30,100 M50,50 L0,60 M50,50 L0,20 M20,0 L35,25 L50,50 M80,0 L65,30 L50,50 M100,30 L75,45 L50,50 M100,70 L65,60 L50,50 M70,100 L55,70 L50,50 M30,100 L40,65 L50,50 M0,60 L25,55 L50,50 M0,20 L30,35 L50,50"
                    stroke="rgba(255,255,255,0.8)" strokeWidth="0.6" fill="none"
                  />
                  <path
                    d="M50,50 L40,20 L30,40 Z M50,50 L60,30 L70,45 Z M50,50 L70,70 L55,80 Z M50,50 L30,70 L20,55 Z"
                    fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.2"
                  />
                  <path d="M40,20 L65,30 M75,45 L65,60 M55,70 L40,65 M25,55 L30,35" stroke="rgba(255,255,255,0.5)" strokeWidth="0.3" fill="none" />
                </svg>
                <div className="absolute inset-0 bg-white/10 mix-blend-overlay" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Avatar */}
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${grad} flex flex-col items-center justify-center font-bold text-lg relative overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-inner`}
          >
            <span className="relative z-10">{initials}</span>
            <div className="absolute inset-0 bg-black/10 mix-blend-overlay opacity-50" />
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 mb-1">
              {icon}
              <span className="text-xs font-semibold text-[#D4AF37] tracking-wider uppercase truncate">
                {member.role}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors truncate">
              {member.name}
            </h3>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {showGroup && (
                <span className="inline-block text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-medium">
                  {member.role.includes("Executive")
                    ? "Executive Team"
                    : member.role.includes("Joint Member")
                    ? "Joint Team"
                    : "Core Team"}
                </span>
              )}
              {member.dept && (
                <span className="inline-block text-[10px] bg-[#D4AF37]/20 border border-[#D4AF37]/30 px-2 py-0.5 rounded text-[#D4AF37] font-medium">
                  {member.dept}
                </span>
              )}
              {member.team && (
                <span className="inline-block text-[10px] bg-[#7A0019]/20 border border-[#7A0019]/30 px-2 py-0.5 rounded text-rose-300 font-medium">
                  {member.team}
                </span>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  // ── Tier renderers ─────────────────────────────────────────────────────────
  const renderTier1 = () => (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
      {officeBearers.slice(0, 2).map((m, idx) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: idx * 0.15, duration: 0.5 }}
          whileHover={{ y: -8, scale: 1.03 }}
          className="relative group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/25 to-amber-500/10 rounded-3xl blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative backdrop-blur-2xl bg-white/5 border-2 border-white/10 group-hover:border-[#D4AF37]/70 rounded-3xl p-8 transition-all duration-300 flex items-center gap-6 shadow-2xl">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-yellow-200 to-[#AA7C11] text-black font-black text-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
              <span>{getInitials(m.name)}</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                {getRoleIcon(m.role)}
                <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">{m.role}</span>
              </div>
              <h4 className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors">{m.name}</h4>
              <div className="flex flex-wrap gap-1.5 mt-2">
                <div className="text-[10px] text-gray-400 flex items-center gap-1.5 bg-black/20 px-2 py-0.5 rounded-full">
                  <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Core Executive
                </div>
                {m.dept && (
                  <span className="inline-block text-[10px] bg-[#D4AF37]/20 border border-[#D4AF37]/30 px-2 py-0.5 rounded-full text-[#D4AF37] font-medium">
                    {m.dept}
                  </span>
                )}
                {m.team && (
                  <span className="inline-block text-[10px] bg-[#7A0019]/20 border border-[#7A0019]/30 px-2 py-0.5 rounded-full text-rose-300 font-medium">
                    {m.team}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderTier2 = () => (
    <div
      className={`grid gap-6 max-w-4xl mx-auto mb-12 ${
        tier2Count === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
      }`}
    >
      {officeBearers.slice(2, tier2End).map((m, idx) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: idx * 0.1 + 0.2 }}
          whileHover={{ y: -6 }}
          className="relative group cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#7A0019]/20 to-[#D4AF37]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-[#7A0019]/60 rounded-2xl p-6 transition-all duration-300 flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7A0019] via-rose-600 to-[#4D000F] text-white font-extrabold text-lg flex items-center justify-center shadow-md">
              {getInitials(m.name)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                {getRoleIcon(m.role)}
                <span className="text-[10px] font-bold text-rose-400 tracking-wider uppercase truncate">{m.role}</span>
              </div>
              <h4 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors truncate">{m.name}</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {m.dept && (
                  <span className="inline-block text-[9px] bg-[#D4AF37]/20 border border-[#D4AF37]/30 px-1.5 py-0.5 rounded text-[#D4AF37] font-medium">
                    {m.dept}
                  </span>
                )}
                {m.team && (
                  <span className="inline-block text-[9px] bg-[#7A0019]/20 border border-[#7A0019]/30 px-1.5 py-0.5 rounded text-rose-300 font-medium">
                    {m.team}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderTier3 = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {officeBearers.slice(tier2End).map((m, idx) => (
        <motion.div
          key={m.name}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: idx * 0.05 + 0.3 }}
          whileHover={{ y: -4 }}
          className="relative group cursor-pointer"
        >
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/30 rounded-2xl p-5 transition-all flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRoleGradient(m.role)} flex items-center justify-center font-extrabold text-sm shadow`}
            >
              {getInitials(m.name)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                {getRoleIcon(m.role)}
                <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase truncate">{m.role}</span>
              </div>
              <h4 className="text-base font-bold text-white truncate">{m.name}</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {m.dept && (
                  <span className="inline-block text-[8px] bg-[#D4AF37]/20 border border-[#D4AF37]/30 px-1.5 py-0.5 rounded text-[#D4AF37] font-medium">
                    {m.dept}
                  </span>
                )}
                {m.team && (
                  <span className="inline-block text-[8px] bg-[#7A0019]/20 border border-[#7A0019]/30 px-1.5 py-0.5 rounded text-rose-300 font-medium">
                    {m.team}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  // ── JSX ───────────────────────────────────────────────────────────────────
  return (
    <section id="council-members" ref={ref} className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#7A0019]/5 to-black" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />

      <div className="relative max-w-7xl mx-auto z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[#D4AF37] font-semibold mb-6">
            <Sparkles size={14} />
            <span>Meet the Real Leaders</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">
              Ascendrix Members
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            The dedicated cohort of organizers, visionaries, and officers orchestrating college empowerment and student-led initiatives at Tagore Engineering College.
          </p>

          {/* ── Year Batch Selector ── */}
          <div className="flex items-center justify-center gap-4 mt-10 mb-10">
            {(["2025-2026", "2026-2027"] as Batch[]).map((batch) => {
              const isActive   = selectedBatch === batch;
              const batchLabel = batch === "2025-2026" ? "Foundation Batch" : "Current Batch";
              const memberCount = batch === "2025-2026"
                ? `${officeBearers2025.length + executiveMembers2025.length + jointMembers2025.length} Members`
                : `${officeBearers2026.length + executiveMembers2026.length} Members`;
              return (
                <motion.button
                  key={batch}
                  id={`batch-selector-${batch.replace("-", "")}`}
                  onClick={() => {
                    onBatchChange(batch);
                    setActiveTab("executive");
                    setSearchTerm("");
                  }}
                  whileHover={{ scale: 1.06, y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative overflow-hidden text-left px-7 py-5 rounded-2xl border transition-all duration-300 min-w-[165px] ${
                    isActive
                      ? "border-[#D4AF37]/55 bg-gradient-to-br from-[#D4AF37]/15 via-[#7A0019]/8 to-[#D4AF37]/10 shadow-[0_0_35px_rgba(212,175,55,0.25)]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.9)]" />
                  )}
                  {/* Subtle shimmer for active */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent" />
                  )}
                  <div className="relative z-10">
                    <div className={`text-[10px] font-bold uppercase tracking-[0.18em] mb-1.5 flex items-center gap-1.5 ${isActive ? "text-[#D4AF37]" : "text-gray-500"}`}>
                      <Calendar className="w-3 h-3" />
                      {batchLabel}
                    </div>
                    <div className={`text-[22px] font-black tracking-tight leading-none mb-1 ${isActive ? "text-white" : "text-gray-500"}`}>
                      {batch}
                    </div>
                    <div className={`text-[10px] ${isActive ? "text-gray-400" : "text-gray-600"}`}>
                      {memberCount}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              placeholder="Search members by name or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 focus:ring-1 focus:ring-[#D4AF37]/30 transition-all shadow-lg"
            />
            {isSearching && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#D4AF37] hover:text-white transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Content (animates on batch change) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedBatch}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {isSearching ? (
              /* Search Results */
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
                  <Users size={20} className="text-[#D4AF37]" />
                  Search Results ({filteredOffice.length + filteredExecutive.length + filteredJoint.length})
                </h3>
                {hasResults ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredOffice.map((m, idx) => (
                      <MemberCard key={`so-${m.name}`} member={m} index={idx} showGroup />
                    ))}
                    {filteredExecutive.map((m, idx) => (
                      <MemberCard key={`se-${m.name}`} member={m} index={idx + filteredOffice.length} showGroup />
                    ))}
                    {filteredJoint.map((m, idx) => (
                      <MemberCard key={`sj-${m.name}`} member={m} index={idx + filteredOffice.length + filteredExecutive.length} showGroup />
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-md"
                  >
                    <div className="text-gray-400 text-lg mb-4">No members matched your search.</div>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="px-6 py-2 bg-gradient-to-r from-[#D4AF37] to-[#7A0019] rounded-full text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                    >
                      Reset Search
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Hierarchical View */
              <div className="space-y-24">

                {/* Office Bearers */}
                <div>
                  <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-4">
                    <div className="w-2.5 h-7 bg-gradient-to-b from-[#D4AF37] to-[#7A0019] rounded-full" />
                    <h3 className="text-3xl font-bold tracking-wide text-white">
                      Office Bearers &nbsp;
                      <span className="text-[#D4AF37]">{selectedBatch}</span>
                    </h3>
                  </div>
                  {renderTier1()}
                  {renderTier2()}
                  {renderTier3()}
                </div>

                {/* Assembly */}
                <div className="pt-8">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-7 bg-gradient-to-b from-[#D4AF37] to-[#7A0019] rounded-full" />
                      <div>
                        <h3 className="text-3xl font-bold tracking-wide text-white">
                          Ascendrix Assembly &nbsp;
                          <span className="text-[#D4AF37]">{selectedBatch}</span>
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">
                          Our extensive crew supporting execution and collaboration.
                        </p>
                      </div>
                    </div>

                    {/* Tab pill */}
                    <div className="flex bg-white/5 border border-white/10 rounded-full p-1 self-stretch md:self-auto shadow-inner">
                      <button
                        onClick={() => setActiveTab("executive")}
                        className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                          activeTab === "executive"
                            ? "bg-gradient-to-r from-[#D4AF37] to-[#7A0019] text-white shadow"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Executive ({executiveMembers.length})
                      </button>
                      {selectedBatch === "2025-2026" && (
                        <button
                          onClick={() => setActiveTab("joint")}
                          className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                            activeTab === "joint"
                              ? "bg-gradient-to-r from-[#D4AF37] to-[#7A0019] text-white shadow"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Joint ({jointMembers.length})
                        </button>
                      )}
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab + selectedBatch}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {(activeTab === "joint" && selectedBatch === "2025-2026"
                          ? jointMembers
                          : executiveMembers
                        ).map((m, idx) => (
                          <MemberCard
                            key={`${selectedBatch}-${activeTab}-${m.name}`}
                            member={m}
                            index={idx}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
