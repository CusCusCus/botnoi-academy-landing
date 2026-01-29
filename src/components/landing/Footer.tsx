import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { BotnoiLogo } from "@/components/ui/botnoi-logo";

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
            <h3 className="flex items-center justify-center md:justify-start gap-3 text-2xl font-bold text-background mb-2">
              <BotnoiLogo className="w-8 h-8 text-background" />
              BOTNOI ACADEMY
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