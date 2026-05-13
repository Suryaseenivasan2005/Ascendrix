import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Search } from "lucide-react";

const coordinators = [
  { name: "Karthik Reddy", department: "Computer Science", email: "karthik@ascendrix.edu" },
  { name: "Sneha Iyer", department: "Electronics", email: "sneha@ascendrix.edu" },
  { name: "Aditya Gupta", department: "Mechanical", email: "aditya@ascendrix.edu" },
  { name: "Meera Nair", department: "Civil", email: "meera@ascendrix.edu" },
  { name: "Rahul Desai", department: "Chemical", email: "rahul@ascendrix.edu" },
  { name: "Divya Krishnan", department: "Electrical", email: "divya@ascendrix.edu" },
  { name: "Sanjay Kumar", department: "Information Technology", email: "sanjay@ascendrix.edu" },
  { name: "Pooja Menon", department: "Biotechnology", email: "pooja@ascendrix.edu" },
  { name: "Aryan Shah", department: "Artificial Intelligence", email: "aryan@ascendrix.edu" },
  { name: "Kavya Reddy", department: "Data Science", email: "kavya@ascendrix.edu" },
  { name: "Nikhil Joshi", department: "Robotics", email: "nikhil@ascendrix.edu" },
  { name: "Isha Patel", department: "Aerospace", email: "isha@ascendrix.edu" },
];

export function Coordinators() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCoordinators = coordinators.filter(
    (coord) =>
      coord.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coord.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      id="coordinators"
      ref={ref}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#7A0019]/10 to-black" />

      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#D4AF37] to-white bg-clip-text text-transparent">
              Department Coordinators
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Connecting every department with excellence and innovation
          </p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]/50 transition-colors"
            />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCoordinators.map((coordinator, index) => (
            <motion.div
              key={coordinator.email}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/20 to-[#7A0019]/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 group-hover:border-[#D4AF37]/50 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#7A0019] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                  {coordinator.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {coordinator.name}
                </h3>
                <div className="text-sm text-[#D4AF37] mb-3">
                  {coordinator.department}
                </div>
                <a
                  href={`mailto:${coordinator.email}`}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {coordinator.email}
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCoordinators.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-400 mt-12"
          >
            No coordinators found matching your search.
          </motion.div>
        )}
      </div>
    </section>
  );
}
