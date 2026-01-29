import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (!href.startsWith("/#") && href !== "/") {
      navigate(href);
      return;
    }

    if (href === "/") {
      if (location.pathname !== "/") {
        navigate("/");
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (href.startsWith("/#")) {
      const hash = href.substring(1);
      if (location.pathname !== "/") {
        navigate("/");
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 pointer-events-none"
    >
      {/* Ambient gradient background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-soft-pink/30 to-sky-blue/20 rounded-full blur-3xl opacity-60" />
        <div className="absolute -top-10 right-1/4 w-72 h-72 bg-gradient-to-l from-sky-blue/25 to-soft-pink/15 rounded-full blur-3xl opacity-50" />
      </div>

      <motion.div 
        className={`
          pointer-events-auto relative
          flex items-center justify-between px-2 py-2 
          transition-all duration-700 ease-out
          ${isScrolled 
            ? "w-[88%] md:w-auto" 
            : "w-[92%] md:w-auto"
          }
        `}
      >
        {/* Liquid glass container */}
        <div 
          className={`
            absolute inset-0 rounded-[2rem]
            transition-all duration-700 ease-out
            ${isScrolled
              ? "bg-white/60 dark:bg-navy/40 shadow-[0_8px_40px_-12px_rgba(45,62,114,0.25),inset_0_1px_1px_rgba(255,255,255,0.8)]"
              : "bg-white/40 dark:bg-navy/25 shadow-[0_4px_30px_-8px_rgba(45,62,114,0.15),inset_0_1px_1px_rgba(255,255,255,0.6)]"
            }
            backdrop-blur-2xl backdrop-saturate-[1.8]
            border border-white/50 dark:border-white/20
          `}
          style={{
            background: isScrolled 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(248,194,220,0.15) 50%, rgba(102,177,255,0.1) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(248,194,220,0.1) 50%, rgba(102,177,255,0.08) 100%)',
          }}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-[1px] rounded-[calc(2rem-1px)] bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
          
          {/* Refraction highlight */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative flex items-center justify-between w-full gap-4 md:gap-6 px-4 py-1">
          {/* Logo */}
          <motion.a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/");
            }}
            className="flex items-center gap-2.5 text-xl font-semibold text-primary whitespace-nowrap"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-soft-pink to-sky-blue rounded-xl blur-md opacity-60" />
              <div className="relative bg-white/80 rounded-xl p-1.5 backdrop-blur-sm border border-white/50">
                <BotnoiLogo className="w-7 h-7 text-primary" />
              </div>
            </div>
            <span className="bg-gradient-to-r from-primary via-navy-light to-primary bg-clip-text text-transparent font-bold tracking-tight">
              BOTNOI ACADEMY
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 bg-white/30 dark:bg-white/10 rounded-2xl p-1.5 backdrop-blur-lg border border-white/40">
            {navLinks.map((link) => {
              const isActive = (link.href === "/" && location.pathname === "/") ||
                (link.href !== "/" && location.pathname === link.href);
              
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(link.href);
                  }}
                  className={`
                    relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300
                    ${isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-white/70 dark:bg-white/20 rounded-xl shadow-sm"
                      style={{
                        boxShadow: '0 2px 12px -4px rgba(45,62,114,0.15), inset 0 1px 1px rgba(255,255,255,0.8)'
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.a>
              );
            })}
          </div>

          {/* Apply Now Button */}
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleNavigation("/internship")}
            className="hidden md:flex items-center gap-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-navy-light to-primary rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-[1px] bg-gradient-to-b from-white/20 to-transparent rounded-[calc(1rem-1px)]" />
            <span className="relative text-white px-5 py-2.5 text-sm font-semibold tracking-wide">
              Apply Now
            </span>
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden relative p-2.5 rounded-xl bg-white/50 backdrop-blur-lg border border-white/40 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </motion.button>
        </div>
      </motion.div>

      {/* Mobile Menu Dropdown */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          y: isMobileMenuOpen ? 0 : -20,
          scale: isMobileMenuOpen ? 1 : 0.95,
          pointerEvents: isMobileMenuOpen ? "auto" : "none"
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-24 left-4 right-4 md:hidden pointer-events-auto"
      >
        <div 
          className="relative rounded-3xl p-5 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(248,194,220,0.2) 50%, rgba(102,177,255,0.15) 100%)',
          }}
        >
          {/* Glass effects */}
          <div className="absolute inset-0 backdrop-blur-2xl backdrop-saturate-[1.8]" />
          <div className="absolute inset-0 border border-white/50 rounded-3xl" />
          <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] bg-gradient-to-b from-white/50 to-transparent pointer-events-none" />
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          
          <div className="relative flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.href);
                }}
                className="text-foreground/80 hover:text-primary font-medium py-3 px-4 text-center rounded-xl hover:bg-white/50 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : -20 }}
                transition={{ delay: index * 0.05 + 0.1 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : 10 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                onClick={() => handleNavigation("/internship")}
                className="w-full mt-3 rounded-2xl bg-gradient-to-r from-primary to-navy-light hover:opacity-90 text-white font-semibold py-6"
              >
                Apply Now
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};
