import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Star, 
  Video, 
  X, 
  CheckSquare, 
  MessageCircle,
  FileText,
  Bookmark,
  Award
} from "lucide-react";

// Real timeline moments populated from the actual meeting images
const moments = [
  {
    id: 1,
    title: "An Inspiring Start",
    date: "August 11, 2025",
    time: "12:00 PM – 1:30 PM",
    venue: "MBA Smart Class",
    speaker: "Ms. Rakshana Mam",
    description: "Announcing the formation of the student council to the entire college and finalizing the list of elected student council members. This initiative promises to strengthen student leadership and enhance the overall college experience.",
    type: "Milestone",
    icon: Star,
    agenda: [
      "Announcing the formation of the student council to the entire college.",
      "Finalizing the list of elected student council members.",
      "Outlining leadership goals and defining core duties."
    ],
    attendees: "All College Students & Faculty",
    quote: "Every great journey begins with a vision."
  },
  {
    id: 2,
    title: "Moments That Made Us a Team",
    date: "September 03, 2025",
    time: "11:00 AM – 12:45 PM",
    venue: "Pharmacy Conference Hall",
    speaker: "Ms. Rakshana Mam",
    description: "The first official gathering of the newly formed student council to outline the initial operational guidelines and upcoming events.",
    type: "Meeting",
    icon: Users,
    agenda: [
      "Discussion regarding Fresher's Day and Onam Day Celebration.",
      "Discussion regarding Induction Day program.",
      "Discussion on common queries and issues faced by students in the college."
    ],
    attendees: "27 Members Present (Student Council Convenor & Council Members)",
    quote: "Fostering seamless unity and team spirit from day one."
  },
  {
    id: 3,
    title: "Teacher's Day Event & Surprise Surprise",
    date: "September 09, 2025",
    description: "A grand celebration to honor our incredible educators. The council meticulously planned logistics, certificates, hampers, and setups in the computer lab. As a heart-warming surprise token of appreciation, our Rakshana Mam gifted the council members premium Smoor chocolate/brownie hampers, truly motivating the team to continue their duties with immense enthusiasm!",
    type: "Event",
    icon: Calendar,
    quote: "With a badge comes responsibility, with responsibility comes growth.",
    agenda: [
      "Organizing files, student list databases, and logistics in the computer lab.",
      "Arranging personalized gifts, honorary certificates, and floral bouquets for teachers.",
      "Receiving surprise Smoor luxury chocolate hampers from Ms. Rakshana Mam as a token of encouragement."
    ],
    attendees: "Student Council Team & Faculty",
    venue: "Main Campus & Lab Blocks"
  },
  {
    id: 4,
    title: "The Grand Plan Comes Together",
    date: "September 09, 2025",
    time: "12:45 PM – 1:30 PM",
    venue: "Pharmacy Conference Hall",
    speaker: "Ms. Rakshana Mam",
    description: "A highly detailed planning session focused on fests, anti-ragging measures, committees, and expanding council operations.",
    type: "Meeting",
    icon: Users,
    agenda: [
      "Finalization of Fresher's Day Event – dress code, Chief Guests, anti-ragging undertakings, events, and decoration arrangements.",
      "Formation and Responsibilities of Committees for Fresher's Day and faculty participation.",
      "Planning Gifts, Management Fund, and Hampers for first-year students.",
      "Defining Roles and Duties of the Student Council during the event.",
      "Student Conduct Guidelines – Do's and Don'ts for Fresher's Day.",
      "Banner and Poster Preparation and Reveal prior to the event.",
      "Scheduling and Planning of Upcoming Events post-Fresher's Day.",
      "Club Inauguration Details and finalizing club list.",
      "Expansion of the Student Council – addition of new members.",
      "Addressing Student Queries and Facility Arrangements (transportation and practice schedules).",
      "Discussion regarding Teacher's Day celebration plan."
    ],
    attendees: "30 Members Present (Student Council Convenor & Council Members)",
    quote: "Precision in planning ensures flawless execution."
  },
  {
    id: 5,
    title: "Virtual Connections (Third Meeting)",
    date: "September 11, 2025",
    time: "1:00 PM – 2:00 PM",
    venue: "MBA Smart Classroom (Online via Google Meet)",
    speaker: "Ms. Rakshana Mam",
    description: "An intensive virtual sync regarding immediate action plans for Fresher's Day, badge ceremonies, and social media poster releases.",
    type: "Meeting",
    icon: Video,
    agenda: [
      "Freshers Day event preparation and arrangements.",
      "Chief Guest reveal planning.",
      "Badge arrangement for new council members.",
      "Freshers Day student event timings and MC (Master of Ceremonies) responsibilities.",
      "Social media poster updates and reels preparation."
    ],
    attendees: "25 Members Present (Student Council Convenor & Council Members)",
    quote: "Keeping the connection strong, physically and virtually."
  },
  {
    id: 6,
    title: "Fresher's Day Event",
    date: "September 12, 2025",
    description: "Welcoming the newest batch of students to the college with an unforgettable celebration.",
    type: "Event",
    icon: Star,
  },
  {
    id: 7,
    title: "Meeting Through the Screens",
    date: "October 05, 2025",
    time: "11:00 AM – 12:30 PM",
    venue: "Online via Google Meet",
    speaker: "Ms. Rakshana Mam",
    description: "An expansive virtual sync bringing the Ascendrix Family together to map out cultural events, club inaugurations, and sports highlights.",
    type: "Meeting",
    icon: Video,
    agenda: [
      "Discussion on the upcoming Cultural Event Yasha's 2026, including its theme, dress code, duration, and event lineup.",
      "Discussion on the Club Inauguration Ceremony and the distribution of badges for club coordinators.",
      "Sports Day scheduling and preparations.",
      "Symposium Event logistics and planning.",
      "Talent hunt for freshers."
    ],
    attendees: "40 Members Present (Student Council Convenor & Council Members)",
    quote: "Planning the Magic: Once upon a time Begins..."
  },
  {
    id: 8,
    title: "IGNITE (2025-26) – First Year Edition",
    date: "October 07, 2025",
    time: "12:30 PM – 3:30 PM",
    venue: "Main Campus Labs & Audit Halls",
    description: "Unleashing the hidden stars of tomorrow! Celebrating creativity, courage, and connection among fresh minds with a myriad of online and offline events.",
    type: "Event",
    icon: Star,
    agenda: [
      "Offline Events: Poetry, Singing, Dancing, Speech, Instrumental, Cooking without fire.",
      "Online Events: Reels Creation, Poster Designing, Drawing/Painting, Craft Work, Meme Making."
    ],
    attendees: "First Year Students & Council Mentors",
    quote: "Celebrating creativity, courage, and connection among fresh minds."
  },
  {
    id: 9,
    title: "Club Launch & Inter College Fest Update",
    date: "October 10, 2025",
    time: "11:00 AM – 11:15 AM",
    venue: "Jerusalem College of Engineering",
    description: "An intensive planning session to map out inter-college collaborations, guidelines, and structural elements for Yashas 2k26.",
    type: "Meeting",
    icon: Users,
    agenda: [
      "Scheduling Yashas 2k26 event timings from 8:30 AM to 4:30 PM.",
      "Planning to invite seven prestigious Chief Guests.",
      "Structuring both on-stage and off-stage prize distributions.",
      "Formation of the Discipline Committee and coordinating official badge printing.",
      "Finalizing high-quality T-shirt designs for participants and team members.",
      "Coordinating DJ performances, professional photography, videography, and host arrangements.",
      "Arranging participation slots for dance teams (8-10) and singing teams (8-10).",
      "Outlining general club launch plans, marking an exciting beginning."
    ],
    attendees: "Student Council Representatives & Partner Coordinators",
    quote: "The fest take-off begins."
  },
  {
    id: 10,
    title: "Club Inauguration & Felicitation of IGNITE Winners",
    date: "October 16, 2025",
    time: "10:30 AM – 11:30 AM",
    venue: "Main Auditorium",
    description: "Celebrating the official unveiling of the Ascendrix Clubs and honoring the brilliant first-year winners of the IGNITE talent hunt.",
    type: "Event",
    icon: Award,
    agenda: [
      "Unveiling the official Ascendrix Clubs and their mission statements.",
      "Distributing prizes and felicitating first-year students who triumphed in the Talent Hunt.",
      "Highlighting expectations and structures for the upcoming Yashas '26 inter-college cultural events.",
      "Introducing and scheduling intra-college sports competitions.",
      "Emphasizing forthcoming Pongal celebrations and the core Tech Symposium.",
      "Reminding students to maintain discipline and exemplary orderliness during all events."
    ],
    attendees: "Full Student Body, Winners, Faculty & Council Mentors",
    quote: "An exciting beginning for the club's journey."
  }
];

export function EventReports() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedMeeting, setSelectedMeeting] = useState<typeof moments[0] | null>(null);

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
            Timeline & Agendas
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">
              Moments We Created Together
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A real-time log of our founding moments, meetings, and key decisions. Click any card to read the full meeting agendas.
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
                  transition={{ delay: index * 0.12 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                  }`}
                >
                  {/* Center Emblem/Icon */}
                  <div className="absolute left-8 md:left-1/2 w-10 h-10 bg-black rounded-full border border-[#D4AF37]/50 -translate-x-1/2 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(212,175,55,0.25)] group-hover:scale-110 transition-transform">
                    <Icon size={16} className="text-[#D4AF37]" />
                  </div>

                  {/* Card Container */}
                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-12 pl-20" : "md:pr-12 pl-20 md:pl-0"}`}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.01 }}
                      onClick={() => setSelectedMeeting(moment)}
                      className="relative backdrop-blur-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 rounded-3xl p-6 md:p-8 transition-all duration-300 shadow-xl cursor-pointer"
                    >
                      {/* Gold Highlight Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-[#7A0019]/10 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative z-10">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-[#D4AF37] px-2.5 py-0.5 rounded">
                            {moment.type}
                          </span>
                          <span className="text-xs font-semibold text-gray-400">
                            {moment.date}
                          </span>
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors mb-4">
                          {moment.title}
                        </h3>

                        {moment.quote && (
                          <p className="text-sm italic text-amber-300/80 mb-3 border-l border-amber-300/40 pl-3">
                            "{moment.quote}"
                          </p>
                        )}
                        
                        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-4">
                          {moment.description}
                        </p>

                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <span className="text-xs text-[#D4AF37] font-semibold flex items-center gap-1.5 hover:underline">
                            <FileText size={14} />
                            {moment.agenda ? "View Meeting Log & Agenda" : "View Details"}
                          </span>
                          {moment.venue && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                              <MapPin size={12} />
                              {moment.venue}
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Meeting Minutes Drawer/Modal */}
        <AnimatePresence>
          {selectedMeeting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMeeting(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 md:p-6"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-2xl w-full max-h-[85vh] bg-[#0A0A0C] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              >
                {/* Header glow */}
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#D4AF37] to-[#7A0019]" />
                
                {/* Close Button */}
                <button
                  onClick={() => setSelectedMeeting(null)}
                  className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors z-20 text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>

                {/* Modal Scroll Container */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
                  
                  {/* Top Metas */}
                  <div>
                    <div className="inline-block text-[10px] font-bold uppercase tracking-wider text-black bg-[#D4AF37] px-2.5 py-0.5 rounded mb-3">
                      {selectedMeeting.type} Details
                    </div>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                      {selectedMeeting.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                      Date: {selectedMeeting.date}
                    </p>
                  </div>

                  {/* Quote or Badge Responsibility Banner */}
                  {selectedMeeting.quote && (
                    <div className="bg-gradient-to-r from-[#7A0019]/30 to-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl p-4 flex gap-3 items-center">
                      <Bookmark className="text-[#D4AF37] shrink-0" size={20} />
                      <p className="text-sm font-bold text-[#D4AF37] italic">
                        "{selectedMeeting.quote}"
                      </p>
                    </div>
                  )}

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 gap-4 bg-white/5 border border-white/10 rounded-2xl p-4">
                    {selectedMeeting.speaker && (
                      <div className="col-span-2 md:col-span-1">
                        <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-0.5">Presided By</div>
                        <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                          <Users size={14} className="text-[#D4AF37]" />
                          {selectedMeeting.speaker}
                        </div>
                      </div>
                    )}
                    {selectedMeeting.attendees && (
                      <div className="col-span-2 md:col-span-1">
                        <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-0.5">Members Present</div>
                        <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                          <Users size={14} className="text-[#D4AF37]" />
                          {selectedMeeting.attendees}
                        </div>
                      </div>
                    )}
                    {selectedMeeting.time && (
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-0.5">Time Schedule</div>
                        <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                          <Clock size={14} className="text-[#D4AF37]" />
                          {selectedMeeting.time}
                        </div>
                      </div>
                    )}
                    {selectedMeeting.venue && (
                      <div>
                        <div className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-0.5">Venue Location</div>
                        <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                          <MapPin size={14} className="text-[#D4AF37]" />
                          {selectedMeeting.venue}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <div className="text-xs uppercase font-extrabold tracking-widest text-gray-500 mb-2">Overview</div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {selectedMeeting.description}
                    </p>
                  </div>

                  {/* Agendas Checklist */}
                  {selectedMeeting.agenda && (
                    <div className="space-y-3">
                      <div className="text-xs uppercase font-extrabold tracking-widest text-gray-500 flex items-center gap-1">
                        <CheckSquare size={14} className="text-[#D4AF37]" />
                        Official Agenda & Logged Discussions
                      </div>
                      <div className="space-y-2.5">
                        {selectedMeeting.agenda.map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-start bg-white/[0.02] border border-white/5 rounded-xl p-3 hover:bg-white/5 transition-colors">
                            <span className="w-5 h-5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-sm text-gray-300 leading-relaxed">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Footer buttons */}
                <div className="p-6 bg-white/5 border-t border-white/10 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedMeeting(null)}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#7A0019] rounded-full text-white text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    Done Reading
                  </button>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
