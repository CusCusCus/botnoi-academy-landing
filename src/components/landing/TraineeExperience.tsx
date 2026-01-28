import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Camera, Heart, Star, Laptop, Coffee } from "lucide-react";

const polaroidImages = [
  { id: 1, rotation: -8, top: "5%", left: "10%" },
  { id: 2, rotation: 5, top: "15%", left: "55%" },
  { id: 3, rotation: -3, top: "45%", left: "5%" },
  { id: 4, rotation: 12, top: "50%", left: "50%" },
  { id: 5, rotation: -6, top: "75%", left: "25%" },
];

export const TraineeExperience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 md:py-32 bg-soft-pink/30"
    >
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Trainee Memory */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-8">
              Trainee Memory
            </h3>

            {/* Polaroid Grid */}
            <div className="relative h-[500px] md:h-[600px]">
              {polaroidImages.map((img, index) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1, rotate: img.rotation }
                      : {}
                  }
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  className="absolute w-36 md:w-44 bg-background rounded-lg shadow-card p-3 hover:scale-110 hover:z-10 transition-transform cursor-pointer"
                  style={{ top: img.top, left: img.left }}
                >
                  <div className="aspect-square bg-gradient-to-br from-sky-blue to-soft-pink rounded flex items-center justify-center mb-2">
                    {index === 0 && <Camera className="w-10 h-10 text-primary/50" />}
                    {index === 1 && <Heart className="w-10 h-10 text-primary/50" />}
                    {index === 2 && <Star className="w-10 h-10 text-primary/50" />}
                    {index === 3 && <Laptop className="w-10 h-10 text-primary/50" />}
                    {index === 4 && <Coffee className="w-10 h-10 text-primary/50" />}
                  </div>
                  <p className="text-xs text-center text-muted-foreground">
                    Memory #{img.id}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Unlimited Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-background rounded-4xl border-4 border-sky-blue p-8 md:p-12 shadow-soft">
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Unlimited Experience
              </h3>

              <p className="text-lg text-muted-foreground mb-8">
                ประสบการณ์ที่ไม่มีขีดจำกัด เรียนรู้จากโปรเจกต์จริง 
                ทำงานร่วมกับทีมพัฒนา AI ชั้นนำของประเทศไทย
              </p>

              {/* Illustration placeholder */}
              <div className="relative">
                <div className="bg-gradient-to-br from-sky-blue/50 to-soft-pink/50 rounded-3xl p-8 flex items-center justify-center">
                  <div className="flex gap-4 items-end">
                    {/* Student illustrations */}
                    <div className="w-16 h-24 bg-primary/20 rounded-t-full rounded-b-lg" />
                    <div className="w-20 h-28 bg-sky-blue-dark/50 rounded-t-full rounded-b-lg" />
                    <div className="w-16 h-24 bg-soft-pink-dark/50 rounded-t-full rounded-b-lg" />
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-soft-pink rounded-full flex items-center justify-center shadow-sm animate-float">
                  <Laptop className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-sky-blue rounded-full flex items-center justify-center shadow-sm animate-float-delayed">
                  <Star className="w-5 h-5 text-primary" />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">Projects</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">100+</p>
                  <p className="text-sm text-muted-foreground">Trainees</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">4.9</p>
                  <p className="text-sm text-muted-foreground">Rating</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
