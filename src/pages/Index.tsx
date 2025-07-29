import Timer from "@/components/Timer";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Timer />
      <Hero />
      <ProblemSection />
      <BenefitsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Index;
