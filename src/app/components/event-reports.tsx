import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Download, Users, Award, TrendingUp } from "lucide-react";

const reports = [
  {
    id: 1,
    title: "TechX Symposium 2025",
    date: "December 2025",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    summary: "A massive success with over 2000 participants across 15+ workshops and 3 hackathons",
    stats: {
      participants: 2000,
      workshops: 15,
      awards: 25,
    },
  },
  {
    id: 2,
    title: "Innovation Summit 2025",
    date: "November 2025",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=400&fit=crop",
    summary: "30+ startups pitched their ideas, with 10 receiving seed funding from partner VCs",
    stats: {
      participants: 500,
      startups: 30,
      funding: 10,
    },
  },
  {
    id: 3,
    title: "Cultural Fest - Crescendo 2025",
    date: "October 2025",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=400&fit=crop",
    summary: "Three electrifying days of performances featuring 50+ college teams and celebrity guests",
    stats: {
      participants: 3000,
      performances: 50,
      colleges: 25,
    },
  },
  {
    id: 4,
    title: "AI/ML Workshop Series",
    date: "September 2025",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
    summary: "Intensive 5-day workshop covering modern AI frameworks with industry experts",
    stats: {
      participants: 300,
      sessions: 20,
      projects: 45,
    },
  },
  {
    id: 5,
    title: "Hackathon 2025",
    date: "August 2025",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=400&fit=crop",
    summary: "48-hour coding marathon with 100+ teams building innovative solutions",
    stats: {
      participants: 400,
      teams: 100,
      prizes: 15,
    },
  },
  {
    id: 6,
    title: "Sports Championship 2025",
    date: "July 2025",
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=400&fit=crop",
    summary: "Inter-college sports fest with competitions across 12 sporting events",
    stats: {
      participants: 1500,
      events: 12,
      colleges: 30,
    },
  },
];

export function EventReports() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="event-reports"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#7A0019]/10 to-black" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#D4AF37] to-white bg-clip-text text-transparent">
              Event Reports
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Celebrating our past achievements and milestones
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37] via-[#7A0019] to-[#D4AF37]" />

          <div className="space-y-12">
            {reports.map((report, index) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[#D4AF37] rounded-full border-4 border-black -translate-x-[7px] md:-translate-x-2 z-10" />

                {/* Content */}
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}>
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#7A0019]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden group-hover:border-[#D4AF37]/50 transition-all">
                      {/* Image */}
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={report.image}
                          alt={report.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="text-sm text-[#D4AF37] mb-2">{report.date}</div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                          {report.title}
                        </h3>
                        <p className="text-gray-400 mb-4 leading-relaxed">
                          {report.summary}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          {Object.entries(report.stats).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <div className="text-2xl font-bold text-[#D4AF37]">
                                {value}+
                              </div>
                              <div className="text-xs text-gray-500 capitalize">
                                {key}
                              </div>
                            </div>
                          ))}
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full py-3 border border-[#D4AF37] rounded-full text-[#D4AF37] font-semibold flex items-center justify-center gap-2 hover:bg-[#D4AF37]/10 transition-colors"
                        >
                          <Download size={18} />
                          Download Report
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
