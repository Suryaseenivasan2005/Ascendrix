import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Trophy, Users, Calendar, Award } from "lucide-react";

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}+</span>;
}

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { icon: Calendar, label: "Events Conducted", value: 150 },
    { icon: Users, label: "Student Participants", value: 5000 },
    { icon: Trophy, label: "Clubs Coordinated", value: 25 },
    { icon: Award, label: "Achievements", value: 50 },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#7A0019]/10 to-black" />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-1/4 -right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <motion.h2
              className="text-5xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
            >
              <span className="bg-gradient-to-r from-[#D4AF37] to-white bg-clip-text text-transparent">
                About Ascendrix
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              Ascendrix is the premier student council of Tagore Engineering College,
              dedicated to fostering leadership, innovation, and excellence among students.
            </motion.p>

            <motion.p
              className="text-lg text-gray-400 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              We orchestrate world-class events, workshops, and initiatives that empower
              students to reach their full potential. Our mission is to create an
              ecosystem where innovation meets opportunity, and where every student
              has the platform to shine.
            </motion.p>
          </motion.div>

          {/* Right Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#7A0019]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 group-hover:border-[#D4AF37]/50 transition-all">
                  <stat.icon className="text-[#D4AF37] mb-4" size={36} />
                  <div className="text-4xl font-bold text-white mb-2">
                    <AnimatedCounter end={stat.value} />
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
