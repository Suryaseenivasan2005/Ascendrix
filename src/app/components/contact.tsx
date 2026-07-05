import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, Facebook } from "lucide-react";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
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
              Get in Touch
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#7A0019]/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 group-hover:border-[#D4AF37]/50 transition-all">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#7A0019] rounded-xl text-white font-semibold shadow-lg shadow-[#D4AF37]/50 hover:shadow-[#D4AF37]/70 transition-shadow"
                >
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#7A0019]/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 group-hover:border-[#D4AF37]/50 transition-all">
                <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#D4AF37]/20 rounded-xl">
                      <MapPin className="text-[#D4AF37]" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Address</div>
                      <div className="text-white">Tagore Engineering College<br />Chennai, Tamil Nadu 600127</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#D4AF37]/20 rounded-xl">
                      <Phone className="text-[#D4AF37]" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Phone</div>
                      <div className="text-white">+91 44 2681 2345</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-[#D4AF37]/20 rounded-xl">
                      <Mail className="text-[#D4AF37]" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Email</div>
                      <div className="text-white">ascendrix@tagoreengineering.edu</div>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                  <div className="flex gap-3">
                    {[
                      { icon: Instagram, href: "#" },
                      { icon: Linkedin, href: "#" },
                      { icon: Twitter, href: "#" },
                      { icon: Facebook, href: "#" },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all"
                      >
                        <social.icon className="text-white" size={20} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#7A0019]/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />

              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl overflow-hidden group-hover:border-[#D4AF37]/50 transition-all h-64">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=80.12593%2C12.86089%2C80.13293%2C12.86589&layer=mapnik&marker=12.8633878%2C80.1294316"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Tagore Engineering College Location"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
