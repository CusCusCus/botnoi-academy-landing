import { useState, useEffect } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Check, Bot, Sparkles, Users, Lightbulb, Code } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PositionCategory {
  title: string;
  items: string[];
}

const FALLBACK_POSITIONS: PositionCategory[] = [
  { title: "Agentic Builder", items: ["Internship Program", "Part-time", "Full-time"] },
  { title: "Backend", items: ["Python Developer", "Node.js Developer", "Go Developer"] },
  { title: "Content / Marketing", items: ["Content Creator", "Digital Marketing", "Social Media Manager"] },
  { title: "Data Science", items: ["Data Analyst", "Data Engineer", "Machine Learning Engineer"] },
  { title: "Graphic", items: ["Graphic Designer", "Motion Graphics", "Art Director"] },
  { title: "Meta", items: ["Metaverse Developer", "3D Modeler", "Unity Developer"] },
  { title: "NLP", items: ["NLP Engineer", "Linguist", "AI Researcher"] },
  { title: "Sales", items: ["Sales Executive", "Account Manager", "Business Development"] },
  { title: "Software Development", items: ["Full Stack Developer", "Frontend Developer", "Software Engineer"] },
  { title: "TTS/ASR", items: ["Speech Engineer", "Audio Engineer", "Signal Processing"] },
  { title: "UX/UI", items: ["UX Researcher", "UI Designer", "Product Designer"] },
  { title: "Web App", items: ["React Developer", "Vue Developer", "Angular Developer"] },
];

const Internship = () => {
  // Initialize with fallback positions immediately so UI is never empty
  const [positions, setPositions] = useState<PositionCategory[]>(FALLBACK_POSITIONS);
  const [isLoading, setIsLoading] = useState(false); // Don't show loading initially since we have fallback data
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: "",
  });
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch positions from Supabase (silently update if successful)
  useEffect(() => {
    let isMounted = true;

    const fetchPositions = async () => {
      // Note: We don't set isLoading(true) here because we want to show fallback data immediately
      try {
        const { data, error } = await supabase
          .from('internship_positions')
          .select('title, items')
          .order('title');

        if (!isMounted) return;

        if (error) throw error;

        if (data && data.length > 0) {
          setPositions(data);
        } 
        // If data is empty, we keep the fallback positions
      } catch (error: any) {
        if (!isMounted) return;
        
        // Ignore AbortError which can happen during rapid component mounting/unmounting
        // Check both error object properties and string representation to be safe
        const isAbortError = 
          error.name === 'AbortError' || 
          error.message?.toLowerCase().includes('aborted') ||
          String(error).toLowerCase().includes('abort');

        if (isAbortError) {
          return;
        }

        console.error('Error fetching positions:', error);
        // We already have fallback positions, so no action needed on error
      } 
    };

    fetchPositions();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('internship_applications')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            position: formData.position,
          },
        ]);

      if (error) throw error;

      setIsSuccessOpen(true);
      setFormData({ firstName: "", lastName: "", email: "", position: "" });
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top Section with Gradient */}
      <div className="relative bg-gradient-to-br from-soft-pink via-background to-[#BBDEFB] overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-soft-pink rounded-full blur-[100px] opacity-30" />
        </div>
        
        <Navbar />
        
        <div className="container mx-auto px-4 pt-40 pb-40">
          {/* Animated Mascot Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mb-8 mx-auto w-32 h-32 md:w-40 md:h-40"
          >
            {/* Main Icon */}
            <div className="w-full h-full bg-gradient-to-br from-white via-soft-pink/20 to-sky-blue/20 rounded-[2rem] flex items-center justify-center shadow-lg border border-white/50 animate-float backdrop-blur-sm">
              <Bot className="w-16 h-16 md:w-20 md:h-20 text-primary" strokeWidth={1.5} />
            </div>

            {/* Floating Icons */}
            <motion.div
              className="absolute -top-4 -left-4 w-10 h-10 bg-soft-pink rounded-full flex items-center justify-center shadow-md animate-float-delayed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Users className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4 w-10 h-10 bg-sky-blue rounded-full flex items-center justify-center shadow-md animate-float-slow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Sparkles className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-10 h-10 bg-sky-blue rounded-full flex items-center justify-center shadow-md animate-float"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Lightbulb className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -right-4 w-10 h-10 bg-soft-pink rounded-full flex items-center justify-center shadow-md animate-float-delayed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Code className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </motion.div>
          </motion.div>

          {/* Page Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold text-primary text-center mb-12"
          >
            BOTNOI Internship
          </motion.h1>

          {/* Position Category Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
            >
              {positions.map((category, index) => (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger asChild>
                    <div 
                      className="bg-white/80 backdrop-blur-sm border border-white/50 rounded-full px-6 py-4 flex items-center justify-between cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group focus:outline-none"
                    >
                      <span className={`font-medium ${index % 2 === 0 ? 'text-[#F06292]' : 'text-primary'}`}>
                        {category.title}
                      </span>
                      <ChevronDown className="w-5 h-5 text-[#F06292] group-data-[state=open]:rotate-180 transition-transform duration-500" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-white/90 backdrop-blur-sm border-white/50 rounded-2xl p-2 shadow-xl data-[state=open]:duration-500 data-[state=closed]:duration-300 data-[side=bottom]:slide-in-from-top-4 data-[state=open]:ease-out">
                    {category.items.map((item, itemIndex) => (
                      <div 
                        key={itemIndex}
                        className="text-primary px-3 py-2 text-sm cursor-default"
                      >
                        {item}
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Application Form Section - On White Background */}
      <div className="relative bg-white flex-1 z-10">
        <div className="container mx-auto px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="max-w-2xl mx-auto bg-white border-[3px] border-[#BBDEFB] rounded-[2.5rem] p-8 md:p-12 shadow-sm"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-primary text-center mb-8">
              Application Now Open!
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                {/* Name */}
                <div className="relative">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold z-10">Name</div>
                   <Input 
                    placeholder="...Type..." 
                    className="bg-white border-[3px] border-[#BBDEFB] rounded-full pl-24 h-14 text-primary placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#F06292] focus-visible:border-transparent transition-all duration-300"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Surname */}
                <div className="relative">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold z-10">Surname</div>
                   <Input 
                    placeholder="...Type..." 
                    className="bg-white border-[3px] border-[#BBDEFB] rounded-full pl-24 h-14 text-primary placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#F06292] focus-visible:border-transparent transition-all duration-300"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Gmail */}
                <div className="relative">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold z-10">Gmail</div>
                   <Input 
                    type="email"
                    placeholder="...Type..." 
                    className="bg-white border-[3px] border-[#BBDEFB] rounded-full pl-24 h-14 text-primary placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#F06292] focus-visible:border-transparent transition-all duration-300"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                {/* Position Dropdown */}
                <div className="relative">
                  <Select 
                    required 
                    value={formData.position} 
                    onValueChange={(value) => handleInputChange("position", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="w-full bg-white border-[3px] border-[#BBDEFB] rounded-full h-14 text-primary font-bold focus:ring-2 focus:ring-[#F06292] focus:ring-offset-0">
                      <SelectValue placeholder="Position" />
                    </SelectTrigger>
                    <SelectContent>
                      {positions.map((category) => (
                        <SelectItem key={category.title} value={category.title}>
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-center pt-4">
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#F06292] hover:bg-[#D81B60] text-white font-bold rounded-full px-12 py-6 text-lg shadow-md transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      
      <Footer />

      {/* Success Modal */}
      <Dialog open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-[#FFF0F5] via-white to-[#E3F2FD] border-none rounded-[2.5rem] p-12 [&>button]:hidden shadow-xl overflow-hidden">
          <DialogTitle className="sr-only">Application Submit</DialogTitle>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.2, 
                type: "spring", 
                stiffness: 260, 
                damping: 20 
              }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#66B1FF]/20 blur-xl rounded-full" />
              <Check className="w-24 h-24 text-[#66B1FF] mb-2 relative z-10" strokeWidth={5} />
            </motion.div>
            
            <div className="space-y-2">
              <motion.h3 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-4xl font-bold text-[#2D3E72]"
              >
                Application Submit
              </motion.h3>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-[#2D3E72] text-lg font-medium"
              >
                Your application has been submitted successfully. Good luck !
              </motion.p>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Internship;