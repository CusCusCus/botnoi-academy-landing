import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, MapPin, Mail, Phone, Facebook, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().trim().min(1, "กรุณากรอกชื่อ").max(100, "ชื่อต้องไม่เกิน 100 ตัวอักษร"),
  email: z.string().trim().email("กรุณากรอกอีเมลที่ถูกต้อง").max(255, "อีเมลต้องไม่เกิน 255 ตัวอักษร"),
  message: z.string().trim().min(1, "กรุณากรอกข้อความ").max(1000, "ข้อความต้องไม่เกิน 1000 ตัวอักษร"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: data,
      });

      if (error) throw error;

      toast({
        title: "ส่งข้อความสำเร็จ!",
        description: "เราจะติดต่อกลับโดยเร็วที่สุด",
      });
      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-background rounded-4xl shadow-soft p-8"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">ชื่อ-นามสกุล</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="กรอกชื่อของคุณ"
                          className="rounded-xl border-border focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">อีเมล</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="your@email.com"
                          className="rounded-xl border-border focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary font-medium">ข้อความ</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="เล่าให้เราฟังว่าคุณสนใจอะไร..."
                          className="rounded-xl border-border focus:border-primary min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-primary hover:bg-navy-light py-6 text-lg"
                >
                  {isSubmitting ? (
                    "กำลังส่ง..."
                  ) : (
                    <>
                      ส่งข้อความ
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
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
                  123 AI Street, Tech District<br />
                  Bangkok, Thailand 10110
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
};
