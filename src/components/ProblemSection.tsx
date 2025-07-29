const ProblemSection = () => {
  return (
    <section className="py-20 bg-white relative">
      {/* Vintage texture overlay */}
      <div className="absolute inset-0 bg-noise opacity-10"></div>
      
      <div className="relative container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Problem Statement */}
          <div className="space-y-8">
            <h2 className="font-anton text-title text-foreground">
              Você abre as redes sociais e vê quase todos com…
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "O mesmo conteúdo",
                "O mesmo look", 
                "O mesmo formato",
                "O mesmo feed"
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
                Já chega! Você não é igual a todo mundo.
              </h2>
              <h3 className="font-anton text-subtitle">
                <span className="text-transparent bg-gradient-retro bg-clip-text">
                  Você é DIFERENTE DOS IGUAIS.
                </span>
              </h3>
              
              <p className="font-helvetica text-lg text-foreground/80 mt-8 max-w-3xl mx-auto leading-relaxed">
                O Kit Diferente dos Iguais é para você que já produz conteúdo mas ainda não alcançou o nível que gostaria. 
                É para quem entende a importância de uma marca bem posicionada.
              </p>
              
              <p className="font-helvetica text-lg text-foreground/80 mt-6 max-w-3xl mx-auto leading-relaxed">
                Você terá em mãos um kit digital com todas as ferramentas que uso para criar uma marca pessoal única, 
                icônica e impossível de ser ignorada.
              </p>
              
              <p className="font-brittany text-xl text-primary mt-8 italic">
                É ler e aplicar.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;