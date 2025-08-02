import { Button } from "@/components/ui/button";
import { useContent } from "@/hooks/useContent";

const BenefitsSection = () => {
  const { getContent, loading } = useContent();

  if (loading) {
    return <div className="py-20 flex items-center justify-center">Carregando...</div>;
  }

  const benefits = [
    getContent('benefits', 'benefit_1', 'Resultados em 30 dias'),
    getContent('benefits', 'benefit_2', 'Suporte 24/7'),
    getContent('benefits', 'benefit_3', 'Garantia de satisfação'),
    getContent('benefits', 'benefit_4', 'Metodologia exclusiva'),
    getContent('benefits', 'benefit_5', 'Acompanhamento personalizado'),
    getContent('benefits', 'benefit_6', 'Comunidade ativa')
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
              {getContent('benefits', 'title', 'Benefícios Exclusivos')}
            </h2>
          </div>
          
          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
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
                      {getContent('benefits', 'product_name', 'Produto Revolucionário')}
                    </h3>
                    <p className="font-helvetica text-lg text-primary/80 mb-2">
                      {getContent('benefits', 'product_tagline', 'A solução que você estava esperando')}
                    </p>
                    <p className="font-helvetica text-lg text-foreground/80 max-w-2xl mx-auto">
                      {getContent('benefits', 'product_description', 'Descubra como nosso produto pode transformar sua realidade e levar seus resultados para o próximo nível.')}
                    </p>
                  </div>
                  
                  <Button 
                    size="lg" 
                    className="bg-gradient-retro hover:shadow-retro transition-all duration-500 font-helvetica font-bold text-xl px-16 py-8 rounded-xl animate-glow"
                    onClick={() => {
                      const url = getContent('benefits', 'button_url', '#inscricoes');
                      if (url.startsWith('#')) {
                        document.querySelector(url)?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        window.open(url, '_blank');
                      }
                    }}
                  >
                    {getContent('benefits', 'button_text', 'GARANTIR MINHA VAGA')}
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