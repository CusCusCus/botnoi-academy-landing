import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BotnoiLogo } from "@/components/ui/botnoi-logo";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Internship", href: "/internship" },
  { label: "Review", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const accentMap: Record<string, string> = {
    "/": "linear-gradient(135deg, hsl(var(--soft-pink)/0.85), hsl(var(--sky-blue)/0.85))",
    "/internship": "linear-gradient(135deg, hsl(var(--sky-blue)/0.85), hsl(var(--soft-azure)/0.85))",
    "/#experience": "linear-gradient(135deg, hsl(var(--soft-azure)/0.85), hsl(var(--soft-pink)/0.85))",
    "/#contact": "linear-gradient(135deg, hsl(var(--soft-pink)/0.85), hsl(var(--orange-red)/0.85))",
  };

  useEffect(() => {
    const ENTER_THRESHOLD = 64; // scroll down past this to set scrolled
    const EXIT_THRESHOLD = 48;  // scroll up above this to unset scrolled
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled((prev) => (prev ? y > EXIT_THRESHOLD : y > ENTER_THRESHOLD));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // Handle external or page navigation
    if (!href.startsWith("/#") && href !== "/") {
      navigate(href);
      return;
    }

    // Handle hash navigation
    if (href === "/") {
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    // Handle hash links like /#contact
    if (href.startsWith("/#")) {
      const hash = href.substring(1); // #contact
      if (location.pathname !== "/") {
        navigate("/");
        // We rely on the browser or a separate effect to handle the hash scroll after navigation
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        const element = document.querySelector(hash);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none"
    >
      <motion.div 
        layout
        className={`
          pointer-events-auto
          flex flex-col md:flex-row md:items-center justify-between
          rounded-[2rem] md:rounded-full
          transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
          backdrop-blur-[40px] backdrop-saturate-200
          border border-white/40 ring-1 ring-white/20
          shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]
          relative overflow-hidden
          ${isMobileMenuOpen 
            ? "bg-white/30 w-[90%] p-6 gap-6" 
            : isScrolled ? "bg-white/30 px-6 py-3 w-[90%] md:w-auto gap-4 md:gap-8" : "bg-white/30 px-6 py-3 w-[90%] md:w-auto gap-4 md:gap-8"
          }
        `}
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, \"SF Pro Text\", \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif' }}
      >
          {/* Header Row (Logo + Toggle) */}
          <div className="flex items-center justify-between w-full md:w-auto">
            {/* Logo */}
            <motion.a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation("/");
              }}
              className="flex items-center gap-3 text-2xl font-bold text-primary whitespace-nowrap tracking-wide relative z-10"
              whileHover={{ scale: 1.06 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
            >
              <BotnoiLogo className="w-10 h-10 text-primary drop-shadow-sm" />
              <span>BOTNOI ACADEMY</span>
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 text-primary relative z-10 bg-white/20 rounded-full backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center relative z-10 bg-white/40 backdrop-blur-xl border border-white/50 rounded-full p-1.5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.href);
                }}
                className={`
                  relative px-6 py-2.5 rounded-full text-sm transition-all duration-300
                  ${
                    (link.href === "/" && location.pathname === "/") ||
                    (link.href !== "/" && location.pathname === link.href)
                      ? "text-primary font-bold shadow-[0_4px_12px_-2px_rgba(102,177,255,0.3)] ring-2 ring-white/80 scale-105"
                      : "text-muted-foreground font-medium hover:text-primary hover:bg-white/30"
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={
                  ((link.href === "/" && location.pathname === "/") ||
                    (link.href !== "/" && location.pathname === link.href))
                    ? { background: accentMap[link.href] }
                    : undefined
                }
              >
                <span>{link.label}</span>
              </motion.a>
            ))}
          </div>

          {/* Apply Now Button (Desktop) */}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            onClick={() => handleNavigation("/internship")}
            className="hidden md:block bg-gradient-to-r from-[hsl(var(--soft-pink))] to-[hsl(var(--sky-blue))] text-[#2D3E72] px-6 py-2 rounded-full text-sm font-bold hover:opacity-90 transition-opacity shadow-soft ring-1 ring-white/40 relative z-10"
          >
            Apply Now
          </motion.button>

          {/* Mobile Menu Content (Inside the same container) */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="md:hidden flex flex-col gap-6 w-full pt-4 border-t border-white/20 overflow-hidden"
              >
                <div className="flex flex-col gap-2 p-2 bg-white/40 backdrop-blur-xl border border-white/50 rounded-[2rem] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]">
                  {navLinks.map((link, index) => {
                    const isActive = (link.href === "/" && location.pathname === "/") || (link.href !== "/" && location.pathname === link.href);
                    return (
                      <motion.a
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                        key={link.label}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavigation(link.href);
                        }}
                        className={`
                          text-lg font-medium tracking-wide transition-all duration-300
                          px-6 py-3 rounded-full flex items-center
                          ${isActive 
                            ? "text-[#1A237E] shadow-sm ring-1 ring-white/50 font-bold" 
                            : "text-[#4A5568] hover:bg-white/20 hover:text-[#2D3E72]"}
                        `}
                        style={isActive ? { background: accentMap[link.href] } : undefined}
                      >
                        {link.label}
                      </motion.a>
                    );
                  })}
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="pl-2 pb-2"
                >
                  <Button
                    onClick={() => handleNavigation("/internship")}
                    className="px-8 py-6 rounded-full bg-gradient-to-r from-[hsl(var(--soft-pink))] to-[hsl(var(--sky-blue))] text-[#2D3E72] hover:opacity-90 text-base font-bold shadow-lg shadow-blue-900/10 transition-all duration-300 w-full md:w-auto border-none"
                  >
                    Apply Now
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
      </motion.div>
    </motion.nav>
  );
};
