import { useContent } from "@/hooks/useContent";

const ProblemSection = () => {
  const { getContent, loading } = useContent();

  if (loading) {
    return <div className="py-20 flex items-center justify-center">Carregando...</div>;
  }

  return (
    <section className="py-20 bg-white relative">
      {/* Vintage texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-10"></div>
      
      <div className="relative container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Problem Statement */}
          <div className="space-y-8">
            <h2 className="font-anton text-title text-foreground">
              {getContent('problem', 'title', 'Problemas Comuns')}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                getContent('problem', 'problem_1', 'O mesmo conteúdo'),
                getContent('problem', 'problem_2', 'O mesmo look'),
                getContent('problem', 'problem_3', 'O mesmo resultado'),
                getContent('problem', 'problem_4', 'A mesma frustração')
              ].map((item, index) => (
                <div 
                  key={index}
                  className="p-6 bg-cream rounded-xl shadow-plastic hover:shadow-retro transition-all duration-300 animate-vintage-pulse"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <p className="font-helvetica text-lg text-foreground/80">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Solution Statement */}
          <div className="relative">
            <div className="absolute -inset-8 bg-gradient-retro rounded-3xl blur-2xl opacity-10"></div>
            <div className="relative bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-vintage">
              <h2 className="font-anton text-title text-foreground mb-6">
                {getContent('problem', 'solution_title', 'Nossa Solução')}
              </h2>
              <h3 className="font-anton text-subtitle">
                <span className="text-transparent bg-gradient-retro bg-clip-text">
                  {getContent('problem', 'solution_subtitle', 'A mudança que você precisa')}
                </span>
              </h3>
              
              <p className="font-helvetica text-lg text-foreground/80 mt-8 max-w-3xl mx-auto leading-relaxed">
                {getContent('problem', 'solution_description', 'Oferecemos uma abordagem revolucionária que elimina esses problemas de uma vez por todas.')}
              </p>
              
              <p className="font-helvetica text-lg text-foreground/80 mt-6 max-w-3xl mx-auto leading-relaxed">
                {getContent('problem', 'solution_full_description', 'Nossa metodologia exclusiva combina tecnologia de ponta com estratégias comprovadas para entregar resultados que realmente fazem a diferença no seu negócio.')}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;