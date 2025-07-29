import { Button } from "@/components/ui/button";

const BenefitsSection = () => {
  const benefits = [
    "Clareza do seu Propósito no digital",
    "Uma marca única, com o seu DNA", 
    "Visão de longo prazo",
    "Repertório para não precisar replicar conteúdos"
  ];

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-noise opacity-15"></div>
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-retro rounded-full blur-3xl opacity-10 animate-float"></div>
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="font-anton text-title text-foreground mb-8">
              Na prática, ao aplicar o Manual Virtual<br />
              <span className="text-transparent bg-gradient-retro bg-clip-text">
                DIFERENTE DOS IGUAIS
              </span>, você terá:
            </h2>
          </div>
          
          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-retro rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="relative bg-white p-8 rounded-xl shadow-plastic hover:shadow-retro transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-retro flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-helvetica font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    <p className="font-helvetica text-lg text-foreground leading-relaxed">
                      {benefit}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Product Box */}
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-retro rounded-3xl blur-2xl opacity-15 animate-glow"></div>
            <div className="relative bg-white/90 backdrop-blur-sm p-12 rounded-2xl shadow-vintage text-center">
              <div className="space-y-8">
                <div className="w-64 h-64 mx-auto bg-gradient-plastic rounded-2xl shadow-retro flex items-center justify-center animate-float">
                  <div className="text-center">
                    <div className="font-anton text-2xl text-foreground mb-2">
                      KIT DIGITAL
                    </div>
                    <div className="font-anton text-lg text-transparent bg-gradient-retro bg-clip-text">
                      DIFERENTE DOS IGUAIS
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-anton text-subtitle text-foreground">
                    Transforme sua presença digital hoje mesmo
                  </h3>
                  <p className="font-helvetica text-lg text-foreground/80 max-w-2xl mx-auto">
                    Um kit completo com todas as ferramentas, templates e estratégias para criar uma marca pessoal única e inesquecível.
                  </p>
                </div>
                
                <Button 
                  size="lg" 
                  className="bg-gradient-retro hover:shadow-retro transition-all duration-500 font-helvetica font-bold text-xl px-16 py-8 rounded-xl animate-glow"
                >
                  QUERO MINHA TRANSFORMAÇÃO AGORA
                </Button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;