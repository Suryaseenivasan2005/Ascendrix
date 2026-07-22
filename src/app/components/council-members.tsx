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
  ChevronRight
} from "lucide-react";

// Real Student Council Members data - Office Bearers / Core
const officeBearers = [
  { name: "Pushpavel K", role: "President" },
  { name: "Jiji Dharshini G", role: "Vice-President" },
  { name: "Gokul R", role: "General Secretary" },
  { name: "Nivetha Lakshmi V", role: "General Secretary" },
  { name: "Roshini P", role: "Joint Secretary" },
  { name: "Mehul Kumar C.B", role: "Cultural Secretary" },
  { name: "Nabila S", role: "Cultural Secretary" },
  { name: "Mithilesh K", role: "Cultural Secretary" },
  { name: "Shalini N", role: "Cultural Secretary" },
  { name: "Delwin D", role: "Sports Secretary" },
  { name: "Ashlin Jeba Reeja J", role: "Sports Secretary" },
  { name: "Venkatesh N", role: "Joint-Sports Secretary" },
  { name: "Ranjika B", role: "Joint-Sports Secretary" },
];

// Executive Members (21)
const executiveMembers = [
  { name: "Haris M", role: "Executive Member" },
  { name: "Dharun S", role: "Executive Member" },
  { name: "Nithish Kumar V", role: "Executive Member" },
  { name: "Krithisha E V", role: "Executive Member" },
  { name: "Ajay V", role: "Executive Member" },
  { name: "Iniyavan M", role: "Executive Member" },
  { name: "Lokesh S", role: "Executive Member" },
  { name: "Vasanthan N", role: "Executive Member" },
  { name: "Arjun P", role: "Executive Member" },
  { name: "Praveen N", role: "Executive Member" },
  { name: "Kathiraven V", role: "Executive Member" },
  { name: "Ranjit Kumar P", role: "Executive Member" },
  { name: "Senthamizh Selvan K", role: "Executive Member" },
  { name: "Santhiya R", role: "Executive Member" },
  { name: "Archana B", role: "Executive Member" },
  { name: "Shrilekha S", role: "Executive Member" },
  { name: "Adithya B", role: "Executive Member" },
  { name: "Varshitha S", role: "Executive Member" },
  { name: "Sakthi Narayanan K", role: "Executive Member" },
  { name: "Senbaga S", role: "Executive Member" },
  { name: "Gunal S", role: "Executive Member" },
];

// Joint Members (16)
const jointMembers = [
  { name: "Neha K", role: "Joint Member" },
  { name: "Bhavani U", role: "Joint Member" },
  { name: "Yoshethaa A", role: "Joint Member" },
  { name: "Sanjana Sree M", role: "Joint Member" },
  { name: "Gomathi E S", role: "Joint Member" },
  { name: "Yokesh B K", role: "Joint Member" },
  { name: "Sri Sadha S", role: "Joint Member" },
  { name: "Naveen R P", role: "Joint Member" },
  { name: "Keerthikanthan G K", role: "Joint Member" },
  { name: "Praveen Karthik R", role: "Joint Member" },
  { name: "Selva Maruthi P", role: "Joint Member" },
  { name: "Hellen Arsha D", role: "Joint Member" },
  { name: "Harish Pavan A", role: "Joint Member" },
  { name: "Ayushyaman Kumar", role: "Joint Member" },
  { name: "Neha R", role: "Joint Member" },
  { name: "Dhiya R", role: "Joint Member" },
];

// Get initials of a student
const getInitials = (name: string) => {
  const parts = name.split(" ").filter(p => p.length > 0);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return "AM";
};

// Roles Color Mapping for beautiful badges
const getRoleGradient = (role: string) => {
  const r = role.toLowerCase();
  if (r === "president") {
    return "from-[#D4AF37] via-[#FFD700] to-[#AA7C11] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]";
  }
  if (r === "vice-president") {
    return "from-[#D4AF37]/80 via-yellow-200 to-[#AA7C11]/80 text-black shadow-[0_0_15px_rgba(212,175,55,0.25)]";
  }
  if (r.includes("general secretary")) {
    return "from-[#7A0019] via-rose-600 to-[#4D000F] text-white shadow-[0_0_15px_rgba(122,0,25,0.3)]";
  }
  if (r.includes("joint secretary")) {
    return "from-[#7A0019]/70 via-rose-500 to-[#4D000F]/70 text-white shadow-[0_0_10px_rgba(122,0,25,0.2)]";
  }
  if (r.includes("cultural secretary")) {
    return "from-violet-600 via-purple-500 to-indigo-700 text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]";
  }
  if (r.includes("sports secretary")) {
    return "from-emerald-600 via-teal-500 to-cyan-700 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]";
  }
  if (r.includes("joint-sports secretary")) {
    return "from-teal-600 via-emerald-500 to-green-700 text-white shadow-[0_0_10px_rgba(20,184,166,0.2)]";
  }
  if (r.includes("executive")) {
    return "from-blue-600 via-cyan-500 to-indigo-700 text-white";
  }
  return "from-slate-600 via-zinc-700 to-neutral-800 text-gray-200";
};

// Get Role Icon
const getRoleIcon = (role: string) => {
  const r = role.toLowerCase();
  if (r === "president") return <Shield className="w-5 h-5 text-[#D4AF37]" />;
  if (r === "vice-president") return <Award className="w-5 h-5 text-amber-300" />;
  if (r.includes("general secretary")) return <Scroll className="w-5 h-5 text-rose-400" />;
  if (r.includes("joint secretary")) return <Layers className="w-5 h-5 text-pink-400" />;
  if (r.includes("cultural")) return <Palette className="w-5 h-5 text-purple-400" />;
  if (r.includes("sports secretary")) return <Trophy className="w-5 h-5 text-emerald-400" />;
  if (r.includes("joint-sports")) return <Activity className="w-5 h-5 text-teal-400" />;
  return <UserCheck className="w-5 h-5 text-cyan-400" />;
};

export function CouncilMembers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"executive" | "joint">("executive");

  // Search filter lists
  const filteredOffice = officeBearers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredExecutive = executiveMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredJoint = jointMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSearching = searchTerm.trim().length > 0;
  const hasResults = filteredOffice.length > 0 || filteredExecutive.length > 0 || filteredJoint.length > 0;

  // Render a member card
  const MemberCard = ({ member, index, showGroup = false }: { member: any; index: number; showGroup?: boolean }) => {
    const initials = getInitials(member.name);
    const grad = getRoleGradient(member.role);
    const icon = getRoleIcon(member.role);

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index * 0.05, 0.4) }}
        whileHover={{ y: -6, scale: 1.02 }}
        className="group relative"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/15 to-[#7A0019]/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Card Border glow */}
        <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#D4AF37]/40 transition-all duration-300 flex items-center gap-4">

          {/* Avatar Monogram */}
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${grad} flex flex-col items-center justify-center font-bold text-lg relative overflow-hidden group-hover:scale-105 transition-transform duration-300 shadow-inner`}>
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
            {showGroup && (
              <span className="inline-block mt-1 text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-medium">
                {member.role.includes("Executive") ? "Executive Team" : member.role.includes("Joint") ? "Joint Team" : "Core Team"}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="council-members"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background Gradient & Starfield */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#7A0019]/5 to-black" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />

      <div className="relative max-w-7xl mx-auto z-10">

        {/* Header Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[#D4AF37] font-semibold mb-6">
            <Sparkles size={14} />
            <span>Meet the Real Leaders</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">
              Ascendrix Members
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            The dedicated cohort of organizers, visionaries, and officers orchestrating college empowerment and student-led initiatives at Tagore Engineering College.
          </p>

          {/* Search Box */}
          <div className="max-w-md mx-auto mt-10 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center">
              <Search size={20} className="group-focus-within:text-[#D4AF37] transition-colors" />
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

        {/* Searching Results View */}
        {isSearching ? (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
              <Users size={20} className="text-[#D4AF37]" />
              Search Results ({filteredOffice.length + filteredExecutive.length + filteredJoint.length})
            </h3>
            {hasResults ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOffice.map((m, idx) => (
                  <MemberCard key={`search-office-${m.name}`} member={m} index={idx} showGroup />
                ))}
                {filteredExecutive.map((m, idx) => (
                  <MemberCard key={`search-exec-${m.name}`} member={m} index={idx + filteredOffice.length} showGroup />
                ))}
                {filteredJoint.map((m, idx) => (
                  <MemberCard key={`search-joint-${m.name}`} member={m} index={idx + filteredOffice.length + filteredExecutive.length} showGroup />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-md"
              >
                <div className="text-gray-400 text-lg mb-4">No council members matched your search.</div>
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
          /* Normal Structured Hierarchical View */
          <div className="space-y-24">

            {/* 1. Office Bearers Section */}
            <div>
              <div className="flex items-center gap-3 mb-10 border-b border-white/10 pb-4">
                <div className="w-2.5 h-7 bg-gradient-to-b from-[#D4AF37] to-[#7A0019] rounded-full" />
                <h3 className="text-3xl font-bold tracking-wide text-white">
                  Office Bearers 2025
                </h3>
              </div>

              {/* Tier 1: President & Vice-President */}
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
                    {/* Golden luxury glow behind card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/25 to-amber-500/10 rounded-3xl blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Sleek metallic glass card */}
                    <div className="relative backdrop-blur-2xl bg-white/5 border-2 border-white/10 group-hover:border-[#D4AF37]/70 rounded-3xl p-8 transition-all duration-300 flex items-center gap-6 shadow-2xl">

                      {/* Generous Initial emblem */}
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D4AF37] via-yellow-200 to-[#AA7C11] text-black font-black text-2xl flex items-center justify-center shadow-lg relative overflow-hidden">
                        <span>{getInitials(m.name)}</span>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          {getRoleIcon(m.role)}
                          <span className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
                            {m.role}
                          </span>
                        </div>
                        <h4 className="text-2xl font-black text-white group-hover:text-amber-300 transition-colors">
                          {m.name}
                        </h4>
                        <div className="mt-2 text-xs text-gray-400 flex items-center gap-1.5">
                          <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full" />
                          Core Council Executive
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tier 2: General & Joint Secretaries */}
              <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
                {officeBearers.slice(2, 5).map((m, idx) => (
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
                          <span className="text-[10px] font-bold text-rose-400 tracking-wider uppercase truncate">
                            {m.role}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors truncate">
                          {m.name}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tier 3: Cultural & Sports Coordinators */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {officeBearers.slice(5).map((m, idx) => (
                  <motion.div
                    key={m.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: idx * 0.05 + 0.3 }}
                    whileHover={{ y: -4 }}
                    className="relative group cursor-pointer"
                  >
                    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/30 rounded-2xl p-5 transition-all flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getRoleGradient(m.role)} flex items-center justify-center font-extrabold text-sm shadow`}>
                        {getInitials(m.name)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          {getRoleIcon(m.role)}
                          <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase truncate">
                            {m.role}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white truncate">
                          {m.name}
                        </h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 2. Executive & Joint Members Section (Tabbed view) */}
            <div className="pt-8">

              {/* Heading and switcher */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-7 bg-gradient-to-b from-[#D4AF37] to-[#7A0019] rounded-full" />
                  <div>
                    <h3 className="text-3xl font-bold tracking-wide text-white">
                      Ascendrix Assembly 2025
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Our extensive crew of student representatives supporting execution and collaboration.
                    </p>
                  </div>
                </div>

                {/* Switcher Pill */}
                <div className="flex bg-white/5 border border-white/10 rounded-full p-1 self-stretch md:self-auto shadow-inner">
                  <button
                    onClick={() => setActiveTab("executive")}
                    className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "executive"
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#7A0019] text-white shadow"
                      : "text-gray-400 hover:text-white"
                      }`}
                  >
                    Executive Members ({executiveMembers.length})
                  </button>
                  <button
                    onClick={() => setActiveTab("joint")}
                    className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${activeTab === "joint"
                      ? "bg-gradient-to-r from-[#D4AF37] to-[#7A0019] text-white shadow"
                      : "text-gray-400 hover:text-white"
                      }`}
                  >
                    Joint Members ({jointMembers.length})
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  {activeTab === "executive" ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {executiveMembers.map((m, idx) => (
                        <MemberCard key={`exec-${m.name}`} member={m} index={idx} />
                      ))}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {jointMembers.map((m, idx) => (
                        <MemberCard key={`joint-${m.name}`} member={m} index={idx} />
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
