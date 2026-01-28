import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { TraineeExperience } from "@/components/landing/TraineeExperience";
import { MasterMentor } from "@/components/landing/MasterMentor";
import { Services } from "@/components/landing/Services";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <TraineeExperience />
      <MasterMentor />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
