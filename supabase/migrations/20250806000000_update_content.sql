-- Script para atualizar todo o conteúdo conforme solicitado

-- Seção de Problemas comuns
UPDATE landing_content SET content_value = 'Você sente que precisa aparecer, mas trava?' WHERE section = 'problem' AND content_key = 'title';
UPDATE landing_content SET content_value = 'Não sabe o que falar nos stories?' WHERE section = 'problem' AND content_key = 'problem_1';
UPDATE landing_content SET content_value = 'Acha que sua voz ou imagem "não são boas o suficiente"?' WHERE section = 'problem' AND content_key = 'problem_2';
UPDATE landing_content SET content_value = 'Tem vergonha de parecer forçado ou de ser julgado?' WHERE section = 'problem' AND content_key = 'problem_3';
UPDATE landing_content SET content_value = 'É empreendedor local e sabe que precisa se comunicar melhor, mas não sabe por onde começar?' WHERE section = 'problem' AND content_key = 'problem_4';

-- Seção de Nossa solução
UPDATE landing_content SET content_value = 'JÁ CHEGA!' WHERE section = 'problem' AND content_key = 'solution_title';
UPDATE landing_content SET content_value = 'Já deu de se esconder.' WHERE section = 'problem' AND content_key = 'solution_subtitle';
UPDATE landing_content SET content_value = 'Já deu de ver gente com menos experiência que você crescendo só porque tiveram coragem de aparecer.' WHERE section = 'problem' AND content_key = 'solution_description';
UPDATE landing_content SET content_value = 'Essa jornada é o que faltava pra você sair da zona do medo e entrar no campo da ação. Você tem um negócio incrível. E tá na hora do mundo ouvir sua voz.' WHERE section = 'problem' AND content_key = 'solution_full_description';

-- Seção de itens exclusivos - atualizar os 3 primeiros e remover/desabilitar os outros
UPDATE landing_content SET content_value = 'Aula bônus com uma terapeuta para trabalhar o medo de aparecer' WHERE section = 'benefits' AND content_key = 'benefit_1';
UPDATE landing_content SET content_value = 'Cronograma completo de stories prontos para usar' WHERE section = 'benefits' AND content_key = 'benefit_2';
UPDATE landing_content SET content_value = 'Desconto exclusivo por ser da primeira turma' WHERE section = 'benefits' AND content_key = 'benefit_3';
UPDATE landing_content SET content_value = '' WHERE section = 'benefits' AND content_key = 'benefit_4';
UPDATE landing_content SET content_value = '' WHERE section = 'benefits' AND content_key = 'benefit_5';
UPDATE landing_content SET content_value = '' WHERE section = 'benefits' AND content_key = 'benefit_6';

-- Seção "produto revolucionário"
UPDATE landing_content SET content_value = 'Você pode continuar dizendo "não é pra mim", "depois eu vejo isso"… Mas a real é: quem não se comunica, não vende. E quem não aparece, não é lembrado.' WHERE section = 'benefits' AND content_key = 'product_tagline';
UPDATE landing_content SET content_value = '' WHERE section = 'benefits' AND content_key = 'product_description';

-- Seção "O que nossos clientes dizem" - Atualizando depoimentos
UPDATE landing_content SET content_value = 'Dulle você sabe que admiro seu trabalho e sua inteligência, né? Sou grata pela oportunidade de ter sua parceria, por ter me encorajado a deixar os medos e as inseguranças de lado e me atirar no meu sonho, hoje tenho dominio da comunicação em frente as câmeras. Oportunidade ímpar que tive e tenho em ter você com suas ideias e propostas brilhantes…Hoje temos várias ideias de Reels para a divulgação nos nossos produtos…Obrigada pela sua competência!' WHERE section = 'testimonials' AND content_key = 'testimonial_1_text';
UPDATE landing_content SET content_value = 'Tatiane Milhomem' WHERE section = 'testimonials' AND content_key = 'testimonial_1_name';
UPDATE landing_content SET content_value = '' WHERE section = 'testimonials' AND content_key = 'testimonial_1_role';

UPDATE landing_content SET content_value = 'Nós tínhamos (e ainda temos) muita timidez pra gravar vídeos. Mas graças a Deus encontramos você, Dulle, que nos ensinou como os Reels são importantes, aqui nas redes sociais, e que podemos trazer conteúdos de valor e de qualidade para o público através deles. Prova disso tem sido o crescimento da nossa página. Hoje nosso trabalho está sendo visto em outros estados e estamos ganhando autoridade com nossos serviços. E o que mais tem tido engajamento em nosso perfil, são os conteúdos trazidos através dos Reels.' WHERE section = 'testimonials' AND content_key = 'testimonial_2_text';
UPDATE landing_content SET content_value = 'Ludmilla Goiz' WHERE section = 'testimonials' AND content_key = 'testimonial_2_name';
UPDATE landing_content SET content_value = 'Enfermeira especialista em feridas, proprietária da Curare' WHERE section = 'testimonials' AND content_key = 'testimonial_2_role';

UPDATE landing_content SET content_value = 'A Dulle é simplesmente incrível quando o assunto é criatividade, e digo isso porque eu era péssimo nessa questão, tanto na criação quanto na edição de conteúdos, não entendia nada... Me ensinou simplesmente tudo, e de forma independente, ou seja, ela sempre quer que você aprenda a fazer sozinho e não ficar dependente de ninguém, e é exatamente isso que eu procurava. E me ajudou muito na organização de absolutamente tudo no meu Instagram. Recomendo a Dulle de olhos fechados, com certeza ela vai ser um divisor de águas na sua rede social.' WHERE section = 'testimonials' AND content_key = 'testimonial_3_text';
UPDATE landing_content SET content_value = 'Dr. Iago Mussi' WHERE section = 'testimonials' AND content_key = 'testimonial_3_name';
UPDATE landing_content SET content_value = 'Cirurgião-dentista Harmonizador Facial, com foco na naturalidade' WHERE section = 'testimonials' AND content_key = 'testimonial_3_role';
