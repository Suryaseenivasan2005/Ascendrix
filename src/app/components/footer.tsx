import { motion } from "motion/react";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative py-12 px-6 overflow-hidden border-t border-[#D4AF37]/30">
      {/* Glow Effect */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-3xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#7A0019] bg-clip-text text-transparent mb-4"
            >
              ASCENDRIX
            </motion.div>
            <p className="text-gray-400 leading-relaxed">
              The Student Council of Tagore Engineering College, fostering leadership, innovation, and excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["About", "Council Members", "Events", "Gallery", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Tagore Engineering College</li>
              <li>Chennai, Tamil Nadu 600127</li>
              <li>+91 44 2681 2345</li>
              <li>ascendrix@tagoreengineering.edu</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm flex items-center gap-2">
            © 2026 Ascendrix. Made with <Heart className="text-[#7A0019] fill-current" size={16} /> by the Student Council
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-[#D4AF37] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
