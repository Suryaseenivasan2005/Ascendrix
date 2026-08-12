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
  ChevronRight,
  Coins,
  Flag
} from "lucide-react";

// Real Student Council Members data - Office Bearers / Core
const officeBearers = [
  { name: "Dharun S", role: "President", dept: "AI&DS", team: "OVERVIEW" },
  { name: "Ranjika B", role: "Vice President", dept: "CSE", team: "OVERVIEW" },
  { name: "Praveen Karthik R", role: "General Secretary", dept: "AI&DS", team: "OVERVIEW" },
  { name: "Gomathi E S", role: "Joint Secretary", dept: "ECE", team: "MEDIA" },
  { name: "Gokul R", role: "Cultural Secretary", dept: "IT", team: "OVERVIEW" },
  { name: "Roshni P", role: "Cultural Secretary", dept: "ECE", team: "STAGE & RECEPTION" },
  { name: "Ranjith Kumar P", role: "Cultural Secretary", dept: "ECE", team: "MEDIA" },
  { name: "Yoshetha A", role: "Cultural Secretary", dept: "IT", team: "MC" },
  { name: "Bharathi Mohan M", role: "Treasurer", dept: "CSE", team: "DEC - OVERVIEW" },
  { name: "Nithyashree T", role: "Treasurer", dept: "ECE", team: "EO - OVERVIEW" },
  { name: "Jaasmine R", role: "Club Head", dept: "CSE", team: "CLUB & MC" },
  { name: "Sharath S", role: "Club Head", dept: "IT", team: "CLUB & TECHNICAL" },
  { name: "Kishore S", role: "Sports Secretary (Men)", dept: "CSE - B", team: "SPORTS" },
  { name: "Puspalatha G", role: "Sports Secretary (Women)", dept: "CSE - B", team: "SPORTS" },
];

// Executive Members (36)
const executiveMembers = [
  { name: "Dhiya R", role: "Executive Member", dept: "AERO", team: "ORGANIZING" },
  { name: "Saranya Sri Valli D", role: "Executive Member", dept: "AI&DS", team: "DECORATION" },
  { name: "Deepak K", role: "Executive Member", dept: "AI&DS", team: "TECHNICAL" },
  { name: "Abinaya Shree C", role: "Executive Member", dept: "CSE - A", team: "ORGANIZING" },
  { name: "Thilak Kumar J", role: "Executive Member", dept: "CSE - B", team: "TECHNICAL" },
  { name: "Yazhini N", role: "Executive Member", dept: "CSE - B", team: "MC" },
  { name: "Nithyasree A", role: "Executive Member", dept: "CSE - B", team: "ORGANIZING" },
  { name: "Perarasu S", role: "Executive Member", dept: "CYBER SECURITY", team: "ORGANIZING" },
  { name: "Pushpa V", role: "Executive Member", dept: "CYBER SECURITY", team: "ORGANIZING" },
  { name: "Salman Faris A", role: "Executive Member", dept: "ECE", team: "DECORATION" },
  { name: "Naveen R P", role: "Executive Member", dept: "ECE", team: "DECORATION" },
  { name: "Bharath Raj R", role: "Executive Member", dept: "IT", team: "ORGANIZING" },
  { name: "Senthamih Selvan K", role: "Executive Member", dept: "IT", team: "MEDIA" },
  { name: "Bhavani U", role: "Executive Member", dept: "MECH", team: "DECORATION" },
  { name: "Tharun Raj H", role: "Executive Member", dept: "MECH", team: "DECORATION" },
  { name: "Sakthi Narayana K", role: "Executive Member", dept: "AERO", team: "ORGANIZING" },
  { name: "Janani S", role: "Executive Member", dept: "AI&DS", team: "ORGANIZING" },
  { name: "Shrilekha S", role: "Executive Member", dept: "IT", team: "ORGANIZING" },
  { name: "Dhanushia K", role: "Executive Member", dept: "MBA", team: "ORGANIZING" },
  { name: "Varshitha S", role: "Executive Member", dept: "MBA", team: "ORGANIZING" },
  { name: "Kathiravan L", role: "Executive Member", dept: "AERO", team: "DECORATION" },
  { name: "Abdul Afsar M", role: "Executive Member", dept: "AI&DS", team: "MEDIA" },
  { name: "Santosh N", role: "Executive Member", dept: "AI&DS", team: "MEDIA" },
  { name: "Swathi K", role: "Executive Member", dept: "AI&DS", team: "ORGANIZING" },
  { name: "Krishnaraja D", role: "Executive Member", dept: "CSE - A", team: "DECORATION" },
  { name: "Deva Dharshini R", role: "Executive Member", dept: "CSE - A", team: "ORGANIZING" },
  { name: "Nitish S", role: "Executive Member", dept: "CSE - B", team: "DECORATION" },
  { name: "Yhamini M", role: "Executive Member", dept: "CSE - B", team: "DECORATION" },
  { name: "Prince Immanuel M", role: "Executive Member", dept: "CYBER SECURITY", team: "MEDIA" },
  { name: "Vinotha M", role: "Executive Member", dept: "CYBER SECURITY", team: "DECORATION" },
  { name: "Lok Bharath R", role: "Executive Member", dept: "CYBER SECURITY", team: "MEDIA" },
  { name: "Baskaran R", role: "Executive Member", dept: "ECE", team: "DECORATION" },
  { name: "Charumathi T K", role: "Executive Member", dept: "ECE", team: "MC" },
  { name: "Jegadeeswari A", role: "Executive Member", dept: "IT", team: "ORGANIZING" },
  { name: "Varshan A", role: "Executive Member", dept: "IT", team: "MEDIA" },
  { name: "Yoga Prajeeth S", role: "Executive Member", dept: "MECH", team: "ORGANIZING" }
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
  if (r === "vice president" || r === "vice-president") {
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
  if (r.includes("treasurer")) {
    return "from-amber-600 via-orange-500 to-red-700 text-white shadow-[0_0_15px_rgba(245,158,11,0.3)]";
  }
  if (r.includes("club head")) {
    return "from-fuchsia-600 via-pink-500 to-rose-700 text-white shadow-[0_0_15px_rgba(217,70,239,0.3)]";
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
  if (r === "vice president" || r === "vice-president") return <Award className="w-5 h-5 text-amber-300" />;
  if (r.includes("general secretary")) return <Scroll className="w-5 h-5 text-rose-400" />;
  if (r.includes("joint secretary")) return <Layers className="w-5 h-5 text-pink-400" />;
  if (r.includes("cultural")) return <Palette className="w-5 h-5 text-purple-400" />;
  if (r.includes("sports secretary")) return <Trophy className="w-5 h-5 text-emerald-400" />;
  if (r.includes("treasurer")) return <Coins className="w-5 h-5 text-orange-400" />;
  if (r.includes("club head")) return <Flag className="w-5 h-5 text-pink-400" />;
  return <UserCheck className="w-5 h-5 text-cyan-400" />;
};

export function CouncilMembers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchTerm, setSearchTerm] = useState("");

  // Search filter lists
  const filteredOffice = officeBearers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.dept?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.team?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredExecutive = executiveMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.dept?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.team?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isSearching = searchTerm.trim().length > 0;
  const hasResults = filteredOffice.length > 0 || filteredExecutive.length > 0;

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
            <div className="flex flex-wrap gap-1.5 mt-1">
              {showGroup && (
                <span className="inline-block text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-medium">
                  {member.role.includes("Executive") ? "Executive Team" : "Core Team"}
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
              Ascendrix 2.0 Members
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
              Search Results ({filteredOffice.length + filteredExecutive.length})
            </h3>
            {hasResults ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredOffice.map((m, idx) => (
                  <MemberCard key={`search-office-${m.name}`} member={m} index={idx} showGroup />
                ))}
                {filteredExecutive.map((m, idx) => (
                  <MemberCard key={`search-exec-${m.name}`} member={m} index={idx + filteredOffice.length} showGroup />
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
                  Ascendrix 2.0 Office Bearers
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

              {/* Tier 2: General & Joint Secretaries */}
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
                {officeBearers.slice(2, 4).map((m, idx) => (
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

              {/* Tier 3: Cultural, Sports, Treasurers & Club Heads */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {officeBearers.slice(4).map((m, idx) => (
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
            </div>

            {/* 2. Executive Members Section */}
            <div className="pt-8">

              {/* Heading and switcher */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-7 bg-gradient-to-b from-[#D4AF37] to-[#7A0019] rounded-full" />
                  <div>
                    <h3 className="text-3xl font-bold tracking-wide text-white">
                      Ascendrix 2.0 Assembly
                    </h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Our extensive crew of student representatives supporting execution and collaboration.
                    </p>
                  </div>
                </div>

                {/* Switcher Pill */}
                <div className="flex bg-white/5 border border-white/10 rounded-full p-1 self-stretch md:self-auto shadow-inner">
                  <div className="relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all bg-gradient-to-r from-[#D4AF37] to-[#7A0019] text-white shadow">
                    Executive Members ({executiveMembers.length})
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {executiveMembers.map((m, idx) => (
                    <MemberCard key={`exec-${m.name}`} member={m} index={idx} />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
