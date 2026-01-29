import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Play, X, MessageSquare, Mic, Video, FileSearch } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const services = [
  {
    id: 1,
    title: "AI Chatbot",
    description: "สร้าง Chatbot อัจฉริยะที่ตอบคำถามได้ 24/7",
    icon: MessageSquare,
    accentColor: "bg-teal",
    videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
  },
  {
    id: 2,
    title: "AI Voicebot",
    description: "ระบบโต้ตอบด้วยเสียงที่เข้าใจภาษาธรรมชาติ",
    icon: Mic,
    accentColor: "bg-yellow",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "BOTNOI Live",
    description: "แพลตฟอร์มไลฟ์สดพร้อม AI ช่วยดูแลลูกค้า",
    icon: Video,
    accentColor: "bg-soft-pink-dark",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Document Search",
    description: "ค้นหาเอกสารด้วย AI ที่เข้าใจความหมาย",
    icon: FileSearch,
    accentColor: "bg-green",
    videoId: "dQw4w9WgXcQ",
  },
];

export const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-sky-blue rounded-full text-primary text-sm font-medium mb-6">
            Our Solutions
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            OUR SERVICES
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            เราพัฒนาโซลูชัน AI ที่ช่วยให้ธุรกิจของคุณก้าวไปอีกขั้น
            ด้วยเทคโนโลยีที่ทันสมัยและทีมงานมืออาชีพ
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group bg-background rounded-4xl border border-border shadow-card hover:shadow-soft transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Video Preview */}
              <div
                className="relative aspect-video bg-gradient-to-br from-muted to-muted/50 cursor-pointer overflow-hidden"
                onClick={() => setSelectedVideo(service.videoId)}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 transition-colors">
                  <div
                    className={`w-16 h-16 ${service.accentColor} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <Play className="w-8 h-8 text-background ml-1" />
                  </div>
                </div>

                {/* Accent circle decoration */}
                <div
                  className={`absolute top-4 left-4 w-3 h-3 ${service.accentColor} rounded-full`}
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`w-10 h-10 ${service.accentColor} rounded-xl flex items-center justify-center`}
                  >
                    <service.icon className="w-5 h-5 text-background" />
                  </div>
                  <h3 className="text-xl font-bold text-primary">
                    {service.title}
                  </h3>
                </div>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-4xl p-0 bg-primary overflow-hidden">
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/20 hover:bg-background/40 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5 text-background" />
          </button>
          <div className="aspect-video">
            {selectedVideo && (
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};