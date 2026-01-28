import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Quote, User } from "lucide-react";

const mentors = [
  {
    id: 1,
    name: "Dr. Win",
    position: "Founder & CEO",
  },
  {
    id: 2,
    name: "Khun Ploy",
    position: "Head of Engineering",
  },
];

export const MasterMentor = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Pink header strip */}
      <div className="bg-soft-pink py-4">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-3xl md:text-4xl font-bold text-primary text-center"
          >
            MASTER MENTOR
          </motion.h2>
        </div>
      </div>

      {/* Navy background section */}
      <div className="bg-navy py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Mentor Cards */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col md:flex-row gap-6 justify-center"
            >
              {mentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
                  className="bg-background rounded-3xl p-6 shadow-soft hover:shadow-lg transition-shadow hover:-translate-y-2 duration-300"
                >
                  {/* Portrait placeholder */}
                  <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-soft-pink to-sky-blue rounded-full flex items-center justify-center">
                    <User className="w-16 h-16 text-primary/50" />
                  </div>

                  <h4 className="text-xl font-bold text-primary text-center">
                    {mentor.name}
                  </h4>
                  <p className="text-muted-foreground text-center text-sm">
                    {mentor.position}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* Quote Block */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <Quote className="w-16 h-16 text-soft-pink/30 absolute -top-8 -left-4" />
              
              <blockquote className="text-xl md:text-2xl text-background/90 leading-relaxed italic pl-8">
                "We want our interns to learn, grow, and gain real-world experience. 
                At BOTNOI Academy, we don't just teach — we build together, 
                fail together, and succeed together."
              </blockquote>

              <div className="mt-8 pl-8">
                <p className="text-soft-pink font-semibold">Dr. Win</p>
                <p className="text-background/60 text-sm">Founder & CEO, BOTNOI Group</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
