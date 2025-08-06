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
              {getContent('problem', 'title', 'Você sente que precisa aparecer, mas trava?')}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                getContent('problem', 'problem_1', 'Não sabe o que falar nos stories?'),
                getContent('problem', 'problem_2', 'Acha que sua voz ou imagem "não são boas o suficiente"?'),
                getContent('problem', 'problem_3', 'Tem vergonha de parecer forçado ou de ser julgado?'),
                getContent('problem', 'problem_4', 'É empreendedor local e sabe que precisa se comunicar melhor, mas não sabe por onde começar?')
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
                {getContent('problem', 'solution_title', 'JÁ CHEGA!')}
              </h2>
              <h3 className="font-anton text-subtitle">
                <span className="text-transparent bg-gradient-retro bg-clip-text">
                  {getContent('problem', 'solution_subtitle', 'Já deu de se esconder.')}
                </span>
              </h3>
              
              <p className="font-helvetica text-lg text-foreground/80 mt-8 max-w-3xl mx-auto leading-relaxed">
                {getContent('problem', 'solution_description', 'Já deu de ver gente com menos experiência que você crescendo só porque tiveram coragem de aparecer.')}
              </p>
              
              <p className="font-helvetica text-lg text-foreground/80 mt-6 max-w-3xl mx-auto leading-relaxed">
                {getContent('problem', 'solution_full_description', 'Essa jornada é o que faltava pra você sair da zona do medo e entrar no campo da ação. Você tem um negócio incrível. E tá na hora do mundo ouvir sua voz.')}
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;