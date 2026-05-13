import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react";

const events = [
  {
    id: 1,
    title: "TechX Symposium 2026",
    date: "2026-06-15",
    time: "09:00 AM",
    venue: "Main Auditorium",
    description: "Annual technical symposium featuring workshops, hackathons, and tech talks",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    category: "Technical",
  },
  {
    id: 2,
    title: "Innovation Summit",
    date: "2026-06-22",
    time: "10:00 AM",
    venue: "Convention Center",
    description: "Showcasing student innovations and startup pitches",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=600&fit=crop",
    category: "Innovation",
  },
  {
    id: 3,
    title: "Cultural Fest - Crescendo",
    date: "2026-07-10",
    time: "05:00 PM",
    venue: "Open Air Theater",
    description: "Three-day cultural extravaganza with music, dance, and drama",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    category: "Cultural",
  },
  {
    id: 4,
    title: "AI & ML Workshop",
    date: "2026-06-01",
    time: "02:00 PM",
    venue: "CS Lab Block",
    description: "Hands-on workshop on latest AI/ML frameworks and applications",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    category: "Workshop",
  },
];

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-2 text-sm">
      <div className="bg-[#D4AF37]/20 px-2 py-1 rounded">
        <span className="text-[#D4AF37] font-bold">{timeLeft.days}d</span>
      </div>
      <div className="bg-[#D4AF37]/20 px-2 py-1 rounded">
        <span className="text-[#D4AF37] font-bold">{timeLeft.hours}h</span>
      </div>
      <div className="bg-[#D4AF37]/20 px-2 py-1 rounded">
        <span className="text-[#D4AF37] font-bold">{timeLeft.minutes}m</span>
      </div>
      <div className="bg-[#D4AF37]/20 px-2 py-1 rounded">
        <span className="text-[#D4AF37] font-bold">{timeLeft.seconds}s</span>
      </div>
    </div>
  );
}

export function UpcomingEvents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="upcoming-events"
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
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#D4AF37] to-white bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join us for exciting events that shape the future of innovation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#7A0019]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden group-hover:border-[#D4AF37]/50 transition-all">
                {/* Event Image */}
                <div className="relative overflow-hidden h-56">
                  <motion.img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#D4AF37] text-black text-sm font-semibold rounded-full">
                    {event.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {event.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Calendar size={18} className="text-[#D4AF37]" />
                      <span className="text-sm">{new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Clock size={18} className="text-[#D4AF37]" />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin size={18} className="text-[#D4AF37]" />
                      <span className="text-sm">{event.venue}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-gray-500 mb-2">Event starts in:</div>
                    <Countdown targetDate={event.date} />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#7A0019] rounded-full text-white font-semibold flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-[#D4AF37]/50 transition-shadow"
                  >
                    Register Now
                    <ChevronRight size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
