import { useRef, forwardRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { MapPin, Mail, Phone, Facebook, Linkedin, Instagram } from "lucide-react";

export const Contact = forwardRef<HTMLElement>((_, forwardedRef) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 md:py-32 bg-gradient-to-br from-sky-blue/30 via-background to-soft-pink/30"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-soft-pink rounded-full text-primary text-sm font-medium mb-6">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            สนใจเข้าร่วม BOTNOI Academy หรือมีคำถาม? ติดต่อเราได้เลย!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Google Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-background rounded-4xl shadow-soft p-4 h-[500px] overflow-hidden"
          >
            <iframe 
              src="https://maps.google.com/maps?q=Botnoi+Group&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: '1.5rem' }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Botnoi Group Map"
            />
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col justify-center space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-soft-pink rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-1">Address</h4>
                <p className="text-muted-foreground">
                  Botnoi Group<br />
                  Bangkok, Thailand
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sky-blue rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-1">Email</h4>
                <p className="text-muted-foreground">academy@botnoi.ai</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-soft-pink rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-1">Phone</h4>
                <p className="text-muted-foreground">+66 2 123 4567</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-border">
              <h4 className="font-semibold text-primary mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center hover:bg-navy-light transition-colors"
                >
                  <Facebook className="w-6 h-6 text-background" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center hover:bg-navy-light transition-colors"
                >
                  <Linkedin className="w-6 h-6 text-background" />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center hover:bg-navy-light transition-colors"
                >
                  <Instagram className="w-6 h-6 text-background" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

Contact.displayName = "Contact";
