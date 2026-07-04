import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import {
  Sparkles,
  GraduationCap,
  PartyPopper,
  Heart,
  Flame,
  Rocket,
  Sun,
  Zap,
  Trophy,
  Music,
  Venus,
  Award,
} from "lucide-react";

const moments = [
  {
    id: 1,
    title: "Inauguration – Ascendrix",
    type: "Milestone",
    icon: Sparkles,
    description:
      "The inauguration of Ascendrix marked the beginning of a new chapter of leadership, innovation, and collaboration. The event introduced the council's vision, mission, and objectives for the academic year. Students and faculty gathered to celebrate this milestone with enthusiasm. It laid a strong foundation for a year of impactful initiatives and memorable experiences.",
  },
  {
    id: 2,
    title: "Induction Day",
    type: "Ceremony",
    icon: GraduationCap,
    description:
      "Induction Day welcomed the newly selected council members into their leadership journey. The session introduced their roles, responsibilities, and the values of teamwork and service. It encouraged commitment, confidence, and collaboration among the members. The event marked the official beginning of their contribution to the student community.",
  },
  {
    id: 3,
    title: "Freshers' Day / Onam",
    type: "Celebration",
    icon: PartyPopper,
    description:
      "Freshers' Day and Onam celebrations brought together students in a vibrant atmosphere of joy and cultural harmony. The event featured traditional attire, performances, games, and festive activities. It provided freshers with an opportunity to connect with their peers and seniors. The celebration created lasting memories and strengthened the spirit of unity.",
  },
  {
    id: 4,
    title: "Teachers' Day",
    type: "Appreciation",
    icon: Heart,
    description:
      "Teachers' Day was celebrated to honor the dedication and guidance of our faculty members. Students expressed their gratitude through performances, speeches, and heartfelt gestures. The event reflected the invaluable role teachers play in shaping young minds. It was a memorable occasion filled with respect and appreciation.",
  },
  {
    id: 5,
    title: "Ignite – Talent Hunt",
    type: "Talent Hunt",
    icon: Flame,
    description:
      "Ignite – Talent Hunt provided students with a platform to showcase their unique talents and creativity. Participants impressed the audience through music, dance, art, and various other performances. The event encouraged confidence, self-expression, and healthy competition. It celebrated the diverse talents within our student community.",
  },
  {
    id: 6,
    title: "Club Inauguration",
    type: "Launch",
    icon: Rocket,
    description:
      "The Club Inauguration officially launched the student clubs for the academic year. Members were introduced to the vision, objectives, and activities of each club. The event inspired students to participate actively and explore their interests. It marked the beginning of an exciting journey of learning and collaboration.",
  },
  {
    id: 7,
    title: "Pongal",
    type: "Festival",
    icon: Sun,
    description:
      "The Pongal celebration reflected the richness of our cultural heritage and traditions. Students enthusiastically participated in traditional games, performances, and festive activities. The event promoted togetherness, gratitude, and the spirit of harvest celebrations. It created a vibrant and joyful atmosphere across the campus.",
  },
  {
    id: 8,
    title: "Flash Mob",
    type: "Performance",
    icon: Zap,
    description:
      "The Flash Mob energized the campus with lively music, synchronized performances, and enthusiastic participation. The surprise performance captivated students and created an exciting atmosphere. It showcased teamwork, creativity, and confidence among the performers. The event became one of the most memorable highlights of the year.",
  },
  {
    id: 9,
    title: "Sports Day",
    type: "Sports",
    icon: Trophy,
    description:
      "Sports Day celebrated fitness, teamwork, and sportsmanship through a variety of competitive events. Students participated with enthusiasm, determination, and discipline. The event encouraged a healthy competitive spirit while promoting physical well-being. It concluded with the recognition of outstanding performances and achievements.",
  },
  {
    id: 10,
    title: "Culturals",
    type: "Fest",
    icon: Music,
    description:
      "The Cultural Fest celebrated creativity, diversity, and artistic excellence through vibrant performances. Students showcased their talents in music, dance, drama, and other cultural events. The event fostered confidence, teamwork, and cultural appreciation. It brought the campus together in a joyful celebration of talent and unity.",
  },
  {
    id: 11,
    title: "Women's Day",
    type: "Awareness",
    icon: Venus,
    description:
      "Women's Day was celebrated to recognize the achievements, strength, and contributions of women in society. The event featured inspiring talks, performances, and interactive activities. It promoted awareness about equality, empowerment, and respect. The celebration inspired students to value and support inclusive communities.",
  },
  {
    id: 12,
    title: "College Day",
    type: "Milestone",
    icon: Award,
    description:
      "College Day marked the culmination of the academic year's achievements and memorable moments. Students were recognized for their excellence in academics, sports, and extracurricular activities. The celebration featured cultural performances and inspiring addresses by distinguished guests. It was a proud occasion that reflected the spirit and success of our institution.",
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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#7A0019]/5 to-black" />

      <div className="relative max-w-5xl mx-auto z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[#D4AF37] font-semibold mb-6 uppercase tracking-widest">
            Timeline &amp; Agendas
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">
              Moments We Created Together
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A look back at the incredible events and celebrations successfully orchestrated by Ascendrix.
          </p>
        </motion.div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#D4AF37]/45 to-transparent" />

          <div className="space-y-12">
            {moments.map((moment, index) => {
              const Icon = moment.icon;
              return (
                <motion.div
                  key={moment.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Center Emblem/Icon */}
                  <div className="absolute left-8 md:left-1/2 w-10 h-10 bg-black rounded-full border border-[#D4AF37]/50 -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                    <Icon size={16} className="text-[#D4AF37]" />
                  </div>

                  {/* Card Container */}
                  <div
                    className={`w-full md:w-1/2 ${
                      index % 2 === 0
                        ? "md:pl-12 pl-20"
                        : "md:pr-12 pl-20 md:pl-0"
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -5, scale: 1.01 }}
                      className="relative backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 rounded-3xl p-6 md:p-8 transition-all duration-300 shadow-xl"
                    >
                      {/* Gold Highlight Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-[#7A0019]/10 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative z-10">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-[#D4AF37] px-2.5 py-0.5 rounded">
                            {moment.type}
                          </span>
                          <span className="text-xs font-bold text-[#D4AF37]">
                            #{moment.id}
                          </span>
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
                          {moment.title}
                        </h3>

                        <p className="text-sm text-gray-400 leading-relaxed">
                          {moment.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
