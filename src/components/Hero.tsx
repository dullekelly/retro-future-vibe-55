import { Button } from "@/components/ui/button";
import { useContent } from "@/hooks/useContent";
import heroImage from "@/assets/hero-retro.jpg";

const Hero = () => {
  const { getContent, loading } = useContent();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }
  return (
    <section className="relative min-h-screen bg-cream overflow-hidden">
      {/* Vintage texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-20"></div>
      
      {/* Background geometric shapes */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-plastic rounded-full blur-3xl opacity-30 animate-float"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-retro rounded-full blur-2xl opacity-20 animate-vintage-pulse"></div>
      
      <div className="relative container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-xs font-helvetica uppercase tracking-[0.2em] text-foreground/70">
                KIT BRANDING
              </p>
              <h1 className="font-anton text-hero leading-none">
                <span className="block text-foreground">{getContent('hero', 'title', 'DIFERENTE')}</span>
                <span className="block text-transparent bg-gradient-retro bg-clip-text animate-gradient-shift">
                  {getContent('hero', 'subtitle', 'DOS IGUAIS')}
                </span>
              </h1>
            </div>
            
            <div className="space-y-6">
              <p className="font-helvetica text-lg text-foreground/80 max-w-lg leading-relaxed">
                {getContent('hero', 'description', 'UM KIT VIRTUAL DIFERENTE DOS IGUAIS PARA DAR OS PRIMEIROS PASSOS E SE DESTACAR NO DIGITAL')}
              </p>
              
              <p className="font-brittany text-lg text-foreground/70 italic">
                – Por Ketherin Kaffka
              </p>
            </div>
            
            <Button 
              size="lg" 
              className="bg-gradient-retro hover:shadow-retro transition-all duration-500 font-helvetica font-bold text-lg px-12 py-6 rounded-xl animate-glow"
              onClick={() => {
                const url = getContent('hero', 'button_url', '#inscricoes');
                if (url.startsWith('#')) {
                  document.querySelector(url)?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.open(url, '_blank');
                }
              }}
            >
              {getContent('hero', 'button_text', 'LIBERE AGORA O SEU ACESSO')}
            </Button>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Kit Branding Diferente dos Iguais" 
                className="w-full h-auto rounded-2xl shadow-vintage animate-float"
              />
              
              {/* Glossy overlay effect */}
              <div className="absolute inset-0 bg-gradient-plastic rounded-2xl opacity-20"></div>
              
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-retro rounded-3xl blur-xl opacity-20 animate-glow"></div>
            </div>
          </div>
          
        </div>
      </div>
      
      {/* Scrolling ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-foreground text-white py-3 overflow-hidden">
        <div className="flex animate-[scroll_20s_linear_infinite] whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="px-8 font-helvetica font-bold text-sm uppercase tracking-wider flex-shrink-0">
              INSCRIÇÕES ABERTAS! •
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;