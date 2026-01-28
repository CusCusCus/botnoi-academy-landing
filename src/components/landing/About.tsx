import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className="py-24 md:py-32 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sky-blue/30 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Section Title */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 bg-soft-pink rounded-full text-primary text-sm font-medium mb-6"
          >
            About Us
          </motion.span>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-8">
            What is <span className="text-navy-light">BOTNOI Academy</span>?
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed"
          >
            สนามทดลองแห่งการเรียนรู้ที่เปิดโอกาสให้ฝึกฝนจริง
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            เราเชื่อว่าการเรียนรู้ที่ดีที่สุดคือการลงมือทำ 
            ที่ BOTNOI Academy เราสร้างสภาพแวดล้อมที่เปิดโอกาสให้นักศึกษาฝึกงาน
            ได้เรียนรู้จากโปรเจกต์จริง ทำงานกับทีมจริง และสร้างประสบการณ์จริง
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Button
              size="lg"
              className="group gradient-cta text-primary hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-full px-8 py-6 text-lg font-semibold"
              onClick={() => {
                const element = document.querySelector("#contact");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              เรียนรู้จากโจทย์จริง และลงมือทำจริง
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
