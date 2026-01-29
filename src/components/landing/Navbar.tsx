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
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 pointer-events-none"
    >
      <div 
        className={`
          pointer-events-auto
          flex items-center justify-between px-6 py-3 rounded-full 
          transition-all duration-500 ease-in-out
          backdrop-blur-2xl
          border border-white/40
          shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]
          ${
            isScrolled
              ? "bg-white/70 translate-y-0 shadow-lg"
              : "bg-white/30 translate-y-2 shadow-md hover:bg-white/40"
          }
          w-[90%] md:w-auto gap-4 md:gap-8
        `}
      >
          {/* Logo */}
          <motion.a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("/");
            }}
            className="flex items-center gap-3 text-2xl font-bold text-primary whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
          >
            <BotnoiLogo className="w-10 h-10 text-primary" />
            <span>BOTNOI ACADEMY</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.href);
                }}
                className={`
                  relative px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    (link.href === "/" && location.pathname === "/") ||
                    (link.href !== "/" && location.pathname === link.href)
                      ? "text-primary bg-white/50"
                      : "text-muted-foreground hover:text-primary hover:bg-white/30"
                  }
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Apply Now Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavigation("/internship")}
            className="hidden md:block bg-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors shadow-md"
          >
            Apply Now
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="absolute top-24 left-4 right-4 bg-white/80 backdrop-blur-xl border border-white/40 rounded-3xl p-6 shadow-2xl pointer-events-auto md:hidden flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(link.href);
              }}
              className="text-foreground/80 hover:text-primary font-medium py-3 text-center border-b border-white/20 last:border-none"
            >
              {link.label}
            </a>
          ))}
          <Button
            onClick={() => handleNavigation("/#contact")}
            className="rounded-full bg-primary hover:bg-navy-light w-full mt-2"
          >
            Apply Now
          </Button>
        </motion.div>
      )}
    </motion.nav>
  );
};
