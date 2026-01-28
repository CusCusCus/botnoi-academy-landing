import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-navy py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-background mb-2">
              BOTNOI<span className="text-soft-pink">.</span>ACADEMY
            </h3>
            <p className="text-background/60 text-sm">
              Learn together, Play together
            </p>
          </div>

          <div className="flex items-center gap-2 text-background/60 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-soft-pink fill-soft-pink" />
            <span>by BOTNOI Team</span>
          </div>

          <p className="text-background/60 text-sm">
            © 2024 BOTNOI Academy. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
