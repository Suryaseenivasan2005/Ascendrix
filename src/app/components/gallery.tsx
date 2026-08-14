import { motion, AnimatePresence } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import Masonry from "react-responsive-masonry";
import type { Batch } from "./council-members";

// ── 2025-2026 Gallery ──────────────────────────────────────────────────────
const images2025 = [
  { id: 1,  url: "/assets/IMG-20260705-WA0048.jpg.jpeg", title: "Ascendrix 2025" },
  { id: 2,  url: "/assets/IMG_1150.JPG.jpeg",            title: "Ascendrix 2025" },
  { id: 3,  url: "/assets/IMG_1812.JPG.jpeg",            title: "Ascendrix 2025" },
  { id: 4,  url: "/assets/IMG_3459.JPG.jpeg",            title: "Ascendrix 2025" },
  { id: 5,  url: "/assets/IMG_5750.JPG.jpeg",            title: "Ascendrix 2025" },
  { id: 6,  url: "/assets/IMG_8276.JPG.jpeg",            title: "Ascendrix 2025" },
  { id: 7,  url: "/assets/IMG_8632.JPG.jpeg",            title: "Ascendrix 2025" },
  { id: 8,  url: "/assets/IMG_8901.JPG.jpeg",            title: "Ascendrix 2025" },
  { id: 9,  url: "/assets/IMG_9378.JPG.jpeg",            title: "Ascendrix 2025" },
];

// ── 2026-2027 Gallery ──────────────────────────────────────────────────────
const images2026 = [
  {
    id: 1,
    url: "/assets/WhatsApp Image 2026-08-14 at 7.17.48 PM.jpeg",
    title: "Induction Day – Ascendrix 2026",
  },
];

interface GalleryProps {
  selectedBatch: Batch;
}

export function Gallery({ selectedBatch }: GalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedImage, setSelectedImage] = useState<{ id: number; url: string; title: string } | null>(null);

  const images = selectedBatch === "2025-2026" ? images2025 : images2026;

  const batchLabel = selectedBatch === "2025-2026" ? "Ascendrix 2025 – 2026" : "Ascendrix 2026 – 2027";
  const subtitle   = selectedBatch === "2025-2026"
    ? "The batch that turns moments into magic ✨"
    : "A new chapter begins — the journey unfolds ✨";
  const estDate    = selectedBatch === "2025-2026" ? "EST. 30/08/2025" : "EST. 14/08/2026";

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
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-[#D4AF37] font-bold mb-6 uppercase tracking-[0.2em] shadow-lg backdrop-blur-sm">
            Batch of Brilliance – Shining Beyond Boundaries
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">
              {batchLabel}
            </span>
          </h2>
          <div className="text-2xl md:text-3xl text-white font-light max-w-3xl mx-auto mb-4 tracking-wide">
            {subtitle}
          </div>
          <p className="text-[#D4AF37] font-semibold tracking-widest text-sm">{estDate}</p>
        </motion.div>

        {/* Animate gallery on batch switch */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedBatch}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {images.length === 1 ? (
              /* Single image – centered hero layout */
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.05 }}
                  whileHover={{ scale: 1.03 }}
                  onClick={() => setSelectedImage(images[0])}
                  className="relative group cursor-pointer overflow-hidden rounded-3xl max-w-2xl w-full shadow-2xl border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300"
                >
                  <img
                    src={images[0].url}
                    alt={images[0].title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-semibold text-xl">{images[0].title}</h3>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />
                </motion.div>
              </div>
            ) : (
              /* Multi-image Masonry layout */
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
            )}
          </motion.div>
        </AnimatePresence>
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
            <h3 className="text-white text-2xl font-bold mt-4 text-center">{selectedImage.title}</h3>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
