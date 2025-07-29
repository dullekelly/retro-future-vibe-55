const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Content Creator",
      text: "Depois de aplicar as estratégias do kit, minha marca pessoal realmente se destacou. Agora tenho uma identidade única!"
    },
    {
      name: "João Santos", 
      role: "Empreendedor Digital",
      text: "O material é incrível! Consegui definir meu propósito e criar conteúdos que realmente fazem sentido para minha audiência."
    },
    {
      name: "Ana Costa",
      role: "Influenciadora",
      text: "Finalmente encontrei minha voz autêntica. O kit me deu todas as ferramentas que precisava para ser diferente dos iguais."
    }
  ];

  return (
    <section className="py-20 bg-white relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-noise opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-plastic rounded-full blur-3xl opacity-20 animate-vintage-pulse"></div>
      
      <div className="relative container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="font-anton text-title text-foreground mb-4">
              Veja o que dizem sobre o Método de Criação de Marcas
            </h2>
            <h3 className="font-anton text-subtitle text-transparent bg-gradient-retro bg-clip-text">
              DIFERENTE DOS IGUAIS
            </h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="group relative"
              >
                <div className="absolute -inset-2 bg-gradient-retro rounded-xl blur opacity-10 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-cream/80 backdrop-blur-sm p-8 rounded-xl shadow-plastic hover:shadow-retro transition-all duration-300 transform hover:-translate-y-2">
                  
                  {/* Quote icon */}
                  <div className="w-12 h-12 bg-gradient-retro rounded-full flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  
                  <blockquote className="font-helvetica text-foreground/80 leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </blockquote>
                  
                  <div className="border-t border-foreground/10 pt-4">
                    <div className="font-helvetica font-bold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="font-helvetica text-sm text-foreground/60">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;