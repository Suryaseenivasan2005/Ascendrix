import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import Masonry from "react-responsive-masonry";

const images = [
  { id: 1, url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", title: "TechX Symposium" },
  { id: 2, url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&h=900&fit=crop", title: "Innovation Summit" },
  { id: 3, url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop", title: "Cultural Fest" },
  { id: 4, url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=800&fit=crop", title: "AI Workshop" },
  { id: 5, url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop", title: "Hackathon" },
  { id: 6, url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&h=900&fit=crop", title: "Workshops" },
  { id: 7, url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop", title: "Award Ceremony" },
  { id: 8, url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=800&fit=crop", title: "Team Building" },
  { id: 9, url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop", title: "Symposium" },
  { id: 10, url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=900&fit=crop", title: "Celebrations" },
  { id: 11, url: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?w=800&h=600&fit=crop", title: "Panel Discussion" },
  { id: 12, url: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=800&fit=crop", title: "Networking" },
];

export function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<typeof images[0] | null>(null);

  return (
    <section
      id="gallery"
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
              Gallery
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Capturing moments of excellence, innovation, and celebration
          </p>
        </motion.div>

        <Masonry columnsCount={3} gutter="1rem">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelectedImage(image)}
              className="relative group cursor-pointer overflow-hidden rounded-2xl"
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                </div>
              </div>
              <div className="absolute inset-0 border-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            </motion.div>
          ))}
        </Masonry>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-6"
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="text-white" size={24} />
          </button>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", damping: 20 }}
            className="max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.title}
              className="w-full h-full object-contain rounded-2xl"
            />
            <h3 className="text-white text-2xl font-bold mt-4 text-center">
              {selectedImage.title}
            </h3>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
