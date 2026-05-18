import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Users, Award, GraduationCap, BookOpen, Sparkles, Flame, Rocket, MoreHorizontal } from "lucide-react";

const events = [
  { id: 1, title: "Student Council Formation", category: "Milestone", icon: Users, color: "from-amber-400 to-orange-500" },
  { id: 2, title: "Badge Ceremony", category: "Ceremony", icon: Award, color: "from-yellow-300 to-amber-500" },
  { id: 3, title: "Induction Day", category: "Ceremony", icon: GraduationCap, color: "from-rose-400 to-red-500" },
  { id: 4, title: "Teacher's Day", category: "Celebration", icon: BookOpen, color: "from-purple-400 to-indigo-500" },
  { id: 5, title: "Aurora-2K25 Celebration", category: "Fest", icon: Sparkles, color: "from-fuchsia-400 to-pink-500" },
  { id: 6, title: "Ignite 2K25", category: "Symposium", icon: Flame, color: "from-orange-400 to-red-500" },
  { id: 7, title: "Club Inauguration", category: "Launch", icon: Rocket, color: "from-emerald-400 to-teal-500" },
  { id: 8, title: "To Be Continued ....", category: "Future", icon: MoreHorizontal, color: "from-gray-400 to-gray-600" },
];

export function UpcomingEvents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="events-we-made"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#7A0019]/5 to-black" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[#D4AF37] font-semibold mb-6 uppercase tracking-widest">
            Milestones
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">
              Events We Made
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A look back at the incredible initiatives and celebrations successfully orchestrated by Ascendrix.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative cursor-pointer"
              >
                {/* Glow Behind Card */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-[#7A0019]/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative h-full backdrop-blur-xl bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/40 rounded-3xl p-8 transition-all duration-300 shadow-xl flex flex-col items-center text-center">
                  
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-black/50 border border-white/10 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:text-[#D4AF37] transition-colors">
                    {event.id}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${event.color} flex flex-col items-center justify-center text-white mb-6 shadow-lg transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300`}>
                    <Icon size={28} />
                  </div>

                  {/* Content */}
                  <div className="text-[10px] font-bold tracking-widest uppercase text-[#D4AF37] mb-2">
                    {event.category}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {event.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
