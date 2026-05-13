import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Linkedin, Twitter, Instagram, Mail } from "lucide-react";

const members = [
  {
    name: "Arjun Mehta",
    position: "President",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Leading with vision and innovation",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      email: "president@ascendrix.edu",
    },
  },
  {
    name: "Priya Sharma",
    position: "Vice President",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "Driving strategic initiatives",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      email: "vp@ascendrix.edu",
    },
  },
  {
    name: "Rohan Kapoor",
    position: "Secretary",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Orchestrating excellence",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      email: "secretary@ascendrix.edu",
    },
  },
  {
    name: "Anjali Patel",
    position: "Treasurer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Managing resources strategically",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      email: "treasurer@ascendrix.edu",
    },
  },
  {
    name: "Vikram Singh",
    position: "Joint Secretary",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "Ensuring seamless operations",
    social: {
      linkedin: "#",
      twitter: "#",
      instagram: "#",
      email: "joint.secretary@ascendrix.edu",
    },
  },
];

export function CouncilMembers() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="council-members"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#7A0019]/5 to-black" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#D4AF37] to-white bg-clip-text text-transparent">
              Meet the Council
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            The exceptional leaders driving innovation and excellence at Tagore Engineering College
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/30 to-[#7A0019]/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Card */}
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden group-hover:border-[#D4AF37]/50 transition-all duration-300">
                {/* Image */}
                <div className="relative overflow-hidden aspect-square">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Social Icons - Appear on Hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <a
                      href={member.social.linkedin}
                      className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-[#D4AF37]/30 transition-colors"
                    >
                      <Linkedin size={18} className="text-white" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-[#D4AF37]/30 transition-colors"
                    >
                      <Twitter size={18} className="text-white" />
                    </a>
                    <a
                      href={member.social.instagram}
                      className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-[#D4AF37]/30 transition-colors"
                    >
                      <Instagram size={18} className="text-white" />
                    </a>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-1 text-sm text-[#D4AF37] font-semibold">
                    {member.position}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{member.bio}</p>

                  <a
                    href={`mailto:${member.social.email}`}
                    className="inline-flex items-center gap-2 text-sm text-[#D4AF37] hover:text-white transition-colors"
                  >
                    <Mail size={16} />
                    Get in Touch
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
