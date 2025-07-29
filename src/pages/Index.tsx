import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Timer from "@/components/Timer";
import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import BenefitsSection from "@/components/BenefitsSection";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Admin Access Button */}
      <div className="fixed top-4 right-4 z-50">
        <Link to="/login">
          <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur-sm">
            Admin
          </Button>
        </Link>
      </div>

      <Timer />
      <Hero />
      <ProblemSection />
      <BenefitsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Index;
