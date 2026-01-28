import { motion } from "framer-motion";
import { Bot, Sparkles, Users, Lightbulb, Code } from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-soft-pink via-background to-sky-blue pt-20"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-soft-pink rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-blue rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary mb-6"
          >
            BOTNOI ACADEMY
          </motion.h1>

          {/* Subtitles */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mb-12">
            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xl md:text-2xl text-muted-foreground font-light"
            >
              — Learn together
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-xl md:text-2xl text-muted-foreground font-light"
            >
              — Play together
            </motion.p>
          </div>

          {/* Robot Mascot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="relative mb-8"
          >
            {/* Main Robot */}
            <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-sky-blue to-soft-pink rounded-4xl flex items-center justify-center shadow-soft animate-float">
              <Bot className="w-24 h-24 md:w-32 md:h-32 text-primary" />
            </div>

            {/* Floating Icons */}
            <motion.div
              className="absolute -top-4 -left-8 w-16 h-16 bg-soft-pink rounded-full flex items-center justify-center shadow-card animate-float-delayed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Users className="w-8 h-8 text-primary" />
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-8 w-14 h-14 bg-sky-blue rounded-full flex items-center justify-center shadow-card animate-float-slow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <Sparkles className="w-7 h-7 text-primary" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-12 w-12 h-12 bg-sky-blue rounded-full flex items-center justify-center shadow-card animate-float"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              <Lightbulb className="w-6 h-6 text-primary" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-12 w-14 h-14 bg-soft-pink rounded-full flex items-center justify-center shadow-card animate-float-delayed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6 }}
            >
              <Code className="w-7 h-7 text-primary" />
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-3 bg-primary/50 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
